import axiosClient from "./client";

const DashboardRepo = {
  getServiceRequests: async (username) => {
    return await axiosClient.post(
      "http://localhost:3200/services/getServiceRequests",
      {
        username,
      }
    );
  },
  addServiceRequest: async (username, title, description, status) => {
    return await axiosClient.post(
      "http://localhost:3200/services/addServiceRequest",
      {
        username,
        title,
        description,
        status,
      }
    );
  },

  updateServiceRequest: async (_id, username, title, description, status) => {
    return await axiosClient.post(
      "http://localhost:3200/services/updateServiceRequest",
      {
        _id,
        username,
        title,
        description,
        status,
      }
    );
  },

  deleteServiceRequest: async (_id, username) => {
    return await axiosClient.post(
      "http://localhost:3200/services/deleteServiceRequest",
      {
        _id,
        username,
      }
    );
  },

  // Leads api

  getLeads: async (username) => {
    return await axiosClient.post(
      "http://localhost:3200/leads/getLeadRecords",
      {
        username,
      }
    );
  },
  addLeadRecord: async (username, title, description, status) => {
    return await axiosClient.post("http://localhost:3200/leads/addLeadRecord", {
      username,
      title,
      description,
      status,
    });
  },

  updateLeadRecord: async (_id, username, title, description, status) => {
    return await axiosClient.post(
      "http://localhost:3200/leads/updateLeadRecord",
      {
        _id,
        username,
        title,
        description,
        status,
      }
    );
  },

  deleteLeadRecord: async (_id, username) => {
    return await axiosClient.post(
      "http://localhost:3200/leads/deleteLeadRecord",
      {
        _id,
        username,
      }
    );
  },

  // Contacts API

  getContactRecords: async (username) => {
    return await axiosClient.post(
      "http://localhost:3200/contacts/getContactRecords",
      {
        username,
      }
    );
  },
  addContactRecord: async (username, title, description, mobileNumber) => {
    return await axiosClient.post(
      "http://localhost:3200/contacts/addContactRecord",
      {
        username,
        title,
        description,
        mobileNumber,
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
      "http://localhost:3200/contacts/updateContactRecord",
      {
        _id,
        username,
        title,
        description,
        mobileNumber,
      }
    );
  },

  deleteContactRecord: async (_id, username) => {
    return await axiosClient.post(
      "http://localhost:3200/contacts/deleteContactRecord",
      {
        _id,
        username,
      }
    );
  },
};

export default DashboardRepo;
