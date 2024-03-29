import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");

  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);

  const { setShowForm, formOpen } = useContext(UIContext);

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setShowForm(false);
    setInputValue("");
    setTouched(!touched);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {formOpen ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New exercise"
            autoFocus
            multiline
            helperText={
              touched && inputValue.length === 0 ? "This field is required" : ""
            }
            label="New exercise"
            error={touched && inputValue.length === 0}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                setShowForm(false);
                setInputValue("");
                setTouched(!touched);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setShowForm(true)}
        >
          Add new exercise 💪
        </Button>
      )}
    </Box>
  );
};
