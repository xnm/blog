import axios from 'axios';

function getApplicationConfig() {
  const applicationApiUrl = '/api/application.json';
  return axios.get(applicationApiUrl);
}

export default {
  getApplicationConfig
};
