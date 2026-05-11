import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTripById } from "../services/tripServices";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { TripForm } from "./TripForm";

export const TripDetails = () => {
  //set state for trip, useParams for tripId
  const [trip, setTrip] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  //catch and redirect if trip id does not belong to user or is not found
  useEffect(() => {
    getTripById(id).then((data) => {
      if (data.reason === "Not found") {
        navigate('/');
      } else {
        setTrip(data)
      }
    })
  }, [id, navigate])

  const refetchTrip = () => {
    getTripById(id).then(setTrip)
  };

  if (!trip) return <p>Loading...</p>;

  return (
    <div>
      <Link to={`/`} className="flex text-md mb-10">
        <ChevronLeftIcon className="w-5 h-5 text-gray-400"/>Back to My Trips</Link>
      <div className="flex flex-col pl-2 pb-8 border rounded-md ">
        <div className="flex pt-2 text-2xl">{trip.name}
        <div className="flex ml-auto m-2 gap-2 text-sm">
        <div className="border rounded-md px-4">
              <button onClick={() => setIsEditModalOpen(true)}> Edit</button>
          </div>
        <div className="border rounded-md px-4">
          <button>Delete</button>
          </div>
          </div>
          </div>
        <div className="flex items-start gap-3 mt-2 pb-2">
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
              })} |{" "}
              {trip.is_private ? "Private" : "Public"}
            </p>
            <div className="pt-2">{trip.description}</div>
            </div>
        </div>
      </div>
      <div className="flex justify-center border border-dashed rounded-md p-2 mt-20">
        {" "}
        Place Holder for Map{" "}
      </div>
      <div className="flex flex-row mt-10 mb-4">
      <div className="">Stops ({trip.stops?.length})</div>
        <button className="border rounded-md px-4 ml-auto">+ Add Stop</button>
        </div>
      {trip.stops?.map((stop) => (
        <Link to={`stops/${stop.id}`} key={stop.id}>
          <div key={stop.id} className="flex flex-col border rounded-md mb-4">
            <div className="flex m-2 items-center">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: trip.color }}
              />
              <div>
                <p className="ml-2 font-semibold">{stop.name}</p>
                <p className="text-sm pl-4">
                  {stop.city}, {stop.country} -{" "}
                  {new Date(stop.visited_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex ml-auto text-sm p-3">
                {stop.categories?.map((category) => (
                  <p key={category.id} className="border rounded-md p-1 ml-2">
                    {category.name}
                  </p>
                ))}
              </div>
            </div>
              <ChevronRightIcon className="w-5 h-5 ml-auto mb-2 text-gray-400" />
          </div>
        </Link>
      ))}
      <TripForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTripSaved={refetchTrip}
        tripToEdit={trip}
      />
    </div>
  );
};
