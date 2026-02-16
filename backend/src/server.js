import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Global middleware for JSON payloads, request logs, and CORS.
app.use(cors({ origin: process.env.FRONTEND_URL ?? '*' }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

// Health check endpoint for deployment monitoring.
app.get('/health', (_req, res) => res.json({ ok: true, service: 'efortlex-api' }));

// API route registration.
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log(`🚀 API running on http://localhost:${port}`)))
  .catch((err) => {
    console.error('Failed to bootstrap server', err);
    process.exit(1);
  });
