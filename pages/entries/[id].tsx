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
import { EntryStatus } from "../../interfaces";

import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
const validStatus: EntryStatus[] = ["pending", "in-progress", "done"];

interface Props {
  id: string;
}

export const EntryPage: FC = (props) => {
  console.log({ props });
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("pending");
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onSave = () => {
    console.log({ inputValue, status });
  };

  return (
    <Layout title="Entry Page">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Exercise Control: ${inputValue}`}
              subheader={`Create at:`}
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
                  onChange={(e) => setStatus(e.target.value)}
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

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id, // will be passed to the page component as props
    },
  };
};

export default EntryPage;
