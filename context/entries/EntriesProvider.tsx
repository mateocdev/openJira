import { FC, useReducer, useEffect } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({
      type: "[Entries] Add-Entry",
      payload: newEntry,
    });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: "[Entries] Entry-updated",
      payload: entry,
    });
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
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
