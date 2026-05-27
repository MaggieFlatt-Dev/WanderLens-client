import { useState } from "react";
import ReactModal from "react-modal";
import { createPhoto } from "../services/photoServices";

export const PhotoUploadForm = ({ isOpen, onClose, stopId, onPhotoUploaded }) => {
  //file uploads aren't instant
  const [isUploading, setIsUploading] = useState(false);

  const handleCancel = () => {
    setIsUploading(false);
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
      <h2 className="text-2xl font-bold mb-4">Add Photo</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="inputPhoto"
          >
            Choose a photo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="inputPhoto"
            name="photo"
            //prevent being able to upload a PDF or text file
            accept="image/*"
            required
            className="text-sm"
          />
        </fieldset>
        <div className="flex flex-row justify-end gap-x-6">
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUploading}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};