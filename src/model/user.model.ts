import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  account: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  role_id: { type: String, required: true },
},{
  versionKey: false,
  timestamps: true,
});

export interface User extends mongoose.Document {
  id: string;
  account: string;
  password: string;
  status: string;
  role_id:string;
  createdAt: Date,
  updatedAt: Date
}
