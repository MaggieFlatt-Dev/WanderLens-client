import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { getTripTypes } from "../services/tripTypeServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TripForm = ({ isOpen, onClose }) => {
  const [tripTypes, setTripTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getTripTypes().then(setTripTypes);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
      <form className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTitle"
          >
            Trip Name*
          </label>
          <input
            type="text"
            id="inputTitle"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Italy 2026"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputDescription"
          >
            Description
          </label>
          <textarea
            id="inputDescription"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Trip Description"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTripType"
          >
            Trip Type*
          </label>
          <select
            id="inputTripType"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option>Select a Trip Type</option>
            {tripTypes.map((tripType) => (
              <option key={tripType.id} value={tripType.id}>
                {tripType.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputStartDate"
          >
            Select Start Date:
          </label>
          <DatePicker
            className="ml-2 border border-gray-300 rounded"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
          />
        </fieldset>
        <fieldset>
          <label className="text-sm font-medium text-gray-700"
            htmlFor="inputColorPicker">
            Color: 
          </label>
        </fieldset>
        <div className="text-sm">* required fields</div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Trip
        </button>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      </form>
    </ReactModal>
  );
};
