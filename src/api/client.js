import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://protected-river-14538.herokuapp.com/",
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
