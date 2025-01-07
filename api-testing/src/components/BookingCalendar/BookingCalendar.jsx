import React, { useState } from "react";
import "./BookingCalendar.css";

const BookingCalendar = ({ bookings = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tracks the currently displayed month

  // Utility to get an array of all booked dates
  const getBookedDates = () => {
    const bookedDates = [];
    bookings.forEach((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d).toISOString().split("T")[0]);
      }
    });
    return bookedDates;
  };

  const bookedDates = getBookedDates();

  // Function to generate the days for the current month
  const generateDays = () => {
    const days = [];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Fill empty spaces before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: null, isBooked: false });
    }

    // Generate days for the current month
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      const dateString = new Date(d).toISOString().split("T")[0];
      days.push({ date: dateString, isBooked: bookedDates.includes(dateString) });
    }

    return days;
  };

  const days = generateDays();

  // Function to navigate between months
  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="booking-calendar-container">
      <h2>Availability Calendar</h2>
      <div className="calendar-header">
        <button
          onClick={() => changeMonth(-1)}
          disabled={currentMonth <= new Date()}
        >
          Previous
        </button>
        <h3>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          disabled={currentMonth > new Date(new Date().setMonth(new Date().getMonth() + 11))}
        >
          Next
        </button>
      </div>

      <div className="calendar">
        {days.map((day, index) =>
          day.date ? (
            <div
              key={index}
              className={`calendar-day ${day.isBooked ? "booked" : "available"}`}
            >
              {new Date(day.date).getDate()}
            </div>
          ) : (
            <div key={index} className="calendar-day empty"></div>
          )
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;

  
