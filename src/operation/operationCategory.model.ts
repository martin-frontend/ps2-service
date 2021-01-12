import * as mongoose from 'mongoose';

export const operationCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export interface OperationCategoryModel extends mongoose.Document {
  category: string;
}

export const CategoryName = 'OperationCategory';
