"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map(cordinates: { lat: number; lng: number }) {
    const position = [cordinates.lat, cordinates.lng] as [number, number];

    return (
        <MapContainer
            {...({ center: position, zoom: 13, style: { height: "100%", minHeight: "350px", width: "100%" } } as any)}
        >
            <TileLayer
                {...({ 
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', 
                    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
                } as any)}
            />

            <Marker position={position} icon={redIcon}>
                <Popup>
                    <br /> Koordinat: {cordinates.lat}, {cordinates.lng}
                </Popup>
            </Marker>
        </MapContainer>
    );
}
