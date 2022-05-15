import axios from "axios";

const axiosClient = axios.create({
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
  (err) => err.response
);

export default axiosClient;
