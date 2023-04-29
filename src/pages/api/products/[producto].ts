import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/product";

export default async function idPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { producto },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const predictFound = await Product.find({ PRODUCTO: producto });

        if (!predictFound) return res.status(404).json("Predict not found");

        return res.status(200).json(predictFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const product = await Product.findOneAndUpdate(
          { PRODUCTO: producto },
          body,
          {
            new: true,
          }
        );

        if (!product) return res.status(404).json("Predict not found");

        return res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const deletedProduct = await Product.findOneAndRemove({
          PRODUCTO: producto,
        });

        if (!deletedProduct) return res.status(404).json("Product not found");

        return res.status(200).json("Predict deleted successfully");
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
