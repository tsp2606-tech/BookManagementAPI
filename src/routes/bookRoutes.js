import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Mã ID duy nhất của sách (MongoDB ObjectId)
 *           example: "66b495ed62ea212705c9f22"
 *         title:
 *           type: string
 *           description: Tiêu đề sách
 *           example: "Harry Potter và Chiếc Cốc Lửa"
 *         description:
 *           type: string
 *           description: Mô tả nội dung sách
 *           example: "Tập 4 của series Harry Potter"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Giá bán (VNĐ)
 *           example: 120000
 *         publishedYear:
 *           type: integer
 *           description: Năm xuất bản
 *           example: 2000
 *         genre:
 *           type: string
 *           description: Thể loại sách
 *           example: "Fantasy"
 *         author:
 *           type: string
 *           description: ID của tác giả (ObjectId)
 *           example: "66b4866d62ea212705c9f1e"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BookPopulated:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66b495ed62ea212705c9f22"
 *         title:
 *           type: string
 *           example: "Harry Potter và Chiếc Cốc Lửa"
 *         description:
 *           type: string
 *           example: "Tập 4 của series Harry Potter"
 *         price:
 *           type: number
 *           example: 120000
 *         publishedYear:
 *           type: integer
 *           example: 2000
 *         genre:
 *           type: string
 *           example: "Fantasy"
 *         author:
 *           $ref: '#/components/schemas/Author'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateBookInput:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: "Tiêu đề sách (Bắt buộc)"
 *           example: "Harry Potter và Chiếc Cốc Lửa"
 *         description:
 *           type: string
 *           description: Mô tả nội dung sách
 *           example: "Tập 4 của series Harry Potter"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Giá bán
 *           example: 120000
 *         publishedYear:
 *           type: integer
 *           description: Năm xuất bản
 *           example: 2000
 *         genre:
 *           type: string
 *           description: Thể loại sách
 *           example: "Fantasy"
 *         author:
 *           type: string
 *           description: "Mã ID tác giả tồn tại trong DB (Bắt buộc)"
 *           example: "66b4866d62ea212705c9f1e"
 *     UpdateBookInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Harry Potter và Hòn Đá Phù Thủy"
 *         description:
 *           type: string
 *           example: "Tập 1 của series"
 *         price:
 *           type: number
 *           example: 165000
 *         publishedYear:
 *           type: integer
 *           example: 1997
 *         genre:
 *           type: string
 *           example: "Fantasy"
 *         author:
 *           type: string
 *           example: "66b4866d62ea212705c9f1e"
 *     BookErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Không tìm thấy sách"
 *         error:
 *           type: string
 *           example: "Chi tiết lỗi từ hệ thống"
 *     BookDeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Đã xóa sách thành công"
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Tạo sách mới
 *     description: Tạo một bản ghi sách mới. Yêu cầu title và author ID phải tồn tại trong DB.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookInput'
 *           example:
 *             title: "Harry Potter và Chiếc Cốc Lửa"
 *             description: "Tập 4 của series Harry Potter"
 *             price: 120000
 *             publishedYear: 2000
 *             genre: "Fantasy"
 *             author: "66b4866d62ea212705c9f1e"
 *     responses:
 *       201:
 *         description: Tạo sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               _id: "66b495ed62ea212705c9f22"
 *               title: "Harry Potter và Chiếc Cốc Lửa"
 *               description: "Tập 4 của series Harry Potter"
 *               price: 120000
 *               publishedYear: 2000
 *               genre: "Fantasy"
 *               author: "66b4866d62ea212705c9f1e"
 *               createdAt: "2026-08-01T10:15:00.000Z"
 *               updatedAt: "2026-08-01T10:15:00.000Z"
 *       400:
 *         description: Lỗi dữ liệu (ví dụ thiếu tên sách, Author ID sai định dạng hoặc không tồn tại)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 *             example:
 *               message: "Lỗi: Kiểm tra lại Author ID hoặc dữ liệu"
 *               error: "Book validation failed: author: Path `author` is required."
 */
router.post('/', create);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Lấy danh sách sách (Hỗ trợ Lọc & Tìm kiếm)
 *     description: Trả về danh sách tất cả các cuốn sách trong hệ thống. Tự động Populate đầy đủ đối tượng tác giả. Hỗ trợ query parameter genre và search (Regex).
 *     tags: [Books]
 *     parameters:
 *       - name: genre
 *         in: query
 *         required: false
 *         description: Lọc theo thể loại chính xác (ví dụ Fantasy, Fiction, Romance)
 *         schema:
 *           type: string
 *         example: "Fantasy"
 *       - name: search
 *         in: query
 *         required: false
 *         description: Tìm kiếm tiêu đề sách theo Regex (không phân biệt hoa thường, ví dụ Harry)
 *         schema:
 *           type: string
 *         example: "Harry"
 *     responses:
 *       200:
 *         description: Lấy danh sách sách thành công (kèm thông tin tác giả đã được populate)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookPopulated'
 *             example:
 *               - _id: "66b495ed62ea212705c9f22"
 *                 title: "Harry Potter và Chiếc Cốc Lửa"
 *                 description: "Tập 4 của series Harry Potter"
 *                 price: 120000
 *                 publishedYear: 2000
 *                 genre: "Fantasy"
 *                 author:
 *                   _id: "66b4866d62ea212705c9f1e"
 *                   name: "J.K. Rowling"
 *                   bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *                   nationality: "Anh"
 *                   birthYear: 1965
 *                   createdAt: "2026-08-01T10:00:00.000Z"
 *                   updatedAt: "2026-08-01T10:00:00.000Z"
 *                 createdAt: "2026-08-01T10:15:00.000Z"
 *                 updatedAt: "2026-08-01T10:15:00.000Z"
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một cuốn sách theo ID
 *     description: Tìm kiếm và trả về thông tin cuốn sách theo id, tự động Populate thông tin tác giả.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID (MongoDB ObjectId) của sách
 *         example: "66b495ed62ea212705c9f22"
 *     responses:
 *       200:
 *         description: Lấy chi tiết sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookPopulated'
 *             example:
 *               _id: "66b495ed62ea212705c9f22"
 *               title: "Harry Potter và Chiếc Cốc Lửa"
 *               description: "Tập 4 của series Harry Potter"
 *               price: 120000
 *               publishedYear: 2000
 *               genre: "Fantasy"
 *               author:
 *                 _id: "66b4866d62ea212705c9f1e"
 *                 name: "J.K. Rowling"
 *                 bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *                 nationality: "Anh"
 *                 birthYear: 1965
 *               createdAt: "2026-08-01T10:15:00.000Z"
 *               updatedAt: "2026-08-01T10:15:00.000Z"
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 *             example:
 *               message: "Không tìm thấy sách"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Cập nhật thông tin sách theo ID
 *     description: Cập nhật thông tin cuốn sách theo id và trả về bản ghi mới sau khi chỉnh sửa.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của cuốn sách cần cập nhật
 *         example: "66b495ed62ea212705c9f22"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookInput'
 *           example:
 *             title: "Harry Potter và Hòn Đá Phù Thủy"
 *             price: 165000
 *     responses:
 *       200:
 *         description: Cập nhật sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Dữ liệu cập nhật không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 *             example:
 *               message: "Không tìm thấy sách"
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Xóa sách theo ID
 *     description: Xóa cuốn sách tương ứng với id khỏi hệ thống.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của cuốn sách cần xóa
 *         example: "66b495ed62ea212705c9f22"
 *     responses:
 *       200:
 *         description: Xóa sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDeleteResponse'
 *             example:
 *               message: "Đã xóa sách thành công"
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 *             example:
 *               message: "Không tìm thấy sách"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookErrorResponse'
 */
router.delete('/:id', remove);

export default router;