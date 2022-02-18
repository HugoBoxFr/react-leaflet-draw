import { Container, Box } from "@mui/material";
import React from "react";
import logo from "./../../assets/img/Leaflet_logo.svg.png";

const Home = () => {
  return (
    <Container style={{ height: "100%" }}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Box
            style={{ width: "70%" }}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <img src={logo} alt="" style={{ width: "100%" }} />
            <h2>A JavaScript library for interactive maps</h2>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
