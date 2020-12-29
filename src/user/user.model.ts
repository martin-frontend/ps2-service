import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  account: { type: String, required: true },
  password: { type: String, required: true },
},
{
  timestamps: true
});

export interface User extends mongoose.Document {
  id: string;
  account: string;
  password: string;
  createdAt:Date,
  updateAt:Date
}
