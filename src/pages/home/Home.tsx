import React from "react";
import { Container } from "@mui/material";
import RegulationsPage from "../regulations/Regulations.Page";

function Home() {
  return (
    <>
      <Container maxWidth="xl">
        <RegulationsPage />
      </Container>
    </>
  );
}

export default Home;
