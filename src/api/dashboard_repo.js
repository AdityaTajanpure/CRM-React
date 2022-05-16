import axiosClient from "./client";

const DashboardRepo = {
  getServiceRequests: async (username) => {
    return await axiosClient.post(
      "services/getServiceRequests",
      { username },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },
  addServiceRequest: async (username, title, description, status) => {
    return await axiosClient.post(
      "services/addServiceRequest",
      {
        username,
        title,
        description,
        status,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  updateServiceRequest: async (_id, username, title, description, status) => {
    return await axiosClient.post(
      "services/updateServiceRequest",
      {
        _id,
        username,
        title,
        description,
        status,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  deleteServiceRequest: async (_id, username) => {
    return await axiosClient.post(
      "services/deleteServiceRequest",
      {
        _id,
        username,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  // Leads api

  getLeads: async (username) => {
    return await axiosClient.post(
      "leads/getLeadRecords",
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
  addLeadRecord: async (username, title, description, status) => {
    return await axiosClient.post(
      "leads/addLeadRecord",
      {
        username,
        title,
        description,
        status,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  updateLeadRecord: async (_id, username, title, description, status) => {
    return await axiosClient.post(
      "leads/updateLeadRecord",
      {
        _id,
        username,
        title,
        description,
        status,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  deleteLeadRecord: async (_id, username) => {
    return await axiosClient.post(
      "leads/deleteLeadRecord",
      {
        _id,
        username,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  // Contacts API

  getContactRecords: async (username) => {
    return await axiosClient.post(
      "contacts/getContactRecords",
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
  addContactRecord: async (username, title, description, mobileNumber) => {
    return await axiosClient.post(
      "contacts/addContactRecord",
      {
        username,
        title,
        description,
        mobileNumber,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  updateContactRecord: async (
    _id,
    username,
    title,
    description,
    mobileNumber
  ) => {
    return await axiosClient.post(
      "contacts/updateContactRecord",
      {
        _id,
        username,
        title,
        description,
        mobileNumber,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
  },

  deleteContactRecord: async (_id, username) => {
    return await axiosClient.post(
      "contacts/deleteContactRecord",
      {
        _id,
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

export default DashboardRepo;
