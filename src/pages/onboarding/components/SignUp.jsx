import React from "react";
import "../login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserRepo from "../../../api/connection";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    type: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [response, gotResponse] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const signUpUser = async () => {
    let res = await UserRepo.signUp(formValues);
    gotResponse(res);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      signUpUser();
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "First name is required!";
    }
    if (!values.username) {
      errors.username = "Email is required!";
    } else if (!regex.test(values.username)) {
      errors.username = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    }
    if (!values.type) {
      errors.type = "User type is required";
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
        <h1>Registeration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="username"
              placeholder="Email"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstname}</p>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>User Type</label>
            <select
              name="type"
              id="userType"
              value={formValues.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <p>{formErrors.type}</p>
          <button className="fluid ui button blue">Submit</button>
          <p></p>
          <span> Already have an account? </span>
          <Link to="/login">Login Here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
