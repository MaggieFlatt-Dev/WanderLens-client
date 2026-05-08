import { useEffect, useState } from 'react';
import { TripForm } from './TripForm';
import { getTrips } from '../services/tripServices';

export const TripList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  const fetchTrips = () => {
    getTrips().then(setTrips)
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div>
      <div className="flex justify-between">
      <h2 className="text-2xl">My Trips</h2>
      <button className="border border-gray-300 rounded px-3 py-2 text-sm" onClick={() => setModalIsOpen(true)}>
      + New Trip
      </button>
      <TripForm isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onTripCreated={fetchTrips} />
        </div>
      <div>
         {trips.map((trip) => (
              <div key={trip.id} value={trip.id}>
             {trip.name}
             {trip.description}
              </div>
            ))}
      </div>
    </div>
  );
};
