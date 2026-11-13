cat << 'EOF' > docs/architecture/adr/002-authoritative-db-and-idempotency.md
# ADR 002: Kiểm Soát Đơn Hàng Tập Trung Và Xử Lý Thanh Toán Lũy Đẳng

## Trạng thái
**Đã chấp thuận** — Ngày: 2026-10-28

## Bối cảnh
Trong hệ thống đặt cà phê trực tuyến:
1. **Gian lận giá & sai lệch kho:** Người dùng có thể sửa đổi payload trên client (sửa `price` hoặc `totalAmount`) trước khi gửi lên server. Ngoài ra, việc nhiều khách cùng đặt món cuối cùng có thể gây hiện tượng bán quá số lượng tồn.
2. **Trừ tiền lặp:** Khách hàng sử dụng mạng di động chập chờn thường có thói quen bấm đúp nút thanh toán, hoặc mạng bị ngắt giữa chừng khiến client gửi lại request thanh toán khi server đã xử lý xong.

## Quyết định

### 1. Cơ chế Database Authoritative
- Client tuyệt đối **không gửi giá tiền, số tiền giảm, hay thông tin tồn kho** lên server.
- Payload `POST /orders` chỉ chứa danh sách định danh tối giản: `{ productId, quantity }` và `couponCode` (nếu có).
- Backend truy vấn trực tiếp bảng `Product` trong PostgreSQL để lấy đơn giá niêm yết, tính toán chiết khấu và tự tính tổng tiền.
- Toàn bộ chuỗi thao tác (kiểm tra kho $\rightarrow$ trừ kho `stock: { decrement }` $\rightarrow$ tạo `Order` $\rightarrow$ tạo `OrderItem`) phải được bọc trong một **Prisma Database Transaction (`$transaction`)**.

### 2. Cơ chế Thanh toán Lũy đẳng
- Mọi yêu cầu `POST /payments` bắt buộc phải kèm theo Header `Idempotency-Key` (sinh từ client theo định dạng `pay-{orderId}-{timestamp}`).
- Backend kiểm tra khóa bản ghi đơn hàng trước khi xử lý:
  - Nếu đơn đã ở trạng thái `PAID` hoặc đã có bản ghi `Payment`: Lập tức ngắt tiến trình, trả về kết quả thành công của giao dịch trước đó kèm HTTP 200/400.
  - Tuyệt đối không bao giờ tạo thêm bản ghi `Payment` thứ hai hoặc cộng điểm thưởng lần hai cho cùng một đơn hàng.

## Hệ quả

### Tích cực:
1. Loại bỏ 100% rủi ro bị can thiệp giá từ phía người dùng.
2. Đảm bảo tính nhất quán cho kho hàng; không bao giờ xảy ra tình trạng âm kho do tranh chấp tài nguyên.
3. Bảo vệ an toàn giao dịch tài chính, chống lại hành vi spam click hoặc lỗi mạng chập chờn từ thiết bị di động.

### Tiêu cực & Biện pháp giảm thiểu:
- Cơ sở dữ liệu phải chịu tải khóa hàng trong lúc transaction diễn ra. Do phạm vi đồ án là hệ thống cửa hàng phục vụ tại quầy nên thời gian giữ transaction ngắn, hoàn toàn đáp ứng tốt hiệu năng NFR-01.