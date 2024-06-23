import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArrowLeft from '../assets/icon-arrow-left.svg'
import Button from '../components/ui/BaseButton';

const DetailsPage = () => {
  const [invoiceDetail, setInovoiceDetail] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    const jsonData = sessionStorage.getItem("jsonData");

    if (jsonData) {
      try {
        let dataArray = JSON.parse(jsonData);

        if (Array.isArray(dataArray)) {
          const invoiceDetail = dataArray.find(
            (invoice) => invoice.id === code
          );
          console.log(invoiceDetail);

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


             <div>
             <Button className={"ivoice-detail-edit-btn"} buttonText={"Edit"} />
            <Button className={"ivoice-detail-delete-btn"} buttonText={"Delete"} />
            <Button className={"ivoice-detail-paid-btn"} buttonText={"Mark as Paid"} />
            </div>   
          </div>

          <div className="detail-invoice-info">
            <div className="detail-id-desc-billfrom">
              <div>
              <p className="detail-info secondary"><span className="detail-id-hash">#</span>{invoiceDetail.id}</p>
              <p className="detail-info primary">{invoiceDetail.description}</p>
              </div>
              <div>
                <p className="detail-info primary">{invoiceDetail.senderAddress.street}</p>
                <p className="detail-info primary">{invoiceDetail.senderAddress.city}</p>
                <p className="detail-info primary">{invoiceDetail.senderAddress.postCode}</p>
                <p className="detail-info primary">{invoiceDetail.senderAddress.country}</p>

              </div>
            </div>
            <div className="detail-invDate-billToName-billToEmail">
                <div>
                  <p className="detail-head primary">Invoice Date</p>
                  <p className="detail-info secondary">{invoiceDetail.createdAt}</p>
                </div>
                <div>
                  <p className="detail-head primary">Bill To</p>
                  <p className="detail-info secondary">{invoiceDetail.clientName}</p>
                </div>
                <div>
                  <p className="detail-head primary">Sent to</p>
                  <p className="detail-info secondary">{invoiceDetail.clientEmail}</p>
                </div>                                
              </div>

              <div className="detail-payDue-billToAddr">
                <div>
                  <p className="detail-head primary">Payment Due</p>
                  <p className="detail-info secondary">{invoiceDetail.paymentDue}</p>
                </div>
                <div>
                <p className="detail-info primary">{invoiceDetail.clientAddress.street}</p>
                <p className="detail-info primary">{invoiceDetail.clientAddress.city}</p>
                <p className="detail-info primary">{invoiceDetail.clientAddress.postCode}</p>
                <p className="detail-info primary">{invoiceDetail.clientAddress.country}</p>
                </div>                              
              </div>

              <div className="items-container">
                <div className="item-header">
                  <p className="item-header-name">Item Name</p>
                  <p className="item-header-qty">QTY.</p>
                  <p className="item-header-price">Price</p>
                  <p className="item-header-total">Total</p>
                </div>

                {invoiceDetail.items.map((item, index) => (
                <div key={index} className="item-row">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">{item.quantity}</p>
                  <p className="item-price">{item.price.toFixed(2)}</p>
                  <p className="item-total">{item.total.toFixed(2)}</p>
                </div>
              ))}
              </div>

              <div className="amount-total">
                <p className="amount-due">Amount Due</p>
                <p className="total">$ {invoiceDetail.total.toFixed(2)}</p>
              </div>
          </div>

        </section>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DetailsPage;
