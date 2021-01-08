import * as mongoose from 'mongoose';

export const analysisUserWauSchema = new mongoose.Schema(
  {
    wau: { type: String, required: true },
    date: { type: Number, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserWauModel extends mongoose.Document {
  id: string;
  wau: string;
  date: number;
  createdAt: number;
  updatedAt: number;
}

export const AnalysisUserWauName = 'AnalysisUserWau';
