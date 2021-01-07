import * as mongoose from 'mongoose';

export const analysisUserDauSchema = new mongoose.Schema(
  {
    dau: { type: String, required: true },
    date: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserDauModel extends mongoose.Document {
  id: string;
  dau: string;
  date: number;
  createdAt: number;
  updatedAt: number;
}

export const AnalysisUserDauName = 'AnalysisUserDau';
