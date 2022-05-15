import axiosClient from "./client";

const UserRepo = {
  loginUser: async (username, password) => {
    return await axiosClient.post("http://localhost:3200/onboarding/login", {
      username,
      password,
    });
  },

  forgotPassword: async (username) => {
    return await axiosClient.post(
      "http://localhost:3200/onboarding/forgotPassword",
      {
        username,
      }
    );
  },

  signUp: async ({ username, firstname, lastname, password }) => {
    return await axiosClient.post("http://localhost:3200/onboarding/signUp", {
      username,
      firstname,
      lastname,
      password,
    });
  },

  setPassword: async (token, username, password) => {
    await axiosClient.post("http://localhost:3200/onboarding/setPassword", {
      token,
      username,
      password,
    });
  },
};

export default UserRepo;
