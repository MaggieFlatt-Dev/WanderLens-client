import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { getTripTypes } from "../services/tripTypeServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SwatchesPicker } from "react-color";

export const TripForm = ({ isOpen, onClose }) => {
  const [tripTypes, setTripTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

  useEffect(() => {
    getTripTypes().then(setTripTypes);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
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
            Trip Name <span className="text-red-500">*</span>
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
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTripType"
          >
            Trip Type <span className="text-red-500">*</span>
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
        <div className="flex flex-row items-center items-end gap-x-30">
          <fieldset className="relative">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="inputColorPicker"
            >
              Color: <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setColorPickerIsOpen(!colorPickerIsOpen)}
              className="ml-2 w-8 h-8 rounded border border-gray-300"
              style={{ backgroundColor: selectedColor?.hex ?? "#ffffff" }}
              required
            />
            {colorPickerIsOpen && (
              <div className="absolute z-10">
              <SwatchesPicker
                color={selectedColor}
                onChange={(color) => {
                  handleColorChange(color);
                  setColorPickerIsOpen(false);
                }}
                />
                </div>
            )}
          </fieldset>
          <fieldset>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="inputStartDate"
            >
              Select Start Date: <span className="text-red-500">*</span>
            </label>
            <DatePicker
              className="ml-2 border border-gray-300 rounded w-25"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              required
            />
          </fieldset>
        </div>
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
