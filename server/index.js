import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectMongoDB.js';
import authRoutes from './routes/auth.route.js';
import journalRoutes from './routes/journal.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',  // The URL of your frontend
    credentials: true,  // Allow cookies to be sent with the request
  }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth' , authRoutes);
app.use('/api/journal/' , journalRoutes);

app.listen(port , (req ,res)=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})