import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReactModal from "react-modal";
import { getCategories } from "../services/categoryServices";
import { getLocations } from "../services/locationServices";
import { createStop, updateStop } from "../services/stopServices";

export const StopForm = ({
  isOpen,
  onClose,
  onStopSaved,
  stopToEdit,
  tripId,
}) => {
  const isEditMode = Boolean(stopToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLocations, setSearchLocations] = useState([]);
  const [location, setLocation] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const toggleCategory = (id) => {
    if (selectedCategories.includes(id)) {
      //it's already selected, so remove it
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id));
    } else {
      //it's not selected yet,so add it
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // when stopToEdit changes (e.g. user opens edit modal), sync controlled state to match
  useEffect(() => {
    if (stopToEdit) {
      setSelectedDate(
        stopToEdit.visited_date ? new Date(stopToEdit.visited_date) : null,
      );
      setSelectedCategories(stopToEdit.categories?.map((c) => c.id) || []);
      setSearch(`${stopToEdit.city}, ${stopToEdit.country}`);
      setLocation({
        address: { city: stopToEdit.city, country: stopToEdit.country },
        lat: stopToEdit.latitude,
        lon: stopToEdit.longitude,
      });
    } else {
      setSelectedDate(null);
      setSelectedCategories([]);
      setSearch("");
      setLocation({});
    }
  }, [stopToEdit]);

  const handleSearch = () => {
    if (search) {
      getLocations(search).then(setSearchLocations);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stopData = {
      trip_id: tripId,
      name: e.target.inputTitle.value,
      description: e.target.inputDescription.value,
      // need to take into account locations can have city, town, or village
      city:
        location.address?.city ||
        location.address?.town ||
        location.address?.village ||
        null,
      country: location.address?.country,
      latitude: location.lat,
      longitude: location.lon,
      visited_date: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : null,
      category_ids: selectedCategories,
    };
    // same form handles both create and edit — which service call to make depends on isEditMode
    const stopApiCall = isEditMode
      ? updateStop(stopToEdit.id, stopData)
      : createStop(stopData);
    // after save: tell the parent to re-fetch so it shows fresh data, then close the modal
    stopApiCall.then(() => {
      onStopSaved();
      handleCancel();
    });
  };

  const handleCancel = () => {
    if (stopToEdit) {
      setSelectedDate(
        stopToEdit.visited_date
          ? new Date(stopToEdit.visited_date + "T00:00:00")
          : null,
      );
      setSelectedCategories(stopToEdit.categories?.map((c) => c.id) || []);
      setSearch(`${stopToEdit.city}, ${stopToEdit.country}`);
      setLocation({
        address: { city: stopToEdit.city, country: stopToEdit.country },
        lat: stopToEdit.latitude,
        lon: stopToEdit.longitude,
      });
    } else {
      setLocation({});
      setSearch("");
      setSelectedDate(null);
      setSelectedCategories([]);
    }
    onClose();
  };

  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={handleCancel}
      ariaHideApp={false}
    >
      <h2 className="text-2xl text-earthGreen antialiased font-bold mb-4">
        {isEditMode ? "Edit Stop" : "Create New Stop"}
      </h2>
      {/* key resets uncontrolled inputs when switching between stops — without it defaultValue won't update */}
      <form
        className="flex flex-col gap-4"
        key={stopToEdit?.id || "new"}
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputTitle"
          >
            Stop Name <span className="text-red">*</span>
          </div>
          <input
            type="text"
            id="inputTitle"
            defaultValue={stopToEdit?.name || ""}
            className="border border-mustard rounded px-3 py-2 text-sm antialiased focus:outline-none focus:ring-2 focus:ring-lunarGold bg-white"
            placeholder="e.g. New York"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div className="text-sm font-medium text-earthGreen antialiased">
            Location Search
            <span className="text-red">*</span>
          </div>
          <div className="flex gap-2">
            <input
              className="border border-mustard rounded px-3 py-2 w-108 text-sm antialiased focus:outline-none focus:ring-2 focus:ring-lunarGold bg-white"
              value={search}
              required
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="e.g. Rome, Italy"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="border border-mustard bg-lunarGold hover:bg-lunarGoldHover rounded px-3 py-2 text-sm text-darkBrown antialiased"
            >
              Search
            </button>
          </div>
          <div>
            {searchLocations.map((searchLocation) => (
              <button
                type="button"
                placeholder="e.g. Rome, Italy"
                key={searchLocation.place_id}
                onClick={() => {
                  setLocation(searchLocation);
                  setSearch(searchLocation.display_name);
                  setSearchLocations([]);
                }}
              >
                {searchLocation.display_name}
              </button>
            ))}
          </div>
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
            defaultValue={stopToEdit?.description || ""}
            className="border border-mustard rounded px-3 py-2 text-sm antialiased focus:outline-none focus:ring-2 focus:ring-lunarGold bg-white"
            placeholder="Stop Description"
          />
        </fieldset>
        <fieldset>
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputVisitedDate"
          >
            Visited Date:
            <span className="text-red">*</span>
          </div>
          <DatePicker
            className="border border-mustard bg-white rounded w-25"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            required
          />
        </fieldset>
        <fieldset className="mt-4">
          <div
            className="text-sm font-medium text-earthGreen antialiased"
            htmlFor="inputCategories"
          >
            Categories (select one or more)
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={
                selectedCategories.includes(category.id)
                  ? "border rounded-md bg-lightGreen p-1 m-1 text-darkBrown antialiased"
                  : "border bg-earthGreen rounded-md text-cream antialiased p-1 m-1"
              }
            >
              {category.name}
            </button>
          ))}
        </fieldset>
        <div className="flex flex-row justify-end gap-x-6">
          <button
            type="submit"
            className="smallButton"
          >
            {isEditMode ? "Save Changes" : "Create Stop"}
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
