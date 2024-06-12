# PROJECT cá nhân "PhongTroPTIT" phát triển bằng SpringBoot + Angular

# Phần 2 FrontEnd - Angular


## Website tìm kiếm nhà trọ
| Tác giả        | MSV       | Email                         |
|----------------|------------|-------------------------------|
| Ngọ Văn Trọng  | B21DCCN726 | ngovantrong1308@gmail.com     |

### Giới Thiệu:

Tìm kiếm phòng trọ tại Hà Nội để ở luôn là một trong những vấn đề khó khăn đối với những người đi thuê, đặc biệt là đối với các bạn sinh viên từ quê vào thành phố để tiếp tục con đường học tập. Còn đối với người cho thuê, họ cũng khó có thể tiếp cận với những người đi thuê với các cách tiếp thị truyền thống.

Để giảm thiểu khó khăn này, mình đã quyết định phát triển một website tìm kiếm nhà trọ cho sinh viên trường mình (Học Viện Công Nghệ Bưu Chính Viễn Thông).

Website được phát triển bằng Spring Boot và Angular.

### Các chức năng hiện có:

- **Người dùng chưa đăng nhập:**
  - Tìm kiếm phòng trọ
  - Đăng ký
  - Đăng nhập

- **Thành viên:**
  - Các chức năng của người dùng chưa đăng nhập
  - Quản lý tin đăng
  - Quản lý bình luận và đánh giá
  - Quản lý thông báo
  - Đăng xuất

- **Kiểm duyệt viên:**
  - Các chức năng của thành viên
  - Quản lý tin đăng của thành viên
  - Xem hoạt động của hệ thống

- **Quản trị viên:**
  - Các chức năng của kiểm duyệt viên
  - Quản lý thành viên

## Hướng dẫn cài đặt và sử dụng

### Yêu cầu
- Java Development Kit (JDK) 8+
- Node.js và npm
- Angular CLI
-  Visual Studio Code (hoặc IDE khác hỗ trợ Angular)
- MySQL Workbench
- IntelliJ IDEA (hoặc IDE khác hỗ trợ Spring Boot)
- 
### Khởi tạo dự án Angular

1. Truy cập [Angular CLI](https://cli.angular.io/) để cài đặt Angular Command Line Interface (CLI), một công cụ giúp tạo và quản lý dự án Angular.
2. Mở terminal và chạy lệnh sau để cài đặt Angular CLI:

    ```bash
    npm install -g @angular/cli
    ```
3. Tạo một dự án mới Angular bằng lệnh sau:

    ```bash
    ng new PhongTroPTIT
    ```
4. Khi được hỏi, chọn các cài đặt mặc định hoặc tuỳ chỉnh dự án của bạn.
5. Di chuyển vào thư mục của dự án mới:

    ```bash
    cd PhongTroPTIT
    ```
6. Chạy lệnh sau để khởi động máy chủ phát triển và xem trực tiếp ứng dụng:

    ```bash
    ng serve --open
    ```
7. Mở trình duyệt và truy cập vào `http://localhost:4200/` để xem dự án Angular của bạn.
### Cài đặt

1. **Clone repository**

    ```bash
    git clone https://github.com/TrongNgoVan/FrontEnd-AngularJS-PhongTroPTIT.git
    cd PhongTroPTIT
    ```

2. **Cài đặt BackEnd**

    ```bash
    cd backend
    ./mvnw install
    ./mvnw spring-boot:run
    ```

3. **Cài đặt FrontEnd**

    ```bash
    cd ../frontend
    npm install
    ng serve
    ```

4. **Khởi động ứng dụng**

      -  Bật trình duyệt, gõ `http://localhost:8080` để vào trang dành cho người dùng hoặc `http://localhost:8080/admin` để vào trang quản lý.

    



