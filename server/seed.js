// Idempotent seed script — writes the verified Doctor content document.
// Run with `npm run seed` (from /server or the repo root). Safe to re-run:
// it upserts by slug, replacing the existing document's content.
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import mongoose from 'mongoose';
import Doctor from './src/models/Doctor.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(path.join(__dirname, 'src', 'data', 'doctor-content.json'), 'utf8'));

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dr-sravanthi-portfolio';

async function seed() {
  console.log(`[seed] connecting to ${uri} ...`);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const result = await Doctor.findOneAndUpdate(
    { slug: content.slug },
    { $set: content },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`[seed] Doctor document upserted (_id: ${result._id}, slug: ${result.slug}).`);
  console.log('[seed] Remember: TODO placeholders (registration number, photos, publications) still need client input — see TODO.md.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[seed] failed:', err.message);
  process.exit(1);
});
