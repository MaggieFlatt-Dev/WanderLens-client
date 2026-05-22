import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStop, getStopById } from "../services/stopServices";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { DeleteDialog } from "../ui/DeleteDialog";
import { StopForm } from "./StopForm";
import { LeafletMap } from "../ui/leaflet";

export const StopDetails = () => {
  const { id, stopId } = useParams();
  const [stop, setStop] = useState({});
  // controls whether the edit modal is visible set to false so it doesn't show on mount
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();

  // fetch the stop when the component loads or the id in the URL changes
  useEffect(() => {
    getStopById(stopId).then((data) => {
      // if the backend says the stop doesn't exist (or belongs to another user), send them back to trip detail page
      if (data.reason === "Not found") {
        navigate(`/trips/${id}`);
      } else {
        setStop(data);
      }
    });
  }, [stopId, navigate, id]);

  // called by StopForm after a successful save to refresh the trip data on this page
  const refetchStop = () => {
    getStopById(stopId).then(setStop);
  };

  const handleDelete = () => {
    deleteStop(stop.id).then(() => {
      navigate(`/trips/${id}`);
    });
  };

  return (
    <div>
      <Link to={`/trips/${id}`} className="flex text-md mb-10">
        <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
        Back to {stop.trip_name}
      </Link>
      <div className="flex flex-col pl-2 pb-8 border rounded-md ">
        <div className="flex pt-2 text-2xl">
          {stop.name}
          <div className="flex ml-auto m-2 gap-2 text-sm">
            <div className="border rounded-md px-4">
              {/* sets isEditModalOpen to true, which triggers the TripForm at the bottom to open */}
              <button onClick={() => setIsEditModalOpen(true)}> Edit</button>
            </div>
            <div className="border rounded-md px-4">
              <button onClick={() => setIsDeleteConfirmOpen(true)}>
                Delete
              </button>
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
            className="w-4 h-4 rounded-full flex-shrink-0 mt-2"
            style={{ backgroundColor: stop.trip_color }}
          />
          <div className="flex flex-col text-sm">
            {stop.city ? `${stop.city}, ` : ""}{stop.country}
          </div>
        </div>
        <div className="flex gap-40 mt-8">
          <p className="text-sm">Visited</p>
          <p className="text-sm">Part of Trip</p>
        </div>
        <div className="flex gap-32">
          <div className="text-sm">
            {new Date(stop.visited_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <Link to={`/trips/${id}`} className="text-sm">
            {stop.trip_name}
          </Link>
        </div>
        <div className="flex text-sm p-3 mt-5">
          Categories:
          {stop.categories?.map((category) => (
            <p key={category.id} className="border rounded-md p-1 ml-2">
              {category.name}
            </p>
          ))}
        </div>
        <div>
          Description:
          <div>{stop.description}</div>
        </div>
      </div>
      <div className="flex justify-center border border-dashed rounded-md p-2 mt-20">
        {" "}
        Place Holder for Photos{" "}
      </div>
      <StopForm isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} stopToEdit={stop} onStopSaved={refetchStop}/>
    </div>
  );
};
