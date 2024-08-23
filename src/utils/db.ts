import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not set');
    }
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log('DB connected successfully');
    return connection;
  } catch (error) {
    console.error('Connection to db failed: ', (error as Error).message);
  }};

export default mongoConnect;
