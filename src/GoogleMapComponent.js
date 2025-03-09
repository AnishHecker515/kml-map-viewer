import React, { useState } from "react";
import { GoogleMap, LoadScript, Polyline, Polygon, Marker } from "@react-google-maps/api";
import { DOMParser } from "@xmldom/xmldom";
import toGeoJSON from "togeojson";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: -33.8688, lng: 151.2093 }; // Default to Sydney

const GoogleMapComponent = ({ apiKey }) => {
  const [features, setFeatures] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newFeatures = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xml = new DOMParser().parseFromString(e.target.result, "text/xml");
        const geoJson = toGeoJSON.kml(xml);

        geoJson.features.forEach((feature) => {
          newFeatures.push(feature);
        });

        setFeatures((prev) => [...prev, ...newFeatures]);
      };
      reader.readAsText(file);
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div>
        <input type="file" accept=".kml" multiple onChange={handleFileUpload} />
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {features.map((feature, index) => {
            if (feature.geometry.type === "Point") {
              return <Marker key={index} position={{ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }} />;
            } else if (feature.geometry.type === "LineString") {
              return <Polyline key={index} path={feature.geometry.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] }))} options={{ strokeColor: "blue" }} />;
            } else if (feature.geometry.type === "Polygon") {
              return <Polygon key={index} paths={feature.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] }))} options={{ fillColor: "red", fillOpacity: 0.3 }} />;
            }
            return null;
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;