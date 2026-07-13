import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import Appointment from '../models/Appointment.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { notifyClinic } from '../notify.js';
import { isDbConnected } from '../db.js';

const router = Router();

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5, // 5 booking attempts per hour per IP
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many booking requests from this network. Please call or WhatsApp the clinic instead.' }
});

const appointmentInput = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{8,20}$/, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email.').max(254).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(30).optional().or(z.literal('')),
  consultationType: z.enum(['in-clinic', 'teleconsult']).default('in-clinic'),
  reason: z.string().trim().max(500, 'Please keep the reason under 500 characters.').optional().or(z.literal(''))
});

const statusInput = z.object({ status: z.enum(['new', 'contacted', 'confirmed']) });

function requireDb(res) {
  if (!isDbConnected()) {
    res.status(503).json({ error: 'Booking service is temporarily unavailable. Please call or WhatsApp the clinic.' });
    return false;
  }
  return true;
}

// POST /api/appointments — public, validated, rate-limited
router.post('/', createLimiter, async (req, res, next) => {
  try {
    if (!requireDb(res)) return;
    const data = appointmentInput.parse(req.body);
    const appointment = await Appointment.create(data);
    console.log(`[appointments] created ${appointment._id} for ${appointment.name}`);
    await notifyClinic(appointment);
    res.status(201).json({
      message: 'Appointment request received. The clinic team will call you to confirm your slot.',
      appointment: {
        id: appointment._id,
        name: appointment.name,
        consultationType: appointment.consultationType,
        preferredDate: appointment.preferredDate,
        status: appointment.status,
        createdAt: appointment.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/appointments — admin only
router.get('/', adminAuth, async (req, res, next) => {
  try {
    if (!requireDb(res)) return;
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    res.json({ count: appointments.length, appointments });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/appointments/:id — admin only, status updates
router.patch('/:id', adminAuth, async (req, res, next) => {
  try {
    if (!requireDb(res)) return;
    const { status } = statusInput.parse(req.body);
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).lean();
    if (!appointment) return res.status(404).json({ error: 'Appointment not found.' });
    res.json({ appointment });
  } catch (err) {
    next(err);
  }
});

export default router;
