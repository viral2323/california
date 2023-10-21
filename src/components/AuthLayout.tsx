import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
function AuthLayout() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <img
                src="https://wildlife.ca.gov/Portals/0/header_organization.png?ver=2019-07-25-175107-923"
                alt="CDFW"
                style={{ height: "50px" }}
              />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default AuthLayout;
