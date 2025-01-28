import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";

import "./application.css";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [10.6, 59.9]` brings us to "null island"
useGeographic();

// Here we create a Map object. Make sure you `import { Map } from "ol"`. Otherwise, the standard Javascript
//  map data structure will be used
const map = new Map({
  // The map will be centered on a position in longitude (x-coordinate, east) and latitude (y-coordinate, north),

  view: new View({ center: [10.8, 59.9], zoom: 13 }),
});

// A functional React component
const osmLayer = new TileLayer({ source: new OSM() });

const stadiaLayer = new TileLayer({
  source: new StadiaMaps({ layer: "stamen_watercolor" }),
});

export function Application() {
  const [layers, setLayers] = useState([osmLayer]);
  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "osm") setLayers([osmLayer]);
    else if (e.target.value === "stadia") setLayers([stadiaLayer]);
  }

  // This is the location (in React) where we want the map to be displayed
  return (
    <>
      <nav>
        <select onChange={handleChange}>
          <option value="osm">Open Street Map</option>
          <option value="stadia">Stadia</option>
        </select>
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
