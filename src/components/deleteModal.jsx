import React from "react";
import "../styles/modal.css";
import Button from "./ui/BaseButton";

const DeleteModal = ({ handleCloseModal, invoiceDetail }) => {

  const handleDeleteInvoice = () => {
    try {
      const jsonData = sessionStorage.getItem("jsonData");
      let dataArray = JSON.parse(jsonData);

      const updatedDataArray = dataArray.filter(
        (invoice) => invoice.id !== invoiceDetail.id
      );

      sessionStorage.setItem("jsonData", JSON.stringify(updatedDataArray));

      handleCloseModal();
      window.location.href = '/invoice-app-vite/'

    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleBackgroundClick = (event) => {
    if (event.target.className === "modal-background") {
      handleCloseModal();
    }
  };

  return (
    <section className="modal-background" onClick={handleBackgroundClick}>
      <div className="delete-container">
        <h1>Confirm Deletion</h1>
        <p>
          Are you sure you want to delete invoice #{invoiceDetail.id}? This
          action cannot be undone.
        </p>
        <div className="delete-modal-btn-container">
          <Button onClick={handleCloseModal} className={"modal-cancel-btn"} buttonText={"Cancel"} />
          <Button onClick={handleDeleteInvoice} className={"ivoice-detail-delete-btn"} buttonText={"Delete"} />
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
