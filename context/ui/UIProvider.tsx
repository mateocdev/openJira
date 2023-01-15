import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

interface UIProviderProps {
  children: React.ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
  formOpen: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  formOpen: false,
  isDragging: false,
};

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setShowForm = (formOpen: boolean) => {
    dispatch({ type: "UI - Show form", payload: formOpen });
  };

  const setDragging = (isDragging: boolean) => {
    dispatch({ type: "UI - Dragging", payload: isDragging });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        //Methods
        openSideMenu,
        closeSideMenu,
        setShowForm,
        setDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
