import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserRepo from "../../../api/connection";

const VerifyEmail = () => {
  const [response, gotResponse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
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
    let res = await UserRepo.verifyEmail(token, username);
    gotResponse(res);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
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
    </div>
  );
};

export default VerifyEmail;
