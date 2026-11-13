# Hướng Dẫn Chạy Bộ Kiểm Thử Tự Động – BrewLite

Tài liệu này hướng dẫn cách chạy bộ kiểm thử tích hợp và luồng trọn vẹn theo chuẩn **Task 10 (Assignment 1)** và **Task 5.2 (Assignment 2)** của đồ án BrewLite.

File collection: `tests/BrewLite.postman_collection.json` (Phiên bản Postman Collection v2.1.0).

---

## 📋 Danh Sách Kịch Bản Kiểm Thử Có Trong Collection

| STT | Kịch bản kiểm thử | Mô tả chi tiết & Tiêu chí nghiệm thu |
|:---:|:---|:---|
| **1** | **Health Check** | `GET /health` kiểm tra trạng thái API và kết nối database PostgreSQL (`status: "ok"`, `database: "connected"`). |
| **2** | **Auth & RBAC Security** | Đăng nhập tài khoản Khách hàng (`demo@brewlite.local`) & Barista (`barista@brewlite.local`). Kiểm tra Route Guard: Chặn tài khoản khách hàng khi cố tình gọi API đổi trạng thái pha chế của Barista (`403 Forbidden`). |
| **3** | **Integration: Tạo đơn & Trừ kho nguyên liệu** | Lấy tồn kho suy diễn `initialStock` từ `GET /products/1`, gọi `POST /orders` đặt 1 ly, kiểm tra `GET /products/1` xác nhận tồn kho giảm chính xác 1 ly. |
| **4** | **Task 10b: Idempotency Payment** | Gửi 2 request thanh toán `POST /payments` liên tiếp với cùng một `Idempotency-Key` => Xác nhận hệ thống trả về cùng một mã giao dịch cũ, không tạo trùng đơn hay trừ tiền 2 lần. |
| **5** | **Task 10a: Order State Machine** | Thử đổi trạng thái đơn nhảy cóc không hợp lệ (`PAID` nhảy thẳng sang `COMPLETED`) => Xác nhận hệ thống chặn bằng lỗi `409 Conflict` hoặc `400 Bad Request`. |
| **6** | **Hủy đơn & Hoàn trả nguyên liệu kho** | Tạo 1 đơn mới, gọi `PATCH /orders/:id/cancel` => Xác nhận đơn chuyển sang `CANCELLED` và toàn bộ nguyên liệu (`Ingredient`) được tự động hoàn trả đầy đủ vào kho. |
| **7** | **E2E Full Flow** | Chạy trọn vẹn chu trình đơn hàng thực tế: Đặt đơn (`PENDING`) => Thanh toán Sandbox (`PAID`) => Barista nhận pha chế (`PREPARING`) => Pha xong (`READY`) => Giao khách (`COMPLETED`) => Kiểm tra lịch sử đơn `GET /orders/me`. |

---

## 🖥️ Hướng Dẫn Chạy Trên Giao Diện Postman / VS Code Extension

### Bước 1: Khởi động Backend API & Cơ sở dữ liệu
Đảm bảo PostgreSQL và Backend API đang hoạt động (mặc định tại cổng 3001):
```bash
cd apps/api
npm run start:dev
```

### Bước 2: Import Collection vào Postman
1. Mở ứng dụng **Postman** (hoặc mở tab **Postman** trong VS Code nếu dùng extension *Postman for VS Code*).
2. Bấm nút **Import** ở góc trên bên trái.
3. Import file `tests/BrewLite.postman_collection.json` vào workspace.

### Bước 3: Kiểm tra Collection Variables
1. Nhấp chọn collection **BrewLite Automated Tests (Task 10 & Task 5.2)**.
2. Chuyển sang tab **Variables**.
3. Xác nhận biến `baseUrl` đang có giá trị là `http://localhost:3001` (nếu bạn chạy API ở cổng khác thì cập nhật lại tại đây).

### Bước 4: Chạy tự động toàn bộ Collection
1. Bấm vào nút **Run**.
2. Đảm bảo tất cả 7 thư mục kiểm thử từ `1. Health Check` đến `7. E2E Full Flow` đều được tích chọn theo đúng thứ tự.
3. Bấm nút **Run BrewLite Automated Tests**.
4. Toàn bộ các kịch bản kiểm thử sẽ tự động thực thi tuần tự, luân chuyển token và mã đơn hàng, hiển thị toàn bộ kết quả màu xanh.
