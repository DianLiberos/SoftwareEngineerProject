# Tài Liệu Hướng Dẫn Triển Khai & Vận Hành Hệ Thống

Tài liệu này đặc tả quy trình từ thiết lập môi trường, đóng gói container, vận hành hệ thống đa tầng đến quy trình tự động hóa CI/CD và chính sách hoàn nguyên theo chuẩn **Task 5.3 & Task 5.4 - Assignment 2**.

---

## 1. Tổng Quan Kiến Trúc Triển Khai

Hệ thống **BrewLite** được thiết kế theo mô hình Monorepo phân tách rạch ròi giữa tầng trình diễn, tầng xử lý nghiệp vụ và tầng lưu trữ dữ liệu bền vững (tham chiếu sơ đồ chi tiết tại [`docs/architecture/deployment.svg`](docs/architecture/deployment.svg)):

```
                          [ Client Browser / Mobile PWA ]
                                        │
                         HTTP:3000      │      HTTPS:3001 (REST API)
                  ┌─────────────────────┴────────────────────┐
                  ▼                                          ▼
       ┌─────────────────────┐                    ┌─────────────────────┐
       │   apps/web (Next.js)│                    │  apps/api (NestJS)  │
       │   Port 3000         │──API Fetch/SSR────▶│  Port 3001          │
       └─────────────────────┘                    └──────────┬──────────┘
                                                             │ TCP:5432
                                                             │ Prisma Pool
                                                             ▼
                                                  ┌─────────────────────┐
                                                  │ PostgreSQL Database │
                                                  │ Port 5432 (Docker)  │
                                                  └─────────────────────┘
```

- **Tầng Trình Diễn (`apps/web`):** Ứng dụng Next.js 16 (App Router, Tailwind CSS v4, Zustand) xây dựng theo định hướng Mobile-First.
- **Tầng Nghiệp Vụ (`apps/api`):** Ứng dụng NestJS REST API, xử lý nghiệp vụ đơn hàng, kiểm soát máy trạng thái (State Machine), thanh toán lũy đẳng (Idempotency) và phân quyền RBAC (JWT).
- **Tầng Dữ Liệu (`PostgreSQL`):** Cơ sở dữ liệu quan hệ PostgreSQL 16 Alpine, quản lý schema, quan hệ toàn vẹn và migrations thông qua Prisma ORM 6.x.

---

## 2. Yêu Cầu Tiền Đề

Để triển khai và vận hành hệ thống, máy chủ hoặc môi trường phát triển cần đáp ứng:
- **Hệ điều hành:** Linux (Ubuntu 22.04+ / Debian 12) hoặc macOS / WSL2 trên Windows.
- **Node.js:** Phiên bản `>= 20.10.0 LTS`.
- **Package Manager:** `npm >= 10.x`.
- **Docker & Docker Compose:** Docker Engine `>= 24.x` và Docker Compose v2 (`docker compose`).

---

## 3. Cấu Hình Biến Môi Trường

Dự án cung cấp các file mẫu cấu hình biến môi trường chuẩn:
- Root `.env.example`: Cấu hình chung cho Docker Compose.
- `apps/api/.env.example`: Cấu hình riêng cho Backend API.
- `apps/web/.env.example`: Cấu hình riêng cho Frontend Client.

### 3.1. Thiết lập biến môi trường root (`.env`):
```env
# Database Settings
POSTGRES_USER=brewlite
POSTGRES_PASSWORD=brewlite
POSTGRES_DB=brewlite
DATABASE_PORT=5432
DATABASE_URL=postgresql://brewlite:brewlite@localhost:5432/brewlite?schema=public

# Backend API Settings
API_PORT=3001
JWT_SECRET=brewlite-production-secure-jwt-secret-key-2026

# Frontend Settings
WEB_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 4. Hướng Dẫn Khởi Chạy Môi Trường Phát Triển

### Bước 1: Khởi động Cơ sở dữ liệu PostgreSQL
Khởi chạy container PostgreSQL thông qua file `docker-compose.yml` ở thư mục gốc:
```bash
# Khởi chạy Postgres background
docker compose up -d postgres

# Kiểm tra container đang chạy ổn định
docker compose ps
```

### Bước 2: Thiết lập và Khởi chạy Backend API
```bash
cd apps/api

# 1. Cài đặt dependencies
npm install

# 2. Tạo file môi trường từ file mẫu
cp .env.example .env

# 3. Tạo Prisma Client từ schema
npm run prisma:generate

# 4. Thực thi migrations vào database
npm run prisma:migrate -- --name init

# 5. Nạp dữ liệu demo 
npm run prisma:seed

# 6. Khởi chạy Backend ở chế độ dev
npm run start:dev
```
*API sẽ lắng nghe tại:* `http://localhost:3001`  
*Kiểm tra sức khỏe hệ thống:* `curl http://localhost:3001/health`

### Bước 3: Thiết lập và Khởi chạy Frontend Web
Mở một terminal mới:
```bash
cd apps/web

# 1. Cài đặt dependencies
npm install

# 2. Tạo file môi trường
cp .env.example .env

# 3. Khởi chạy Next.js dev server
npm run dev
```
*Giao diện Web truy cập tại:* `http://localhost:3000`

---

## 5. Quy Trình Kiểm Thử Tự Động 

Trước khi đóng gói hoặc triển khai lên bất kỳ môi trường nào, hệ thống phải vượt qua toàn bộ các bài kiểm thử:

### 5.1. Chạy Unit Tests Backend
Kiểm thử chuyên sâu máy trạng thái, logic trừ kho nguyên tử theo công thức, thanh toán chống trùng lặp:
```bash
cd apps/api
npm test -- --coverage
```
*Yêu cầu nghiệm thu:* 100% test suites passed (20/20 unit tests `PASS`).

### 5.2. Chạy Typecheck & Build Verification
```bash
# Kiểm tra kiểu TypeScript Backend & Build
cd apps/api
npx tsc --noEmit
npm run build

# Kiểm tra kiểu TypeScript Frontend & Build
cd apps/web
npx tsc --noEmit
npm run build
```

### 5.3. Chạy Toàn Bộ Bộ Test Tích Hợp
Sử dụng Newman hoặc Postman Collection Runner chạy file:
- Collection: `tests/BrewLite.postman_collection.json`
- Environment: `tests/BrewLite Local.postman_environment.json`
```bash
npx newman run "tests/BrewLite.postman_collection.json" -e "tests/BrewLite Local.postman_environment.json"
```
*Yêu cầu nghiệm thu:* 27/27 test cases passed.

---

## 6. Đường Ống CI/CD

Quy trình CI/CD được tự động hóa hoàn toàn bằng **GitHub Actions** thông qua tệp cấu hình [`.github/workflows/ci.yml`](../.github/workflows/ci.yml):

```
 [ Git Push / PR ]
         │
         ▼
 ┌────────────────────────────────────────┐
 │   Stage 1: Code Quality Gate           │
 │   - Checkout repository                │
 │   - Setup Node.js 20.x & npm cache     │
 │   - Install dependencies (npm ci)      │
 └───────────────────┬────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
 ┌──────────────────────┐ ┌──────────────────────┐
 │ Backend CI Job       │ │ Frontend CI Job      │
 │ - Prisma Generate    │ │ - Next.js Typegen    │
 │ - Run Jest Tests     │ │ - TypeScript Check   │
 │ - TypeScript Check   │ │ - Production Build   │
 │ - NestJS Build       │ └──────────────────────┘
 └──────────────────────┘
```

### Nguyên tắc vận hành của Pipeline:
1. **Kiểm tra tự động:** Mỗi Pull Request mở vào nhánh `main` hoặc `develop` đều kích hoạt kiểm thử song song cả Frontend và Backend.
2. **Ngăn chặn phá vỡ mã nguồn:** Nhánh chính (`main`) được bảo vệ bằng quy tắc branch protection; chỉ cho phép merge khi tất cả các job CI đều thành công (`green check`).
3. **Quản lý Secrets an toàn:** Các giá trị nhạy cảm (`DATABASE_URL`, `JWT_SECRET`) được inject thông qua GitHub Actions Secrets, tuyệt đối không xuất hiện trong logs công khai.

---

## 7. Quy Trình Xử Lý Sự Cố & Hoàn Nguyên

Khi một bản phát hành mới gặp sự cố nghiêm trọng trên môi trường production, quy trình rollback được kích hoạt theo các bước chuẩn mực sau:

### 7.1. Hoàn nguyên Tầng Ứng Dụng
1. **Xác định commit ổn định gần nhất:**
   ```bash
   git log --oneline -n 5
   ```
2. **Chuyển đổi container về Image Tag trước đó:**
   Nếu chạy bằng Docker Image có tag theo commit SHA (`brewlite-api:v1.0.0` hoặc `brewlite-api:<commit-sha>`):
   ```bash
   # Cập nhật tag trong file docker-compose.prod.yml về phiên bản ổn định
   sed -i 's/:v1.0.1/:v1.0.0/g' docker-compose.prod.yml
   
   # Tải và khởi động lại container ngay lập tức với downtime tối thiểu (< 5 giây)
   docker compose -f docker-compose.prod.yml up -d --no-deps api web
   ```
3. **Nếu triển khai qua Git:**
   ```bash
   git revert HEAD --no-edit
   git push origin main
   ```

### 7.2. Hoàn nguyên Tầng Cơ Sở Dữ Liệu
Nếu sự cố phát sinh từ migration sai lệch cấu trúc bảng:
1. **Đánh dấu migration bị lỗi trong Prisma:**
   ```bash
   cd apps/api
   npx prisma migrate resolve --rolled-back "<ten_migration_loi>"
   ```
2. **Khôi phục dữ liệu từ bản sao lưu gần nhất:**
   ```bash
   # Khôi phục từ file dump backup tự động
   docker compose exec -T postgres psql -U brewlite -d brewlite < backups/backup_latest.sql
   ```

### 7.3. Smoke Test Xác Nhận Sau Hoàn Nguyên
Sau khi hoàn nguyên, lập tức chạy script kiểm tra nhanh tính khả dụng:
1. Kiểm tra endpoint Health: `curl -f http://localhost:3001/health` ➔ Phải trả về `{"status":"ok","database":"connected"}`.
2. Kiểm tra truy cập trang chủ Web: `curl -I http://localhost:3000` ➔ Trả về `HTTP/1.1 200 OK`.
3. Kiểm tra khả năng tạo đơn hàng thông qua Postman Runner folder `Setup & Health`.

---

## 8. Nguyên Tắc An Toàn Sản Phẩm

1. **Cô lập Cơ sở dữ liệu:** Cổng PostgreSQL (`5432`) chỉ được phép truy cập nội bộ trong Docker Network (`brewlite-network`), không mở cổng công khai ra Internet (`0.0.0.0:5432`).
2. **Bảo mật Khóa Bí mật:** `JWT_SECRET` trên production phải là chuỗi ngẫu nhiên có độ dài tối thiểu 64 ký tự hex.
3. **Giám sát Sức khỏe:** Tận dụng endpoint `/health` tích hợp cùng cơ chế Docker Healthcheck hoặc công cụ giám sát uptime để tự động phát hiện và khởi động lại container khi gặp sự cố.

---

## 9. Hướng Dẫn Triển Khai Đóng Gói (Docker Compose & Cloud AWS)

Quy trình triển khai thực tế của BrewLite hỗ trợ 2 kịch bản chính: (1) Chạy trọn gói cục bộ / demo nhanh qua Docker Compose, và (2) Triển khai Cloud phân tán kết hợp AWS Amplify (Frontend) + AWS EC2 (Backend & Database).

```
 ┌───────────────────────────────────────────────────────────────┐
 │                      AWS CLOUD ARCHITECTURE                   │
 │                                                               │
 │  ┌─────────────────────────┐       HTTPS REST API             │
 │  │       AWS Amplify       │────────────────────────┐         │
 │  │   Next.js 16 (apps/web) │                        ▼         │
 │  │   https://*.amplify.app │               ┌────────────────┐ │
 │  └─────────────────────────┘               │ Reverse Proxy  │ │
 │                                            │ (Caddy / Nginx)│ │
 │  ┌─────────────────────────────────────────┴────────────────┐ │
 │  │ AWS EC2 (Docker Compose)                │ SSL (HTTPS)    │ │
 │  │   ┌────────────────────┐                ▼                │ │
 │  │   │  NestJS (apps/api) │◀─────── localhost:3001          │ │
 │  │   │  Container: api    │                                 │ │
 │  │   └─────────┬──────────┘                                 │ │
 │  │             │ TCP:5432 (Prisma Bridge)                   │ │
 │  │             ▼                                            │ │
 │  │   ┌────────────────────┐                                 │ │
 │  │   │ PostgreSQL 16 DB   │ (Volume: brewlite-postgres-data)│ │
 │  │   │ Container: db      │                                 │ │
 │  │   └────────────────────┘                                 │ │
 │  └──────────────────────────────────────────────────────────┘ │
 └───────────────────────────────────────────────────────────────┘
```

### 9.1. Kịch bản 1: Đóng Gói & Chạy Toàn Bộ Bằng Docker Compose (1 Lệnh Duy Nhất)

Toàn bộ 3 thành phần (`db`, `api`, `web`) đã được đóng gói thành container chuẩn hóa thông qua `apps/api/Dockerfile`, `apps/web/Dockerfile` và `docker-compose.yml`:

```bash
# 1. Clone repository và di chuyển vào thư mục gốc
git clone https://github.com/DianLiberos/BrewLite.git
cd BrewLite

# 2. Khởi tạo file biến môi trường từ mẫu
cp .env.example .env

# 3. Khởi chạy toàn bộ hệ sinh thái dịch vụ (Background Mode)
docker compose up -d --build
```

**Cơ chế vận hành tự động bên trong:**
1. Service `db` (PostgreSQL 16) khởi động và thực hiện kiểm tra `healthcheck` (`pg_isready`).
2. Service `api` (NestJS) chờ đến khi `db` ở trạng thái `healthy`, sau đó tự động kích hoạt `npx prisma db push --accept-data-loss` để đồng bộ bảng và `npx prisma db seed` để nạp sẵn dữ liệu đồ uống, topping, tài khoản demo (`demo@brewlite.local` / `123456`) trước khi mở cổng `3001`.
3. Service `web` (Next.js 16) build bundle với `NEXT_PUBLIC_API_URL=http://localhost:3001` và mở cổng `3000`.

**Kiểm tra và truy cập:**
* **Frontend Web:** `http://localhost:3000`
* **Backend API & Swagger/Docs:** `http://localhost:3001`
* **API Health Status:** `curl -s http://localhost:3001/health` ➔ `{"status":"ok","database":"connected"}`
* **Xem nhật ký container:** `docker compose logs -f api`
* **Dừng hệ thống:** `docker compose down` (dữ liệu vẫn được bảo toàn trong volume `brewlite-postgres-data`).

---

### 9.2. Kịch bản 2: Triển Khai Frontend Lên AWS Amplify (Monorepo)

Dự án đã cấu hình sẵn tệp chuẩn [amplify.yml](../amplify.yml) tại thư mục gốc nhằm hướng dẫn AWS Amplify nhận diện chính xác cấu trúc Monorepo:

1. **Kết nối Repository:**
   * Truy cập **AWS Management Console** ➔ Tìm dịch vụ **AWS Amplify Hosting**.
   * Nhấn **Deploy an app** ➔ Chọn nguồn **GitHub** và ủy quyền truy cập repo `BrewLite`.
   * Chọn nhánh triển khai: `main`.
2. **Nhận diện Cấu hình Monorepo:**
   * AWS Amplify sẽ tự động đọc tệp `amplify.yml`:
     * `appRoot: apps/web`
     * `preBuild: npm ci`
     * `build: npm run build`
     * `baseDirectory: .next`
3. **Khai báo Biến Môi Trường (Bắt Buộc):**
   * Trong màn hình cấu hình bản build (Advanced Settings) hoặc mục **App settings > Environment variables**, thêm biến:
     * **Key:** `NEXT_PUBLIC_API_URL`
     * **Value:** `https://13.214.145.49.nip.io`
     > *Lưu ý quan trọng:* Next.js nhúng giá trị `NEXT_PUBLIC_*` vào bundle client-side trong pha `build`, vì vậy biến môi trường này bắt buộc phải được khai báo trước khi nhấn Deploy.
4. **Triển khai & Kiểm tra:**
   * Nhấn **Save and Deploy**. Quá trình build và provision mất khoảng 2-3 phút.
   * Hệ thống đã triển khai thành công tại: [https://main.d3240rpj1htg0m.amplifyapp.com/](https://main.d3240rpj1htg0m.amplifyapp.com/) và API Health: [https://13.214.145.49.nip.io/health](https://13.214.145.49.nip.io/health).

---

### 9.3. Kịch bản 3: Triển Khai Backend & Database Lên AWS EC2 Bằng Docker Compose

Chiến lược tiết kiệm chi phí: Chỉ cần tạo máy ảo EC2 trước ngày báo cáo 1 ngày (chạy trong khung Free Tier), sau khi báo cáo xong có thể Terminate instance.

#### Bước 1: Khởi tạo Máy Ảo EC2
* **AMI:** Ubuntu Server 24.04 LTS (64-bit x86).
* **Instance Type:** `t3.small` (hoặc `t2.micro` Free Tier).
* **Security Group Inbound Rules:**
  * Port `22` (SSH): `0.0.0.0/0` (hoặc My IP).
  * Port `80` (HTTP): `0.0.0.0/0`.
  * Port `443` (HTTPS): `0.0.0.0/0`.
  * Port `3001` (Custom TCP - API): `0.0.0.0/0`.

#### Bước 2: Cài đặt Môi Trường Docker trên EC2
SSH vào máy chủ EC2:
```bash
ssh -i "your-key.pem" ubuntu@<EC2-PUBLIC-IP>

# Cập nhật và cài đặt Docker + Docker Compose plugin
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git
sudo usermod -aG docker ubuntu
newgrp docker
```

#### Bước 3: Tải Mã Nguồn và Khởi Chạy Dịch Vụ
```bash
# Clone repository
git clone https://github.com/DianLiberos/BrewLite.git
cd BrewLite

# Tạo file môi trường production
cp .env.example .env
nano .env # Cập nhật JWT_SECRET mạnh cho môi trường thực tế

# Khởi chạy riêng Backend và Database trên EC2 (Frontend chạy trên Amplify)
docker compose up -d --build db api

# Kiểm tra container đã UP
docker compose ps
curl http://localhost:3001/health
```

#### Bước 4: Khắc Phục Lỗi Mixed Content Khi Kết Nối Với Amplify (BẮT BUỘC)

> [!WARNING] CẢNH BÁO LỖI BẢO MẬT MIXED CONTENT
> AWS Amplify mặc định bắt buộc sử dụng giao thức **HTTPS** (`https://*.amplifyapp.com`). Nếu trình duyệt trên Amplify gửi request API tới Backend EC2 qua giao thức HTTP thường (`http://<EC2-IP>:3001`), trình duyệt (Chrome, Safari, Firefox) sẽ **chặn toàn bộ cuộc gọi API** với lỗi:
> `Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://...'. This request has been blocked; the content must be served over HTTPS.`

**Cách xử lý nhanh nhất cho buổi demo (chọn 1 trong 2 cách):**

* **Cách 1: Sử dụng Cloudflare Tunnel (Miễn phí, có HTTPS ngay trong 1 phút, không cần mua domain)**
  ```bash
  # Cài đặt cloudflared trên EC2
  curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
  sudo dpkg -i cloudflared.deb

  # Mở tunnel công khai có HTTPS tự động trỏ vào port 3001
  cloudflared tunnel --url http://localhost:3001
  ```
  Terminal sẽ trả về một đường dẫn HTTPS dạng: `https://xyz-random-name.trycloudflare.com`.  
  👉 Copy đường dẫn này dán vào biến `NEXT_PUBLIC_API_URL` trên AWS Amplify và Re-deploy Frontend!

* **Cách 2: Sử dụng Caddy Web Server (Tự cấp phát chứng chỉ SSL Let's Encrypt)**
  Nếu bạn có gắn domain (hoặc DuckDNS miễn phí `brewlite.duckdns.org` trỏ về IP EC2):
  ```bash
  sudo apt install -y caddy
  sudo nano /etc/caddy/Caddyfile
  ```
  Nội dung `/etc/caddy/Caddyfile`:
  ```caddy
  brewlite.duckdns.org {
      reverse_proxy localhost:3001
  }
  ```
  Khởi động lại: `sudo systemctl restart caddy`. Caddy sẽ tự động lấy chứng chỉ SSL HTTPS hợp lệ. Lúc này URL API là `https://brewlite.duckdns.org`.
