import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: any;
}

export const Layout: FC<Props> = ({ title = "GymTable", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
