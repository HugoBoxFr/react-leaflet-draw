import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Pagination,
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  tableCellClasses,
  styled,
} from "@mui/material";
import Credit from "../../components/Credit/Credit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CreditPage = () => {
  const [display, setDisplay] = useState(false);
  const [rows, setRows] = useState([
    {
      title: "Google Maps",
      description:
        "Titan de la carte interactive, nombreuses fonctionnalités, API pas très simple",
      style: {
        opacity: 0,
      },
    },
    {
      title: "OpenStreetMap",
      description: "Complet, mise à jour régulière, communauté active",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      title: "OpenLayers",
      description:
        "Js, populaire, associable avec OSM, complet mais difficile à utiliser",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      title: "MapQuest",
      description: "Données OpenSource ou propriétaires",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      title: "ModestMaps",
      description: "Essentiel, extensible, simple et efficace",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
    {
      title: "MapBox",
      description: "OpenSource, cartes personnalisables",
      style: {
        opacity: 0,
        transition: "none",
      },
    },
  ]);

  const handleStyle = (index: number) => {
    let newRows = rows;
    newRows[index].style = { opacity: 1, transition: "all 1s ease-in" };
    setRows([...newRows]);
  };

  return (
    <Container style={{ height: "100%" }}>
      <Box style={{ marginBottom: 40 }}>
        <h2 onClick={() => setDisplay(!display)}>Alternatives</h2>
        {display && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {rows.length > 0 &&
                  rows.map((row, index) => (
                    <StyledTableRow
                      key={row.title}
                      onClick={() => handleStyle(index)}
                      style={row.style}
                    >
                      <StyledTableCell component="th" scope="row">
                        <strong>{row.title}</strong>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Credit />
    </Container>
  );
};

export default CreditPage;
