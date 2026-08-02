import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/authorController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Mã ID duy nhất của tác giả (MongoDB ObjectId)
 *           example: "66b4866d62ea212705c9f1e"
 *         name:
 *           type: string
 *           description: Tên tác giả
 *           example: "J.K. Rowling"
 *         bio:
 *           type: string
 *           description: Tiểu sử tác giả
 *           example: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *         nationality:
 *           type: string
 *           description: Quốc tịch tác giả
 *           example: "Anh"
 *         birthYear:
 *           type: integer
 *           description: Năm sinh tác giả
 *           example: 1965
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời điểm tạo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời điểm cập nhật gần nhất
 *     CreateAuthorInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: "Tên tác giả (Bắt buộc)"
 *           example: "J.K. Rowling"
 *         bio:
 *           type: string
 *           description: Tiểu sử tác giả
 *           example: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *         nationality:
 *           type: string
 *           description: Quốc tịch tác giả
 *           example: "Anh"
 *         birthYear:
 *           type: integer
 *           description: Năm sinh tác giả
 *           example: 1965
 *     UpdateAuthorInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "J.K. Rowling"
 *         bio:
 *           type: string
 *           example: "Tiểu thuyết gia người Anh"
 *         nationality:
 *           type: string
 *           example: "Anh"
 *         birthYear:
 *           type: integer
 *           example: 1965
 *     AuthorErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Không tìm thấy tác giả"
 *     AuthorDeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Đã xóa tác giả thành công"
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Tạo tác giả mới
 *     description: Thêm một bản ghi tác giả mới vào cơ sở dữ liệu. Trường name là bắt buộc.
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuthorInput'
 *           example:
 *             name: "J.K. Rowling"
 *             bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *             nationality: "Anh"
 *             birthYear: 1965
 *     responses:
 *       201:
 *         description: Tạo tác giả thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *             example:
 *               _id: "66b4866d62ea212705c9f1e"
 *               name: "J.K. Rowling"
 *               bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *               nationality: "Anh"
 *               birthYear: 1965
 *               createdAt: "2026-08-01T10:00:00.000Z"
 *               updatedAt: "2026-08-01T10:00:00.000Z"
 *       400:
 *         description: Dữ liệu không hợp lệ (ví dụ thiếu tên tác giả)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 *             example:
 *               message: "Author validation failed: name: Path `name` is required."
 */
router.post('/', create);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Lấy danh sách tất cả tác giả
 *     description: Trả về mảng danh sách toàn bộ các tác giả trong hệ thống.
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Lấy danh sách tác giả thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *             example:
 *               - _id: "66b4866d62ea212705c9f1e"
 *                 name: "J.K. Rowling"
 *                 bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *                 nationality: "Anh"
 *                 birthYear: 1965
 *                 createdAt: "2026-08-01T10:00:00.000Z"
 *                 updatedAt: "2026-08-01T10:00:00.000Z"
 *               - _id: "66b4866d62ea212705c9f1f"
 *                 name: "Paulo Coelho"
 *                 bio: "Tiểu thuyết gia người Brazil"
 *                 nationality: "Brazil"
 *                 birthYear: 1947
 *                 createdAt: "2026-08-01T10:05:00.000Z"
 *                 updatedAt: "2026-08-01T10:05:00.000Z"
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết tác giả theo ID
 *     description: Tìm kiếm và trả về thông tin chi tiết của 1 tác giả theo mã id.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID (MongoDB ObjectId) của tác giả
 *         example: "66b4866d62ea212705c9f1e"
 *     responses:
 *       200:
 *         description: Lấy chi tiết tác giả thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *             example:
 *               _id: "66b4866d62ea212705c9f1e"
 *               name: "J.K. Rowling"
 *               bio: "Tác giả của bộ truyện Harry Potter nổi tiếng"
 *               nationality: "Anh"
 *               birthYear: 1965
 *               createdAt: "2026-08-01T10:00:00.000Z"
 *               updatedAt: "2026-08-01T10:00:00.000Z"
 *       404:
 *         description: Không tìm thấy tác giả
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 *             example:
 *               message: "Không tìm thấy tác giả"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Cập nhật thông tin tác giả theo ID
 *     description: Cập nhật thông tin tác giả theo id và trả về bản ghi mới sau khi sửa.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của tác giả cần cập nhật
 *         example: "66b4866d62ea212705c9f1e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAuthorInput'
 *           example:
 *             name: "J.K. Rowling (Cập nhật)"
 *             bio: "Tác giả tiểu thuyết người Anh"
 *     responses:
 *       200:
 *         description: Cập nhật tác giả thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Dữ liệu cập nhật không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 *       404:
 *         description: Không tìm thấy tác giả
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 *             example:
 *               message: "Không tìm thấy tác giả"
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Xóa tác giả theo ID
 *     description: Xóa thông tin tác giả tương ứng với id khỏi hệ thống.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ID của tác giả cần xóa
 *         example: "66b4866d62ea212705c9f1e"
 *     responses:
 *       200:
 *         description: Xóa tác giả thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorDeleteResponse'
 *             example:
 *               message: "Đã xóa tác giả thành công"
 *       404:
 *         description: Không tìm thấy tác giả
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 *             example:
 *               message: "Không tìm thấy tác giả"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorErrorResponse'
 */
router.delete('/:id', remove);

export default router;
