import React from "react";
import "../login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserRepo from "../../../api/connection";

const ForgotPassword = () => {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [response, gotResponse] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const forgotPassword = async () => {
    let res = await UserRepo.forgotPassword(formValues.email);
    gotResponse(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      forgotPassword();
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
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
        <h1>Forgot Password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <button className="fluid ui button blue">Submit</button>
          <p></p>
          <span> Don't have an account</span>{" "}
          <Link to="/signup">Create Account</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
