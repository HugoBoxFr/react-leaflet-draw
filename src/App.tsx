import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";
import DrawPage from "./pages/Draw/DrawPage";
import CreditPage from "./pages/Credit/CreditPage";
import NavBar from "./components/Navigation/Navbar";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  layer: {
    height: "88vh",
    paddingTop: 80,
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <NavBar />

      <Box className={classes.layer}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="mapdraw" element={<DrawPage />} />
          <Route path="credit" element={<CreditPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
