import React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DashboardRepo from "../../../api/dashboard_repo";
const Contacts = () => {
  const initialValues = {
    title: "",
    mobileNumber: null,
    description: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, gotResponse] = useState({});

  const getContacts = async () => {
    let res = await await DashboardRepo.getContactRecords(
      localStorage.getItem("username")
    );

    gotResponse(res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.email = "Title is required!";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (values.mobileNumber.length !== 10) {
      errors.mobileNumber = "Mobile number must be 10 digits only";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  return (
    <div className="services-container">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Data added successfully</div>
      ) : (
        <></>
      )} */}

      <form onSubmit={handleSubmit}>
        <h1>Add Contact Details</h1>
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
            <label>Mobile Number</label>
            <input
              type="number"
              name="mobileNumber"
              maxLength="10"
              placeholder="Mobile Number"
              value={formValues.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mobileNumber}</p>
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
      <List sx={{ width: "80%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <i className="fas fa-briefcase" style={{ color: "black" }}></i>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          <ListItemButton style={{ width: 0, padding: 0 }}>
            <i className="fas fa-edit fa-xl" title="Edit"></i>
          </ListItemButton>
          <ListItemButton style={{ width: 0, padding: 0, color: "red" }}>
            <i class="fas fa-trash-alt fa-xl" title="Delete"></i>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Contacts;
