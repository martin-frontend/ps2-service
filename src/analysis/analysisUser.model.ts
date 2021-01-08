import * as mongoose from 'mongoose';

export const analysisUserSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    accountName: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface AnalysisUserModel extends mongoose.Document {
  id: string;
  account: string;
  accountName: string;
  createdAt: number;
  updatedAt: number;
}

export const AnalysisUserName = 'AnalysisUser';
