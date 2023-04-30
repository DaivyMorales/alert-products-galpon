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
}

export const causesContext = createContext<IContext>({
  causes: [],
  setCauses: () => [],
  causeChoose: "n",
  setCauseChoose: () => {},
  updateCause: async () => {},
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

  return (
    <causesContext.Provider
      value={{ causes, setCauses, causeChoose, setCauseChoose, updateCause }}
    >
      {children}
    </causesContext.Provider>
  );
};
