import React, { useContext, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { BiArrowBack } from "react-icons/bi";
import { alertContext } from "@/context/AlertContext";
import CausesCard from "@/components/causes/CausesCard";
import { useRouter } from "next/router";
import { causesContext } from "@/context/CausesContext";

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

  useEffect(() => {
    setCauses(data);
  }, []);

  const router = useRouter();

  return (
    <div>
      <div>
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
        <div className=" flex flex-col justify-center items-center  ">
          <div className="-mt-52 mx-auto  px-8  flex justify-center items-start flex-col gap-y-3 mb-10  rounded-xl  py-5 z-10">
            <div className="flex  flex-col gap-y-2 ">
              <h1>Tabla de causales</h1>
              <p>
                Añade una nueva Causal en el boton de <br></br> + Crear Nuevo
              </p>
            </div>
            <div
              className={`relative overflow-x-auto  grid grid-cols-2   gap-4 rounded-xl  px-4 py-5`}
            >
              <div className="col-span-2 grid grid-cols-1 gap-2 ">
                <button className="w-full">Crear nueva causal</button>
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
