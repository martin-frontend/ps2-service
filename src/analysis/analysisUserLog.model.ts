import * as mongoose from 'mongoose';

export const analysisUserLogSchema = new mongoose.Schema(
  {
    userAccount: { type: String, required: true },
    logText: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  );
  
export interface AnalysisUserLogModel extends mongoose.Document {
  id: string;
  userAccount: string;
  logText: string;
  createdAt: Number;
  updatedAt: Number;
}

export const AnalysisUserLogName = 'AnalysisUserLog';
