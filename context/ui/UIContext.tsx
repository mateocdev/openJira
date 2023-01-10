import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  formOpen: boolean;
  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setShowForm: (formOpen: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
