export const StopForm = () => { 

  return (
     <ReactModal
          className="custom-small-modal"
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
        >
          <h2 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Trip" : "Create New Trip"}</h2>
          {/* key resets uncontrolled inputs when switching between trips — without it defaultValue won't update */}
          <form className="flex flex-col gap-4" key={tripToEdit?.id || 'new'} onSubmit={handleSubmit}>
            <fieldset className="flex flex-col gap-1 border-0 p-0">
              <div
                className="text-sm font-medium text-gray-700"
                htmlFor="inputTitle"
              >
                Trip Name <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                id="inputTitle"
                defaultValue={tripToEdit?.name || ""}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Italy 2026"
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
                defaultValue={tripToEdit?.description || ""}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Trip Description"
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1 border-0 p-0">
              <div
                className="text-sm font-medium text-gray-700"
                htmlFor="inputTripType"
              >
                Trip Type <span className="text-red-500">*</span>
              </div>
              <select
                id="inputTripType"
                defaultValue={tripToEdit?.trip_type?.id || ""}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="text-sm font-medium text-gray-700 pl-5"
                  htmlFor="inputColorPicker"
                >
                  Color: <span className="text-red-500">*</span>
                </div>
                <button
                  type="button"
                  onClick={() => setColorPickerIsOpen(!colorPickerIsOpen)}
                  className="ml-2 w-8 h-8 rounded border border-gray-300"
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
                  className="text-sm font-medium text-gray-700"
                  htmlFor="inputStartDate"
                >
                  Start Date:
                  <span className="text-red-500">*</span>
                </div>
                <DatePicker
                  className="ml-2 border border-gray-300 rounded w-25"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  required
                />
              </fieldset>
            </div>
            <fieldset className="mt-4">
              <div
                className="text-sm font-medium text-gray-700 pl-5"
                htmlFor="inputColorPicker"
              >
                Make this trip private?
              </div>
              {/* checkbox is controlled so its checked state stays in sync with isPrivate */}
              <input
                className="ml-5"
                type="checkbox"
                id="inputPrivate"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
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
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </ReactModal>
  )
}