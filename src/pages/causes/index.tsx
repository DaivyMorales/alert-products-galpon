import React, { useContext, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { MdOutlineAdd } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import ProductsForm from "@/components/products/ProductsForm";
import { alertContext } from "@/context/AlertContext";
import { productContext } from "@/context/ProductContext";
import CardProduct from "@/components/products/CardProduct";
import { useRouter } from "next/router";

interface MyProps {
  data: IProduct[];
}

interface IProduct {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

export default function HomeProduct({ data }: MyProps) {
  const { showAlert, setShowAlert } = useContext(alertContext);
  const { products, setProducts, deleteProduct } = useContext(productContext);

  console.log(products);

  useEffect(() => {
    setProducts(data);
  }, []);

  const router = useRouter();

  return (
    <div>
      <div className={` blur-${showAlert ? "sm" : "none"} `}>
        <div className="gradientDiv ">
          <div className="text-purple-700  flex justify-start px-4 py-3 items-center gap-x-1 ">
            <BiArrowBack size={18} />
            <h4
              onClick={() => router.push("/")}
              className="text-purple-700 text-sm cursor-pointer"
            >
              Volver
            </h4>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center shadow-lg    ">
          <div className="container mt-42 -mt-52 mx-auto  px-10 sm:px-30 lg:px-44 flex flex-col gap-y-6 mb-10">
            <div className="flex flex-col gap-y-2">
              <h1>Tabla de productos</h1>
              <p>
                Añade un nuevo Producto en el boton de <br></br> + Crear Nuevo
              </p>
            </div>
            <div
              className={`relative overflow-x-auto brightness-${
                showAlert ? "50" : ""
              }  grid grid-cols-2 border-1 gap-4 rounded-xl  bg-white shadow-lg px-4 py-5`}
            >
              <div className="flex justify-start items-start ">
                <div className="text-2xs px-1 rounded-full bg-gray-200 font-black text-purple-700">
                  {products.length}
                </div>
              </div>
              <div className="flex justify-end items-start ">
                <button onClick={() => setShowAlert(!showAlert)}>
                  <MdOutlineAdd size={15} />
                  Crear nuevo
                </button>
              </div>
              <table className="col-span-2 w-full text-sm text-left text-gray-500 ">
                <thead className="text-2xs text-gray-500 ">
                  <tr>
                    <th scope="col" className="py-2">
                      Tipo
                    </th>
                    <th scope="col" className="py-2">
                      Descripción
                    </th>
                    <th scope="col" className="py-2">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <CardProduct
                      product={product}
                      key={product._id}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ProductsForm />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(
    "https://alert-products-galpon.vercel.app/api/causes"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
