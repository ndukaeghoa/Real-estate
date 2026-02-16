import mongoose from 'mongoose';

// Centralized MongoDB connection helper for the API server.
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not configured');

  await mongoose.connect(uri, { autoIndex: true });
  console.log('✅ MongoDB connected');
};
