import React, { useEffect, useState } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const CustomCoords = ({
  positions,
  setPositions,
}: {
  positions: any;
  setPositions: Function;
}) => {
  const [editableFG, setEditableFG] = useState<any>();
  const [onDraw, setOnDraw] = useState(false);

  const map = useMap();

  const onFeatureGroupReady = (reactFGref: any) => {
    setEditableFG(reactFGref);
  };

  useEffect(() => {
    if (editableFG && positions) {
      removeLayer();
      let leafletGeoJSON = new L.GeoJSON(positions);
      let leafletFG = editableFG;
      leafletGeoJSON.eachLayer((layer: L.Layer | any) => {
        leafletFG.addLayer(layer);
        map.fitBounds(layer.getBounds());
      });
    }
  });

  const onDrawStart = () => {
    setOnDraw(true);
  };

  const onDrawStop = (e: any) => {
    setOnDraw(false);
    setGeoPositions();
  };

  const onEditStop = () => {
    setGeoPositions();
  };

  const removeLayer = () => {
    for (let i in editableFG._layers) {
      if (editableFG._layers[i]._path !== undefined) {
        try {
          editableFG.removeLayer(editableFG._layers[i]);
        } catch (e) {
          console.log("problem with " + e + editableFG._layers[i]);
        }
      }
    }
  };

  useEffect(() => {
    if (editableFG && onDraw) {
      removeLayer();
      setPositions(null);
    }
  });

  const setGeoPositions = () => {
    let newGeoPos;
    map.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        newGeoPos = layer.toGeoJSON();
        // map.fitBounds(layer.getBounds());
      }
    });
    setPositions(newGeoPos);
  };

  return (
    <FeatureGroup
      ref={(reactFGref) => {
        onFeatureGroupReady(reactFGref);
      }}
    >
      <EditControl
        position="topright"
        onDrawStart={onDrawStart}
        onDrawStop={onDrawStop}
        onEditStop={onEditStop}
        onDeleted={() => setPositions(null)}
        // onEdited={this._onEdited}
        // onCreated={_onCreated}
        // onMounted={this._onMounted}
        // onEditStart={onEditStart}
        // onDeleteStart={this._onDeleteStart}
        // onDeleteStop={this._onDeleteStop}
        draw={
          {
            // polygon: true
            // rectangle: false,
            // circle: false,
            // polyline: false,
            // marker: false,
            // circlemarker: false,
          }
        }
      />
    </FeatureGroup>
  );
};

export default CustomCoords;
