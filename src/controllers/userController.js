import * as userService from '../services/userService.js';

export const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'Thành công', data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

export const getDetail = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Không tìm thấy' });
  res.status(200).json(user);
};

export const update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(user);
};

export const remove = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(200).json({ message: 'Đã xóa' });
};