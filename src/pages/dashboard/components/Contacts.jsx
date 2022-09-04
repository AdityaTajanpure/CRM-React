import React from "react";
import { useState, useEffect } from "react";
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
    mobileNumber: "",
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
        updateContactRecord(updateId);
      } else {
        addContactRecord();
      }
    }
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

  const getAllContacts = async () => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.getContactRecords(username);
    console.log(response);
    if (response.data) {
      setLeads(response.data.data.reverse());
      setFormValues(initialValues);
    }
  };

  const addContactRecord = async () => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.addContactRecord(
      username,
      formValues.title,
      formValues.description,
      formValues.mobileNumber
    );
    alert(response.data.msg);
    getAllContacts();
  };

  const updateContactRecord = async (id) => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.updateContactRecord(
      id,
      username,
      formValues.title,
      formValues.description,
      formValues.mobileNumber
    );
    setUpdateId(null);
    alert(response.data.msg);
    getAllContacts();
  };

  const deletContactRecord = async (id) => {
    const username = localStorage.getItem("username");
    const response = await DashboardRepo.deleteContactRecord(id, username);
    alert(response.data.msg);
    getAllContacts();
  };

  useEffect(() => {
    getAllContacts();
  }, []);

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
      {leads.length === 0 && (
        <div className="container ui message danger">No Records Found</div>
      )}
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
            <ListItemButton
              style={{
                width: "10vw",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>Mobile: {e.mobileNumber}</h4>
            </ListItemButton>
            <ListItemButton
              style={{ width: 0, padding: 0, color: "red" }}
              onClick={() => {
                deletContactRecord(e._id);
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

export default Contacts;
