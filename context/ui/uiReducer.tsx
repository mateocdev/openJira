import { UIState } from "./";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Show form", payload: boolean }
  | { type: "UI - Dragging", payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return { ...state, sidemenuOpen: !state.sidemenuOpen };
    case "UI - Close Sidebar":
      return { ...state, sidemenuOpen: !state.sidemenuOpen };
    case "UI - Show form":
      return { ...state, formOpen: action.payload };
    case "UI - Dragging":
      return { ...state, isDragging: action.payload };
    default:
      return state;
  }
};
