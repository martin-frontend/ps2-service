import * as mongoose from 'mongoose';

export const operationBanSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    bannedDate: { type: String, required: true },
    releaseDate: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface OperationBanModel extends mongoose.Document {
  id: string;
  bannedDate: string;
  releaseDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export const BanName = 'OperationBan';
