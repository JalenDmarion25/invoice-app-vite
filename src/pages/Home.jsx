import React, { useState, useEffect } from "react";
import CreateModal from "../components/newModal";
import IconPlus from "../components/icons/PlusIcon";
import Checkbox from "@mui/material/Checkbox";
// import Link from "next/link";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [url, setUrl] = useState('https://jalendmarion25.github.io/invoice-app-api-endpoint/invoices.json');
  const [jsonData, setJsonData] = useState(null);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const buttonCheck = () => {
    console.log("Hi");
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJsonData(data);
        sessionStorage.setItem('jsonData', JSON.stringify(data));
        console.log('JSON data fetched and saved to session storage:', data);
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

    fetchJsonData();
  }, [url]);

  return (
    <section className="home-container">
      {isModalOpen && <CreateModal handleCloseModal={handleCloseModal} />}
      <div className="info-bar">
        <div className="invoice-info">
          <h1>Invoices</h1>
          <span>There are 0 total invoices</span>
        </div>

        <div className="invoice-new-filter">
          <div className="invoice-filter">
            <span onClick={handleFilter} className="filter-dropdown">
              Filter by status
            </span>

            {isFilterOpen && (
              <div className="filter-options">
                <div className="filter-option-check">
                  <Checkbox
                    name="draft"
                    id="draft"
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent", // This removes the hover effect
                      },
                    }}
                    disableRipple
                  />
                  <label htmlFor="draft">Draft</label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="pending"
                    id="pending"
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent", // This removes the hover effect
                      },
                    }}
                    disableRipple
                  />
                  <label htmlFor="pending">Pending</label>
                </div>
                <div className="filter-option-check">
                  <Checkbox
                    name="paid"
                    id="paid"
                    sx={{
                      padding: 0,
                      color: "#9277FF",
                      "&.Mui-checked": {
                        color: "#9277FF",
                      },
                      "&:hover": {
                        backgroundColor: "transparent", // This removes the hover effect
                      },
                    }}
                    disableRipple
                  />
                  <label htmlFor="paid">Paid</label>
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
    </section>
  );
};

export default Home;
