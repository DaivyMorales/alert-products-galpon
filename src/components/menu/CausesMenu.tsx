import { causesContext } from "@/context/CausesContext";
import { useContext, useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";

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

interface Icounter {
  CANTIDAD_CONTADA: number;
  CAUSA: string;
  OBSERVACION: string;
}

interface MyProps {
  info: IInventory;
  setCounter: React.Dispatch<React.SetStateAction<Icounter>>;
  counter: Icounter;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any) => void;
}

export default function CausesMenu({
  info,
  setCounter,
  counter,
  handleSubmit,
  setFieldValue,
}: MyProps) {
  const { causes, causeChoose, setCauseChoose } = useContext(causesContext);

  const [nameCause, setNameCause] = useState<string>("");
  const [causeFound, setCauseFound] = useState<string>("");

  useEffect(() => {
    if (counter.CAUSA !== "") {
      setCauseFound(counter.CAUSA);
    } else {
    }
  }, []);

  useEffect(() => {
    const filteredCause = causes.find((Fcause) => Fcause._id === causeFound);
    if (filteredCause === undefined) {
      setNameCause("");
    } else {
      setNameCause(filteredCause.type);
    }
  }, [causeFound]);

  return (
    <div className={`${nameCause !== "" ? "w-32" : "w-9"} relative`}>
      <div
        onClick={() => {
          causeChoose !== "n" ? setCauseChoose("n") : setCauseChoose(info._id);
        }}
        className="p-1 border-1 rounded-lg flex justify-between items-center "
      >
        <div className="flex  justify-center items-center gap-x-1">
          <div
            className={`${
              nameCause !== ""
                ? "hidden"
                : "p-1 border-1 rounded-md bg-gray-300"
            }`}
          >
            <HiSparkles />
          </div>
          {nameCause}
        </div>
        <BiChevronDown />
      </div>

      {causeChoose === info._id && (
        <div className="absolute top-8 -right-30 z-10 bg-white w-32 rounded-xl shadow-md  py-3 flex flex-col ">
          <div className="pl-2">
            <h6 className="text-2xs font-semibold">Causales</h6>
          </div>
          <ul className="flex flex-col ">
            {causes.map((cause) => (
              <li
                key={cause._id}
                onClick={() => {
                  setCauseFound(cause._id);

                  setFieldValue("counter.CAUSA", cause._id);

                  handleSubmit();

                  setCauseChoose("n");
                }}
                className=" py-1 px-2 hover:bg-gray-200 text-black font-medium flex justify-start items-center gap-x-1 cursor-pointer "
              >
                <div className="p-1 border-1 rounded-md bg-gray-300">
                  <HiSparkles />
                </div>
                {cause.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
