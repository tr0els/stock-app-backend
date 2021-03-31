import { Document } from 'mongoose';

export interface StockEntity extends Document {
  readonly _id: string;
  readonly __v: number;
  readonly name: string;
  readonly value: number;
  readonly description: string;
}
