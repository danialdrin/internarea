import axios from "axios";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://internarea-9bwi.onrender.com";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || `${BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Admin endpoints
  adminLogin: async (username: string, password: string) => {
    const response = await apiClient.post("/admin/adminlogin", {
      username,
      password,
    });
    return response.data;
  },

  // Internship endpoints
  getInternships: async () => {
    const response = await apiClient.get("/internship");
    return response.data;
  },
  getInternshipById: async (id: string) => {
    const response = await apiClient.get(`/internship/${id}`);
    return response.data;
  },
  createInternship: async (data: any) => {
    const response = await apiClient.post("/internship", data);
    return response.data;
  },

  // Job endpoints
  getJobs: async () => {
    const response = await apiClient.get("/job");
    return response.data;
  },
  getJobById: async (id: string) => {
    const response = await apiClient.get(`/job/${id}`);
    return response.data;
  },
  createJob: async (data: any) => {
    const response = await apiClient.post("/job", data);
    return response.data;
  },

  // Application endpoints
  getApplications: async () => {
    const response = await apiClient.get("/application");
    return response.data;
  },
  getApplicationById: async (id: string) => {
    const response = await apiClient.get(`/application/${id}`);
    return response.data;
  },
  createApplication: async (data: any) => {
    const response = await apiClient.post("/application", data);
    return response.data;
  },
  updateApplicationStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/application/${id}`, { status });
    return response.data;
  },

  // Public Space endpoints
  getPublicPosts: async () => {
    const response = await apiClient.get("/publicspace/post");
    return response.data;
  },
  createPublicPost: async (postData: any) => {
    const response = await apiClient.post("/publicspace/post", postData);
    return response.data;
  },
  likePublicPost: async (postId: string, uid: string) => {
    const response = await apiClient.post(`/publicspace/post/${postId}/like`, {
      uid,
    });
    return response.data;
  },
  commentPublicPost: async (postId: string, comment: any) => {
    const response = await apiClient.post(
      `/publicspace/post/${postId}/comment`,
      comment
    );
    return response.data;
  },
  sharePublicPost: async (postId: string, share: any) => {
    const response = await apiClient.post(
      `/publicspace/post/${postId}/share`,
      share
    );
    return response.data;
  },
  syncPublicUser: async (userData: {
    uid: string;
    name?: string;
    email?: string;
    photo?: string;
  }) => {
    const response = await apiClient.post("/publicspace/user", userData);
    return response.data;
  },
  addPublicFriend: async (uid: string, friendUid: string) => {
    const response = await apiClient.put(`/publicspace/user/${uid}/friend`, {
      friendUid,
    });
    return response.data;
  },
};

export default apiClient;
