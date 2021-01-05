import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  account: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  roleId: { type: String, required: true },
},{
  versionKey: false,
  timestamps: true,
});

export interface User extends mongoose.Document {
  id: string
  account: string
  password: string
  status: string
  roleId:string
  createdAt: Date
  updatedAt: Date
}
