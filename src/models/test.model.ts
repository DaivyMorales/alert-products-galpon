import { Schema, model, models } from "mongoose";

type TTest = {
  name: string;
  age: number;
};

const testSchema = new Schema<TTest>(
  {
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Test || model<TTest>("Test", testSchema);
