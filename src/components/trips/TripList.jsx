import { useEffect, useState } from "react";
import { TripForm } from "./TripForm";
import { getTrips } from "../services/tripServices";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { LeafletMap } from "../ui/leaflet";

export const TripList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  const fetchTrips = () => {
    getTrips().then(setTrips);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl">My Trips</h2>
        <button
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          onClick={() => setModalIsOpen(true)}
        >
          + New Trip
        </button>
        <TripForm
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onTripSaved={fetchTrips}
        />
      </div>
      <div className="w-full flex justify-center">
        {LeafletMap()}
      </div>
      <div className="mt-10">
        {trips.length ? (
          trips.map((trip) => (
            <Link to={`/trips/${trip.id}`} key={trip.id}>
              <div className="flex border rounded-md p-2 mt-6" value={trip.id}>
                <div
                  className="w-8 h-8 rounded-full mt-2"
                  style={{ backgroundColor: trip.color }}
                />
                <div className="flex flex-col">
                  <div className="text-xl pl-4">{trip.name}</div>
                  <div className="flex pl-4 pt-2 text-sm">
                    {trip.trip_type?.name} | {""} Started{" "}
                    {new Date(trip.start_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    | {""} Stops ({trip?.stops.length})
                  </div>
                </div>
                <ChevronRightIcon className="ml-auto w-5 h-5 self-center text-gray-400" />
              </div>
            </Link>
          ))
        ) : (
            <div className="flex flex-col items-center">
          <div className="text-4xl text-center">
                Welcome! Create your first trip to get started
                <div className="flex justify-center">
            <button
              className="flex border border-gray-300 rounded w-50 px-3 py-2 text-sm justify-center mt-5"
              onClick={() => setModalIsOpen(true)}
            >
              + New Trip
                  </button>
                  </div>
              </div>
              </div>
        )}
      </div>
    </div>
  );
};
