import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    message: String,
    documents: [{ type: String }],
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'approved', 'rejected'],
      default: 'submitted'
    }
  },
  { timestamps: true }
);

export const Application = mongoose.model('Application', applicationSchema);
