import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  account: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  account: string;
  password: string;
  email: String;
}
