import React from "react";
import "../styles/modal.css";
import Button from "./ui/BaseButton";

const deleteModal = ({ handleCloseModal, invoiceDetail }) => {
  const handleBackgroundClick = (event) => {
    if (event.target.className === "modal-background") {
      handleCloseModal();
    }
  };

  return (
    <section
      className="modal-background"
      onClick={handleBackgroundClick}
    >
        <div className="delete-container">
            <h1>Confirm Deletion</h1>

            <p>Are you sure you want to delete invoice #{invoiceDetail.id}? This action cannot be undone.</p>

            <div className="delete-modal-btn-container">
            <Button onClick={handleCloseModal} className={"modal-cancel-btn"} buttonText={"Cancel"} />
            <Button className={"ivoice-detail-delete-btn"} buttonText={"Delete"} />
            </div>



        </div>


    </section>
  );
};

export default deleteModal;
