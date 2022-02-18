import React, { useState, useEffect, ChangeEvent } from "react";
import "leaflet/dist/leaflet.css";
import { Box, Container, Pagination, Button } from "@mui/material";
import logo from "./../../assets/img/Leaflet_logo.svg.png";
import { makeStyles } from "@mui/styles";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { mapData, mapDataPolygon, mapDataPolyline } from "../../data/mapData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import lyonData from "./../../data/lyonGeoJson.json";

declare let L: any;

const icon = new L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const initialContent = [
  { id: 1, title: "About", display: "block", opacity: 1 },
  { id: 2, title: "TileLayer", display: "none", opacity: 0 },
  { id: 3, title: "OpenSource3", display: "none", opacity: 0 },
  { id: 4, title: "OpenSource4", display: "none", opacity: 0 },
  { id: 5, title: "OpenSource5", display: "none", opacity: 0 },
];

const traces = ["Markers", "Circles", "Polylines", "Polygons"];

const Map = () => {
  const classes = useStyles();
  const [content, setContent] = useState(initialContent);
  const [page, setPage] = useState(1);
  const [currentLayer, setCurrentLayer] = useState("");

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    let newContent = [
      { id: 1, title: "About", display: "block", opacity: 1 },
      { id: 2, title: "TileLayer", display: "none", opacity: 0 },
      { id: 3, title: "Points", display: "none", opacity: 0 },
      { id: 4, title: "Itinéraires", display: "none", opacity: 0 },
      { id: 5, title: "GeoJson", display: "none", opacity: 0 },
    ];
    for (let i = 0; i < value; i++) {
      newContent[i].opacity = 1;
    }
    setContent(newContent);
  };

  const handleTraceBtn = () => {
    switch (currentLayer) {
      case "Markers":
        return <CustomMarkerMap />;
      case "Circles":
        return <CustomCircleMap />;
      case "Polygons":
        return <CustomPolyGonMap />;
      case "Polylines":
        return <CustomPolylineMap />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (currentLayer) handleTraceBtn();
  }, [currentLayer]);

  useEffect(() => {
    return () => setContent(initialContent);
  }, []);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e: any) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });

      return () => {};
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here.</Popup>
      </Marker>
    );
  };

  const CustomMarkerMap = () => {
    return (
      <Box>
        {mapData &&
          mapData.map((pos: any, index: number) => (
            <Marker position={pos.coords} icon={greenIcon} key={index}>
              <Popup>
                <p>
                  {`Latitude: ${pos.coords[0]}`}
                  <br />
                  {`Longitude: ${pos.coords[1]}`}
                </p>
              </Popup>
            </Marker>
          ))}
      </Box>
    );
  };

  const CustomCircleMap = () => {
    const map = useMap();

    useEffect(() => {
      let layers: L.Layer[] = [];
      if (currentLayer === "Circles") {
        mapData.map((pos: any, index: number) => {
          return (layers[index] = L.circle(pos.coords, {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 900,
          }).addTo(map));
        });
      }

      return () => {
        layers.map((layer: L.Layer) => {
          return map.removeLayer(layer);
        });
      };
    }, [map]);

    return null;
  };

  const CustomPolyGonMap = () => {
    const map = useMap();

    useEffect(() => {
      let layers: L.Layer[] = [];
      if (currentLayer === "Polygons") {
        mapDataPolygon.map((pos: any, index: number) => {
          return (layers[index] = L.polygon(pos.coords).addTo(map));
        });
      }

      return () => {
        layers.map((layer: L.Layer) => {
          return map.removeLayer(layer);
        });
      };
    }, [map]);

    return null;
  };

  const CustomPolylineMap = () => {
    const map = useMap();

    useEffect(() => {
      let layers: L.Layer[] = [];
      if (currentLayer === "Polylines") {
        mapDataPolyline.map((pos: any, index: number) => {
          return (layers[index] = L.polyline(pos.coords, {
            color: "coral",
          }).addTo(map));
        });
      }

      return () => {
        layers.map((layer: L.Layer) => {
          return map.removeLayer(layer);
        });
      };
    }, [map]);

    return null;
  };

  const Itinary = () => {
    let map: any = useMap();

    useEffect(() => {
      let wayControl: any;
      if (map) {
        wayControl = L.Routing.control({
          waypoints: [
            L.latLng(45.7517169157995, 4.8491461989864675),
            L.latLng(45.7589826062416, 4.833685880307574),
            L.latLng(45.74549275563128, 4.827052770042111),
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [
              {
                color: "blue",
                opacity: 0.6,
                weight: 4,
              },
            ],
          },
          // serviceUrl: "http://router.project-osrm.org/route/v1",
          addWaypoints: false,
          draggableWaypoints: false,
          createMarker: function (i: number, waypoint: any, n: number) {
            const marker = L.marker(waypoint.latLng, {
              draggable: true,
              bounceOnAdd: false,
              icon: icon,
            });
            return marker;
          },
        }).addTo(map);
      }
      return () => map.removeControl(wayControl);
    }, [map]);

    return null;
  };

  const CustomGeoJsonMap = () => {
    const map: any = useMap();

    useEffect(() => {
      let layers: L.Layer[] = [];
      lyonData.features.map((pos: any, index: number) => {
        return (layers[index] = L.geoJSON(pos, {
          onEachFeature: function (feature: any, layer: any) {
            layer.bindPopup("<p>" + feature.properties.nom + "</p>");
          },
        }).addTo(map));
      });

      return () => {
        layers.map((layer: L.Layer) => {
          return map.removeLayer(layer);
        });
      };
    }, [map]);

    return null;
  };

  return (
    <Container style={{ height: "100%" }}>
      <Box height="100%" width="100%" display="flex" flexDirection="column">
        <Box style={{ flex: 1 }}>
          <Box
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-around"
              style={{ marginBottom: 20 }}
            >
              {content.map((item, index) => {
                return (
                  <p
                    key={index}
                    style={{
                      opacity: item.opacity,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    className="fontMont"
                  >
                    {item.title}
                  </p>
                );
              })}
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              style={{ height: 500, width: "100%", position: "relative" }}
            >
              <Box
                height="100%"
                width="80%"
                style={{
                  border: "solid",
                  borderColor: "grey",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <MapContainer
                  center={[48.856614, 2.3522219]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <LocationMarker />

                  {page >= 2 && (
                    <LayersControl position="bottomright">
                      <LayersControl.BaseLayer
                        checked
                        name="OpenStreetMap Light"
                      >
                        <TileLayer
                          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="OpenStreetMap Dark">
                        <TileLayer
                          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                          // attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</a> contributors'
                        />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="Toner">
                        <TileLayer url="http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png" />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="Water Color">
                        <TileLayer url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg" />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="Terrain">
                        <TileLayer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg" />
                      </LayersControl.BaseLayer>

                      <LayersControl.BaseLayer name="Cycle">
                        <TileLayer url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png" />
                      </LayersControl.BaseLayer>
                    </LayersControl>
                  )}

                  {page === 3 && handleTraceBtn()}
                  {page === 4 && <Itinary />}
                  {page === 5 && <CustomGeoJsonMap />}
                </MapContainer>
              </Box>
              {page === 2 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 15,
                    right: 0,
                    width: 100,
                    height: 50,
                  }}
                >
                  <ArrowBackIcon fontSize="large" className="animVertical" />
                </div>
              )}

              {page === 3 && (
                <div
                  style={{
                    position: "absolute",
                    top: 25,
                    right: 0,
                    width: 100,
                  }}
                >
                  {traces.map((trace, index) => (
                    <Button
                      variant="contained"
                      key={index}
                      style={{ marginBottom: 5 }}
                      onClick={() => setCurrentLayer(trace)}
                    >
                      {trace}
                    </Button>
                  ))}
                </div>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ position: "absolute", bottom: 10, right: 10 }}
        >
          <Pagination count={5} page={page} onChange={handleChange} />
        </Box>
      </Box>

      <Box style={{ position: "absolute", bottom: 10, left: 10 }}>
        <img src={logo} alt="" style={{ width: 150 }} />
      </Box>
    </Container>
  );
};

export default Map;

const useStyles = makeStyles({});
