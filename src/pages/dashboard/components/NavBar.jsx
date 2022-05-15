import React from "react";

const NavBar = ({ currentIndex, setIndex }) => {
  return (
    <nav>
      <div className="user-info">
        <i className="fa-regular fa-user fa-xl"></i>
        <div className="user-details">
          <h3>Aditya Tajanpure</h3>
          <p className="userrole">Super Admin</p>
        </div>
      </div>
      <div className="main-content">
        <div className="content-item" onClick={() => setIndex(0)}>
          <i className="fas fa-bars fa-xl"></i>
          <h3>Dashboard</h3>
        </div>
        <div className="content-item" onClick={() => setIndex(1)}>
          <i className="fas fa-briefcase fa-xl"></i>
          <h3>Service Requests </h3>
        </div>
        <div className="content-item" onClick={() => setIndex(2)}>
          <i className="fab fa-intercom fa-xl"></i>
          <h3>Leads Master</h3>
        </div>
        <div className="content-item" onClick={() => setIndex(3)}>
          <i className="fas fa-address-book fa-xl"></i>
          <h3>Contacts Master</h3>
        </div>
        <div className="content-item" onClick={() => setIndex(4)}>
          <i className="fas fa-sign-out-alt fa-xl"></i>
          <h3>Log out</h3>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
