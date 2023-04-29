import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Causes from "../../../models/causes";

export default async function indexInventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const cause = await Causes.find();
        return res.status(200).json(cause);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "POST":
      try {
        const { type, description } = body;

        const newCause = new Causes({ type, description });

        const causeSaved = await newCause.save();

        return res.status(200).json(causeSaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "DELETE":
      try {
        const inventoryDeleted = await Causes.deleteMany();

        if (!inventoryDeleted) return res.status(404).json("Causes not found");

        return res.status(200).json("Causes deleted successfully");
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
