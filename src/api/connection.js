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

  signUp: async ({ username, firstname, lastname, password }) => {
    return await axiosClient.post("onboarding/signUp", {
      username,
      firstname,
      lastname,
      password,
    });
  },

  setPassword: async (token, username, password) => {
    return await axiosClient.post("onboarding/setPassword", {
      token,
      username,
      password,
    });
  },
};

export default UserRepo;
