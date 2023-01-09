import { createContext } from "react";

interface ContextProps {
  entries: [];
  // Methods
}

export const EntriesContext = createContext({} as ContextProps);
