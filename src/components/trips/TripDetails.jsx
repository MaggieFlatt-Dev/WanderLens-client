import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTrip, getTripById } from "../services/tripServices";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { TripForm } from "./TripForm";
import { StopForm } from "../stops/StopForm";
import { DeleteDialog } from "../ui/DeleteDialog";
import { LeafletMap } from "../ui/leaflet";

export const TripDetails = () => {
  const [trip, setTrip] = useState({});
  // controls whether the edit modal is visible set to false so it doesn't show on mount
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // useParams to get the :id
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  // fetch the trip when the component loads or the id in the URL changes
  useEffect(() => {
    getTripById(id).then((data) => {
      // if the backend says the trip doesn't exist (or belongs to another user), send them home
      if (data.reason === "Not found") {
        navigate('/');
      } else {
        setTrip(data)
      }
    })
  }, [id, navigate])

  // called by TripForm after a successful save to refresh the trip data on this page
  const refetchTrip = () => {
    getTripById(id).then(setTrip)
  };

  //handle deleting a trip
  const handleDelete = () => {
    deleteTrip(trip.id).then(() => {
      navigate("/")
    })
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
              {/* sets isEditModalOpen to true, which triggers the TripForm at the bottom to open */}
              <button onClick={() => setIsEditModalOpen(true)}> Edit</button>
          </div>
        <div className="border rounded-md px-4">
              <button onClick={() => setIsDeleteConfirmOpen(true)}>Delete</button>
              <DeleteDialog
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Delete this trip?"
                message="This will permanently delete the trip and all its stops. This action cannot be undone."
              />
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
              {/* ternary: if is_private is true show "Private", otherwise show "Public" */}
              {trip.is_private ? "Private" : "Public"}
            </p>
            <div className="pt-2">{trip.description}</div>
            </div>
        </div>
      </div>
      <div className="flex justify-center">
        {LeafletMap()}
      </div>
      <div className="flex flex-row mt-10 mb-4">
      <div className="">Stops ({trip.stops?.length})</div>
        <button className="border rounded-md px-4 ml-auto" onClick={() => setModalIsOpen(true)}>+ Add Stop</button>
        </div>
      {/* relative path "stops/:id" resolves to /trips/:tripId/stops/:stopId */}
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
                  {stop.city ? `${stop.city}, ` : ""}{stop.country} - {""}
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
      {/* TripForm doubles as create and edit — passing tripToEdit puts it in edit mode */}
      <TripForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTripSaved={refetchTrip}
        tripToEdit={trip}
      />
      <StopForm isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} tripId={trip.id}
        onStopSaved={refetchTrip} />
    </div>
  );
};
