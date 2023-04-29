import { Schema, model, models } from "mongoose";
import Causes from "./causes";

type SchemaInventory = {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
  type: string;
};

const inventorySchema = new Schema<SchemaInventory>(
  {
    PRODUCTO: {
      type: String,
      trim: true,
    },
    NOMBRE: {
      type: String,
      trim: true,
    },
    LOTE: {
      type: String,
      trim: true,
    },
    CANTIDAD: {
      type: Number,
    },
    CANTIDAD_CONTADA: {
      type: Number,
    },
    type: {
      type: String,
      ref: "Causes",
      validate: {
        validator: function (type: string) {
          if (type === undefined || type === null) {
            return true;
          } else {
            return Causes.findOne({ type })
              .then((typeCause) => !!typeCause)
              .catch(() => false);
          }
        },
        message: "The cause not exits!",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<SchemaInventory>("Inventory", inventorySchema);
