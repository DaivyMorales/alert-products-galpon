import { cardContext } from "@/context/CardContext";
import { inventoryContext } from "@/context/InventoryContext";
import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContext";
import CausesMenu from "./menu/CausesMenu";
import { BiChevronDown } from "react-icons/bi";
import { HiSparkles, HiXCircle } from "react-icons/hi";

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

interface EntryCardProps {
  info: IInventory;
}

interface Icounter {
  CANTIDAD_CONTADA: number;
  CAUSA: string;
  OBSERVACION: string;
}

export default function InventoryCard({ info }: EntryCardProps) {
  const { productChoose, setProductChoose, products } =
    useContext(productContext);

  const { fieldChoose, setFieldChoose } = useContext(cardContext);
  const { updateInventory } = useContext(inventoryContext);
  const [presentation, setPresentation] = useState(0);

  const [counter, setCounter] = useState<Icounter>({
    CANTIDAD_CONTADA: !info.CANTIDAD_CONTADA ? 0 : info.CANTIDAD_CONTADA,
    CAUSA: !info.CAUSA ? "" : info.CAUSA._id,
    OBSERVACION: !info.OBSERVACION ? "" : info.OBSERVACION,
  });

  useEffect(() => {
    products.filter((product) => {
      product.NOMBRE === info.NOMBRE
        ? setPresentation(product.PRESENTACION)
        : "";
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      counter,
    },
    onSubmit: (values) => {
      updateInventory(info._id, values.counter);
      setCounter(values.counter);
      setProductChoose("n");
      console.log(values.counter);
    },

    enableReinitialize: true,
  });

  const TOTAL: number =
    formik.values.counter.CANTIDAD_CONTADA === 0
      ? NaN
      : presentation * counter.CANTIDAD_CONTADA;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (counter.OBSERVACION !== formik.values.counter.OBSERVACION) {
      timeoutId = setTimeout(() => {
        formik.handleSubmit();
      }, 1500);
    }
    return () => clearTimeout(timeoutId);
  }, [formik.values.counter.OBSERVACION]);

  return (
    <tr className="bg-white text-2xs z-40">
      <th scope="row" className="p-1 text-black font-medium whitespace-nowrap ">
        {info.PRODUCTO}
      </th>
      <td className="p-1 ">{info.NOMBRE}</td>
      <td className="p-1 ">
        {presentation === null || presentation === undefined
          ? "----"
          : presentation}
      </td>
      <td className="p-1 ">{info.LOTE}</td>
      <td className="p-1 ">{info.CANTIDAD}</td>
      <td className="p-1 " onClick={() => setFieldChoose(info._id)}>
        <>
          <form onSubmit={formik.handleSubmit}>
            <input
              name="counter.CANTIDAD_CONTADA"
              type="number"
              className="inputEdit text-2xs"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={
                formik.values.counter.CANTIDAD_CONTADA === 0
                  ? ""
                  : formik.values.counter.CANTIDAD_CONTADA
              }
            />
            <button type="submit" className="hidden">
              Cambiar
            </button>
          </form>
        </>
      </td>
      <td style={isNaN(TOTAL) ? { visibility: "hidden" } : {}} className="p-1 ">
        {TOTAL}
      </td>
      <td
        style={isNaN(TOTAL) ? { visibility: "hidden" } : {}}
        className={`p-1 font-medium ${
          TOTAL - info.CANTIDAD > 0 ? "text-gray-700" : "text-red-500"
        }`}
      >
        {TOTAL - info.CANTIDAD}
      </td>
      <td className="">
        <CausesMenu
          info={info}
          setCounter={setCounter}
          counter={counter}
          handleSubmit={formik.handleSubmit}
          setFieldValue={formik.setFieldValue}
        />
      </td>
      <td className="h-full p-1">
        <form onSubmit={formik.handleSubmit}>
          <textarea
            name="counter.OBSERVACION"
            placeholder="Escribe aqui la observación"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={
              formik.values.counter.OBSERVACION === ""
                ? ""
                : formik.values.counter.OBSERVACION
            }
          ></textarea>
          <button type="submit" className="hidden">
            Cambiar
          </button>
        </form>
      </td>
    </tr>
  );
}
