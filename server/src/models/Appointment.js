import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    preferredDate: { type: String, trim: true },
    consultationType: {
      type: String,
      enum: ['in-clinic', 'teleconsult'],
      default: 'in-clinic'
    },
    reason: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed'],
      default: 'new'
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Appointment', appointmentSchema);
