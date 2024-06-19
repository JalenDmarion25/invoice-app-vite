import React from "react";
import Button from "./ui/BaseButton";
import "../styles/modal.css";

const newModal = ({ handleCloseModal }) => {
  const handleBackgroundClick = (event) => {
    if (event.target.className === "modal-background") {
      handleCloseModal();
    }
  };

  const TestButton = () => {
    console.log("WORKING");
  };

  return (
    <section className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-new-container">
        <div className="new-form-container">
          <h2>New Invoice</h2>

          <div className="new-invoice-bill-from">
            <h4 className="modal-bill-headers">Bill From</h4>

            <div className="bill-from-adi-container">
              <label htmlFor="bill-from-street-adi">Street Address</label>
              <input
                type="text"
                name="bill-to-street-adi"
                className="invoice-inputs single-line-input"
              />
            </div>

            <div className="bill-from-city-post-country">
              <div className="bill-from-city">
                <label htmlFor="bill-from-city-input">City</label>
                <input
                  type="text"
                  name="bill-from-city-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
              <div className="bill-from-post">
                <label htmlFor="bill-from-post-input">Post Code</label>
                <input
                  type="text"
                  name="bill-from-post-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
              <div className="bill-from-country">
                <label htmlFor="bill-from-country-input">Country</label>
                <input
                  type="text"
                  name="bill-from-post-country-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
            </div>
          </div>

          <div className="bill-to-container">
            <h4 className="modal-bill-headers">Bill To</h4>

            <div className="bill-to-client-name-container">
              <label htmlFor="bill-to-client-name">Client's Name</label>
              <input
                type="text"
                name="bill-to-client-name"
                className="invoice-inputs single-line-input"
              />
            </div>
            <div className="bill-to-client-mail-container">
              <label htmlFor="bill-to-client-mail">Client's Email</label>
              <input
                type="text"
                name="bill-to-client-mail"
                className="invoice-inputs single-line-input"
              />
            </div>
            <div className="bill-to-client-adi-container">
              <label htmlFor="bill-to-client-adi">Street Address</label>
              <input
                type="text"
                name="bill-to-client-adi"
                className="invoice-inputs single-line-input"
              />
            </div>

            <div className="bill-to-city-post-country">
              <div className="bill-to-city">
                <label htmlFor="bill-to-city-input">City</label>
                <input
                  type="text"
                  name="bill-to-city-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
              <div className="bill-to-post">
                <label htmlFor="bill-to-post-input">Post Code</label>
                <input
                  type="text"
                  name="bill-to-post-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
              <div className="bill-to-country">
                <label htmlFor="bill-to-country-input">Country</label>
                <input
                  type="text"
                  name="bill-to-post-country-input"
                  className="invoice-inputs three-shared-input"
                />
              </div>
            </div>

            <div className="project-description-container">
              <label htmlFor="project-description">Project Description</label>
              <input
                type="text"
                name="project-description"
                className="invoice-inputs single-line-input"
              />
            </div>
          </div>

          <div className="item-list-container">
            <h4 className="modal-bill-headers item-header">Item List</h4>

            <Button
              className={"add-new-item-btn"}
              buttonText="+ Add New Item"
              onClick={TestButton}
            />
          </div>

          <div className="new-modal-button-container">
            <div>
              <Button
                className={"modal-discard-btn"}
                onClick={handleCloseModal}
                buttonText={"Discard"}
              />
            </div>

            <div>
              <Button
                className={"modal-save-draft-btn"}
                onClick={TestButton}
                buttonText={"Save as Draft"}
              />
              <Button
                className={"modal-save-send-btn"}
                onClick={TestButton}
                buttonText={"Save & Send"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default newModal;
