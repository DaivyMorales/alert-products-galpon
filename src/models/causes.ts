import { Schema, model, models } from "mongoose";

type TCauses = {
  type: string;
  description: string;
};

const causesSchema = new Schema<TCauses>(
  {
    type: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Causes || model<TCauses>("Causes", causesSchema);
