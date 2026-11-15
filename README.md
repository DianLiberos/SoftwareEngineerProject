# BrewLite – Ứng Dụng Đặt Cà Phê Trực Tuyến Không Tiền Mặt
> **Đồ án môn học:** Công nghệ Phần mềm  
> **Trường Đại học Sài Gòn (SGU) – Khoa Công nghệ Thông tin**  
> **Học kỳ:** I – Năm học 2026–2027  
> **Công nghệ cốt lõi:** Next.js 16, NestJS 10, PostgreSQL 16, Prisma ORM, Docker & GitHub Actions  
> 
> 🌐 **Hệ Thống Trực Tuyến (Live Production Demo):**
> - **Frontend Web (AWS Amplify):** [https://main.d3240rpj1htg0m.amplifyapp.com/](https://main.d3240rpj1htg0m.amplifyapp.com/)
> - **Backend API Health Check (AWS EC2 + HTTPS):** [https://13.214.145.49.nip.io/health](https://13.214.145.49.nip.io/health)
> - **Backend API Base URL:** `https://13.214.145.49.nip.io`  

---

## 1. Giới Thiệu Dự Án

**BrewLite** là giải pháp ứng dụng web đặt thức uống trực tiếp dành cho các chuỗi quán cà phê hiện đại. Dự án tập trung giải quyết bài toán ách tắc tại quầy vào giờ cao điểm bằng cách cho phép khách hàng chủ động chọn món, tùy biến kích cỡ, topping, áp dụng mã giảm giá và thanh toán không tiền mặt ngay trên thiết bị di động.

### Các Tính Năng Nổi Bật:
- **Trải nghiệm Mobile-First:** Giao diện tối ưu mượt mà cho trình duyệt di động, tốc độ tải nhanh, phản hồi trực quan.
- **Tùy biến món nước linh hoạt:** Hỗ trợ kích cỡ (M, L) và nhiều loại topping kèm tính toán phụ thu theo thời gian thực.
- **Kiểm soát đơn hàng tập trung:** Database và Backend làm chủ tuyệt đối về giá và tồn kho nguyên liệu; Client tuyệt đối không được tự gửi giá hay tự tính tổng tiền lên server.
- **Thanh toán lũy đẳng:** Áp dụng bắt buộc header `Idempotency-Key` tại API thanh toán, ngăn chặn triệt để tình trạng trừ tiền trùng lặp khi người dùng bấm đúp hoặc mạng chập chờn.
- **Máy trạng thái đơn hàng:** Kiểm soát vòng đời đơn nghiêm ngặt: `PENDING` ➔ `PAID` ➔ `PREPARING` ➔ `READY` ➔ `COMPLETED`. Chặn mọi hành vi nhảy cóc trạng thái.
- **Hủy đơn & Hoàn trả kho tự động:** Hỗ trợ hủy đơn hợp lệ kèm cơ chế tự động hoàn nguyên 100% nguyên liệu công thức vào kho.
- **Màn hình chuyên biệt:** 
  - Màn hình dành cho Khách hàng (`/`, `/checkout`, `/profile`).
  - Màn hình dành riêng cho Nhân viên Pha chế (`/barista`) tiếp nhận và chuyển trạng thái pha chế theo thời gian thực.
- **Chương trình thành viên:** Tự động tích lũy điểm thưởng sau mỗi đơn hàng thanh toán thành công.

---

## 2. Cấu Trúc Kho Mã Nguồn

Đồ án tuân thủ cấu trúc repository theo quy định của môn học:

```
brewlite/
|-- apps/
|   |-- web/                     
|   `-- api/                     
|-- docs/
|   |-- requirements/            
|   |   |-- context_and_scope.md
|   |   `-- srs.md
|   |-- diagrams/                
|   |   |-- activity-order.puml
|   |   |-- sequence-checkout.puml
|   |   `-- class-domain.puml
|   |-- architecture/            
|   |   |-- adr/
|   |   |   |-- 001_monorepo.md
|   |   |   `-- 002-authoritative-db-and-idempotency.md
|   |   |-- deployment.puml
|   |   `-- deployment.svg
|   |-- traceability-matrix.md   
|   `-- deployment.md            
|-- tests/                       
|   |-- BrewLite.postman_collection.json
|   |-- BrewLite Local.postman_environment.json
|   `-- README.md
|-- .github/workflows/
|   `-- ci.yml                   
|-- docker-compose.yml           
|-- .env.example                 
`-- README.md                 
```

---

## 3. Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu Cầu Môi Trường:
- **Node.js:** `>= 20.10.0`
- **Docker & Docker Compose:** Đã cài đặt và đang chạy.

### Bước 1: Khởi động Cơ sở dữ liệu PostgreSQL
Tại thư mục gốc dự án:
```bash
# Khởi chạy PostgreSQL trên Docker
docker compose up -d postgres
```

### Bước 2: Thiết lập và Khởi chạy Backend API
```bash
cd apps/api

# Cài đặt thư viện
npm install

# Tạo cấu hình môi trường
cp .env.example .env

# Chạy migrations và nạp dữ liệu mẫu
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed

# Khởi chạy API server
npm run start:dev
```
*API hoạt động tại:* `http://localhost:3001`  
*Kiểm tra sức khỏe hệ thống:* `curl http://localhost:3001/health`

### Bước 3: Thiết lập và Khởi chạy Frontend Web
Mở một cửa sổ Terminal mới:
```bash
cd apps/web

# Cài đặt thư viện
npm install

# Tạo cấu hình môi trường
cp .env.example .env

# Khởi chạy giao diện Next.js
npm run dev
```
*Giao diện Web truy cập tại:* `http://localhost:3000`

---

## 4. Tài Khoản Thử Nghiệm Mẫu

Hệ thống đã chuẩn bị sẵn tài khoản demo để thuận tiện cho việc kiểm thử và chấm bài:

| Vai Trò | Email Đăng Nhập | Mật Khẩu | Quyền Hạn & Mục Đích |
| :--- | :--- | :---: | :--- |
| **Khách Hàng** | `demo@brewlite.local` | `123456` | Đặt món, thanh toán sandbox, xem lịch sử đơn, tích lũy điểm thưởng. |
| **Pha Chế** | `barista@brewlite.local` | `123456` | Truy cập trang `/barista`, tiếp nhận đơn và chuyển đổi trạng thái pha chế. |

*Mã giảm giá mẫu:* `BREW10` (Giảm 10% giá trị đơn hàng hợp lệ).

---

## 5. Kiểm Thử Tự Động

### 5.1. Unit Tests
Kiểm thử sâu tầng nghiệp vụ của Backend:
```bash
cd apps/api
npm test -- --coverage
```
*Kết quả:* **20/20 unit tests Passed**.

### 5.2. Integration Tests
Bộ kiểm thử tích hợp tự động gồm **27 kịch bản end-to-end** chia thành 4 nhóm tuần tự:
1. `1. Setup, Health & Authentication` (8 tests)
2. `2. Order Validation & Recipe-Based Inventory` (8 tests)
3. `3. Payments & Idempotency Rules` (5 tests)
4. `4. Order State Machine & Fulfillment` (6 tests)

Chạy tự động bằng Newman:
```bash
npx newman run "tests/BrewLite.postman_collection.json" -e "tests/BrewLite Local.postman_environment.json"
```
*(Hoặc import trực tiếp file `tests/BrewLite.postman_collection.json` vào ứng dụng Postman và bấm **Run Collection**).*

### 5.3. Pipeline CI/CD
Pipeline tại [`.github/workflows/ci.yml`](.github/workflows/ci.yml) tự động kích hoạt kiểm thử:
- Chạy toàn bộ Unit test Jest kèm báo cáo độ bao phủ.
- Kiểm tra kiểu dữ liệu TypeScript (`npx tsc --noEmit`) cả Frontend và Backend.
- Kiểm tra đóng gói bản dựng (Build verification).

---

## 6. Danh Mục Tài Liệu Báo Cáo

- [Bối Cảnh & Phạm Vi Dự Án (Context & Scope)](docs/requirements/context_and_scope.md)
- [Đặc Tả Yêu Cầu Phần Mềm (SRS)](docs/requirements/srs.md)
- [Sơ Đồ UML Hệ Thống (PlantUML & SVG)](docs/diagrams/)
- [Quyết Định Kiến Trúc (ADRs) & Sơ Đồ Triển Khai](docs/architecture/)
- [Ma Trận Truy Vết Yêu Cầu (Traceability Matrix)](docs/traceability-matrix.md)
- [Hướng Dẫn Triển Khai, CI/CD & Rollback](docs/deployment.md)
- [Hướng Dẫn Chạy Bộ Test Postman](tests/README.md)
