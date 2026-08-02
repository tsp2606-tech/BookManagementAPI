import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/bookController.js';

const router = express.Router();
// xác định phương thức và đường dẫn
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getDetail);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;