import axios from 'axios';

const createApiClient = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default createApiClient;
