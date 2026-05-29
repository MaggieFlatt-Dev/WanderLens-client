import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { getTripTypes } from "../services/tripTypeServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SwatchesPicker } from "react-color";
import { createTrip, updateTrip } from "../services/tripServices";

// tripToEdit is only passed when editing an existing trip — its presence drives edit vs. create mode
export const TripForm = ({ isOpen, onClose, onTripSaved, tripToEdit }) => {
  // if tripToEdit was passed, we're editing; if not, we're creating
  const isEditMode = Boolean(tripToEdit);
  const [tripTypes, setTripTypes] = useState([]);
  // these three fields are controlled state because they can't be read from e.target like a normal input
  const [selectedDate, setSelectedDate] = useState(tripToEdit?.start_date ? new Date(tripToEdit.start_date) : null);
  const [selectedColor, setSelectedColor] = useState(tripToEdit?.color ? {hex: tripToEdit.color} : undefined);
  const [isPrivate, setIsPrivate] = useState(tripToEdit?.is_private || false);
  
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

  useEffect(() => {
    getTripTypes().then(setTripTypes);
  }, []);

  // when tripToEdit changes (e.g. user opens a different trip's edit modal), re-sync controlled state
  useEffect(() => {
    if (tripToEdit) {
      setSelectedDate(tripToEdit?.start_date ? new Date(tripToEdit.start_date) : null);
      setSelectedColor(tripToEdit?.color ? { hex: tripToEdit.color } : undefined);
      setColorPickerIsOpen(false)
      setIsPrivate(tripToEdit?.is_private || false)
    } else {
      // reset everything when switching to create mode
      setSelectedDate(null);
      setSelectedColor(undefined);
      setIsPrivate(false)
     }
   }, [tripToEdit])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleColorChange = (color) => {
      setSelectedColor(color);
};

  // resets controlled fields back to the saved values and closes the modal
  const handleCancel = () => {
    setSelectedDate(tripToEdit?.start_date ? new Date(tripToEdit.start_date) : null);
    setSelectedColor(tripToEdit?.color ? { hex: tripToEdit.color } : undefined);
    setColorPickerIsOpen(false)
    setIsPrivate(tripToEdit?.is_private || false)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedColor) {
      alert("Please select a color for your trip")
      return
    }
    // uncontrolled inputs (name, description, trip type) are read directly from the form via e.target
    // controlled inputs (date, color, isPrivate) come from state
    const tripData = {
      trip_type_id: e.target.inputTripType.value,
      name: e.target.inputTitle.value,
      description: e.target.inputDescription.value,
      start_date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
      color: selectedColor.hex,
      is_private: isPrivate,
    };

    // same form handles both create and edit — which service call to make depends on isEditMode
    const apiCall = isEditMode
      ? updateTrip(tripToEdit.id, tripData)
      : createTrip(tripData);

    // after save: tell the parent to re-fetch so it shows fresh data, then close the modal
    //pass the newly created trip for StopForm
    apiCall.then((savedTrip) => {
      onTripSaved(savedTrip)
      handleCancel()
    })
    }

  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="text-2xl text-earthGreen antialiased font-bold mb-4">{isEditMode ? "Edit Trip" : "Create New Trip"}</h2>
      {/* key resets uncontrolled inputs when switching between trips — without it defaultValue won't update */}
      <form className="flex flex-col gap-4" key={tripToEdit?.id || 'new'} onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputTitle"
          >
            Trip Name <span className="text-red">*</span>
          </div>
          <input
            type="text"
            id="inputTitle"
            defaultValue={tripToEdit?.name || ""}
            className="border border-mustard rounded px-3 py-2 text-sm antialiased bg-white focus:outline-none focus:ring-2 focus:ring-lunarGold bg-"
            placeholder="e.g. Italy 2026"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputDescription"
          >
            Description
          </div>
          <textarea
            id="inputDescription"
            defaultValue={tripToEdit?.description || ""}
            className="border border-mustard rounded px-3 py-2 text-sm antialiased bg-white focus:outline-none focus:ring-2 focus:ring-lunarGold"
            placeholder="Trip Description"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputTripType"
          >
            Trip Type <span className="text-red">*</span>
          </div>
          <select
            id="inputTripType"
            defaultValue={tripToEdit?.trip_type?.id || ""}
            className="border border-mustard rounded px-3 py-2 text-sm antialiased bg-white text-earthGreen focus:outline-none focus:ring-2 focus:ring-lunarGold"
            required
          >
            <option value="">Select a Trip Type</option>
            {tripTypes.map((tripType) => (
              <option key={tripType.id} value={tripType.id}>
                {tripType.name}
              </option>
            ))}
          </select>
        </fieldset>
        <div className="flex flex-row items-center items-end gap-x-35">
          <fieldset className="relative">
            <div
              className="text-sm font-medium text-earthGreen antialiased pl-2"
              htmlFor="inputColorPicker"
            >
              Color: <span className="text-red">*</span>
            </div>
            <button
              type="button"
              onClick={() => setColorPickerIsOpen(!colorPickerIsOpen)}
              className="ml-2 w-8 h-8 rounded border border-mustard"
              style={{ backgroundColor: selectedColor?.hex ?? "#ffffff" }}
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
            <div
              className="text-sm font-medium text-earthGreen antialiased pl-2"
              htmlFor="inputStartDate"
            >
              Start Date:
              <span className="text-red">*</span>
            </div>
            <DatePicker
              className="ml-2 border border-mustard rounded bg-white w-25"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              required
            />
          </fieldset>
        </div>
        <fieldset className="mt-4">
          <div
            className="text-sm font-medium text-earthGreen antialiased pl-2"
            htmlFor="inputColorPicker"
          >
            
            Make this trip private?
          </div>
          {/* checkbox is controlled so its checked state stays in sync with isPrivate */}
          <input
            className="ml-2"
            type="checkbox"
            id="inputPrivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            />
        </fieldset>
        <div className="flex flex-row justify-end gap-x-6">
          <button
            type="submit"
            className="smallButton"
          >
            {isEditMode ? "Save Changes" : "Create Trip"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancelButton"
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
