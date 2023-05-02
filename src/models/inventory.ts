import { Schema, model, models, Types } from "mongoose";
import Causes, { TCauses } from "./causes";

type SchemaInventory = {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
  CAUSA: Types.ObjectId | TCauses;
  OBSERVACION: string;
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
    CAUSA: {
      type: Schema.Types.ObjectId,
      ref: "Causes", // Se establece la referencia al modelo 'Causes'
    },
    OBSERVACION: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<SchemaInventory>("Inventory", inventorySchema);
