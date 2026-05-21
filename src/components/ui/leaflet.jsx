import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getAllStops } from "../services/stopServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

//Have to override the leaflet set color for pins with custom divIcon
const createPinIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
      <path d="M12 0 C5.4 0 0 5.4 0 12 C0 21 12 36 12 36 C12 36 24 21 24 12 C24 5.4 18.6 0 12 0 Z"
        fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4" fill="white" opacity="0.6"/>
    </svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });

export const LeafletMap = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    getAllStops().then(setStops);
  }, []);

  return (
    <MapContainer center={[36.327, -39.764]} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.latitude, stop.longitude]}
          //call createPinIcon function and pass it the trip_color
          icon={createPinIcon(stop.trip_color)}
        >
          <Popup>
            <p className="flex justify-center font-bold">
              {stop.name}
              </p>
            <p>
              {stop.city}, {stop.country} -{" "}
              {new Date(stop.visited_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="">Part of: {stop.trip_name}</p>
            <div className="flex">
              {stop.categories?.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-md px-0.5 mx-0.5"
                >
                  {category.name}
                </div>
              ))}
            </div>
            <Link to={`/trips/${stop.trip_id}`} className="flex pt-4">
              View trip details<ChevronRightIcon className="w-4 h-4"/>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
