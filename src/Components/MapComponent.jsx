import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

mapboxgl.accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIn0.eyJhdWQiOiIzMTgwNyIsImp0aSI6IjY0NTRjOWFkZDUzNmI5ZDU1NDUzNmM3YjhhOTU1YzQ3OTNiZmFkZGU0MjU5NGEwMjIxMGMzZjIyMWRiMTg2YTdiNzlhNjU2M2E1ODA4MDdjIiwiaWF0IjoxNzQ0MDA0NDE4LCJuYmYiOjE3NDQwMDQ0MTgsImV4cCI6MTc0NjU5NjQxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OlK5QjFKSc5PbqExMIVa48BeEOuKEkP_WxYZJUsjN2_2qviR4mQJc5Ncr1zo-nnR-fLogZ577AtEsk5VgHJzvjySzfNcLfsUaovnc3yOhmf54KT4DyCsOIpg0lqXIZkcGlgOX_-NfPqM0DGsrnj12QMvC6U8a18buohDectsn1WfN6WHDsAUinCtpaqG8954h2emNxOZMSeaucCXqE589sNA1cwvBdpZ7CgtMbhUHLb57YgiN5CDsuE_gdOG2oG48s-pB3s6O0G0gRDyboxjUxMDDyaW7E_zZLHViVQ99x7EQeWX5eZGo6I8ejXkGR47P0KHRvpOZ5ZO-Yls-rZKdw";


if (
    mapboxgl.setRTLTextPlugin &&
    (!mapboxgl.getRTLTextPluginStatus ||
        mapboxgl.getRTLTextPluginStatus() === "unavailable")
) {
    mapboxgl.setRTLTextPlugin("/libs/mapbox-gl-rtl-text.js", null, true);
}

const createMarkerElement = (iconUrl, size = 50) => {
    const img = new Image(size, size);
    img.src = iconUrl;
    img.style.objectFit = "cover";
    img.style.borderRadius = "50%";
    img.style.cursor = "pointer";
    return img;
};

const createPopup = (title) =>
    new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="font-size:14px">${title}</div>`
    );

const fallbackIcons = {
    origin: "https://api.iconify.design/mdi:map-marker.svg?color=%23009688",
};

export default function MapComponent({
                                         onAddressSelect,
                                         location,
                                         restaurantLocation,
                                         customHeight,
                                     }) {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const markerRef = useRef(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "https://map.ir/vector/styles/main/mapir-style.json",
            center: [58.7958, 36.2133], // lng, lat نیشابور
            zoom: 12,
            transformRequest: (url) => ({
                url,
                headers: {
                    "x-api-key": mapboxgl.accessToken,
                    "Mapir-SDK": "reactjs",
                },
            }),
        });

        newMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        newMap.on("click", async (e) => {
            const { lng, lat } = e.lngLat;
            addMarkerAndFetchAddress(newMap, lng, lat);
        });

        setMap(newMap);
        return () => newMap.remove();
    }, []);

    const addMarkerAndFetchAddress = async (mapInstance, lng, lat) => {
        if (markerRef.current) markerRef.current.remove();

        const markerElement = createMarkerElement(fallbackIcons.origin);
        const marker = new mapboxgl.Marker({ element: markerElement })
            .setLngLat([lng, lat])
            .setPopup(createPopup(`مختصات: ${lng.toFixed(4)}, ${lat.toFixed(4)}`))
            .addTo(mapInstance);

        markerRef.current = marker;
        setLoading(true);

        try {
            const response = await axios.get(
                `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`,
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

            setAddress(addressData);

            if (onAddressSelect) {
                onAddressSelect({ address: addressData, lat, lng });
            }
        } catch (error) {
            console.error("Reverse Geocoding Error:", error);
            setAddress("خطا در دریافت آدرس");
        } finally {
            setLoading(false);
        }
    };

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            alert("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                if (map) {
                    map.flyTo({ center: [longitude, latitude], zoom: 15 });
                    addMarkerAndFetchAddress(map, longitude, latitude);
                }
            },
            (err) => {
                console.error("Geolocation Error:", err);
                alert("دسترسی به موقعیت امکان‌پذیر نیست.");
            }
        );
    };

    useEffect(() => {
        if (!map) return;

        const lng = location?.lng ?? restaurantLocation?.lng;
        const lat = location?.lat ?? restaurantLocation?.lat;

        if (lng == null || lat == null) return;

        const markerElement = document.createElement("div");
        markerElement.style.background = "#009688";
        markerElement.style.width = "50px";
        markerElement.style.height = "50px";
        markerElement.style.borderRadius = "50%";

        const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([lng, lat])
            .addTo(map);

        return () => marker.remove();
    }, [map, location, restaurantLocation]);

    return (
        <div style={{ padding: "10px" }}>
            <button
                type="button"   // ← این مهمه
                onClick={handleMyLocation}
                style={{
                    marginBottom: "10px",
                    padding: "8px 12px",
                    background: "#009688",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                📍 موقعیت من
            </button>

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
