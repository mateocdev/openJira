import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h6">GymTable 🦾</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
