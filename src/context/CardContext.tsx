import { createContext, useState, ReactNode } from "react";

interface EntryContextProviderProps {
  children: ReactNode;
}

interface IContext {
  fieldChoose: string;
  setFieldChoose: React.Dispatch<React.SetStateAction<string>>;
}

export const cardContext = createContext<IContext>({
  fieldChoose: "",
  setFieldChoose: () => {},
});

export const CardContextProvider = ({
  children,
}: EntryContextProviderProps) => {
  const [fieldChoose, setFieldChoose] = useState<string>("");

  return (
    <cardContext.Provider value={{ fieldChoose, setFieldChoose }}>
      {children}
    </cardContext.Provider>
  );
};
