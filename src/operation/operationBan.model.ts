import * as mongoose from 'mongoose';

export const operationBanSchema = new mongoose.Schema(
  {
    account: { type: String, required: true },
    releaseDate: { type: Number, required: true },
    state: { type: String, required: false, default: '0' },
    reason: { type: String, required: false},
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface OperationBanModel extends mongoose.Document {
  id: string;
  account:string;
  releaseDate: Number;
  state:string;//0:一般，1:永久停權
  reason:string;
  createdAt: Number;
  updatedAt: Number;
}

export const BanName = 'OperationBan';
