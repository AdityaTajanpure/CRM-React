import React from "react";
import "./dashboard.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Leads from "./components/Leads";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import Main from "./components/Main";

const Dashboard = () => {
  const [currentIndex, setIndex] = useState(0);

  const getComponent = (index) => {
    switch (index) {
      case 0:
        return <Main />;
      case 1:
        return <Services />;
      case 2:
        return <Leads />;
      case 3:
        return <Contacts />;
      case 4:
        return <></>;
      default:
        return <Main />;
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar currentIndex={currentIndex} setIndex={setIndex} />
      <div className="dashboard-body">{getComponent(currentIndex)}</div>
    </div>
  );
};

export default Dashboard;
