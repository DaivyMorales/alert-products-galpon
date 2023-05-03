import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import { GetServerSidePropsContext } from "next";
import UserCard from "@/components/UserCard";
import { MdOutlineAdd } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { cardContext } from "@/context/CardContext";
import * as xlsx from "xlsx";
import axios from "axios";
import { useRouter } from "next/router";
import { BiArrowToRight } from "react-icons/bi";
import { productContext } from "@/context/ProductContext";
import { inventoryContext } from "@/context/InventoryContext";
import { AiFillDelete } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { causesContext } from "../context/CausesContext";
import ExportButton from "../components/xlsx/ExportCard";

interface MyProps {
  data1: IInventory[];
  data2: IProducts[];
  data3: ICauses[];
}

interface ICauses {
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface IProducts {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface IInventory {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
  CAUSA: {
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  OBSERVACION: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

export default function user({ data1, data2, data3 }: MyProps) {
  const { fieldChoose, setFieldChoose } = useContext(cardContext);
  const { setProducts, getProducts } = useContext(productContext);

  const { setCauses, setCauseChoose, causeChoose } = useContext(causesContext);

  const { deleteAllInventory } = useContext(inventoryContext);

  const [information, setInformation] = useState<IInventory[]>([]);
  const [dataFound, setDataFound] = useState<IData[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleProduct = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setInformation(data1);
    setProducts(data2);
    setCauses(data3);
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      if (!event.target) return;
      const fileBuffer = event.target.result as ArrayBuffer;
      const workbook = xlsx.read(fileBuffer, { type: "array" });
      const worksheet = workbook.Sheets["Sheet1"];
      const dataExcel: Array<IData> = xlsx.utils.sheet_to_json(worksheet);
      try {
        const response = await axios.post("/api/inventory", dataExcel);
        setInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fileReader.onerror = (event) => {
      console.error("Error reading file:", event);
    };
  };

  const router = useRouter();

  return (
    <div>
      <div>
        <div className="gradientDiv " onClick={() => setCauseChoose("n")}>
          <div
            className="text-purple-700 flex justify-end px-4 py-3 items-center gap-x-1 cursor-pointer"
            onClick={() => router.push("/product")}
          >
            <BiArrowToRight size={18} />
            <h4 className="text-purple-700 text-sm ">Ir a productos</h4>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <div className="container mt-42 z-50 -mt-52 mx-auto  px-10  flex flex-col gap-y-6 mb-10">
            <div className="flex flex-col justify-start items-start gap-y-2">
              <h1>Reporte de Inventario</h1>
              <p>
                Importa un archivo de excel para cargar <br></br> los datos en
                la tabla!
              </p>
              {/* <div className="flex justify-center items-center gap-x-2">
                <div>
                  <label className="buttonExcel">
                    <RiFileExcel2Fill />
                    Importar Excel
                    <input
                      className="hidden"
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                <ExportButton tableId="my-table" />
                <button
                  style={
                    information.length === 0 ? { visibility: "hidden" } : {}
                  }
                  onClick={() => {
                    deleteAllInventory();
                    setInformation([]);
                  }}
                  className="bg-red-500 p-2 hover:bg-red-400"
                >
                  <AiFillDelete size={15} />
                </button>
              </div> */}
            </div>
            <div
              style={information.length === 0 ? { visibility: "hidden" } : {}}
              className={`relative overflow-x-auto  grid grid-cols-2 border-1 gap-4 rounded-xl bg-white px-4 pb-10 z-0`}
            >
              <div className="w-full flex justify-start items-end gap-x-3 ">
                <div>
                  <label className="text-xs">Buscar Producto</label>
                  <div className="flex gap-x-1 items-center justify-center bg-gray-100 rounded-lg pl-2">
                    <IoSearch />
                    <input
                      type="text"
                      className="w-22 text-xs font-semibold"
                      onChange={handleProduct}
                      placeholder="Ej: APA-15"
                    />
                  </div>
                </div>
              </div>

              <table
                id="my-table"
                className="col-span-2 w-full text-sm text-left text-gray-500 "
              >
                <thead className="text-2xs text-gray-500">
                  <tr className="border-b font-normal text-2xs border-gray-100">
                    <th scope="col" className="p-1 rounded-ss-lg">
                      Producto
                    </th>
                    <th scope="col" className="p-1">
                      Nombre
                    </th>
                    <th scope="col" className="p-1">
                      Presentacion
                    </th>
                    <th scope="col" className="p-1 ">
                      Lote
                    </th>
                    {/* <th scope="col" className="p-1 ">
                      Cantidad
                    </th> */}

                    <th scope="col" className="p-1 ">
                      Conteo
                    </th>
                    <th scope="col" className="p-1 ">
                      Total
                    </th>
                    {/* <th scope="col" className="p-1 rounded-se-lg">
                      Diferencia
                    </th>
                    <th scope="col" className="p-1 ">
                      Causal
                    </th>
                    <th scope="col" className="p-1 rounded-se-lg">
                      Observación
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {information
                    .filter((info) => {
                      if (searchTerm == "") {
                        return info;
                      } else if (info.PRODUCTO.includes(searchTerm)) {
                        return info;
                      }
                    })
                    .map((info: IInventory) => (
                      <UserCard info={info} key={info._id} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res1 = await fetch(
    "https://alert-products-galpon.vercel.app/api/inventory"
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    "https://alert-products-galpon.vercel.app/api/products"
  );
  const data2 = await res2.json();

  const res3 = await fetch(
    "https://alert-products-galpon.vercel.app/api/causes"
  );
  const data3 = await res3.json();

  return {
    props: { data1, data2, data3 },
  };
}
