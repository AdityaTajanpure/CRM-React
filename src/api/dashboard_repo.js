import axiosClient from "./client";

const DashboardRepo = {
  getServiceRequests: async (username) => {
    return await axiosClient.post("services/getServiceRequests", {
      username,
    });
  },
  addServiceRequest: async (username, title, description, status) => {
    return await axiosClient.post("services/addServiceRequest", {
      username,
      title,
      description,
      status,
    });
  },

  updateServiceRequest: async (_id, username, title, description, status) => {
    return await axiosClient.post("services/updateServiceRequest", {
      _id,
      username,
      title,
      description,
      status,
    });
  },

  deleteServiceRequest: async (_id, username) => {
    return await axiosClient.post("services/deleteServiceRequest", {
      _id,
      username,
    });
  },

  // Leads api

  getLeads: async (username) => {
    return await axiosClient.post("leads/getLeadRecords", {
      username,
    });
  },
  addLeadRecord: async (username, title, description, status) => {
    return await axiosClient.post("leads/addLeadRecord", {
      username,
      title,
      description,
      status,
    });
  },

  updateLeadRecord: async (_id, username, title, description, status) => {
    return await axiosClient.post("leads/updateLeadRecord", {
      _id,
      username,
      title,
      description,
      status,
    });
  },

  deleteLeadRecord: async (_id, username) => {
    return await axiosClient.post("leads/deleteLeadRecord", {
      _id,
      username,
    });
  },

  // Contacts API

  getContactRecords: async (username) => {
    return await axiosClient.post("contacts/getContactRecords", {
      username,
    });
  },
  addContactRecord: async (username, title, description, mobileNumber) => {
    return await axiosClient.post("contacts/addContactRecord", {
      username,
      title,
      description,
      mobileNumber,
    });
  },

  updateContactRecord: async (
    _id,
    username,
    title,
    description,
    mobileNumber
  ) => {
    return await axiosClient.post("contacts/updateContactRecord", {
      _id,
      username,
      title,
      description,
      mobileNumber,
    });
  },

  deleteContactRecord: async (_id, username) => {
    return await axiosClient.post("contacts/deleteContactRecord", {
      _id,
      username,
    });
  },
};

export default DashboardRepo;
