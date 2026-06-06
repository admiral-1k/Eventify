
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>eventify</h2>
      </div>

      <button className="active">Profile Information</button>
      <button>Event History</button>
      <button>Saved Events</button>
      <button>Event Calendar</button>
      <button>Create Ticket</button>
    </div>
  );
}

export default Sidebar;