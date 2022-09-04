import axiosClient from "./client";

const UserRepo = {
  loginUser: async (username, password) => {
    return await axiosClient.post("onboarding/login", {
      username,
      password,
    });
  },

  forgotPassword: async (username) => {
    return await axiosClient.post("onboarding/forgotPassword", {
      username,
    });
  },

  signUp: async ({ username, firstname, lastname, password, type }) => {
    return await axiosClient.post("onboarding/signUp", {
      username,
      firstname,
      lastname,
      password,
      type,
    });
  },

  setPassword: async (token, username, password) => {
    return await axiosClient.post("onboarding/setPassword", {
      token,
      username,
      password,
    });
  },

  verifyEmail: async (token, username) => {
    return await axiosClient.post("onboarding/verifyEmail", {
      token,
      username,
    });
  },
  updateExisitingUserRole: async (username, id, title) => {
    return await axiosClient.post(
      "users/updateExisitingUserRole",
      {
        username,
        _id: id,
        title,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },
  deleteExisitingUser: async (username, id) => {
    return await axiosClient.post(
      "users/deleteExisitingUser",
      {
        username,
        _id: id,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },
  getAnalytics: async (username) => {
    return await axiosClient.post(
      "users/getAnalytics",
      {
        username,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },
};

export default UserRepo;
