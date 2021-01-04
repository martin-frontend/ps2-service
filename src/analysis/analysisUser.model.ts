import * as mongoose from 'mongoose';

export const analysisUserSchema = new mongoose.Schema({
  account: { type: String, required: true },
  accountName: { type: String, required: true },
},{
  versionKey: false,
  timestamps: true,
});

export interface AnalysisUserModel extends mongoose.Document {
  id: string;
  account: string;
  accountName: string;
  createdAt: Date,
  updatedAt: Date
}
