import express from 'express';
import { Payment } from '../models/Payment.js';
import { Listing } from '../models/Listing.js';
import { authRequired, permit } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authRequired, permit('tenant'), async (req, res) => {
  const { listingId, amount } = req.body;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  const payment = await Payment.create({
    tenant: req.user._id,
    landlord: listing.landlord,
    listing: listing._id,
    amount,
    reference: `MOCK-${Date.now()}`,
    status: 'pending'
  });

  res.status(201).json(payment);
});

router.get('/', authRequired, async (req, res) => {
  let filter = {};
  if (req.user.role === 'tenant') filter = { tenant: req.user._id };
  if (req.user.role === 'landlord') filter = { landlord: req.user._id };

  const payments = await Payment.find(filter).populate('listing', 'title');
  res.json(payments);
});

router.patch('/:id/status', authRequired, permit('landlord', 'admin'), async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  if (req.user.role === 'landlord' && String(payment.landlord) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  payment.status = req.body.status || payment.status;
  payment.paidAt = payment.status === 'paid' ? new Date() : payment.paidAt;
  await payment.save();

  res.json(payment);
});

export default router;
