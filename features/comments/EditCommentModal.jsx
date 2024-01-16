import Overlay from "../../ui/Overlay";
import EditCommentForm from "./EditCommentForm";
import { createPortal } from "react-dom";

function EditCommentModal({ closeModal, commentData, ticketId }) {
  return createPortal(
    <Overlay>
      <EditCommentForm
        closeModal={closeModal}
        commentData={commentData}
        ticketId={ticketId}
      />
    </Overlay>,
    document.getElementById("root")
  );
}

export default EditCommentModal;
