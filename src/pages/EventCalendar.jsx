import "./EventCalendar.css";

import logo from "../assets/images/logo.png";
import footerLogo from "../assets/images/logo-white.png";

import concert from "../assets/images/concert.png";
import festival from "../assets/images/musicfestival.png";
import djNight from "../assets/images/djnight.png";
import artShow from "../assets/images/artshow.png";
import cultural from "../assets/images/culturalevent.png";
import sports from "../assets/images/sportsevent.png";

import { FaCalendarAlt } from "react-icons/fa";

export default function EventCalendar() {
  const events = {
    3: concert,
    6: festival,
    16: djNight,
    21: artShow,
    26: cultural,
    31: sports,
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="calendar-page">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Eventify Logo" className="logo" />

        <button>Profile Information</button>
        <button>Event History</button>
        <button>Saved Events</button>
        <button className="active">Event Calendar</button>
        <button>Create Ticket</button>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="topbar">
          <div></div>
          <div className="profile-circle"></div>
        </div>

        <div className="title-row">
          <h1>Your Event Calendar,</h1>
          <FaCalendarAlt className="calendar-icon" />
        </div>

        <div className="controls">
          <button>Previous Year</button>
          <button>Previous Month</button>
          <button>Next Month</button>
          <button>Next Year</button>
        </div>

        <div className="calendar-container">
          <div className="month-header">
            <span>01</span>
            <h2>JANUARY</h2>
            <span>2025</span>
          </div>

          <div className="weekdays">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          <div className="days-grid">
            {days.map((day) => (
              <div key={day} className="day-box">
                <span className="day-number">{day}</span>

                {events[day] && (
                  <img
                    src={events[day]}
                    alt="event"
                    className="event-image"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="add-event-btn">
          Add Event
        </button>

        <footer className="footer">
          <img
            src={footerLogo}
            alt="Footer Logo"
            className="footer-logo"
          />

          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Find Events</a>
            <a href="#">Create Events</a>
            <a href="#">Find my tickets</a>
          </div>

          <p>
            © 2025 Eventify. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
