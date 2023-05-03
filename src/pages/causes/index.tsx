import React, { useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { BiArrowBack } from "react-icons/bi";
import { alertContext } from "@/context/AlertContext";
import CausesCard from "@/components/causes/CausesCard";
import CauseNew from "@/components/causes/CauseNew";
import { useRouter } from "next/router";
import { causesContext } from "@/context/CausesContext";
import { BiArrowToRight } from "react-icons/bi";

interface MyProps {
  data: ICauses[];
}

interface ICauses {
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomeProduct({ data }: MyProps) {
  const { showAlert, setShowAlert } = useContext(alertContext);
  const { causes, setCauses } = useContext(causesContext);

  const [showNew, setShowNew] = useState<boolean>(false);

  useEffect(() => {
    setCauses(data);
  }, []);

  const router = useRouter();

  return (
    <div>
      <div>
        <div className="gradientDiv "></div>
        <div className=" flex flex-col justify-center items-center  ">
          <div className="-mt-52 mx-auto  px-8  flex justify-center items-start flex-col gap-y-3 mb-10  rounded-xl  py-5 z-10">
            <div className="flex  flex-col gap-y-2 ">
              <div className="text-purple-700  flex justify-start px-4 py-3 items-center gap-x-1 ">
                <BiArrowBack size={18} />
                <h4
                  onClick={() => router.push("/")}
                  className="text-purple-700 text-sm cursor-pointer"
                >
                  Ir a inventario
                </h4>
              </div>
              <h1>Tabla de causales</h1>
              <p>
                Añade una nueva Causal en el boton de <br></br> + Crear Nueva
                Causal
              </p>
            </div>
            <div
              className={`relative overflow-x-auto  grid grid-cols-2   gap-4 rounded-xl  px-4 py-5`}
            >
              <div className="col-span-2 grid grid-cols-1 gap-2 ">
                <button className="w-full" onClick={() => setShowNew(!showNew)}>
                  Crear nueva causal
                </button>
                {showNew ? (
                  <CauseNew showNew={showNew} setShowNew={setShowNew} />
                ) : (
                  ""
                )}
                {causes.map((cause) => (
                  <CausesCard cause={cause} key={cause._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
