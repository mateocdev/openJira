import { FC, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "In Progress: Next.js",
      status: "in progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "Pending: React Native",
      status: "pending",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: "Done: Web3.0",
      status: "done",
      createdAt: Date.now() - 10000000000,
    },
  ],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
