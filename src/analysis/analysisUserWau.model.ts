import * as mongoose from 'mongoose';

export const analysisUserWauSchema = new mongoose.Schema(
  {
    wau: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserWauModel extends mongoose.Document {
  id: string;
  wau: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const AnalysisUserWauName = 'AnalysisUserWau';
