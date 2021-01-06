import * as mongoose from 'mongoose';

export const analysisEventSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    event: { type: String, required: true },
    data: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisEventModel extends mongoose.Document {
  id: string;
  account: string;
  event: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EventName = 'AnalysisEvent';
