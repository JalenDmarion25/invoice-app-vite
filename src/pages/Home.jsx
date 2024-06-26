import React, { useState, useEffect } from "react";
import CreateModal from "../components/newModal";
import IconPlus from "../components/icons/PlusIcon";
import ArrowDown from "../assets/icon-arrow-down.svg";
import NoInvoiceFound from "../components/NoInvoiceFound";
import toast, { Toaster } from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const url =
    "https://jalendmarion25.github.io/invoice-app-api-endpoint/invoices.json";
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    draft: false,
    pending: false,
    paid: false,
  });

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJsonData(data);
        sessionStorage.setItem("jsonData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching JSON:", error);
      } finally {
        setLoading(false);
      }
    };

    const data = sessionStorage.getItem("jsonData");
    if (data) {
      setJsonData(JSON.parse(data));
      setLoading(false);
    } else {
      fetchJsonData();
    }
  }, [url]);

  const filteredInvoices = jsonData.filter((invoice) => {
    if (!filters.draft && !filters.pending && !filters.paid) {
      return true;
    }
    return filters[invoice.status];
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="home-container">
      {isModalOpen && <CreateModal handleCloseModal={handleCloseModal} />}
      <div className="info-bar">
        <div className="invoice-info">
          <h1>Invoices</h1>
          <span>There are {filteredInvoices.length} total invoices</span>
        </div>

        <div className="invoice-new-filter">
          <div className="invoice-filter">
            <span onClick={handleFilter} className="filter-dropdown">
              Filter by status <img src={ArrowDown} alt="arwDwn" />
            </span>

            {isFilterOpen && (
              <div className="filter-options">
                <div className="filter-option-check">
                  <Checkbox
                    name="draft"
                    id="draft"
                    checked={filters.draft}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="draft">
                    Draft
                  </label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="pending"
                    id="pending"
                    checked={filters.pending}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="pending">
                    Pending
                  </label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="paid"
                    id="paid"
                    checked={filters.paid}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="paid">
                    Paid
                  </label>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleOpenModal} className="invoice-new-btn">
            <IconPlus className="icon-plus" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="info-bar-mobile">
        <div className="invoice-info">
          <h1>Invoices</h1>
          <span>{filteredInvoices.length} invoices</span>
        </div>

        <div className="invoice-new-filter">
          <div className="invoice-filter">
            <span onClick={handleFilter} className="filter-dropdown">
              Filter<img src={ArrowDown} alt="arwDwn" />
            </span>

            {isFilterOpen && (
              <div className="filter-options">
                <div className="filter-option-check">
                  <Checkbox
                    name="draft"
                    id="draft"
                    checked={filters.draft}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="draft">
                    Draft
                  </label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="pending"
                    id="pending"
                    checked={filters.pending}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="pending">
                    Pending
                  </label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="paid"
                    id="paid"
                    checked={filters.paid}
                    onChange={handleCheckboxChange}
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    disableRipple
                  />
                  <label className="home-labels" htmlFor="paid">
                    Paid
                  </label>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleOpenModal} className="invoice-new-btn">
            <IconPlus className="icon-plus" />
            New
          </button>
        </div>
      </div>

      <div className="invoice-list-container">
        {filteredInvoices.length > 0 ? (
          <div className="invoice-list">
            {filteredInvoices.map((invoice) => (
              <Link
                to={`/invoice-app-vite/details/${invoice.id}`}
                key={invoice.id}
              >
                <div className="invoice-item">
                  <p className="invoice-id">
                    <span className="detail-id-hash">#</span>
                    {invoice.id}
                  </p>
                  <p className="invoice-paymentdue">Due {invoice.paymentDue}</p>
                  <p className="invoice-client">{invoice.clientName}</p>
                  <p className="invoice-total">$ {invoice.total}</p>
                  <p
                    className={`${
                      invoice.status === "paid"
                        ? "paid__status"
                        : invoice.status === "pending"
                        ? "pending__status"
                        : "draft__status"
                    }`}
                  >
                    <span
                      className={`${
                        invoice.status === "paid"
                          ? "paid__span"
                          : invoice.status === "pending"
                          ? "pending__span"
                          : "draft__span"
                      }`}
                    ></span>{" "}
                    {invoice.status}
                  </p>
                </div>

                <div className="invoice-item-mobile">
                  <div>
                    <p className="invoice-id">
                      <span className="detail-id-hash">#</span>
                      {invoice.id}
                    </p>
                    <p className="invoice-paymentdue">
                      Due {invoice.paymentDue}
                    </p>
                    <p className="invoice-total">$ {invoice.total}</p>
                  </div>
                  <div>
                    <p className="invoice-client">{invoice.clientName}</p>
                    <p
                      className={`${
                        invoice.status === "paid"
                          ? "paid__status"
                          : invoice.status === "pending"
                          ? "pending__status"
                          : "draft__status"
                      }`}
                    >
                      <span
                        className={`${
                          invoice.status === "paid"
                            ? "paid__span"
                            : invoice.status === "pending"
                            ? "pending__span"
                            : "draft__span"
                        }`}
                      ></span>{" "}
                      {invoice.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <NoInvoiceFound />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
