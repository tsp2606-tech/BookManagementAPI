# Tài Liệu Giao Tiếp API (BookManagementAPI)

File tài liệu này cung cấp toàn bộ thông tin về các URL, Payload, và Response của dự án `BookManagementAPI` giúp cho phía Frontend có thể dễ dàng gọi và tích hợp API.

---

## 1. 🧍‍♂️ Quản Lý Tác Giả (Authors API)
**Base URL:** `/api/authors`

### 1.1 Lấy danh sách toàn bộ tác giả
- **Method:** `GET`
- **URL:** `/api/authors`
- **Payload:** Không có
- **Response (200 OK):**
```json
[
  {
    "_id": "66b4866d62ea212705c9f1e",
    "name": "J.K. Rowling",
    "bio": "Tác giả của bộ truyện Harry Potter nổi tiếng",
    "nationality": "Anh",
    "birthYear": 1965,
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z"
  }
]
```

### 1.2 Lấy chi tiết một tác giả
- **Method:** `GET`
- **URL:** `/api/authors/:id`
- **Payload:** Không có
- **Response (200 OK):** (Trả về 1 Object thông tin chi tiết tương tự như trên)

### 1.3 Thêm tác giả mới
- **Method:** `POST`
- **URL:** `/api/authors`
- **Payload:**
```json
{
  "name": "J.K. Rowling", 
  "bio": "Tác giả của bộ truyện Harry Potter nổi tiếng",
  "nationality": "Anh",
  "birthYear": 1965
}
```
*(Trường `name` là bắt buộc phải có)*
- **Response (201 Created):**
```json
{
  "_id": "66b4866d62ea212705c9f1e",
  "name": "J.K. Rowling",
  "bio": "Tác giả của bộ truyện Harry Potter nổi tiếng",
  "nationality": "Anh",
  "birthYear": 1965,
  "createdAt": "2026-08-01T10:00:00.000Z",
  "updatedAt": "2026-08-01T10:00:00.000Z"
}
```

### 1.4 Cập nhật tác giả
- **Method:** `PUT`
- **URL:** `/api/authors/:id`
- **Payload:** (Gửi lên các trường muốn thay đổi)
```json
{
  "name": "J.K. Rowling (Bản cập nhật)",
  "bio": "Tiểu thuyết gia vĩ đại người Anh",
  "nationality": "Anh",
  "birthYear": 1965
}
```
- **Response (200 OK):** Trả về Object thông tin tác giả đã được thay đổi.

### 1.5 Xóa tác giả
- **Method:** `DELETE`
- **URL:** `/api/authors/:id`
- **Payload:** Không có
- **Response (200 OK):**
```json
{
  "message": "Đã xóa tác giả thành công"
}
```

---

## 2. 📚 Quản Lý Sách (Books API)
**Base URL:** `/api/books`

### 2.1 Lấy danh sách Sách (Hỗ trợ Lọc & Tìm kiếm)
- **Method:** `GET`
- **URL:** `/api/books`
- **Query Parameters (Tuỳ chọn):**
  - `genre`: Lọc chính xác theo thể loại (VD: `/api/books?genre=Fantasy`)
  - `search`: Tìm kiếm tương đối theo tên sách (VD: `/api/books?search=Harry`)
- **Payload:** Không có
- **Response (200 OK):**
```json
[
  {
    "_id": "66b495ed62ea212705c9f22",
    "title": "Harry Potter và Chiếc Cốc Lửa",
    "description": "Tập 4 của series Harry Potter",
    "price": 120000,
    "publishedYear": 2000,
    "genre": "Fantasy",
    "author": {
      "_id": "66b4866d62ea212705c9f1e",
      "name": "J.K. Rowling",
      "bio": "Tác giả của bộ truyện Harry Potter nổi tiếng",
      "nationality": "Anh",
      "birthYear": 1965,
      "createdAt": "2026-08-01T10:00:00.000Z",
      "updatedAt": "2026-08-01T10:00:00.000Z"
    },
    "createdAt": "2026-08-01T10:15:00.000Z",
    "updatedAt": "2026-08-01T10:15:00.000Z"
  }
]
```
*(Lưu ý: API này tự động Populated thông tin của Tác giả lồng bên trong thuộc tính `author` thay vì chỉ hiển thị ID string)*

### 2.2 Lấy chi tiết một quyển sách
- **Method:** `GET`
- **URL:** `/api/books/:id`
- **Payload:** Không có
- **Response (200 OK):** (Trả về 1 Object chứa chi tiết sách và author populated tương tự như trên).

### 2.3 Thêm sách mới
- **Method:** `POST`
- **URL:** `/api/books`
- **Payload:**
```json
{
  "title": "Harry Potter và Chiếc Cốc Lửa",
  "author": "66b4866d62ea212705c9f1e", 
  "description": "Tập 4 của series Harry Potter",
  "price": 120000,
  "publishedYear": 2000,
  "genre": "Fantasy"
}
```
*(Trường `title` và `author` - ID tác giả là Bắt buộc)*
- **Response (201 Created):**
```json
{
  "_id": "66b495ed62ea212705c9f22",
  "title": "Harry Potter và Chiếc Cốc Lửa",
  "description": "Tập 4 của series Harry Potter",
  "price": 120000,
  "publishedYear": 2000,
  "genre": "Fantasy",
  "author": "66b4866d62ea212705c9f1e",
  "createdAt": "2026-08-01T10:15:00.000Z",
  "updatedAt": "2026-08-01T10:15:00.000Z"
}
```
*(Khi thêm mới thì `author` trả về chỉ là ID)*

### 2.4 Cập nhật thông tin sách
- **Method:** `PUT`
- **URL:** `/api/books/:id`
- **Payload:**
```json
{
  "title": "Harry Potter và Hòn Đá Phù Thủy",
  "price": 165000,
  "publishedYear": 1997,
  "genre": "Fantasy",
  "author": "66b4866d62ea212705c9f1e"
}
```
- **Response (200 OK):** Trả về Object thông tin sách đã cập nhật.

### 2.5 Xóa sách
- **Method:** `DELETE`
- **URL:** `/api/books/:id`
- **Payload:** Không có
- **Response (200 OK):**
```json
{
  "message": "Đã xóa sách thành công"
}
```

---

## 3. Các Mã Lỗi Thường Gặp (HTTP Error Responses)
- **400 Bad Request:** Dữ liệu Frontend truyền lên bị thiếu thông tin bắt buộc (ví dụ không có name, title, hoặc author truyền lên bị sai định dạng `ObjectId`). API sẽ trả về `message` và chi tiết `error`.
- **404 Not Found:** Quăng ra khi Frontend cố tình `GET`, `PUT` hoặc `DELETE` một ID không còn tồn tại trên CSDL.
  - Payload: `{ "message": "Không tìm thấy tác giả/sách" }`
- **500 Internal Server Error:** Các lỗi do hệ thống Backend/DB gây ra.
