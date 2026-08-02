import * as authorService from '../services/authorService.js';

export const create = async (req, res) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetail = async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Không tìm thấy tác giả' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    if (!author) return res.status(404).json({ message: 'Không tìm thấy tác giả' });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const author = await authorService.deleteAuthor(req.params.id);
    if (!author) return res.status(404).json({ message: 'Không tìm thấy tác giả' });
    res.status(200).json({ message: 'Đã xóa tác giả thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
