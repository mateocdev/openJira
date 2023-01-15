import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {


  const { setDragging } = useContext(UIContext);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", entry._id);
    setDragging(true);
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDragging(false);
  };

  const { description } = entry;
  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: "2" }}
        >
          <Typography variant="body2">Hace 30 mins</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
