import * as mongoose from 'mongoose';

export const analysisUserNruSchema = new mongoose.Schema(
  {
    nru: { type: String, required: true },
    date: { type: Number, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserNruModel extends mongoose.Document {
  id: string;
  nru: string;
  date: number;
  createdAt: number;
  updatedAt: number;
}

export const AnalysisUserNruName = 'AnalysisUserNru';
