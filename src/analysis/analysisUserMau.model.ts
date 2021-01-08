import * as mongoose from 'mongoose';

export const analysisUserMauSchema = new mongoose.Schema(
  {
    mau: { type: String, required: true },
    date: { type: Number, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserMauModel extends mongoose.Document {
  id: string;
  mau: string;
  date: number;
  createdAt: number;
  updatedAt: number;
}

export const AnalysisUserMauName = 'AnalysisUserMau';
