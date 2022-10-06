import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = 8800;
export const app = express();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then((a) => console.log('Connected to DB'))
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use((err, res, req, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  req.status(status).json({
    succsess: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log('Connected to server');
});
