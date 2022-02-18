import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomCoords from "./CustomCoords";
import { Box, Container, Pagination } from "@mui/material";

const Draw = ({
  positions,
  setPositions,
}: {
  positions: any;
  setPositions: Function;
}) => {
  return (
    <MapContainer
      center={[48.856614, 2.3522219]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomCoords positions={positions} setPositions={setPositions} />
    </MapContainer>
  );
};

export default Draw;
