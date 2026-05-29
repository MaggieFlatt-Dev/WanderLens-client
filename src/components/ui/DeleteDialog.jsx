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
      <h2 className="text-xl text-earthGreen font-bold antialiased mb-2">{title}</h2>
      <p className="text-darkBrown antialiased mb-6">{message}</p>
      <div className="flex flex-row justify-end gap-x-4">
        <button
          onClick={onClose}
          className="smallButton"
        >
          {cancelLabel}
          </button>
        <button
          onClick={onConfirm}
          className="cancelButton"
        >
            {confirmLabel}
        </button>
      </div>
    </ReactModal>
  )
 }