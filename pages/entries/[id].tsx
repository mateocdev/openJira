import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import { Entry, EntryStatus } from "../../interfaces";

import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { EntriesContext } from "../../context/entries";
import { dbEntries } from "../../database";
const validStatus: EntryStatus[] = ["pending", "in-progress", "done"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const {
    description = "",
    status: statusEntry = "pending",
    createdAt = Date.now(),
  } = entry || {};

  const [inputValue, setInputValue] = useState(description);
  const [status, setStatus] = useState(statusEntry);
  const [touched, setTouched] = useState(false);

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Exercise Control:`}
              subheader={`Create at: ${format(createdAt, "MM/dd/yyyy")}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="Entry"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText={isNotValid && "This field is required"}
                onBlur={() => setTouched(true)}
                error={isNotValid && touched}
              />

              <FormControl>
                <FormLabel>State:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EntryStatus)}
                >
                  {(validStatus || []).map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={isNotValid}
              >
                {" "}
                Save{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={() => deleteEntry(entry, true)}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry, // will be passed to the page component as props
    },
  };
};

export default EntryPage;
