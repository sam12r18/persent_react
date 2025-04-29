import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2';

const MapComponent = ({ onLocationSelect }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIn0.eyJhdWQiOiIzMTgwNyIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIiwiaWF0IjoxNzQ0MDA0NDE4LCJuYmYiOjE3NDQwMDQ0MTgsImV4cCI6MTc0NjU5NjQxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OlK5QjFKSc5PbqExMIVa48BeEOuKEkP_WxYZJUsjN2_2qviR4mQJc5Ncr1zo-nnR-fLogZ577AtEsk5VgHJzvjySzfNcLfsUaovnc3yOhmf54KT4DyCsOIpg0lqXIZkcGlgOX_-NfPqM0DGsrnj12QMvC6U8a18buohDectsn1WfN6WHDsAUinCtpaqG8954h2emNxOZMSeaucCXqE589sNA1cwvBdpZ7CgtMbhUHLb57YgiN5CDsuE_gdOG2oG48s-pB3s6O0G0gRDyboxjUxMDDyaW7E_zZLHViVQ99x7EQeWX5eZGo6I8ejXkGR47P0KHRvpOZ5ZO-Yls-rZKdw';

    const checkUserLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            // مختصات مرزهای ایران
            const iranBounds = {
                north: 39.777222,
                south: 25.078237,
                east: 63.316667,
                west: 44.047222
            };

            if (data.country_code !== 'IR' || 
                data.latitude < iranBounds.south || 
                data.latitude > iranBounds.north || 
                data.longitude < iranBounds.west || 
                data.longitude > iranBounds.east) {
                
                await Swal.fire({
                    title: 'هشدار',
                    text: 'لطفا VPN خود را خاموش کنید تا بتوانید از نقشه استفاده کنید.',
                    icon: 'warning',
                    confirmButtonText: 'متوجه شدم'
                });
            }
        } catch (error) {
            console.error('Error checking location:', error);
        }
    };

    useEffect(() => {
        checkUserLocation();

        if (!mapRef.current) {
            // Initialize the map
            mapRef.current = L.map('map').setView([35.6892, 51.3890], 13); // Default to Tehran

            // Add Map.ir tile layer with API key
            L.tileLayer(`https://map.ir/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png?x-api-key=${API_KEY}`, {
                attribution: 'Map data &copy; <a href="https://map.ir">Map.ir</a>',
                maxZoom: 18,
            }).addTo(mapRef.current);

            // Add click event to the map
            mapRef.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                
                // Remove existing marker if any
                if (markerRef.current) {
                    mapRef.current.removeLayer(markerRef.current);
                }

                // Add new marker
                markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
                
                // Call the callback with the selected location
                if (onLocationSelect) {
                    onLocationSelect({ lat, lng });
                }
            });
        }

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
                marginTop: '10px'
            }} 
        />
    );
};

export default MapComponent; 