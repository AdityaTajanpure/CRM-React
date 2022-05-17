import React from "react";
import "../login.css";
import { useState } from "react";
import UserRepo from "../../../api/connection";

const SetPassword = () => {
  const initialValues = {
    password: "",
    password2: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [response, gotResponse] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const setPassword = async (password) => {
    const token = window.location.href.split("/").pop();
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const { username } = JSON.parse(jsonPayload);
    let res = await UserRepo.setPassword(token, username, password);
    gotResponse(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      setPassword(formValues.password);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    } else if (values.password !== values.password2) {
      errors.password2 = "Passwords doesn't match'";
    }
    return errors;
  };

  return (
    <div className="container">
      {response.data ? (
        <div
          className={`ui message ${
            response.data.status ? "success" : "danger"
          } }`}
        >
          {response.data.msg}
        </div>
      ) : (
        <></>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Update Password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>New Password</label>
            <input
              type="text"
              name="password"
              placeholder="New Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="text"
              name="password2"
              placeholder="Confirm Password"
              value={formValues.password2}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password2}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SetPassword;
