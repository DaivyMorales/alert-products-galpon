import { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface CausesContextProviderProps {
  children: ReactNode;
}

interface ICauses {
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IContext {
  causes: ICauses[];
  setCauses: React.Dispatch<React.SetStateAction<ICauses[]>>;
  causeChoose: string;
  setCauseChoose: React.Dispatch<React.SetStateAction<string>>;
  updateCause: (id: string, body: object) => Promise<void>;
  createCause: (values: object | undefined) => Promise<void>;
  deleteCause: (id: string) => Promise<void>;
}

export const causesContext = createContext<IContext>({
  causes: [],
  setCauses: () => [],
  causeChoose: "n",
  setCauseChoose: () => {},
  updateCause: async () => {},
  createCause: async () => {},
  deleteCause: async () => {},
});

export const CausesContextProvider = ({
  children,
}: CausesContextProviderProps) => {
  const [causes, setCauses] = useState<ICauses[]>([]);
  const [causeChoose, setCauseChoose] = useState<string>("n");

  const updateCause = async (id: string, body: object) => {
    const response = await axios.put(`/api/causes/${id}`, body);
    setCauses(
      causes.map((cause) => {
        if (cause._id === id) {
          return response.data;
        } else {
          return cause;
        }
      })
    );
  };

  const createCause = async (values: object | undefined) => {
    try {
      const response = await axios.post("/api/causes", values);
      setCauses([response.data, ...causes]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCause = async (id: string) => {
    const response = await axios.delete(`/api/causes/${id}`);
    setCauses(causes.filter((cause) => cause._id !== id));
    return response.data;
  };

  return (
    <causesContext.Provider
      value={{
        causes,
        setCauses,
        causeChoose,
        setCauseChoose,
        updateCause,
        createCause,
        deleteCause,
      }}
    >
      {children}
    </causesContext.Provider>
  );
};
