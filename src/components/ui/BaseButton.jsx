import React from 'react'
import '../../styles/index.css'

export const BaseButton = ({buttonText}) => {
  return (
    <button className='default-button'>{buttonText}</button>
  )
}

export default BaseButton;