import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    reference: { type: String, required: true },
    paidAt: Date
  },
  { timestamps: true }
);

export const Payment = mongoose.model('Payment', paymentSchema);
