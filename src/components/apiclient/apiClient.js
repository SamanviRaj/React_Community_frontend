import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9014', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
