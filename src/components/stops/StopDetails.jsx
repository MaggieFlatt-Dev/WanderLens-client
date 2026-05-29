import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStop, getStopById } from "../services/stopServices";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { DeleteDialog } from "../ui/DeleteDialog";
import { StopForm } from "./StopForm";
import { PhotoUploadForm } from "./PhotoUploadForm";
import { deletePhoto } from "../services/photoServices";

export const StopDetails = () => {
  const { id, stopId } = useParams();
  const [stop, setStop] = useState({});
  // controls whether the edit modal is visible set to false so it doesn't show on mount
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

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

  //handle deleting a photo
  const handleDeletePhoto = (photoId) => {
    if (window.confirm("Delete this photo?")) {
      deletePhoto(photoId).then(refetchStop);
    }
  };
  return (
    <div>
      <Link
        to={`/trips/${id}`}
        className="flex text-md text-cream hover:text-lunarGold antialiased mb-10"
      >
        <ChevronLeftIcon className="w-5 h-5 text-cream antialiased mt-0.5 hover:text-lunarGold" />
        Back to {stop.trip_name}
      </Link>
      <div className="flex flex-col pl-2 mx-10 pb-8 border bg-cream rounded-md ">
        <div className="flex pt-2 pl-2 text-2xl text-earthGreen antialiased">
          {stop.name}
          <div className="flex ml-auto m-2 gap-2 text-sm antialiased">
            <div className="smallButton">
              {/* sets isEditModalOpen to true, which triggers the TripForm at the bottom to open */}
              <button onClick={() => setIsEditModalOpen(true)}> Edit</button>
            </div>
            <div className="cancelButton">
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
        <div className="flex items-start gap-3 pb-2 pl-6 text-mustard antialiased">
          {stop.city ? `${stop.city}, ` : ""}
          {stop.country}
        </div>
        <div className="flex gap-33 mt-6 pl-6 text-mustard antialiased">
          <p>Visited:</p>
          <p>Part of Trip:</p>
        </div>
        <div className="flex gap-27 pl-6">
          <div className="text-sm text-darkBrown antialiased">
            {new Date(stop.visited_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <Link
            to={`/trips/${id}`}
            className="text-sm text-darkBrown antialiased"
          >
            {stop.trip_name}
          </Link>
        </div>
        <div className="text-mustard antialiased pl-6 mt-10">
          Categories:
          <div className="flex mt-2">
            {stop.categories?.map((category) => (
              <div
                key={category.id}
                className="border rounded-md p-1 mr-2 border bg-lightGreen text-darkBrown antialiased"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="pl-6 mt-5 text-mustard antialiased">
          Description:
          <div className="text-darkBrown antialiased">{stop.description}</div>
        </div>
      </div>
      {/* Photo gallery section */}
      <div className="m-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h3 className="text-xl text-cream font-bold antialiased">
            Photos ({stop.photos?.length || 0})
          </h3>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="smallButton"
          >
            + Add Photo
          </button>
        </div>

        {stop.photos && stop.photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {stop.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={`http://localhost:8000${photo.image}`}
                  alt=""
                  className="rounded border border-offWhite"
                />
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-1 right-1 bg-red text-white antialiased w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-offWhite antialiased italic">
            No photos yet. Add one to get started.
          </p>
        )}
      </div>
      <StopForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        stopToEdit={stop}
        onStopSaved={refetchStop}
      />
      <PhotoUploadForm
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        stopId={stop.id}
        onPhotoUploaded={refetchStop}
      />
    </div>
  );
};
