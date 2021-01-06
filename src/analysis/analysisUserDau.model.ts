import * as mongoose from 'mongoose';

export const analysisUserDauSchema = new mongoose.Schema(
  {
    dau: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserDauModel extends mongoose.Document {
  id: string;
  dau: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const AnalysisUserDauName = 'AnalysisUserDau';
