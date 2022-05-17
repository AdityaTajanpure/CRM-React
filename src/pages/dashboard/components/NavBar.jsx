import React from "react";

const NavBar = ({ currentIndex, setIndex }) => {
  return (
    <nav>
      <div className="user-info">
        <i className="fa-regular fa-user fa-xl"></i>
        <div className="user-details">
          <h3>{localStorage.getItem("username")}</h3>
          <p className="userrole">{localStorage.getItem("type")}</p>
        </div>
      </div>
      <div className="main-content">
        <div className="content-item" onClick={() => setIndex(0)}>
          <i
            className="fas fa-bars fa-xl"
            style={{ color: `${currentIndex === 0 ? "red" : "black"}` }}
          ></i>
          <h3 style={{ color: `${currentIndex === 0 ? "red" : "black"}` }}>
            Dashboard
          </h3>
        </div>
        <div className="content-item" onClick={() => setIndex(1)}>
          <i
            className="fas fa-briefcase fa-xl"
            style={{ color: `${currentIndex === 1 ? "red" : "black"}` }}
          ></i>
          <h3 style={{ color: `${currentIndex === 1 ? "red" : "black"}` }}>
            Service Requests{" "}
          </h3>
        </div>
        <div className="content-item" onClick={() => setIndex(2)}>
          <i
            className="fab fa-intercom fa-xl"
            style={{ color: `${currentIndex === 2 ? "red" : "black"}` }}
          ></i>
          <h3 style={{ color: `${currentIndex === 2 ? "red" : "black"}` }}>
            Leads Master
          </h3>
        </div>
        <div className="content-item" onClick={() => setIndex(3)}>
          <i
            className="fas fa-address-book fa-xl"
            style={{ color: `${currentIndex === 3 ? "red" : "black"}` }}
          ></i>
          <h3 style={{ color: `${currentIndex === 3 ? "red" : "black"}` }}>
            Contacts Master
          </h3>
        </div>
        <div className="content-item" onClick={() => setIndex(4)}>
          <i
            className="fas fa-sign-out-alt fa-xl"
            style={{ color: `${currentIndex === 4 ? "red" : "black"}` }}
          ></i>
          <h3 style={{ color: `${currentIndex === 4 ? "red" : "black"}` }}>
            Log out
          </h3>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
