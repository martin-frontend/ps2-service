import * as mongoose from 'mongoose';

export const AuthorityRolesSchema = new mongoose.Schema({
  roles: { type: String, required: true },
  role_level: { type: Number, required: false },
  name: { type: String, required: true },
},{  
  timestamps: true,
  versionKey: false,
});

export interface AuthorityRoles extends mongoose.Document {
  id: string;
  roles: string;
  role_level: string;
  name: string;
  createdAt: Date,
  updatedAt: Date
}
