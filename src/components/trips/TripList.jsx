import { useEffect, useState } from "react";
import { TripForm } from "./TripForm";
import { getTrips } from "../services/tripServices";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { LeafletMap } from "../ui/leaflet";
import { StopForm } from "../stops/StopForm";

export const TripList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  //Add new trip os StopForm knows which trip to add stop to
  const [newTrip, setNewTrip] = useState(null)

  const fetchTrips = () => {
    getTrips().then(setTrips);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="bg-earthGreen min-h-screen">
      <div className="flex justify-between px-12 pt-4">
        <h2 className="text-2xl font-bold text-cream antialiased">My Trips</h2>
        <button
          className="bg-lunarGold border border-mustard rounded px-3 py-2 text-md text-spaceNavy  antialiased hover:bg-lunarGoldHover"
          onClick={() => setModalIsOpen(true)}
        >
          + New Trip
        </button>
        <TripForm
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          //On save, the list refreshes AND newTrip gets set, which will open StopForm
          onTripSaved={(savedTrip) => {
            fetchTrips();
            setNewTrip(savedTrip)
           }}
        />
        <StopForm
          isOpen={Boolean(newTrip)}
          onClose={() => setNewTrip(null)}
          tripId={newTrip?.id}
          onStopSaved={() => {
            fetchTrips();
            setNewTrip(null)
           }}
        />
      </div>
      <div className="w-full flex justify-center">
        <LeafletMap/>
      </div>
      <div className="mt-10 px-10">
        {trips.length ? (
          trips.map((trip) => (
            <Link to={`/trips/${trip.id}`} key={trip.id}>
              <div className="flex bg-cream border hover:bg-lightCaramel rounded-md p-2 mt-6" value={trip.id}>
                <div
                  className="w-8 h-8 rounded-full mt-2 border"
                  style={{ backgroundColor: trip.color }}
                />
                <div className="flex flex-col">
                  <div className="text-2xl font-md pl-4 text-earthGreen antialiased">{trip.name}</div>
                  <div className="flex pl-4 pt-2 text-md text-mustard antialiased">
                    {trip.trip_type?.name} | {""} Started{" "}
                    {new Date(trip.start_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    | {""} Stops ({trip?.stops.length})
                  </div>
                </div>
                <ChevronRightIcon className="ml-auto w-5 h-5 self-center text-mustard" />
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
