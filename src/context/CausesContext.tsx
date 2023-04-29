import { createContext, useState, ReactNode } from "react";

interface CausesContextProviderProps {
  children: ReactNode;
}

interface ICauses {
  type: string;
  description: string;
}

interface IContext {
  causes: ICauses[];
  setCauses: React.Dispatch<React.SetStateAction<ICauses[]>>;
}

export const causesContext = createContext<IContext>({
  causes: [],
  setCauses: () => [],
});

export const CausesContextProvider = ({
  children,
}: CausesContextProviderProps) => {
  const [causes, setCauses] = useState<ICauses[]>([]);

  return (
    <causesContext.Provider value={{ causes, setCauses }}>
      {children}
    </causesContext.Provider>
  );
};
