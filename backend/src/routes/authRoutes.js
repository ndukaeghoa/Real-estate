import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { authRequired } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/signup', asyncHandler(async (req, res) => {
  const { name, email, password, role = 'tenant' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  if (!['landlord', 'tenant', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name, email: user.email, role: user.role } });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}));

router.get('/me', authRequired, asyncHandler(async (req, res) => {
  res.json(req.user);
}));

export default router;
