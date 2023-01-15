import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  formOpen: boolean;
  isDragging: boolean;
  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setShowForm: (formOpen: boolean) => void;
  setDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
