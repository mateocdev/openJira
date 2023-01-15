import { List, Paper } from "@mui/material";
import React, { FC, useContext, useMemo } from "react";
import { EntryCard } from ".";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";

import styles from "./EntryList.module.scss";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { isDragging, setDragging } = useContext(UIContext);

  const { entries, updateEntry } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => (entries || []).filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData("text/plain");

    const entry = (entries || []).find((entry) => entry._id === entryId)!;

    updateEntry({ ...entry, status });
    setDragging(false);
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={(e) => e.preventDefault()}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
