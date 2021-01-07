import * as mongoose from 'mongoose';

export const operationBanSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    state: { type: String, required: false, default: '0' },
    reason: { type: String, required: false},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface OperationBanModel extends mongoose.Document {
  id: string;
  account:string;
  releaseDate: Date;
  state:string;//0:一般，1:永久停權
  reason:string;
  createdAt: Date;
  updatedAt: Date;
}

export const BanName = 'OperationBan';
