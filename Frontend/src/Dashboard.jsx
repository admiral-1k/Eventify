import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">eventify</div>

        <button className="menu-active">Profile Information</button>
        <button className="menu">Event History</button>
        <button className="menu">Saved Events</button>
        <button className="menu">Event Calender</button>
        <button className="menu">Create Ticket</button>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="topbar">
          <div className="profile-circle"></div>
        </div>

        <div className="content">
          <div className="header">
            <div>
              <h1>Having a Problem?</h1>
              <p>Create Ticket and let us know</p>
            </div>

            <button className="request-btn">
              Add New Request
            </button>
          </div>

          <div className="status-container">
            <div className="card pending">
              <h3>Pending</h3>
              <button>Pending: 0</button>
            </div>

            <div className="card progress">
              <h3>In Progress</h3>
              <button>In Progress: 0</button>
            </div>

            <div className="card analyze">
              <h3>Problem Analyze</h3>
              <button>Problem Analyze: 0</button>
            </div>

            <div className="card complete">
              <h3>Completed</h3>
              <button>Completed: 0</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <h1>eventify</h1>

          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Find Events</a>
            <a href="#">Create Events</a>
            <a href="#">Find My Tickets</a>
          </div>

          <p>
            © 2026 eventify. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;