import { createContext, ReactNode, useState } from "react";

interface AlertContextProps {
  children: ReactNode;
}

interface IContext {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const alertContext = createContext<IContext>({
  showAlert: false,
  setShowAlert: () => {},
});

export const AlertContextProvider = ({ children }: AlertContextProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <alertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </alertContext.Provider>
  );
};
