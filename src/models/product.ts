import { Schema, model, models } from "mongoose";

type SchemaProduct = {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
};

const productSchema = new Schema<SchemaProduct>(
  {
    PRODUCTO: {
      type: String,
      trim: true,
    },
    NOMBRE: {
      type: String,
      trim: true,
    },
    PRESENTACION: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Product ||
  model<SchemaProduct>("Product", productSchema);
