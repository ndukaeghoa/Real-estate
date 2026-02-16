import express from 'express';
import { Application } from '../models/Application.js';
import { Listing } from '../models/Listing.js';
import { authRequired, permit } from '../middleware/auth.js';
import { sendEmailNotification } from '../services/emailService.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();

router.post('/', authRequired, permit('tenant'), asyncHandler(async (req, res) => {
  const { listingId, message, documents = [] } = req.body;
  const listing = await Listing.findById(listingId).populate('landlord');
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  const application = await Application.create({
    tenant: req.user._id,
    landlord: listing.landlord._id,
    listing: listing._id,
    message,
    documents
  });

  await sendEmailNotification({
    to: listing.landlord.email,
    subject: 'New rental application received',
    text: `You received an application for ${listing.title}.`
  });

  res.status(201).json(application);
}));

router.get('/', authRequired, asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role === 'tenant') filter = { tenant: req.user._id };
  if (req.user.role === 'landlord') filter = { landlord: req.user._id };

  const applications = await Application.find(filter)
    .populate('tenant', 'name email')
    .populate('listing', 'title location rent');
  res.json(applications);
}));

router.patch('/:id/status', authRequired, permit('landlord', 'admin'), asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['submitted', 'under_review', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const app = await Application.findById(req.params.id).populate('tenant', 'email').populate('listing', 'title');
  if (!app) return res.status(404).json({ message: 'Application not found' });

  if (req.user.role === 'landlord' && String(app.landlord) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  app.status = status;
  await app.save();

  await sendEmailNotification({
    to: app.tenant.email,
    subject: 'Your application status changed',
    text: `Your application for ${app.listing.title} is now ${status}.`
  });

  res.json(app);
}));

export default router;
