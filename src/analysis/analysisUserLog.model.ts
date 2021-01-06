import * as mongoose from 'mongoose';

export const analysisUserLogSchema = new mongoose.Schema({
  userid: { type: String, required: true },
},{
  versionKey: false,
  timestamps: true,
});

export interface AnalysisUserLogModel extends mongoose.Document {
  id: string
  userid: string
  createdAt: Date
  updatedAt: Date
}

export const AnalysisUserLogName = "AnalysisUserLog";
