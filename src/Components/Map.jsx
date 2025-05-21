// Map.jsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// آیکون پیش‌فرض Leaflet رو درست می‌کنیم
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({ position }) {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhZGIwZGExNDRlMjYyM2VhYTc0YzM2NDQ0MTFkYzE2MjE4NjQzY2M5YmRmNWQ5YWM0NDY3NGI3YjZhMTE3OGMzZjhlN2I4M2Q5Y2JlN2EzIn0";
  const mapirTileUrl = `https://map.ir/vector/?x={x}&y={y}&z={z}&apikey=${token}`;

  if (!position) return null;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={mapirTileUrl} attribution='© <a href="https://map.ir/">Map.ir</a>' />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
