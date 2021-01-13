import * as mongoose from 'mongoose';

export const analysisUserLogSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
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
  userid: string;
  logText: string;
  createdAt: Number;
  updatedAt: Number;
}

export const AnalysisUserLogName = 'AnalysisUserLog';
