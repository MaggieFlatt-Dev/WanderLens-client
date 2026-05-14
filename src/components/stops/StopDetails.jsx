import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStop, getStopById } from "../services/stopServices";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { DeleteDialog } from "../ui/DeleteDialog";

export const StopDetails = () => {
  const { id, stopId } = useParams();
  const [stop, setStop] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
   const navigate = useNavigate();

  useEffect(() => {
    getStopById(stopId).then(setStop);
  }, [stopId]);

  const handleDelete = () => {
    deleteStop(stop.id).then(() => {
      navigate("/trips/${id}");
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
      </div>
    </div>
  );
};
