import React from "react";
import { cityData } from "../../data/cityData";
import lyonData from "./../../data/lyonGeoJson.json";
import { Box, Button } from "@mui/material";

const SelectedCity = ({
  setPositions,
}: {
  positions: any;
  setPositions: Function;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-between"
      height="370"
    >
      {lyonData.features.map((city: any, index) => {
        return (
          <Button
            key={index}
            variant="contained"
            style={{ width: 150, marginBottom: 5 }}
            onClick={() => setPositions(city)}
          >
            {city.properties.nom}
          </Button>
        );
      })}
    </Box>
  );
};

export default SelectedCity;
