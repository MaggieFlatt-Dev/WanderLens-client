import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../services/tripServices";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

export const PhotoTripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  return (
    <div className="bg-earthGreen min-h-screen pb-12">
      <div className="px-12 pt-4">
        <h2 className="text-2xl font-bold text-cream antialiased">Photos</h2>
        <p className="text-mustard antialiased">
          Pick a trip to see all its photos.
        </p>
      </div>
      <div className="mt-10 px-10">
        {trips.length ? (
          trips.map((trip) => (
            <Link to={`/photos/${trip.id}`} key={trip.id}>
              <div className="flex bg-cream border hover:bg-lightCaramel rounded-md p-2 mt-6">
                <div
                  className="w-8 h-8 rounded-full mt-2 border"
                  style={{ backgroundColor: trip.color }}
                />
                <div className="flex flex-col">
                  <div className="text-2xl font-md pl-4 text-earthGreen antialiased">
                    {trip.name}
                  </div>
                  <div className="flex pl-4 pt-2 text-md text-mustard antialiased">
                    Stops ({trip.stops?.length || 0})
                  </div>
                </div>
                <ChevronRightIcon className="ml-auto w-5 h-5 self-center text-mustard" />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-cream antialiased text-center text-2xl">
            No trips yet. Create a trip to start adding photos.
          </p>
        )}
      </div>
    </div>
  );
};
