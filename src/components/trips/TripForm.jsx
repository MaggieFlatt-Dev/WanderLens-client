import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { getCategories } from "../services/categoryServices";
import { getTripTypes } from "../services/tripTypeServices";

export const TripForm = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    getTripTypes().then(setTripTypes);
  }, []);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
      <form className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTitle"
          >
            Title
          </label>
          <input
            type="text"
            id="inputTitle"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Trip Title"
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
            htmlFor="inputCategory"
          >
            Category
          </label>
          <select
            id="inputCategory"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTripType"
          >
            Trip Type
          </label>
          <select
            id="inputTripType"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a trip type</option>
            {tripTypes.map((tripType) => (
              <option key={tripType.id} value={tripType.id}>
                {tripType.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Trip
        </button>
      </form>
    </ReactModal>
  );
};
