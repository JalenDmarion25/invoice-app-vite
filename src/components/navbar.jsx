import React from 'react';
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import UserAvi from '../assets/image-avatar.jpg';
import MoonIcon from '../assets/icon-moon.svg'
import SunIcon from '../assets/icon-sun.svg'

const navbar = ({ handleChange, isChecked }) => {
  return (
    <section className='navbar'>
        <div className="navbar-content">
        <div className="nav-logo">
            <img src={logo} alt="broke logo" className='logo-img'/>
        <div className="background"></div>
        </div>
        

        <div className="theme-switcher">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />
        <label htmlFor="check">
          {isChecked ? (
            <>
              <img src={MoonIcon} alt="DarkModeIcon" className='theme-icons' />
            </>
          ) : (
            <>
              <img src={SunIcon} alt="LightModeIcon" className='theme-icons' />
            </>
          )}
        </label> 
        </div>

        <div className="user-avi">
            <img src={UserAvi} alt="broken avi" className='avi-img' />

        </div>
        </div>



    </section>
  )
}

export default navbar