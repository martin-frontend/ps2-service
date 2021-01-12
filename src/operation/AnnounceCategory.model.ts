import * as mongoose from 'mongoose';

export const operationAnnounceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface OperationAnnounceModel extends mongoose.Document {
  id: string;
  title: string;
  category: string;
  onsaleDate: number;
  nosaleDate: number;
  content: string;
  creator: string;
  createdAt: number;
  updatedAt: number;
}

export const AnnounceName = 'OperationAnnounce';
