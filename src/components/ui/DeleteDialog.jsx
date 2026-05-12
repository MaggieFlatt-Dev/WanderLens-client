import ReactModal from "react-modal"

export const DeleteDialog = ({
  isOpen, onClose, onConfirm, title, message, confirmLabel = "Delete", cancelLabel = "Cancel",
}) => {
  return (
    <ReactModal
      className="custom-small-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex flex-row justify-end gap-x-4">
        <button
          onClick={onClose}
          className="bg-white border border-gray-300 px-4 py-2 rounded"
        >
          {cancelLabel}
          </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
            {confirmLabel}
        </button>
      </div>
    </ReactModal>
  )
 }