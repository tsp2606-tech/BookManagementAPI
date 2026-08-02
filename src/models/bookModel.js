import mongoose from 'mongoose';
// Schema dùng để định nghĩa cấu trúc dữ liệu cho 1 document

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, min: 0 },
  publishedYear: { type: Number, max: new Date().getFullYear() },
  genre: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);