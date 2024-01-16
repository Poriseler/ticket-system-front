import Overlay from "../../ui/Overlay";
import EditTicketForm from "./EditTicketForm";
import { createPortal } from "react-dom";

function EditTicketModal({ closeModal, ticketData }) {
  return createPortal(
    <Overlay>
      <EditTicketForm closeModal={closeModal} ticketData={ticketData} />
    </Overlay>,
    document.getElementById("root")
  );
}

export default EditTicketModal;
