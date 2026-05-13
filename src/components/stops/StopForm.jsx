import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReactModal from "react-modal";
import { getCategories } from "../services/categoryServices";
import { getLocations } from "../services/locationServices";

export const StopForm = ({ isOpen, onClose, onStopSaved, stopToEdit }) => {
  const isEditMode = Boolean(stopToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLocations, setSearchLocations] = useState([]);
  const [location, setLocation] = useState({});
  const [justSelected, setJustSelected] = useState(false)

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

  // Get the locations when user has input search, otherwise do nothing
  //Added timer so max request of 1 per second doesn't break the search
  useEffect(() => {
    if (!search || justSelected) {
      setSearchLocations([])
      setJustSelected(false)
      return
    } 
    const timer = setTimeout(() => {
      getLocations(search).then(setSearchLocations)
    }, 200)  
    
    return () => clearTimeout(timer)
     }, [search, justSelected]);

  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Stop" : "Create New Stop"}
      </h2>
      {/* key resets uncontrolled inputs when switching between stops — without it defaultValue won't update */}
      <form className="flex flex-col gap-4" key={stopToEdit?.id || "new"}>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div className="text-sm font-medium text-gray-700">
            Search Location
            <span className="text-red-500">*</span>
          </div>
          <input
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            required
            onChange={(e) => {
              setJustSelected(false)
              setSearch(e.target.value)
            }}
          />
          <div className="">
            {searchLocations.map((searchLocation) => (
              <button
                type="button"
                placeholder="e.g. Rome, Italy"
                key={searchLocation.place_id}
                onClick={() => {
                  setLocation(searchLocation);
                  setSearch(searchLocation.display_name);
                  setSearchLocations([]);
                  setJustSelected(true);
                }}
              >
                {searchLocation.display_name}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-gray-700"
            htmlFor="inputTitle"
          >
            Stop Name <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            id="inputTitle"
            defaultValue={stopToEdit?.name || ""}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Rome"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <div
            className="text-sm font-medium text-gray-700"
            htmlFor="inputDescription"
          >
            Description
          </div>
          <textarea
            id="inputDescription"
            defaultValue={stopToEdit?.description || ""}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stop Description"
          />
        </fieldset>
        <fieldset>
          <div
            className="text-sm font-medium text-gray-700"
            htmlFor="inputVisitedDate"
          >
            Visited Date:
            <span className="text-red-500">*</span>
          </div>
          <DatePicker
            className="ml-2 border border-gray-300 rounded w-25"
            dateFormat="MM/dd/yyyy"
            required
          />
        </fieldset>
        <fieldset className="mt-4">
          <div
            className="text-sm font-medium text-gray-700 pl-5"
            htmlFor="inputCategories"
          >
            Categories(select one or more)
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={
                selectedCategories.includes(category.id)
                  ? "border rounded-md p-1 m-1  bg-blue-500 text-white"
                  : "border rounded-md p-1 m-1"
              }
            >
              {category.name}
            </button>
          ))}
        </fieldset>
        <div className="flex flex-row justify-end gap-x-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditMode ? "Save Changes" : "Create Trip"}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
