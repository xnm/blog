import address from 'address';

function getLanIp() {
  return address.ip();
}

export default {
  getLanIp
};
