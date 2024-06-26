import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArrowLeft from "../assets/icon-arrow-left.svg";
import Button from "../components/ui/BaseButton";
import EditModal from "../components/editModal";
import DeleteModal from "../components/deleteModal";

const DetailsPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [invoiceDetail, setInovoiceDetail] = useState(null);
  const { code } = useParams();

  const handleOpenModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteOpenModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const markAsPaid = () => {
    const updatedInvoiceDetail = {
      ...invoiceDetail,
      status: "paid",
    };

    window.location.href = `/invoice-app-vite/details/${invoiceDetail.id}`;

    try {
      const jsonData = sessionStorage.getItem("jsonData");
      let dataArray = JSON.parse(jsonData);
      const index = dataArray.findIndex((invoice) => invoice.id === code);
      if (index !== -1) {
        dataArray[index] = updatedInvoiceDetail;

        sessionStorage.setItem("jsonData", JSON.stringify(dataArray));
      } else {
        console.error(`Invoice with id ${code} not found in sessionStorage`);
      }

      setInvoiceDetail(updatedInvoiceDetail);
    } catch (error) {
      console.error("Error updating sessionStorage:", error);
    }
  };

  useEffect(() => {
    const jsonData = sessionStorage.getItem("jsonData");

    if (jsonData) {
      try {
        let dataArray = JSON.parse(jsonData);

        if (Array.isArray(dataArray)) {
          const invoiceDetail = dataArray.find(
            (invoice) => invoice.id === code
          );

          setInovoiceDetail(invoiceDetail);
        } else {
          console.log("Parsed JSON data is not an array");
        }
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    } else {
      console.log('No data found in sessionStorage with key "jsonData"');
    }
  }, [code]);

  return (
    <main className="invoice-detail-container">
      {isEditModalOpen && (
        <EditModal
          handleCloseModal={handleCloseModal}
          invoiceDetail={invoiceDetail}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          handleCloseModal={handleDeleteCloseModal}
          invoiceDetail={invoiceDetail}
        />
      )}

      {invoiceDetail ? (
        <section className="invoice-detail-information">
          <Link className="return-home-btn" to={"/invoice-app-vite/"}>
            <img src={ArrowLeft} alt="" srcset="" /> Go back
          </Link>
          <div className="detail-status-info-bar">
            <div className="detail-status-info">
              <span className="detail-info-status">Status</span>{" "}
              <p
                className={`${
                  invoiceDetail.status === "paid"
                    ? "paid__status"
                    : invoiceDetail.status === "pending"
                    ? "pending__status"
                    : "draft__status"
                }`}
              >
                <span
                  className={`${
                    invoiceDetail.status === "paid"
                      ? "paid__span"
                      : invoiceDetail.status === "pending"
                      ? "pending__span"
                      : "draft__span"
                  }`}
                ></span>{" "}
                {invoiceDetail.status}
              </p>
            </div>

            <div className="detail-status-button-container">
              {invoiceDetail.status === "pending" && (
                <>
                  <Button
                    onClick={handleOpenModal}
                    className={"ivoice-detail-edit-btn"}
                    buttonText={"Edit"}
                  />
                  <Button
                    onClick={handleDeleteOpenModal}
                    className={"ivoice-detail-delete-btn"}
                    buttonText={"Delete"}
                  />
                  <Button
                    onClick={markAsPaid}
                    className={"ivoice-detail-paid-btn"}
                    buttonText={"Mark as Paid"}
                  />
                </>
              )}
              {invoiceDetail.status === "draft" && (
                <>
                  <Button
                    onClick={handleOpenModal}
                    className={"ivoice-detail-edit-btn"}
                    buttonText={"Edit"}
                  />
                  <Button
                    onClick={handleDeleteOpenModal}
                    className={"ivoice-detail-delete-btn"}
                    buttonText={"Delete"}
                  />
                </>
              )}
              {invoiceDetail.status === "paid" && (
                <Button
                  onClick={handleDeleteOpenModal}
                  className={"ivoice-detail-delete-btn"}
                  buttonText={"Delete"}
                />
              )}
            </div>
          </div>

          <div className="detail-invoice-info">
            <div className="detail-id-desc-billfrom">
              <div>
                <p className="detail-info secondary">
                  <span className="detail-id-hash">#</span>
                  {invoiceDetail.id}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.description}
                </p>
              </div>
              <div>
                <p className="detail-info primary">
                  {invoiceDetail.senderAddress.street}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.senderAddress.city}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.senderAddress.postCode}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.senderAddress.country}
                </p>
              </div>
            </div>
            <div className="detail-invDate-billToName-billToEmail">
              <div>
                <div>
                  <p className="detail-head primary">Invoice Date</p>
                  <p className="detail-info secondary">
                    {invoiceDetail.createdAt}
                  </p>
                </div>

                <div>
                  <div>
                    <p className="detail-head primary">Payment Due</p>
                    <p className="detail-info secondary">
                      {invoiceDetail.paymentDue}
                    </p>
                  </div>

                  <div className="sent-to-mobile">
                    <p className="detail-head primary">Sent to</p>
                    <p className="detail-info secondary">
                      {invoiceDetail.clientEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="detail-head primary">Bill To</p>
                <p className="detail-info secondary">
                  {invoiceDetail.clientName}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.clientAddress.street}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.clientAddress.city}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.clientAddress.postCode}
                </p>
                <p className="detail-info primary">
                  {invoiceDetail.clientAddress.country}
                </p>
              </div>
              <div className="sent-to-desktop">
                <p className="detail-head primary">Sent to</p>
                <p className="detail-info secondary">
                  {invoiceDetail.clientEmail}
                </p>
              </div>
            </div>

            <div className="detail-payDue-billToAddr">
              <div></div>
            </div>

            <div className="items-container">
              <div className="item-header">
                <p className="item-header-name">Item Name</p>
                <p className="item-header-qty">QTY.</p>
                <p className="item-header-price">Price</p>
                <p className="item-header-total">Total</p>
              </div>

              {invoiceDetail.items.map((item, index) => (
                <>
                  <div key={index} className="item-row">
                    <p className="item-name secondary">{item.name}</p>
                    <p className="item-quantity primary">{item.quantity}</p>
                    <p className="item-price primary">
                      {item.price.toFixed(2)}
                    </p>
                    <p className="item-total secondary">
                      $ {item.total.toFixed(2)}
                    </p>
                  </div>

                  <div key={index} className="item-row-mobile">
                    <div className="mobile-item-row-info">
                      <p className="item-name secondary">{item.name}</p>
                      <div className="mobile-quantity-price">
                        <p className="item-quantity primary">
                          {item.quantity} X{" "}
                        </p>
                        <p className="item-price primary">
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="item-total secondary">
                        $ {item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="amount-total">
              <p className="amount-due">Amount Due</p>
              <p className="total">$ {invoiceDetail.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mobile-button-container">
            {invoiceDetail.status === "pending" && (
              <>
                <Button
                  onClick={handleOpenModal}
                  className={"ivoice-detail-edit-btn"}
                  buttonText={"Edit"}
                />
                <Button
                  onClick={handleDeleteOpenModal}
                  className={"ivoice-detail-delete-btn"}
                  buttonText={"Delete"}
                />
                <Button
                  onClick={markAsPaid}
                  className={"ivoice-detail-paid-btn"}
                  buttonText={"Mark as Paid"}
                />
              </>
            )}
            {invoiceDetail.status === "draft" && (
              <>
                <Button
                  onClick={handleOpenModal}
                  className={"ivoice-detail-edit-btn"}
                  buttonText={"Edit"}
                />
                <Button
                  onClick={handleDeleteOpenModal}
                  className={"ivoice-detail-delete-btn"}
                  buttonText={"Delete"}
                />
              </>
            )}
            {invoiceDetail.status === "paid" && (
              <Button
                onClick={handleDeleteOpenModal}
                className={"ivoice-detail-delete-btn"}
                buttonText={"Delete"}
              />
            )}
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DetailsPage;
