import * as bookService from '../services/bookService.js';

// Controller để xử lý logic khi nhận request API
// trả dữ liệu ở tab network, status, message

export const getAll = async (req, res) => {
  try {
    const { genre, search } = req.query;
    let query = {};

    if (genre) query.genre = genre;
    if (search) query.title = { $regex: search, $options: 'i' };

    const books = await bookService.getAllBooks(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetail = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi: Kiểm tra lại Author ID hoặc dữ liệu', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.status(200).json({ message: 'Đã xóa sách thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};