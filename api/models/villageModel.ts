import mongoose, { Schema } from "mongoose";
// Use the '@/' alias from your tsconfig.json to get the types
import { Column, LandRecord, Village } from '../../types'

const columnSchema = new Schema<Column>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["text", "number"] },
  },
  { _id: false }
);

const LandRecordSchema = new Schema<LandRecord>(
  {
    id: { type: String, required: true },
  },
  { strict: false, _id: false }
);

const villageSchema = new Schema<Village>(
  {
    name: { type: String, required: true },
    nameTamil: { type: String, required: true },
    columns: [columnSchema],
    records: [LandRecordSchema],
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

villageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default mongoose.models.village ||
  mongoose.model<Village>("village", villageSchema);