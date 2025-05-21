import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2';

const MapComponent = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIn0...'; // توکن معتبر

  useEffect(() => {
    const initMap = (lat, lng) => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([lat, lng], 15);

        L.tileLayer(
          `https://map.ir/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png?x-api-key=${API_KEY}`,
          {
            attribution: 'Map data &copy; <a href="https://map.ir">Map.ir</a>',
            maxZoom: 18,
          }
        ).addTo(mapRef.current);

        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.',
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);

          if (onLocationSelect) {
            onLocationSelect({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'دسترسی رد شد',
            text: 'اجازه دسترسی به موقعیت مکانی داده نشد.',
          });
          console.error(error);
        }
      );
    };

    getLocation();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return (
    <div
      id="map"
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '10px',
        marginTop: '10px',
      }}
    />
  );
};

export default MapComponent;
