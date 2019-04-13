import * as address from 'address';

function getLanIp(): string {
  return address.ip();
}

export default {
  getLanIp
};
