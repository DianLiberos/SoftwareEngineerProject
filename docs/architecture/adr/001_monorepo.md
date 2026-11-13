# ADR 001: Lựa Chọn Cấu Trúc Monorepo Cho Toàn Bộ Hệ Thống

## Trạng thái
**Đã chấp thuận** — Ngày: 2026-10-26

## Bối cảnh
Dự án BrewLite bao gồm hai thành phần phần mềm riêng biệt:
- **Frontend (`apps/web`):** Ứng dụng Next.js 16 (App Router, Tailwind CSS v4, Zustand) phục vụ giao diện đặt món cho khách hàng.
- **Backend (`apps/api`):** Ứng dụng NestJS REST API kết nối cơ sở dữ liệu PostgreSQL thông qua Prisma ORM.

Đội ngũ phát triển gồm 2 thành viên vận hành theo quy trình Agile Scrum với chu kỳ sprint ngắn. Cần đưa ra quyết định về cấu trúc kho mã nguồn giữa hai phương án: **Multi-repo** (2 kho riêng biệt) và **Monorepo** (1 kho duy nhất quản lý cả 2 ứng dụng).

## Quyết định
Quyết định áp dụng cấu trúc **Monorepo chuẩn**, phân chia mã nguồn theo thư mục:
- `apps/web`: Toàn bộ mã nguồn giao diện client.
- `apps/api`: Toàn bộ mã nguồn API backend và cấu hình database Prisma.
- `docs/`: Chứa toàn bộ tài liệu đặc tả, kiến trúc, và sơ đồ mô hình hóa.

## Lý do lựa chọn & So sánh phương án

| Tiêu chí so sánh | Phương án Multi-repo | Phương án Monorepo (Được chọn) |
| :--- | :--- | :--- |
| **Đồng bộ mã nguồn & PR** | Phức tạp: Phải mở 2 PR riêng rẽ khi thay đổi một tính năng end-to-end (ví dụ: đổi DTO tạo đơn). Dễ lệch pha phiên bản. | Đơn giản: 1 Pull Request duy nhất phản ánh trọn vẹn cả thay đổi Frontend, Backend và tài liệu liên quan. |
| **Chia sẻ quy chuẩn dữ liệu** | Phải đóng gói npm package riêng hoặc copy thủ công các file interface DTO. | Dễ dàng đồng bộ kiểu dữ liệu (TypeScript Types/Contracts) giữa Web và API. |
| **Chi phí quản lý Git** | Quản lý 2 CI/CD pipeline, 2 bộ issue và release tags rời rạc. | Quản lý tập trung trên một Kanban Board và một lịch sử Git duy nhất theo barem môn học. |

## Hệ quả

### Tích cực:
1. Đảm bảo tính nguyên tử : Một commit có thể cập nhật đồng thời backend logic, frontend UI và tài liệu kiến trúc.
2. Tiết kiệm thời gian thiết lập môi trường: Thành viên mới chỉ cần `git clone` một lần và chạy một file `docker-compose.yml` ở thư mục gốc.
3. Đáp ứng yêu cầu tổ chức repository của môn học.

### Tiêu cực & Biện pháp giảm thiểu:
- *Nguy cơ:* Git phình to do dính file build cache (`.next/`, `dist/`)
  - *Giải pháp:* Cấu hình `.gitignore` nghiêm ngặt chặn các đường dẫn `apps/web/.next/`, `apps/api/dist/`.
- *Nguy cơ:* Xung đột cổng khi chạy song song.
  - *Giải pháp:* Phân định rạch ròi cổng mặc định: `3000` (Next.js) và `3001` (NestJS)
