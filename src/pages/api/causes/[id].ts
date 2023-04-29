import { NextApiRequest, NextApiResponse } from "next";
import Causes from "../../../models/causes";

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
        const causeFound = await Causes.findById(id);

        if (!causeFound) return res.status(404).json("Cause not found");

        return res.status(200).json(causeFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const cause = await Causes.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!cause) return res.status(404).json("Cause not found");

        return res.status(200).json(cause);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const causeDeleted = await Causes.findByIdAndRemove(id);

        if (!causeDeleted) return res.status(404).json("Cause not found");

        return res.status(200).json("Cause deleted successfully");
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
