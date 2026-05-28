import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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

//When stops load, FitBounds calls map.fitBounds() zooming and centering the map to fit all the users pins
const FitBounds = ({ stops }) => {
  const map = useMap();
  useEffect(() => {
    if (stops.length > 0) {
      const bounds = stops.map((stop) => [stop.latitude, stop.longitude]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, [stops, map]);
  return null;
};

export const LeafletMap = ({ stops: propStops }) => {
  // only used when no stops prop is passed (TripList — show all stops)
  const [fetchedStops, setFetchedStops] = useState([]);

  useEffect(() => {
    // if stops weren't passed in, fetch all stops (TripList case)
    // if stops were passed in (TripDetails), skip the fetch — use those directly
    if (propStops === undefined) {
      getAllStops().then(setFetchedStops);
    }
  }, [propStops]);

  // propStops comes from TripDetails (just that trip's stops)
  // fetchedStops is the fallback when LeafletMap is used without a stops prop
  const stops = propStops ?? fetchedStops;

  return (
    <MapContainer center={[36.327, -39.764]} zoom={3} scrollWheelZoom={false}>
      <FitBounds stops={stops} />
      <TileLayer
        attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${import.meta.env.VITE_THUNDERFOREST_API_KEY}`}
        maxZoom={22}
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.latitude, stop.longitude]}
          //call createPinIcon function and pass it the trip_color
          icon={createPinIcon(stop.trip_color)}
        >
          <Popup className="custom-popup-bg">
            <p className="flex justify-center font-bold text-lg text-earthGreen">
              {stop.name}
            </p>
            <p className="text-darkBrown font-medium">
              {stop.city}, {stop.country} -{" "}
              {new Date(stop.visited_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-darkBrown font-medium">Part of: {stop.trip_name}</p>
            <div className="flex">
              {stop.categories?.map((category) => (
                <div
                  key={category.id}
                  className="border bg-lightGreen text-darkBrown rounded-md px-0.5 mx-0.5"
                >
                  {category.name}
                </div>
              ))}
            </div>
            <Link to={`/trips/${stop.trip_id}`} className="flex pt-4 !text-earthGreen hover:!text-lunarGoldHover">
              View trip details
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
