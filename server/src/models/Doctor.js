import mongoose from 'mongoose';

const { Mixed } = mongoose.Schema.Types;

// One document holds all site content; the shape mirrors
// server/src/data/doctor-content.json and client/src/data/fallback.json.
const doctorSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    profile: Mixed,
    hero: Mixed,
    bio: Mixed,
    qualifications: Mixed,
    memberships: [Mixed],
    fellowships: [Mixed],
    registration: Mixed,
    conditions: Mixed,
    services: Mixed,
    careerTimeline: Mixed,
    resources: Mixed,
    publications: Mixed,
    reviews: Mixed,
    booking: Mixed,
    clinic: Mixed,
    faqs: [Mixed],
    footer: Mixed
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('Doctor', doctorSchema);
