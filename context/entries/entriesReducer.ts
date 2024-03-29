import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entries] Add-Entry"; payload: Entry }
  | { type: "[Entries] Entry-updated"; payload: Entry }
  | { type: "[Entries] Refresh-Data"; payload: Entry[] }
  | { type: "[Entries] Entry-deleted"; payload: Entry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entries] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entries] Entry-updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case "[Entries] Entry-deleted":
      return {
        ...state,
        entries: [...state.entries],
      };

    case "[Entries] Refresh-Data":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
