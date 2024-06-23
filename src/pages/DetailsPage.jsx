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
          <div className="status-info-bar">
            <div className="status-info">

            <span className="info-status">Status</span>{" "}
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
          <h3>Invoice Details:</h3>
          <p>{invoiceDetail.id}</p>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DetailsPage;
