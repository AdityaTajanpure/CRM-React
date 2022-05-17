import React from "react";
import { useEffect, useState } from "react";
import UserRepo from "../../../api/connection";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
const Main = () => {
  const [analytics, setAnalytics] = useState({});

  const getAnalytics = async () => {
    const username = localStorage.getItem("username");
    const response = await UserRepo.getAnalytics(username);
    if (response.data && response.data.status) {
      setAnalytics(response.data.data);
      console.log(response.data.data.users);
    } else {
      alert(response.data.msg);
    }
  };

  const deleteExisitingUser = async (id) => {
    const username = localStorage.getItem("username");
    const response = await UserRepo.deleteExisitingUser(username, id);
    alert(response.data.msg);
    getAnalytics();
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <div className="services-container">
      <div className="user-info">
        {["Total Leads", "Total Service Records", "Total Contacts"].map((e) => (
          <div class="card">
            <div class="card-container">
              <h3>
                <b>{e}</b>
              </h3>
              <h3 style={{ paddingTop: "15%", color: "blue" }}>
                {e === "Total Leads"
                  ? analytics.totalLeads
                  : e === "Total Contacts"
                  ? analytics.totalContacts
                  : analytics.totalServiceRecords}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      {Object.keys(analytics).length >= 1 ? (
        analytics.users.map((e) => (
          <List
            key={e._id}
            sx={{
              width: "80%",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <i
                    className="fas fa-briefcase"
                    style={{ color: "black" }}
                  ></i>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={e.username}
                secondary={e.firstname + e.lastname}
                style={{ width: "40vw" }}
              />
              <ListItemButton
                style={{ width: 0, padding: 0 }}
                onClick={() => {
                  // setUpdateId(e._id);
                  // setFormValues({ ...e });
                }}
              >
                <i className="fas fa-edit fa-xl" title="Edit"></i>
              </ListItemButton>
              <ListItemButton
                style={{
                  width: "10vw",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4>Role: {e.type}</h4>
              </ListItemButton>
              <ListItemButton
                style={{ width: 0, padding: 0, color: "red" }}
                onClick={() => {
                  // deleteServiceRequest(e._id);
                  deleteExisitingUser(e._id);
                }}
              >
                <i class="fas fa-trash-alt fa-xl" title="Delete"></i>
              </ListItemButton>
            </ListItem>
          </List>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
