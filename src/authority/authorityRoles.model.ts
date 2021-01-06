import * as mongoose from 'mongoose';

export const AuthorityRolesSchema = new mongoose.Schema({
  roles: { type: String, required: true },
  roleLevel: { type: Number, required: false,default:1 },
  name: { type: String, required: true },
},{  
  timestamps: true,
  versionKey: false,
});

export interface AuthorityRoles extends mongoose.Document {
  id: string
  roles: string
  roleLevel: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export const RolesName = "AuthorityRoles";
