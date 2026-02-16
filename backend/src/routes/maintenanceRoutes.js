import express from 'express';
import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { Listing } from '../models/Listing.js';
import { authRequired, permit } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authRequired, permit('tenant'), async (req, res) => {
  const { listingId, issue, priority } = req.body;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  const request = await MaintenanceRequest.create({
    tenant: req.user._id,
    landlord: listing.landlord,
    listing: listing._id,
    issue,
    priority
  });

  res.status(201).json(request);
});

router.get('/', authRequired, async (req, res) => {
  let filter = {};
  if (req.user.role === 'tenant') filter = { tenant: req.user._id };
  if (req.user.role === 'landlord') filter = { landlord: req.user._id };

  const requests = await MaintenanceRequest.find(filter).populate('listing', 'title address');
  res.json(requests);
});

router.patch('/:id', authRequired, permit('landlord', 'admin'), async (req, res) => {
  const request = await MaintenanceRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Maintenance request not found' });

  if (req.user.role === 'landlord' && String(request.landlord) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  request.status = req.body.status ?? request.status;
  request.response = req.body.response ?? request.response;
  await request.save();

  res.json(request);
});

export default router;
