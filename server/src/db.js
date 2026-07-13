import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dr-sravanthi-portfolio';

// Lazy, cached connection — required for serverless (Vercel), where the app
// handles requests without a startup phase. The promise is cached so warm
// invocations reuse the open connection; a failed attempt clears the cache so
// the next request retries.
let connPromise = null;

export function ensureDb() {
  if (!connPromise) {
    connPromise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 5000 })
      .then((m) => {
        console.log('[mongo] connected');
        return m;
      })
      .catch((err) => {
        connPromise = null;
        throw err;
      });
  }
  return connPromise;
}

export const isDbConnected = () => mongoose.connection.readyState === 1;
