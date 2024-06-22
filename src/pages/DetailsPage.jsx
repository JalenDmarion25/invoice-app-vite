import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const [invoiceDetail, setInovoiceDetail] = useState(null);
  const { code } = useParams(); // Assuming 'code' corresponds to the 'id' of the invoice

  useEffect(() => {
    // Step 1: Retrieve the JSON data from sessionStorage
    const jsonData = sessionStorage.getItem('jsonData');

    // Ensure jsonData is not null
    if (jsonData) {
      try {
        // Step 2: Parse the JSON string
        let dataArray = JSON.parse(jsonData);

        // Step 3: Check if dataArray is an array
        if (Array.isArray(dataArray)) {
          // Access the specific object
          const invoiceDetail = dataArray.find(invoice => invoice.id === code);
          console.log(invoiceDetail);
          
          // Step 4: Set the specific object in the state
          setInovoiceDetail(invoiceDetail);
        } else {
          console.log('Parsed JSON data is not an array');
        }
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    } else {
      console.log('No data found in sessionStorage with key "jsonData"');
    }
  }, [code]); // The effect runs whenever the 'code' changes

  return (
    <div>
      <h1>Details Page</h1>
      {invoiceDetail ? (
        <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        >
          <h3>Invoice Details:</h3>
          <p>{invoiceDetail.id}</p>
          <pre>{JSON.stringify(invoiceDetail, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
