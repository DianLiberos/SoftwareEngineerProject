# Hướng Dẫn Chạy Bộ Kiểm Thử Tích Hợp Tự Động – BrewLite

Tài liệu này hướng dẫn cách chạy bộ kiểm thử tích hợp và luồng trọn vẹn theo chuẩn **Task 10 (Assignment 1)** và **Task 5.2 (Assignment 2)** của dự án BrewLite.

Bộ test đã được hợp nhất và đồng bộ nhất quán giữa 2 vị trí trong repository:
- `tests/BrewLite.postman_collection.json` (kèm file environment `tests/BrewLite Local.postman_environment.json`)
- `apps/api/postman/BrewLite API.postman_collection.json` (kèm file environment `apps/api/postman/BrewLite Local.postman_environment.json`)

---

## Danh Sách 4 Nhóm Kịch Bản Kiểm Thử 

### 1. Setup, Health & Authentication
1. **Health check (System & Database Ping)**: `GET /health` xác nhận server hoạt động và kết nối PostgreSQL ổn định (`status: "ok"`, `database: "connected"`).
2. **Login Customer**: `POST /auth/login` với tài khoản `demo@brewlite.local` / `123456`, lưu `customerToken` và `userId`.
3. **Login Barista**: `POST /auth/login` với tài khoản `barista@brewlite.local` / `123456`, lưu `baristaToken`.
4. **RBAC Guard (Customer call Barista endpoint)**: `PATCH /orders/rbac-guard-test/status` với token khách => Chặn quyền bằng `403 Forbidden`.
5. **RBAC Guard (Anonymous call)**: `GET /orders` không token => Chặn truy cập danh sách đơn bằng `401 Unauthorized`.
6. **List Products & Baseline Stock**: `GET /products` lấy danh mục sản phẩm và ghi lại tồn kho cà phê ban đầu (`initialCoffeeStock`).
7. **Read Loyalty Points**: `GET /users/{{userId}}/loyalty` đọc số điểm tích lũy ban đầu của khách hàng.
8. **Validate Coupon**: `POST /coupons/validate` kiểm tra tính hợp lệ của mã giảm giá hạt giống `BREW10`.

### 2. Order Validation & Recipe-Based Inventory 
1. **Reject zero item quantity**: `POST /orders` với `qty = 0` => Bắt lỗi validation `400 Bad Request`.
2. **Reject order exceeding stock**: `POST /orders` với số lượng vượt quá tổng nguyên liệu trong kho => Bị chặn bằng `409 Conflict`.
3. **Reject order with no matching recipe**: `POST /orders` với món không tồn tại hoặc chưa cấu hình công thức => Chặn bằng `400/404/409`.
4. **Create a pending two-drink order**: `POST /orders` tạo đơn hợp lệ gồm 2 món, lưu `paidOrderId`.
5. **Check recipe stock reservation**: `GET /products` kiểm tra lượng tồn kho suy diễn của cà phê giảm chính xác tương ứng lượng nguyên liệu bị giữ chỗ (reserve).
6. **Create pending order to test cancellation**: `POST /orders` tạo một đơn phụ, lưu `cancelOrderId`.
7. **Cancel order**: `PATCH /orders/{{cancelOrderId}}/cancel` hủy đơn với lý do cụ thể => Đơn chuyển sang `CANCELLED`.
8. **Check cancellation restored stock**: `GET /products` xác nhận toàn bộ nguyên liệu của đơn hủy đã được tự động hoàn trả đầy đủ vào kho.

### 3. Payments & Idempotency Rules - Task 10b
1. **Reject payment without Idempotency-Key**: `POST /payments` thiếu header chống trùng lặp => Bắt lỗi `400 Bad Request`.
2. **Pay pending order**: `POST /payments` thanh toán đơn hàng thành công với `Idempotency-Key` => Chuyển đơn sang `PAID`.
3. **Retry payment with same Idempotency-Key**: `POST /payments` gửi lại đúng key cũ => Hệ thống trả về giao dịch cũ, không tạo đơn mới (Idempotent `200/201`).
4. **Reject reused key with different request**: `POST /payments` dùng lại key cũ nhưng đổi thông tin đơn => Chặn bằng `409 Conflict`.
5. **Verify loyalty points accrued**: `GET /users/{{userId}}/loyalty` xác nhận khách hàng được cộng thêm điểm loyalty sau khi thanh toán thành công.

### 4. Order State Machine & Fulfillment - Task 10a & E2E
1. **Reject illegal state jump**: `PATCH /orders/{{paidOrderId}}/status` thử nhảy cóc từ `PAID` sang `COMPLETED` => Chặn bằng `409 Conflict`.
2. **Move paid order to preparing**: Barista chuyển đơn: `PAID` ➔ `PREPARING` (`200 OK`).
3. **Move preparing order to ready**: Barista chuyển đơn: `PREPARING` ➔ `READY` (`200 OK`).
4. **Complete ready order**: Barista hoàn thành đơn: `READY` ➔ `COMPLETED` (`200 OK`).
5. **Get customer order history by user ID**: `GET /orders/user/{{userId}}` kiểm tra đơn hàng đã hoàn tất xuất hiện trong lịch sử.
6. **Get authenticated customer orders**: `GET /orders/me` kiểm tra truy vấn danh sách đơn cá nhân của khách hàng thông qua Bearer JWT token (`200 OK`).

---

## Hướng Dẫn Chạy Trên Postman / VS Code Extension

### Bước 1: Khởi động Backend API & Database
```bash
# Chạy cơ sở dữ liệu PostgreSQL
docker compose up -d postgres

# Khởi chạy backend API
cd apps/api
npm run start:dev
```

### Bước 2: Import vào Postman
1. Mở ứng dụng **Postman**.
2. Nhấn nút **Import** ở góc trên bên trái.
3. Chọn import file:
   - Collection: `tests/BrewLite.postman_collection.json` (hoặc `apps/api/postman/BrewLite API.postman_collection.json`)
   - Environment (tùy chọn): `tests/BrewLite Local.postman_environment.json`
4. Cấu hình biến `baseUrl` mặc định là `http://localhost:3001`.

### Bước 3: Chạy tự động
1. Chọn collection **BrewLite Automated Tests (Task 10 & Integration)**.
2. Nhấn **Run collection**.
3. Chọn tất cả 4 thư mục theo thứ tự từ `1` đến `4`.
4. Nhấn **Run BrewLite Automated Tests**. Toàn bộ 27 test cases sẽ tự động thực thi tuần tự và hiển thị kết quả Passed.
