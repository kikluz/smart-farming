import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationMarker = ({ location, weather, onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect(e.latlng);
      }
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return location === null ? null : (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        {location.address}
        <br />
        Temperature:{" "}
        {weather?.current?.temp ? Math.round(weather.current.temp) : "N/A"}
        °C
      </Popup>
    </Marker>
  );
};

const MapComponent = ({ location, weather, onLocationSelect }) => {
  return (
    <MapContainer
      center={[location?.lat || 20.5937, location?.lng || 78.9629]}
      zoom={6}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker
        location={location}
        weather={weather}
        onLocationSelect={onLocationSelect}
      />
    </MapContainer>
  );
};

export default MapComponent;
