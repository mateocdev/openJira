import { useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

import { useSnackbar } from "notistack";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({
      type: "[Entries] Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackBar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      if (showSnackBar) {
        enqueueSnackbar("Entry updated", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
      dispatch({
        type: "[Entries] Entry-updated",
        payload: data,
      });
    } catch ({ error }: any) {
      console.log(error);
    }
  };

  const deleteEntry = async ({ _id }: Entry, showSnackBar = false) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
      if (showSnackBar) {
        enqueueSnackbar("Entry deleted", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
      dispatch({
        type: "[Entries] Entry-deleted",
        payload: data,
      });
    } catch ({ error }: any) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = (await entriesApi.get<Entry[]>("/entries")) || {};
    dispatch({
      type: "[Entries] Refresh-Data",
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
