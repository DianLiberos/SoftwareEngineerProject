# Tài Liệu Bối Cảnh Và Phạm Vi Dự Án

## 1. Bối Cảnh Dự Án 
BrewLite là giải pháp ứng dụng web đặt thức uống trực tiếp dành cho các chuỗi hoặc quán cà phê hiện đại. Dự án giải quyết các vấn đề thường gặp tại quầy:
- Tình trạng kẹt hàng vào giờ cao điểm do khách hàng phải lần lượt chọn món và thanh toán tiền mặt tại quầy.
- Tỷ lệ sai sót khi nhân viên thu ngân ghi nhận các đơn khác nhau, khác loại.
- Thiếu kênh tích lũy điểm thưởng và gắn kết khách hàng thân thiết.

BrewLite tập trung vào trải nghiệm đặt trước - lấy tại quầy, cho phép khách hàng chủ động chọn món, tùy biến thành phần, áp dụng mã ưu đãi và thanh toán không tiền mặt trên thiết bị di động.

---

## 2. Phân Tích Các Bên Liên Quan
| Bên liên quan | Phân loại | Mô tả vai trò & Trách nhiệm | Mục tiêu & Kỳ vọng cốt lõi | Mức độ ảnh hưởng |
| :--- | :--- | :--- | :--- | :--- |
| **Khách hàng** | Trực tiếp | Người trực tiếp sử dụng web app để xem menu, tùy chọn món, thanh toán và theo dõi mã nhận nước. | Giao diện trực quan, mượt mà trên mobile, tốc độ đặt món dưới 1 phút, không lỗi thanh toán kép. | Rất cao |
| **Nhân viên pha chế** | Trực tiếp | Tiếp nhận thông tin đơn hàng đã thanh toán để tiến hành pha chế theo đúng tùy biến. | Nhận thông tin đơn rõ ràng (size, topping), trạng thái đơn chính xác để tránh pha nhầm. | Cao |
| **Chủ cửa hàng** | Quản lý | Theo dõi doanh thu, quản lý định giá sản phẩm, lượng tồn kho và chiến dịch khuyến mãi. | Dữ liệu giá/kho nhất quán, ngăn ngừa gian lận giá từ client, tăng tỷ lệ quay lại của khách. | Rất cao |
| **Đội ngũ phát triển** | Kỹ thuật | Xây dựng, triển khai, duy trì hệ thống Monorepo (Next.js + NestJS + PostgreSQL). | Kiến trúc module hóa sạch, dễ mở rộng, có cơ chế idempotent xử lý thanh toán an toàn. | Trung bình |

---

## 3. Phạm Vi Dự Án

### 3.1. Phạm Vi Triển Khai (MVP)
Các tính năng cốt lõi bắt buộc hoàn thành trong phạm vi đồ án môn học:
1. **Quản lý danh mục & thực đơn:**
   - Hiển thị danh sách thức uống kèm giá cơ sở, trạng thái tồn kho thực tế từ PostgreSQL.
   - Hỗ trợ xem chi tiết món và tùy chọn đa dạng: kích cỡ (Size S/M/L) và topping đi kèm.
2. **Giỏ hàng & Quản lý trạng thái:**
   - Quản lý giỏ hàng cục bộ, tính toán tạm tính real-time theo từng biến thể.
3. **Định danh & Kiểm soát truy cập:**
   - Đăng ký, đăng nhập tài khoản khách hàng, bảo vệ các tuyến đường thanh toán.
4. **Xử lý đơn hàng tập trung:**
   - Database và Backend làm chủ tuyệt đối về giá và tồn kho; Client chỉ gửi ID và số lượng.
   - Hỗ trợ áp dụng mã giảm giá (Coupon validation) kiểm tra tính hợp lệ và chống tái sử dụng.
5. **Thanh toán không tiền mặt an toàn:**
   - Giả lập thanh toán qua Ví điện tử hoặc Thẻ ngân hàng.
   - Triển khai cơ chế khóa `Idempotency-Key` ngăn chặn thanh toán trùng lặp khi mạng chập chờn hoặc người dùng bấm đúp.
6. **Chương trình thành viên & Lịch sử :**
   - Tích lũy điểm thưởng theo giá trị đơn hàng sau khi thanh toán thành công.
   - Xem lịch sử đơn cá nhân kèm chi tiết món và trạng thái xử lý (`PENDING`, `PAID`, `PREPARING`, `READY`, `COMPLETED`).

### 3.2. Ngoài Phạm Vi
Các tính năng không thuộc phạm vi của giai đoạn này và được phân kỳ ở các giai đoạn sau:
- Màn hình giao diện chuyên biệt dành cho Barista tiếp nhận đơn trực quan.
- Tích hợp dịch vụ giao hàng tận nơi.
- Tích hợp cổng thanh toán thực tế chịu phí thương mại.
- Cơ chế tự động hoàn tiền giao dịch qua cổng trung gian.
- Hệ thống hỗ trợ đa chi nhánh và điều phối kho liên cửa hàng.

---

## 4. Giả Định Và Ràng Buộc Kỹ Thuật

### 4.1. Giả định
- Khách hàng luôn có kết nối mạng ổn định (Wi-Fi hoặc 4G/5G) khi thao tác tại không gian quán.
- Quán cà phê hoạt động theo mô hình "Tự phục vụ tại quầy": Khách hàng tự theo dõi mã đơn để đến nhận thức uống khi sẵn sàng.
- Tồn kho nguyên liệu được trừ trực tiếp theo từng đơn vị ly nước được tạo.

### 4.2. Ràng buộc
- **Kiến trúc:** Monorepo phân tách rõ ràng giữa `apps/web` (Next.js 16 App Router) và `apps/api` (NestJS).
- **Cơ sở dữ liệu:** PostgreSQL quản lý thông qua Prisma ORM, chạy trên môi trường Docker Compose.
- **Nền tảng:** Web ứng dụng tối ưu hóa ưu tiên hiển thị trên thiết bị di động (Mobile-First Responsive Design).
- **Quy trình:** Tuân thủ quy trình Agile Scrum, mọi thay đổi mã nguồn phải có commit minh chứng cho từng giai đoạn tài liệu và triển khai.
