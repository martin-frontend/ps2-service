import * as mongoose from 'mongoose';

export const operationAnnounceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    onsaleDate: { type: Number, required: true},
    nosaleDate: { type: Number, required: true},
    content: { type: String, required: true},
    creator: { type: String, required: true},
    createdAt: { type: Number },
    updatedAt: { type: Number },
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
