import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext, useState } from "react";
import { productContext } from "@/context/ProductContext";
import { useFormik } from "formik";

interface IProduct {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface CardProductProps {
  product: IProduct;
  index: number;
}

export default function CardProduct({ product, index }: CardProductProps) {
  const {
    products,
    setProducts,
    deleteProduct,
    updateProduct,
    productChoose,
    setProductChoose,
  } = useContext(productContext);

  const [clickPresentation, setClickPresentation] = useState<boolean>(false);

  const [productSchema, setProductSchema] = useState({
    PRODUCTO: product.PRODUCTO,
    NOMBRE: product.NOMBRE,
    PRESENTACION: product.PRESENTACION === 0 ? 1 : product.PRESENTACION,
  });

  const formik = useFormik({
    initialValues: { productSchema },
    onSubmit: (values) => {
      // console.log(values.productSchema);
      updateProduct(product.PRODUCTO, values.productSchema);
      setProductSchema(values.productSchema);

      setProductChoose("n");
    },

    enableReinitialize: true,
  });

  return (
    <tr
      className={`bg-white text-xs ${
        productChoose === product._id ? "bg-gray-100  shadow-xl rounded-lg" : ""
      }`}
      key={product._id}
    >
      <td className="py-2 px-2 flex justify-center">
        <div className="text-2xs py-1 px-2 bg-purple-100 rounded-full font-bold text-purple-700">
          {index}
        </div>
      </td>
      <th
        scope="row"
        className="py-2 px-2 font-bold text-gray-900 whitespace-nowrap "
        onClick={() => {
          setProductChoose(product._id);
          setClickPresentation(!clickPresentation);
        }}
      >
        {productChoose === product._id ? (
          <form onSubmit={formik.handleSubmit}>
            <input
              className="inputProducto"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="productSchema.PRODUCTO"
              value={
                product.PRODUCTO ? formik.values.productSchema.PRODUCTO : ""
              }
            />
          </form>
        ) : (
          product.PRODUCTO
        )}
      </th>
      <td
        className="py-2 px-2"
        onClick={() => {
          setProductChoose(product._id);
          setClickPresentation(!clickPresentation);
        }}
      >
        {productChoose === product._id ? (
          <form onSubmit={formik.handleSubmit}>
            <input
              className="inputNombre"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="productSchema.NOMBRE"
              value={product.NOMBRE ? formik.values.productSchema.NOMBRE : ""}
            />
          </form>
        ) : (
          product.NOMBRE
        )}
      </td>
      <td
        className="py-2 px-2  "
        onClick={() => {
          setProductChoose(product._id);
          setClickPresentation(!clickPresentation);
        }}
      >
        {productChoose === product._id ? (
          <form onSubmit={formik.handleSubmit}>
            <input
              className="inputEdit"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="productSchema.PRESENTACION"
              value={
                productSchema.PRESENTACION
                  ? formik.values.productSchema.PRESENTACION
                  : ""
              }
            />
          </form>
        ) : (
          productSchema.PRESENTACION
        )}
      </td>
      <td className="py-2 px-2  flex gap-x-2">
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        ></motion.div>
        <AiOutlineDelete
          size={18}
          onClick={() => {
            deleteProduct(product.PRODUCTO);
          }}
          className="cursor-pointer hover:text-red-600"
        />
      </td>
    </tr>
  );
}
