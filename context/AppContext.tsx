"use client";

import { createContext, useContext, useState } from "react";

type AppContextType = {
  query: string;
  setQuery: (q: string) => void;
};

const AppContext = createContext<AppContextType>({
  query: "",
  setQuery: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");

  return (
    <AppContext.Provider value={{ query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
