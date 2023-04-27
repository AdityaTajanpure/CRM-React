import React from "react";
import "../login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserRepo from "../../../api/connection";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [response, gotResponse] = useState({});

  const loginUser = async () => {
    let res = await UserRepo.loginUser(formValues.email, formValues.password);
    gotResponse(res);
    console.log(res);
    if (res.data.token) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("type");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.data.username);
      localStorage.setItem("type", res.data.data.type);
      navigate("/");
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      loginUser();
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
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {response && response.data ? (
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
        <h1>Login Form</h1>
        <h5>
          Site is not working due to <a target="_blank" href="https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/">this</a>.
        </h5>
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
          <button className="fluid ui button blue">Submit</button>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/forgotPassword">Forgot Password?</Link>
            <Link to="/signup">Create a new account</Link>
          </p>
        </div>
        <h5>
          Demo Login: <br />
          Email: admin@gmail.com <br />
          Password: 123123
        </h5>
      </form>
    </div>
  );
};

export default Login;
