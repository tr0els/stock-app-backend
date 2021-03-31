import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    value: Number,
  },
  {
    id: true,
    toJSON: {
      virtuals: true,
    },
  },
);
