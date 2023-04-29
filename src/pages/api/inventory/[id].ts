import { NextApiRequest, NextApiResponse } from "next";
import Inventory from "../../../models/inventory";

export default async function idInventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const inventoryFound = await Inventory.findById(id).populate("CAUSA");

        if (!inventoryFound) return res.status(404).json("Inventory not found");

        return res.status(200).json(inventoryFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const inventory = await Inventory.findByIdAndUpdate(id, body, {
          new: true,
        }).populate("CAUSA");

        if (!inventory) return res.status(404).json("inventory not found");

        return res.status(200).json(inventory);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const inventoryDeleted = await Inventory.findByIdAndRemove(id);

        if (!inventoryDeleted)
          return res.status(404).json("inventory not found");

        return res.status(200).json("inventory deleted successfully");
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
