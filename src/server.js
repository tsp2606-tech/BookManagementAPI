import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// Cấu hình Swagger JSDoc đọc trực tiếp các chú thích @swagger từ folder routes
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Book Management API',
      version: '1.0.0',
      description: 'Tài liệu OpenAPI 3.0 cho hệ thống Quản lý Sách và Tác giả (Book Management API)',
    },
    servers: [
      {
        url: process.env.API_URL,
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
});
