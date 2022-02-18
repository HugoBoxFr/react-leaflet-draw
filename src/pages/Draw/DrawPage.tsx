import React, { ChangeEvent, useEffect, useState } from "react";
import Draw from "../../components/Draw/Draw";
import SelectedCity from "../../components/Draw/SelectedCity";
import { Box, Container, Pagination } from "@mui/material";
import "./DrawPage.css";
import draw1 from "./../../assets/img/draw1.png";
import importGeo from "./../../assets/img/importGeo.png";
import removeGeo from "./../../assets/img/removeGeo.png";
import logo from "./../../assets/img/Leaflet_logo.svg.png";

const DrawPage = () => {
  const [positions, setPositions] = useState<any>(null);
  const [page, setPage] = useState(1);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleContent = () => {
    switch (page) {
      case 2:
        return <Content2 />;
      case 3:
        return <Content3 />;
      case 4:
        return <Content4 />;
      default:
        return <Content1 />;
    }
  };

  useEffect(() => {
    if (page) handleContent();
  }, [page]);

  const Content1 = () => {
    return (
      <Box display="flex" justifyContent="space-between">
        <Box style={{ marginBottom: 35 }}>
          <h2 style={{ marginRight: 20 }}>Package </h2>
          <a
            href="https://www.npmjs.com/package/react-leaflet-draw"
            target="_blank"
            rel="noreferrer"
          >
            <strong>react-leaflet-draw</strong>
          </a>
        </Box>

        <Box style={{ marginBottom: 35 }}>
          <h2>FeatureGroup</h2>
          <p>
            <strong style={{ marginRight: 5 }}>ref: reactFGref</strong> {"=>"}{" "}
            setEditableFG(reactFGref)
          </p>
        </Box>

        <Box>
          <h2>EditControl</h2>
          <p>
            <strong style={{ marginRight: 5 }}>Draw :</strong> marker ||
            rectangle || circle || polygon || polyline || circlemarker
          </p>
          <p>
            <strong style={{ marginRight: 5 }}>Methods :</strong> onCreated ||
            onDraw || onEdited || onDeleted ...
          </p>
          <p>
            <strong style={{ marginRight: 5 }}>Position :</strong> topright ||
            topleft || bottomright || bottomleft
          </p>
        </Box>
      </Box>
    );
  };

  const Content2 = () => {
    return (
      <Box>
        <h2 style={{ marginRight: 20 }}>GeoJson example</h2>
        <Box display="flex" justifyContent="center">
          <img src={draw1} alt="" />
        </Box>
      </Box>
    );
  };
  const Content3 = () => {
    return (
      <Box>
        <h2 style={{ marginRight: 20 }}>Import & Edition</h2>
        <Box>
          <p>
            <strong>L from leaflet</strong> : accès aux propriétés & méthodes
          </p>
          <Box>
            <img src={importGeo} alt="" />
          </Box>
        </Box>
      </Box>
    );
  };

  const Content4 = () => {
    return (
      <Box>
        <h2 style={{ marginRight: 20 }}>Delete</h2>
        <Box>
          <img src={removeGeo} alt="" />
        </Box>
      </Box>
    );
  };

  return (
    <Container style={{ height: "100%" }}>
      <h2>About Leaflet Draw</h2>
      <Box width="100%" display="flex" flexDirection="column">
        <Box style={{ height: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ marginBottom: 20 }}
          >
            <Box
              className="content"
              style={{ flex: 1, height: "370px", marginRight: "20px" }}
            >
              <Box className="map">
                <Draw positions={positions} setPositions={setPositions} />
              </Box>
            </Box>
            <Box
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SelectedCity positions={positions} setPositions={setPositions} />
            </Box>
          </Box>
          <Box>{handleContent()}</Box>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ position: "absolute", bottom: 10, right: 10 }}
        >
          <Pagination count={4} page={page} onChange={handleChange} />
        </Box>
      </Box>

      <Box style={{ position: "absolute", bottom: 10, left: 10 }}>
        <img src={logo} alt="" style={{ width: 150 }} />
      </Box>
    </Container>
  );
};

export default DrawPage;
