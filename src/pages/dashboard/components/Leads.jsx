import React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DashboardRepo from "../../../api/dashboard_repo";

const Leads = () => {
  const initialValues = {
    title: "",
    status: "",
    description: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [leads, setLeads] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      if (updateId !== null) {
        updateLeads(updateId);
      } else {
        addLead();
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.email = "Title is required!";
    }
    if (!values.status) {
      errors.status = "Status is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const getAllLeads = async () => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.getLeads(username);
    console.log(response);
    if (response.data) {
      setLeads(response.data.data.reverse());
      setFormValues(initialValues);
    }
  };

  const addLead = async () => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.addLeadRecord(
      username,
      formValues.title,
      formValues.description,
      formValues.status
    );
    alert(response.data.msg);
    getAllLeads();
  };

  const updateLeads = async (id) => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.updateLeadRecord(
      id,
      username,
      formValues.title,
      formValues.description,
      formValues.status
    );
    setUpdateId(null);
    alert(response.data.msg);
    getAllLeads();
  };

  const deleteLead = async (id) => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.deleteLeadRecord(id, username);
    alert(response.data.msg);
    getAllLeads();
  };

  useEffect(() => {
    getAllLeads();
  }, []);

  return (
    <div className="services-container">
      <form onSubmit={handleSubmit}>
        <h1>Add New Lead</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.title}</p>
          <div className="field">
            <label>Status</label>
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formValues.status}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.status}</p>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.description}</p>
          <button
            className="fluid ui button blue"
            style={{ maxWidth: "100px" }}
          >
            Add
          </button>
        </div>
      </form>
      {leads.map((e) => (
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
                <i className="fas fa-briefcase" style={{ color: "black" }}></i>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={e.title}
              secondary={e.description}
              style={{ width: "40vw" }}
            />
            <ListItemButton
              style={{ width: 0, padding: 0 }}
              onClick={() => {
                setUpdateId(e._id);
                setFormValues({ ...e });
              }}
            >
              <i className="fas fa-edit fa-xl" title="Edit"></i>
            </ListItemButton>
            <ListItemButton style={{ width: "5vw", padding: 0 }}>
              <h4>Status: {e.status}</h4>
            </ListItemButton>
            <ListItemButton
              style={{ width: 0, padding: 0, color: "red" }}
              onClick={() => {
                deleteLead(e._id);
              }}
            >
              <i class="fas fa-trash-alt fa-xl" title="Delete"></i>
            </ListItemButton>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default Leads;
