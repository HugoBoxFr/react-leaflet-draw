import React, { useEffect, useState } from "react";
import { Box, Container, Pagination } from "@mui/material";
import logo from "./../../assets/img/Leaflet_logo.svg.png";
import { makeStyles } from "@mui/styles";

const Credit = () => {
  const classes = useStyles();
  const [displayAd, setDisplayAd] = useState(false);
  const [displayDis, setDisplayDis] = useState(false);

  const [advantages, setAdvantages] = useState([
    {
      desc: "OpenSource",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "Communauté",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "Simple",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "Javascript",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
  ]);

  const [disadvantages, setDisadvantages] = useState([
    {
      desc: "Documentations",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "Fonctionnalités",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "Coordonnées",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      desc: "2 librairies min. pour React",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
  ]);

  const onBoxAdClick = (item: any, index: number) => {
    let newAds = advantages;
    newAds[index].style = { opacity: 1, transition: "all 1s ease-in" };
    setAdvantages([...newAds]);
  };

  const onBoxDisClick = (item: any, index: number) => {
    let newAds = disadvantages;
    newAds[index].style = { opacity: 1, transition: "all 1s ease-in" };
    setDisadvantages([...newAds]);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Box width="49%">
          <Box display="flex" justifyContent="center">
            <h2 onClick={() => setDisplayAd(!displayAd)}>Avantages</h2>
          </Box>

          {displayAd && (
            <Box className={classes.boxContainer}>
              {advantages.map((ad, index) => {
                return (
                  <Box
                    key={index}
                    className={classes.box}
                    onClick={() => onBoxAdClick(ad, index)}
                  >
                    <p style={ad.style}>{ad.desc}</p>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <div style={{ border: "1px solid grey" }}></div>
        <Box width="49%">
          <Box display="flex" justifyContent="center">
            <h2 onClick={() => setDisplayDis(!displayDis)}>Inconvénients</h2>
          </Box>

          {displayDis && (
            <Box className={classes.boxContainer}>
              {disadvantages.map((dis, index) => {
                return (
                  <Box
                    key={index}
                    className={classes.box}
                    onClick={() => onBoxDisClick(dis, index)}
                  >
                    <p style={dis.style}>{dis.desc}</p>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      <Box style={{ position: "absolute", bottom: 10, left: 10 }}>
        <img src={logo} alt="" style={{ width: 150 }} />
      </Box>
    </Container>
  );
};

export default Credit;

const useStyles = makeStyles({
  layer: {
    height: "88vh",
    paddingTop: 80,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    padding: 20,
    margin: 20,
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "grey",
    fontSize: 16,
    fontWeight: 600,
  },
});
