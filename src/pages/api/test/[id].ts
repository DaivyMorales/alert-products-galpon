import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Test from "../../../models/test.model";

dbConnect();

export default async function idTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const test = await Test.findById(id);

        if (!test) return res.status(404).json({ msg: "Test not found" });

        return res.status(200).json(test);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "PUT":
      try {
        const test = await Test.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!test) return res.status(404).json({ msg: "Test not found" });

        return res.status(200).json(test);
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
        const deletedTest = await Test.findByIdAndRemove(id);

        if (!deletedTest)
          return res.status(404).json({ msg: "Test not found" });

        return res.status(204).json("Test deleted!");
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
