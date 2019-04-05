import {format} from 'date-fns';
import * as uslug from 'uslug';


function getTimePrefix(post: BlogModel.Post): string {
  const created = new Date(post.metadata.created);
  return format(created, '/YYYY/MM/DD');
}


function getPostTitleLink(post: BlogModel.Post): string {
  const title = post.metadata.title;
  return '/' + uslug(title);
}


export default {
  getTimePrefix,
  getPostTitleLink
};
