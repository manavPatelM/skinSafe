import mongoose from "mongoose";

declare global {
  // allow global `mongoose` across hot-reloads in dev
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// this ensures the file is treated as a module
export {};