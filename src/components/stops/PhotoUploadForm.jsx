import { useState } from "react";
import ReactModal from "react-modal";
import { createPhoto } from "../services/photoServices";

export const PhotoUploadForm = ({ isOpen, onClose, stopId, onPhotoUploaded }) => {
  //file uploads aren't instant
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleCancel = () => {
    setIsUploading(false);
    setSelectedFileName(null);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.photo;
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("stop_id", stopId);

    setIsUploading(true);
    createPhoto(formData)
      .then(() => {
        onPhotoUploaded();
        handleCancel();
      })
      .catch((err) => {
        alert("Upload failed. Try a smaller image or a different file.");
        setIsUploading(false);
        console.error(err);
      });
  };

  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="text-2xl text-earthGreen font-bold mb-4">Add Photo</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            htmlFor="inputPhoto"
            className="cursor-pointer inline-flex items-center gap-2 border-2 border-dashed border-darkBrown rounded-md px-4 py-3 text-sm font-medium text-darkBrown hover:bg-offWhite transition"
          >
            📷 Choose a photo
          </label>
          <input
            type="file"
            id="inputPhoto"
            name="photo"
            accept="image/*"
            required
            className="hidden"
            onChange={(e) => setSelectedFileName(e.target.files[0]?.name || null)}
          />
          <p className="text-xs text-darkBrown">
            {selectedFileName ? `Selected: ${selectedFileName}` : "No file chosen"}
          </p>
        </fieldset>
        <div className="flex flex-row justify-end gap-x-6">
          <button
            type="submit"
            disabled={isUploading}
            className="smallButton"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUploading}
            className="cancelButton"
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};