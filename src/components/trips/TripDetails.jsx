import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTripById } from "../services/tripServices";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

export const TripDetails = () => {
  //set state for trip, useParams for tripId
  const [trip, setTrip] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getTripById(id).then(setTrip);
  }, [id]);

  return (
    <div>
      <div className="pl-2 border rounded-md">
        <div className="flex pt-2 text-2xl">{trip.name}</div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 mt-2"
          style={{ backgroundColor: trip.color }}
        />
        <div className= "flex flex-col text-sm">
          <p>{trip.trip_type?.name} |{" "}
          {new Date(trip.start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
            </p>
        <div className="pt-2">{trip.description}</div>
          <ChevronRightIcon className="ml-auto w-5 h-5 self-center text-gray-400" />
        </div>
      </div>
      <div className="flex justify-center border border-dashed rounded-md p-2 mt-20">
        {" "}
        Place Holder for Map{" "}
      </div>
      <div className="mt-10 mb-4">Stops ({trip.stops?.length})</div>
      {trip.stops?.map((stop) => (
        <Link to={`stops/${stop.id}`} key={stop.id}>
          <div key={stop.id} className="flex flex-col border rounded-md">
            <div className="flex m-2">
              <div
                className="flex w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: trip.color }}
              />
              <div>
                <p className="ml-2">{stop.name}</p>
                <p className="text-sm pl-4">
                  {stop.city}, {stop.country} -{" "}
                  {new Date(stop.visited_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex ml-auto text-sm pr-2">
                {stop.categories?.map((category) => (
                  <p key={category.id} className="border rounded-md p-1 m-1">
                    {category.name}
                  </p>
                ))}
                <ChevronRightIcon className="ml-auto w-5 h-5 self-center text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
