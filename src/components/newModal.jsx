import React from 'react'
import '../styles/modal.css'


const newModal = ({ handleCloseModal }) => {
  const handleBackgroundClick = (event) => {
    if (event.target.className === 'modal-background') {
      handleCloseModal();
    }
  };


  return (
    <section className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-new-container">
      <form className='new-form-container'>
        <h2>New Invoice</h2>

        <div className="new-invoice-bill-from">
          <h4 className='modal-bill-from'>Bill From</h4>

          <div className="bill-from-adi-container">
          <label htmlFor="bill-from-street-adi">Street Address</label>
          <input type="text" name='bill-to-street-adi' className='invoice-inputs single-line-input'/>
          </div>

          <div className="bill-from-city-post-country">
            <div className="bill-from-city">
            <label htmlFor="bill-from-city-input">City</label>
            <input type="text" name='bill-from-city-input' className='invoice-inputs three-shared-input'/>
            </div>
            <div className="bill-from-post">
            <label htmlFor="bill-from-post-input">Post Code</label>
            <input type="text" name='bill-from-post-input' className='invoice-inputs three-shared-input'/>
            </div>
            <div className="bill-from-country">
            <label htmlFor="bill-from-country-input">Country</label>
            <input type="text" name='bill-from-post-country-input' className='invoice-inputs three-shared-input'/>              
            </div>
          </div>

        </div>

      </form>
      </div>
    </section>
  )
}

export default newModal