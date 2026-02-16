import express from 'express';
import { User } from '../models/User.js';
import { Listing } from '../models/Listing.js';
import { Payment } from '../models/Payment.js';
import { Application } from '../models/Application.js';
import { authRequired, permit } from '../middleware/auth.js';

const router = express.Router();

router.use(authRequired, permit('admin'));

router.get('/users', async (_req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

router.patch('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
  res.json(user);
});

router.get('/analytics', async (_req, res) => {
  const [totalListings, approvedListings, totalRevenueAgg, totalApplications, users] = await Promise.all([
    Listing.countDocuments(),
    Listing.countDocuments({ status: 'approved' }),
    Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Application.countDocuments(),
    User.countDocuments()
  ]);

  res.json({
    totalListings,
    approvedListings,
    totalApplications,
    users,
    totalRevenue: totalRevenueAgg[0]?.total ?? 0
  });
});

export default router;
