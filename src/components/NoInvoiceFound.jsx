import React from 'react'
import Empty from '../assets/illustration-empty.svg'
const NoInvoiceFound = () => {
  return (
    <div className='no-invoice-container'>
        <img src={Empty} alt="" srcset="" />
        <h1>There is nothing here</h1>

        <p>Create an invoice by clicking the New Invoice button and get started</p>
    </div>
  )
}

export default NoInvoiceFound