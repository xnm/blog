/* Created by Aquariuslt on 22/04/2017.*/
import axios from 'axios';

function getApplicationProperties(next) {
  const url = '/api/application.json';
  axios.get(url)
    .then(function (response) {
      next(response.data);
    });
}


export default {
  getApplicationProperties
};
