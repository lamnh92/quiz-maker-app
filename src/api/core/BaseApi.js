import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://opentdb.com",
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response !== undefined && response.data !== undefined) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    throw error;
  }
);

export default axiosClient;
