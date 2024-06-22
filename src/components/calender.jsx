import React, { useState, useEffect } from 'react';
import ArrowLeft from '../assets/icon-arrow-left.svg';
import ArrowRight from '../assets/icon-arrow-right.svg';
import CalendarIcon from '../assets/icon-calendar.svg';
import '../styles/calender.css';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 === 0) || (year % 100 === 0 && year % 400 === 0);
}

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
}

const Calendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [showMonthList, setShowMonthList] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); // State to manage calendar visibility
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date

  useEffect(() => {
    generateCalendar(currMonth, currYear);
  }, [currMonth, currYear]);

  const generateCalendar = (month, year) => {
    const daysOfMonthArray = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];
    const totalDays = daysOfMonthArray[month] + firstDay;

    for (let i = 0; i < totalDays; i++) {
      if (i >= firstDay) {
        const day = i - firstDay + 1;
        calendarDays.push(day);
      } else {
        calendarDays.push(null);
      }
    }

    setDaysOfMonth(calendarDays);
  }

  const handlePrevYear = () => {
    setCurrYear(currYear - 1);
  }

  const handleNextYear = () => {
    setCurrYear(currYear + 1);
  }

  const handleMonthClick = (index) => {
    setShowMonthList(false);
    setCurrMonth(index);
  }

  const handleDayClick = (day) => {
    const selectedDate = new Date(currYear, currMonth, day);
    const formattedDate = `${day} ${monthNames[currMonth]} ${currYear}`;
    console.log(`Selected date: ${formattedDate}`);
    setSelectedDate(formattedDate);
    setCalendarVisible(false); // Hide the calendar after selecting a date
  }

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  }

  return (
    <div className='calendar-container'>
      <div onClick={toggleCalendar} className="calendar-toggle">
        {selectedDate ? selectedDate : 'Select a date'}
        <img src={CalendarIcon} className='calendar-icon' srcset="" />
      </div>
      {calendarVisible && (
        <div className="calendar">
          <div className="calendar-header">
            <span className="month-picker" onClick={() => setShowMonthList(!showMonthList)}>
              {monthNames[currMonth]}
            </span>
            <div className="year-picker">
              <span className="year-change" onClick={handlePrevYear}>
                <img src={ArrowLeft} alt="Previous Year" />
              </span>
              <span id="year">{currYear}</span>
              <span className="year-change" onClick={handleNextYear}>
                <img src={ArrowRight} alt="Next Year" />
              </span>
            </div>
          </div>
          <div className="calendar-body">
            <div className="calendar-week-day">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="calendar-days">
              {daysOfMonth.map((day, index) => (
                <div
                  key={index}
                  className={day ? 'calendar-day-hover' : ''}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day}
                  {day && (
                    <>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {showMonthList && (
            <div className="month-list show">
              {monthNames.map((name, index) => (
                <div key={index} onClick={() => handleMonthClick(index)}>
                  <div>{name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;
