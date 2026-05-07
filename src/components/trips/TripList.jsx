import { useState } from 'react';
import { TripForm } from './TripForm';

export const TripList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <h2>Trip List</h2>
      <button className="border border-gray-300 rounded px-3 py-2 text-sm" onClick={() => setModalIsOpen(true)}>
      + Create Trip
      <TripForm isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
      </button>
    </div>
  );
};
