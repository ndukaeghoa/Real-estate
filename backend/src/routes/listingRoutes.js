import express from 'express';
import { Listing } from '../models/Listing.js';
import { authRequired, permit } from '../middleware/auth.js';

const router = express.Router();

router.get('/public', async (req, res) => {
  const { q, location, minRent, maxRent, bedrooms, amenities, sort = 'createdAt', page = 1, limit = 10 } = req.query;
  const filter = { status: 'approved', isAvailable: true };

  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }];
  if (location) filter.location = new RegExp(location, 'i');
  if (bedrooms) filter.bedrooms = Number(bedrooms);
  if (amenities) filter.amenities = { $in: amenities.split(',') };
  if (minRent || maxRent) filter.rent = {};
  if (minRent) filter.rent.$gte = Number(minRent);
  if (maxRent) filter.rent.$lte = Number(maxRent);

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Listing.find(filter).sort(sort).skip(skip).limit(Number(limit)).populate('landlord', 'name email'),
    Listing.countDocuments(filter)
  ]);

  res.json({ items, pagination: { page: Number(page), limit: Number(limit), total } });
});

router.get('/', authRequired, async (req, res) => {
  if (req.user.role === 'landlord') {
    const items = await Listing.find({ landlord: req.user._id });
    return res.json(items);
  }
  const items = await Listing.find().populate('landlord', 'name email');
  res.json(items);
});

router.post('/', authRequired, permit('landlord'), async (req, res) => {
  const listing = await Listing.create({ ...req.body, landlord: req.user._id, status: 'pending' });
  res.status(201).json(listing);
});

router.put('/:id', authRequired, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  const owner = String(listing.landlord) === String(req.user._id);
  if (!owner && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  Object.assign(listing, req.body);
  await listing.save();
  res.json(listing);
});

router.delete('/:id', authRequired, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  const owner = String(listing.landlord) === String(req.user._id);
  if (!owner && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  await listing.deleteOne();
  res.json({ message: 'Listing deleted' });
});

router.patch('/:id/approve', authRequired, permit('admin'), async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const listing = await Listing.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(listing);
});

export default router;
