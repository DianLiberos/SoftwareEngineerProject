# Đặc Tả Yêu Cầu Phần Mềm

## 1. Giới Thiệu

### 1.1. Mục đích
Tài liệu này xác định chi tiết các yêu cầu chức năng và phi chức năng cho hệ thống đặt cà phê trực tuyến BrewLite. Đây là căn cứ kỹ thuật để thẩm định thiết kế kiến trúc, triển khai mã nguồn và nghiệm thu kiểm thử cho đồ án môn Công nghệ Phần mềm.

### 1.2. Thuật ngữ & Quy ước viết tắt
- **MVP**: Sản phẩm khả dụng tối thiểu.
- **Idempotency**: Tính lũy đẳng (thuộc tính đảm bảo một hành động gửi đi nhiều lần vẫn chỉ mang lại một kết quả duy nhất).
- **State Machine**: Mô hình máy trạng thái hữu hạn kiểm soát vòng đời đơn hàng.
- **MoSCoW**: Phương pháp phân loại độ ưu tiên (Bắt buộc, Nên có, Cân nhắc, Không ưu tiên).

---

## 2. Bảng Yêu Cầu Chức Năng 

| Mã yêu cầu | Tên chức năng | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| **FR-01** | Xem danh mục menu | Hệ thống hiển thị danh sách các món nước kèm ảnh, mô tả, giá khởi điểm và trạng thái còn/hết hàng từ Database. | **Bắt buộc** |
| **FR-02** | Tùy biến sản phẩm | Khách hàng có thể chọn kích cỡ (S, M, L) và nhiều loại topping; hệ thống tự động cộng dồn giá tương ứng theo thời gian thực. | **Bắt buộc** |
| **FR-03** | Quản lý giỏ hàng | Khách hàng có thể thêm món, thay đổi số lượng, xóa món hoặc làm sạch toàn bộ giỏ hàng; dữ liệu được lưu cục bộ trên trình duyệt. | **Bắt buộc** |
| **FR-04** | Đăng nhập & Đăng ký | Xác thực người dùng bằng email và mật khẩu; tự động chuyển hướng khách chưa đăng nhập về trang đăng nhập khi bấm thanh toán. | **Bắt buộc** |
| **FR-05** | Khởi tạo đơn hàng | Tạo đơn hàng mới ở trạng thái `PENDING`. Backend tính toán giá và trừ tồn kho tự động; từ chối đơn nếu client gửi giá giả mạo hoặc hết hàng. | **Bắt buộc** |
| **FR-06** | Áp dụng mã ưu đãi | Kiểm tra tính hợp lệ của mã giảm giá (hạn dùng, đơn tối thiểu, số lần user đã sử dụng) trước khi tính toán số tiền giảm cuối cùng. | **Nên có** |
| **FR-07** | Xử lý thanh toán an toàn | Chấp nhận thanh toán bằng Thẻ hoặc Ví điện tử với `Idempotency-Key`; chuyển trạng thái đơn sang `PAID` và ngăn chặn thanh toán lại đơn đã trả. | **Bắt buộc** |
| **FR-08** | Tích lũy điểm Loyalty | Tự động cộng điểm thưởng cho khách hàng sau khi thanh toán thành công theo tỷ lệ quy đổi giá trị đơn hàng. | **Nên có** |
| **FR-09** | Xem lịch sử đơn hàng | Khách hàng có thể tra cứu toàn bộ các đơn hàng đã đặt trong tài khoản cá nhân kèm trạng thái xử lý chi tiết. | **Bắt buộc** |
| **FR-10** | Chuyển trạng thái đơn | Cung cấp API cập nhật trạng thái đơn hàng theo tuần tự từng bước (`PAID -> PREPARING -> READY -> COMPLETED`). | **Nên có** |

---

## 3. Bảng Yêu Cầu Phi Chức Năng

| Mã yêu cầu | Tiêu chí chất lượng | Mô tả đặc tả kỹ thuật & Chỉ số nghiệm thu |
| :--- | :--- | :--- |
| **NFR-01** | **Hiệu năng** | - Thời gian phản hồi API < 200ms trong điều kiện tải bình thường.<br>- Thời gian hiển thị nội dung đầu tiên của Frontend Next.js < 1.5 giây trên mạng 4G tiêu chuẩn. |
| **NFR-02** | **Toàn vẹn dữ liệu** | - Database Authoritative: Giá và số lượng tồn kho do Database làm chủ tuyệt đối.<br>- Mọi thao tác trừ kho, áp coupon, tạo payment phải được gói trong Prisma Database Transaction (`tx`) để đảm bảo tính nguyên tố . |
| **NFR-03** | **Chống trùng lặp** | - Bắt buộc kiểm tra Header `Idempotency-Key` tại endpoint `POST /payments`.<br>- Nếu nhận trùng key cho một đơn đã xử lý, trả về kết quả cũ kèm mã HTTP 200/400 phù hợp, không bao giờ trừ tiền hay tạo bản ghi thanh toán lần hai. |
| **NFR-04** | **Bảo mật** | - Mật khẩu người dùng phải được mã hóa một chiều bằng thuật toán băm an toàn.<br>- API áp dụng CORS chặt chẽ, chỉ cho phép nguồn gốc Frontend được ủy quyền truy cập. |
| **NFR-05** | **Khả năng tương thích** | - Giao diện thiết kế theo triết lý Mobile-First, hiển thị tương thích hoàn hảo từ màn hình smartphone đến máy tính bảng và desktop.<br>- Nút bấm có trạng thái loading, phản hồi trực quan khi đang kết nối API để chống double-click. |

---

## 4. Đặc Tả Ca Sử Dụng Cốt Lõi

### 4.1. Use-Case UC-01: Khởi Tạo Đơn Hàng
- **Tác nhân chính:** Khách hàng.
- **Điều kiện tiên quyết:** Khách hàng đã đăng nhập và giỏ hàng có ít nhất 1 sản phẩm hợp lệ.
- **Sự kiện kích hoạt:** Khách hàng xác nhận thông tin tại trang Checkout.

#### Luồng sự kiện chính:
1. Khách hàng gửi yêu cầu tạo đơn kèm danh sách món (`productId`, `quantity`) và mã giảm giá (nếu có).
2. Backend khởi tạo một Database Transaction.
3. Backend kiểm tra sự tồn tại và số lượng tồn kho (`stock`) của từng món trong cơ sở dữ liệu.
4. Backend tính toán giá gốc dựa trên bảng giá niêm yết trong Database.
5. *(Tùy chọn)* Backend kiểm tra mã giảm giá: kiểm tra hạn dùng, giá trị đơn tối thiểu và xác nhận người dùng chưa từng dùng mã này.
6. Backend trừ số lượng tồn kho tương ứng của các món trong kho.
7. Backend tạo bản ghi `Order` ở trạng thái `PENDING` và các bản ghi `OrderItem` liên quan.
8. Backend commit transaction và trả về thông tin đơn hàng vừa tạo (bao gồm `orderId` và tổng tiền chính xác) cho Frontend.

#### Các luồng rẽ nhánh & Ngoại lệ:
- **3a. Sản phẩm đã hết hàng hoặc tồn kho không đủ:**
  - Backend hủy bỏ transaction.
  - Trả về mã lỗi HTTP `400 Bad Request` kèm thông điệp: "Sản phẩm [Tên món] không còn đủ số lượng tồn kho".
  - Frontend thông báo cho người dùng điều chỉnh lại số lượng trong giỏ hàng.
- **5a. Mã giảm giá không hợp lệ hoặc đã qua sử dụng:**
  - Backend trả về mã lỗi `400 Bad Request` thông báo mã coupon không hợp lệ.
  - Hủy transaction tạo đơn, yêu cầu khách hàng bỏ mã hoặc nhập mã khác.

---

### 4.2. Use-Case UC-02: Thanh Toán Đơn Hàng
- **Tác nhân chính:** Khách hàng.
- **Điều kiện tiên quyết:** Đơn hàng đã được tạo thành công ở trạng thái `PENDING`.
- **Sự kiện kích hoạt:** Khách hàng chọn phương thức thanh toán và bấm "Xác nhận trả".

#### Luồng sự kiện chính:
1. Frontend sinh một chuỗi định danh duy nhất `Idempotency-Key` (ví dụ: `pay-{orderId}-{timestamp}`).
2. Frontend gửi yêu cầu `POST /payments` kèm mã đơn, phương thức thanh toán và đưa key vào Request Header.
3. Backend mở Database Transaction và khóa bản ghi `Order` tương ứng.
4. Backend kiểm tra trạng thái đơn hàng: Đơn phải đang ở trạng thái `PENDING` và chưa có bản ghi thanh toán thành công nào.
5. Backend gọi dịch vụ xử lý thanh toán với số tiền phải trả.
6. Dịch vụ thanh toán trả về phản hồi thành công.
7. Backend tạo bản ghi `Payment` lưu lại phương thức và thông tin thanh toán.
8. Backend cập nhật trạng thái đơn hàng từ `PENDING` sang `PAID`.
9. Backend tính điểm thưởng Loyalty Points và cộng dồn vào tài khoản của khách hàng.
10. Commit transaction và trả về kết quả thành công cho Frontend.
11. Frontend dọn sạch giỏ hàng và chuyển sang màn hình hiển thị mã đơn xác nhận thành công.

#### Các luồng rẽ nhánh & Ngoại lệ:
- **4a. Đơn hàng đã có thanh toán (Xử lý trùng lặp):**
  - Backend phát hiện đơn đã ở trạng thái `PAID` hoặc đã tồn tại bản ghi thanh toán.
  - Backend hủy bỏ tiến trình, trả về phản hồi mã lỗi hoặc trạng thái hiện tại của đơn, ngăn chặn việc tạo thêm Payment mới.
- **6a. Cổng thanh toán phản hồi thất bại (Từ chối giao dịch / Số dư không khả dụng):**
  - Backend ghi nhận giao dịch thất bại.
  - Đơn hàng giữ nguyên trạng thái `PENDING` hoặc chuyển sang `PAYMENT_FAILED`.
  - Frontend hiển thị thông báo lỗi chi tiết để khách hàng thử lại hoặc đổi phương thức thanh toán khác.