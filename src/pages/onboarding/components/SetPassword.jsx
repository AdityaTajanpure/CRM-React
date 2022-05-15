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
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, gotResponse] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const setPassword = async (token, username, password) => {
    let res = await UserRepo.setPassword(token, username, password);
    gotResponse(res);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setPassword();
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
