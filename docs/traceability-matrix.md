# Ma Trận Truy Vết Yêu Cầu

Tài liệu này thiết lập mối liên kết hai chiều chặt chẽ giữa các thành phần trong toàn bộ vòng đời phát triển của dự án **BrewLite**: từ **Yêu cầu** ➔ **Ca sử dụng / User Story** ➔ **Thiết kế & Sơ đồ ** ➔ **Hiện thực Mã nguồn** ➔ **Kiểm thử & Nghiệm thu**.

Tài liệu được xây dựng theo chuẩn **Mục 8.1 - Assignment 2**.

---

## 1. Bảng Ma Trận Truy Vết Yêu Cầu Chức Năng

| Mã Yêu Cầu | Tên Yêu Cầu & Mô Tả | Use-Case / User Story | Thiết Kế / Sơ Đồ | Mã Nguồn / API Endpoint | Kịch Bản Kiểm Thử | Trạng Thái |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-01** | **Xem danh mục menu & tồn kho**<br>Hiển thị danh sách thức uống, giá niêm yết và tồn kho suy diễn từ nguyên liệu. | **US-01 / UC-03**<br>Khách xem danh sách sản phẩm | `activity-order.puml`<br>`class-domain.puml`<br>`deployment.puml` | `GET /products`<br>`GET /products/:id`<br>`apps/web/app/page.tsx`<br>`products.service.ts` | **UT-PROD-01** (Unit test derived stock)<br>**IT-06** (`GET /products` list & baseline stock) | **Đã hoàn thành** |
| **FR-02** | **Tùy biến kích cỡ & topping**<br>Chọn Size (M/L), thêm topping, cộng dồn giá real-time tại client. | **US-02 / UC-03**<br>Khách tùy biến món | `activity-order.puml`<br>`class-domain.puml` | `apps/web/app/product/[id]/page.tsx`<br>`products.service.ts` | **UT-ORD-05** (Unit test size/topping price calc)<br>**IT-12** (`POST /orders` with size & qty) | **Đã hoàn thành** |
| **FR-03** | **Quản lý giỏ hàng**<br>Thêm/sửa/xóa món, tính tạm tính và lưu trạng thái giỏ hàng cục bộ. | **US-03 / UC-01**<br>Khách quản lý giỏ hàng | `activity-order.puml`<br>`sequence-checkout.puml` | `apps/web/app/checkout/page.tsx`<br>`apps/web/hooks/useCart.ts` | **IT-09** (Reject zero qty item)<br>Client-side UI interaction verification | **Đã hoàn thành** |
| **FR-04** | **Đăng ký & Đăng nhập (Auth & RBAC)**<br>Xác thực qua JWT, mã hóa mật khẩu bcrypt, phân quyền Customer / Barista. | **US-04 / UC-04**<br>Đăng nhập & Bảo vệ tuyến đường | `sequence-checkout.puml`<br>`class-domain.puml` | `POST /auth/register`<br>`POST /auth/login`<br>`JwtAuthGuard`<br>`RolesGuard` | **IT-02** (Customer login)<br>**IT-03** (Barista login)<br>**IT-04** (RBAC 403 Forbidden guard)<br>**IT-05** (Anonymous 401 guard) | **Đã hoàn thành** |
| **FR-05** | **Khởi tạo đơn hàng & Trừ kho nguyên liệu**<br>Tạo đơn `PENDING`, trừ kho nguyên liệu theo recipe qua Transaction. | **US-05 / UC-01**<br>Khởi tạo đơn hàng Checkout | `activity-order.puml`<br>`sequence-checkout.puml`<br>`ADR-002` | `POST /orders`<br>`orders.service.ts` (`create`) | **UT-ORD-03** (Unit test atomicity reservation)<br>**IT-10** (Reject order exceed stock)<br>**IT-12** (Create pending order)<br>**IT-13** (Verify recipe stock deducted) | **Đã hoàn thành** |
| **FR-06** | **Áp dụng mã ưu đãi**<br>Validate hạn dùng, giá trị đơn tối thiểu, số lần dùng và tính tiền giảm. | **US-06 / UC-05**<br>Khách áp mã giảm giá | `activity-order.puml`<br>`class-domain.puml` | `POST /coupons/validate`<br>`coupons.service.ts` | **UT-ORD-05** (Unit test coupon percentage/fixed)<br>**IT-08** (Validate seeded `BREW10` coupon) | **Đã hoàn thành** |
| **FR-07** | **Thanh toán an toàn & Lũy đẳng (Idempotency)**<br>Chấp nhận Ví/Thẻ, kiểm tra `Idempotency-Key` chống thanh toán kép. | **US-07 / UC-02**<br>Thanh toán không tiền mặt | `sequence-checkout.puml`<br>`ADR-002`<br>`deployment.puml` | `POST /payments`<br>`payments.service.ts` (`create`) | **UT-PAY-01** (Unit test idempotency replay)<br>**UT-PAY-02** (Unit test key collision)<br>**IT-17** (Reject missing Idempotency-Key)<br>**IT-18** (Pay pending order)<br>**IT-19** (Replay payment with same key) | **Đã hoàn thành** |
| **FR-08** | **Chương trình tích lũy điểm Loyalty**<br>Tự động cộng điểm thưởng cho khách hàng sau khi thanh toán thành công. | **US-08 / UC-02**<br>Tích lũy điểm thành viên | `class-domain.puml` | `GET /users/:id/loyalty`<br>`payments.service.ts` | **UT-PAY-03** (Unit test loyalty points accrual)<br>**IT-07** (Read initial loyalty points)<br>**IT-21** (Verify loyalty points accrued) | **Đã hoàn thành** |
| **FR-09** | **Xem lịch sử & Trạng thái đơn hàng**<br>Khách tra cứu các đơn hàng cá nhân đã đặt kèm chi tiết thức uống. | **US-09 / UC-01**<br>Khách theo dõi đơn hàng | `activity-order.puml`<br>`class-domain.puml` | `GET /orders/me`<br>`GET /orders/user/:userId`<br>`apps/web/app/profile/page.tsx` | **IT-26** (Get orders by user ID)<br>**IT-27** (Get orders via JWT `/orders/me`) | **Đã hoàn thành** |
| **FR-10** | **Máy trạng thái đơn hàng & Barista Fulfillment**<br>Chuyển tuần tự `PAID` ➔ `PREPARING` ➔ `READY` ➔ `COMPLETED`; Chặn nhảy cóc. | **US-10 / UC-07**<br>Barista quản lý pha chế | `activity-order.puml`<br>`ADR-002` | `PATCH /orders/:id/status`<br>`apps/web/app/barista/page.tsx` | **UT-ORD-01** (Unit test state machine lifecycle)<br>**UT-ORD-02** (Unit test reject invalid transition)<br>**IT-22** (Reject illegal jump PAID ➔ COMPLETED)<br>**IT-23 -> IT-25** (Advance to PREPARING, READY, COMPLETED) | **Đã hoàn thành** |
| **FR-11** | **Hủy đơn hàng & Hoàn trả kho nguyên liệu**<br>Hủy đơn hợp lệ (`PENDING`), tự động hoàn trả 100% nguyên liệu vào kho. | **US-11 / UC-06**<br>Khách/Hệ thống hủy đơn | `activity-order.puml`<br>`class-domain.puml` | `PATCH /orders/:id/cancel`<br>`orders.service.ts` (`cancelOrder`) | **UT-ORD-04** (Unit test cancel & restock)<br>**IT-14** (Create order for cancellation test)<br>**IT-15** (Cancel order)<br>**IT-16** (Verify stock completely restored) | **Đã hoàn thành** |

---

## 2. Bảng Ma Trận Truy Vết Yêu Cầu Phi Chức Năng

| Mã Yêu Cầu | Tiêu Chí Chất Lượng | Đặc Tả & Chỉ Số Nghiệm Thu | Giải Pháp Thiết Kế & Kiến Trúc | Hiện Thực Kỹ Thuật | Phương Thức Kiểm Thử & Đo Lường |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **NFR-01** | **Hiệu năng** | - Thời gian phản hồi API < 200ms.<br>- Thời gian hiển thị First Contentful Paint (FCP) < 1.5s trên 4G. | Monorepo Next.js + NestJS, tối ưu hóa queries và indexing database qua Prisma. | Caching HTTP, Static Generation & Turbopack trong Next.js 16; Connection pooling PostgreSQL. | Postman Collection Runner response time logging (< 50ms ở local); Lighthouse audit. |
| **NFR-02** | **Toàn vẹn dữ liệu** | - Database Authoritative: Giá và tồn kho do Database làm chủ tuyệt đối.<br>- Đảm bảo tính nguyên tử. | **ADR-002**: Không tin cậy dữ liệu client gửi lên; Bọc toàn bộ thao tác trừ kho & tạo payment trong transaction. | Prisma `$transaction` trong `OrdersService.create`, `OrdersService.cancelOrder`, `PaymentsService.create`. | **UT-ORD-03**, **UT-ORD-04**, **IT-10**, **IT-13**, **IT-16**. |
| **NFR-03** | **Chống trùng lặp (Idempotency)** | - Bắt buộc kiểm tra `Idempotency-Key` header tại `POST /payments`.<br>- Không bao giờ trừ tiền hay tạo 2 bản ghi thanh toán cho cùng một đơn. | **ADR-002**: Cơ chế khóa bản ghi đơn hàng và lưu trữ bảng `Payment` với quan hệ 1-1. | `PaymentsController` validation header; `PaymentsService.create` kiểm tra trạng thái và trả kết quả cũ khi nhận trùng key. | **UT-PAY-01**, **UT-PAY-02**, **IT-17**, **IT-19**, **IT-20**. |
| **NFR-04** | **Bảo mật (Security & RBAC)** | - Mật khẩu mã hóa 1 chiều bcrypt.<br>- Xác thực phân quyền RBAC dựa trên JWT Token.<br>- Chặn truy cập trái phép vào các endpoint nhạy cảm. | `class-domain.puml` (Model User + Role ENUM); JwtStrategy & RolesGuard trong NestJS. | `bcrypt.hash` trong `seed.ts` & `auth.service.ts`; `@Roles(Role.BARISTA)` bảo vệ `PATCH /orders/:id/status`. | **IT-04** (Customer gọi API Barista bị 403 Forbidden); **IT-05** (Gọi API không token bị 401 Unauthorized). |
| **NFR-05** | **Khả năng triển khai (Deployability & Portability)** | - Toàn bộ hệ thống có thể khởi chạy nhất quán qua container.<br>- Có khả năng tái tạo database từ đầu. | `deployment.puml`<br>`ADR-001` (Monorepo). | `docker-compose.yml`, Prisma migrations (`apps/api/prisma/migrations`), seed script (`seed.ts`). | `docker compose up -d postgres`, `npm run prisma:migrate`, `GET /health` (`IT-01`). |

---

## 3. Danh Mục Tham Chiếu Mã Kiểm Thử

### 3.1. Unit Tests (Jest - `apps/api/src/**/*.spec.ts`)
- **UT-ORD-01**: `OrdersService - State Machine Transitions` (Kiểm thử chu trình hợp lệ PENDING ➔ PAID ➔ PREPARING ➔ READY ➔ COMPLETED).
- **UT-ORD-02**: `OrdersService - State Machine Transition Guards` (Chặn chuyển trạng thái bất hợp lệ, nhảy cóc, đổi trạng thái từ đơn đã hủy).
- **UT-ORD-03**: `OrdersService - Recipe Stock Reservation` (Trừ kho nguyên liệu nguyên tử khi tạo đơn thành công; ném ConflictException khi thiếu hàng).
- **UT-ORD-04**: `OrdersService - Restock on Cancellation` (Hoàn trả chính xác định lượng nguyên liệu vào kho khi hủy đơn).
- **UT-ORD-05**: `OrdersService - Pricing & Coupons` (Tính toán phụ thu Size/Topping; áp dụng chiết khấu Percentage/Fixed và chặn khi chưa đạt minOrderValue).
- **UT-PAY-01**: `PaymentsService - Idempotency Replay` (Trả về giao dịch cũ khi gửi trùng Idempotency-Key mà không trừ tiền 2 lần).
- **UT-PAY-02**: `PaymentsService - Idempotency Conflict` (Ném ConflictException khi dùng lại key cho đơn hàng khác).
- **UT-PAY-03**: `PaymentsService - Sandbox Success & Loyalty` (Thanh toán Sandbox chuyển đơn sang PAID và cộng điểm Loyalty).
- **UT-PROD-01**: `ProductsService - Derived Stock` (Công thức tính tồn kho khả dụng từ lượng nguyên liệu nhỏ nhất chia cho định lượng size).

### 3.2. Integration Tests (Postman - `tests/BrewLite.postman_collection.json`)
- **IT-01**: `GET /health` (System & PostgreSQL DB ping).
- **IT-02**: `POST /auth/login` (Login Customer `demo@brewlite.local`).
- **IT-03**: `POST /auth/login` (Login Barista `barista@brewlite.local`).
- **IT-04**: `PATCH /orders/rbac-guard-test/status` (RBAC Guard chặn Customer 403 Forbidden).
- **IT-05**: `GET /orders` (Chặn Anonymous request 401 Unauthorized).
- **IT-06**: `GET /products` (Lấy danh mục và lưu tồn kho ban đầu).
- **IT-07**: `GET /users/{{userId}}/loyalty` (Đọc điểm thưởng ban đầu).
- **IT-08**: `POST /coupons/validate` (Xác thực mã giảm giá `BREW10`).
- **IT-09**: `POST /orders` (Validation chặn quantity = 0).
- **IT-10**: `POST /orders` (Chặn đơn đặt vượt quá tồn kho nguyên liệu).
- **IT-11**: `POST /orders` (Chặn món không có công thức recipe).
- **IT-12**: `POST /orders` (Tạo đơn hàng 2 món pending hợp lệ).
- **IT-13**: `GET /products` (Kiểm tra kho nguyên liệu đã được reserve).
- **IT-14**: `POST /orders` (Tạo đơn hàng phụ để kiểm thử hủy đơn).
- **IT-15**: `PATCH /orders/{{cancelOrderId}}/cancel` (Hủy đơn hàng kèm lý do).
- **IT-16**: `GET /products` (Kiểm tra kho nguyên liệu đã được hoàn trả 100%).
- **IT-17**: `POST /payments` (Chặn thanh toán thiếu Idempotency-Key).
- **IT-18**: `POST /payments` (Thanh toán đơn hàng hợp lệ).
- **IT-19**: `POST /payments` (Gửi lại đúng Idempotency-Key cũ ➔ Idempotent response).
- **IT-20**: `POST /payments` (Chặn tái sử dụng key cho payload khác ➔ 409 Conflict).
- **IT-21**: `GET /users/{{userId}}/loyalty` (Kiểm tra cộng điểm thưởng sau thanh toán).
- **IT-22**: `PATCH /orders/{{paidOrderId}}/status` (Chặn nhảy cóc trạng thái PAID ➔ COMPLETED).
- **IT-23**: `PATCH /orders/{{paidOrderId}}/status` (Barista chuyển PAID ➔ PREPARING).
- **IT-24**: `PATCH /orders/{{paidOrderId}}/status` (Barista chuyển PREPARING ➔ READY).
- **IT-25**: `PATCH /orders/{{paidOrderId}}/status` (Barista chuyển READY ➔ COMPLETED).
- **IT-26**: `GET /orders/user/{{userId}}` (Kiểm tra lịch sử đơn hàng theo user ID).
- **IT-27**: `GET /orders/me` (Kiểm tra lịch sử đơn cá nhân qua Bearer JWT token).
