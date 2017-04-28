/* Created by Aquariuslt on 22/04/2017.*/
import axios from 'axios';

function getApplicationProperties() {
  const applicationApiUrl = '/api/application.json';
  return axios.get(applicationApiUrl);
}


export default {
  getApplicationProperties
};
