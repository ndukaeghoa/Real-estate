import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['landlord', 'tenant', 'admin'],
      default: 'tenant'
    },
    profile: {
      phone: String,
      company: String,
      idNumber: String
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
