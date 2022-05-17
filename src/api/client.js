import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3200",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

if (localStorage.getItem("token")) {
  axios.headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": localStorage.getItem("token"),
  };
}

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    } else {
      return response;
    }
  },
  (err) => {
    if (err.response.data && err.response.data.error) {
      if (err.response.data.error === "jwt expired") {
        alert("Session Expired");
        window.location.replace("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("type");
      }
      return err.response.data.error;
    }
  }
);

export default axiosClient;
