// ----------------------------
// MapComponent.jsx
// ----------------------------
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import {useAuth} from "../../Context/AuthContext.jsx";

mapboxgl.accessToken =     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIn0.eyJhdWQiOiIzMTgwNyIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIiwiaWF0IjoxNzQ0MDA0NDE4LCJuYmYiOjE3NDQwMDQ0MTgsImV4cCI6MTc0NjU5NjQxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OlK5QjFKSc5PbqExMIVa48BeEOuKEkP_WxYZJUsjN2_2qviR4mQJc5Ncr1zo-nnR-fLogZ577AtEsk5VgHJzvjySzfNcLfsUaovnc3yOhmf54KT4DyCsOIpg0lqXIZkcGlgOX_-NfPqM0DGsrnj12QMvC6U8a18buohDectsn1WfN6WHDsAUinCtpaqG8954h2emNxOZMSeaucCXqE589sNA1cwvBdpZ7CgtMbhUHLb57YgiN5CDsuE_gdOG2oG48s-pB3s6O0G0gRDyboxjUxMDDyaW7E_zZLHViVQ99x7EQeWX5eZGo6I8ejXkGR47P0KHRvpOZ5ZO-Yls-rZKdw";


const createMarkerElement = (iconUrl, size = 50) => {
    const img = new Image(size, size);
    img.src = iconUrl;
    img.style.objectFit = "cover";
    img.style.borderRadius = "50%";
    return img;
};

const createPopup = (title) =>
    new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="font-size:14px">${title}</div>`
    );

const fallbackIcons = {
    origin: "https://api.iconify.design/mdi:map-marker.svg?color=%23009688",
};

export default function PresentMap({ customHeight, onAddressSelect }) {
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const { location , setUserLocation} = useAuth(); // لوکیشن خودکار کاربر
    setUserLocation(location)
    useEffect(() => {
        if (!location) return; // تا وقتی لوکیشن آماده نیست کاری نکن

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "https://map.ir/vector/styles/main/mapir-style.json",
            center: [location.lng, location.lat],
            zoom: 15,
            transformRequest: (url) => ({
                url,
                headers: {
                    "x-api-key": mapboxgl.accessToken,
                    "Mapir-SDK": "reactjs",
                },
            }),
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        // مارکر روی موقعیت کاربر
        const markerElement = createMarkerElement(fallbackIcons.origin);
        const marker = new mapboxgl.Marker({ element: markerElement })
            .setLngLat([location.lng, location.lat])
            .setPopup(
                createPopup(
                    `مختصات: ${location.lng.toFixed(4)}, ${location.lat.toFixed(4)}`
                )
            )
            .addTo(map);

        markerRef.current = marker;

        // درخواست reverse geocoding برای نمایش آدرس
        const fetchAddress = async () => {
            try {
                const response = await axios.get(
                    `https://map.ir/reverse/no?lat=${location.lat}&lon=${location.lng}`,
                    {
                        headers: {
                            "x-api-key": mapboxgl.accessToken,
                            "Mapir-SDK": "reactjs",
                        },
                    }
                );

                const addressData =
                    response?.data?.address_compact ||
                    response?.data?.address ||
                    "آدرس یافت نشد";

                if (onAddressSelect) {
                    onAddressSelect({ address: addressData, lat: location.lat, lng: location.lng });
                }
            } catch (err) {
                console.error("Reverse Geocoding Error:", err);
            }
        };

        fetchAddress();

        return () => {
            map.remove();
        };
    }, [location]);

    return (
        <div style={{ padding: "10px" }}>
            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: `${customHeight ?? "400px"}`,
                    borderRadius: "10px",
                    marginBottom: "10px",
                }}
            />
        </div>
    );
}
