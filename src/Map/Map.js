import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import "./Map.css";

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 23.684994, lng: 90.356331 }}
    />
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function Location() {
  return (
    <div className="map-size">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
