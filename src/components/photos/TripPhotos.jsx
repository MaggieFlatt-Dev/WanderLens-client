import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTripById } from "../services/tripServices";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export const TripPhotos = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTripById(tripId).then((data) => {
      if (data.reason === "Not found") {
        navigate("/photos");
      } else {
        setTrip(data);
      }
    });
  }, [tripId, navigate]);

  if (!trip) return <p className="text-cream antialiased p-10">Loading...</p>;

  // only show stops that actually have photos
  const stopsWithPhotos = trip.stops?.filter((stop) => stop.photos?.length) || [];

  return (
    <div className="pb-12">
      <Link
        to="/photos"
        className="flex text-md text-cream hover:text-lunarGold antialiased mb-10"
      >
        <ChevronLeftIcon className="w-5 h-5 text-cream antialiased mt-0.5 hover:text-lunarGold" />
        Back to Photos
      </Link>
      <h2 className="text-2xl font-bold text-cream antialiased mx-10 mb-8">
        {trip.name}
      </h2>

      {stopsWithPhotos.length ? (
        stopsWithPhotos.map((stop) => (
          <div key={stop.id} className="mx-10 mb-10">
            <h3 className="text-xl text-cream font-bold antialiased mb-4">
              {stop.name}
            </h3>
            <div className="columns-3 gap-3">
              {stop.photos.map((photo) => (
                <div key={photo.id} className="mb-3 break-inside-avoid">
                  <img
                    src={`http://localhost:8000${photo.image}`}
                    alt=""
                    className="rounded border border-offWhite w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-offWhite antialiased italic mx-10">
          No photos yet for this trip.
        </p>
      )}
    </div>
  );
};
