/**
 * @link https://developers.google.com/search/docs/data-types/article#amp
 */
import Image from './Image';
import Person from './Person';
import Organization from './Organization';
import {DateTime, URL} from './types';


export default interface Article {

  author: Person | Organization;
  publisher: Organization;
  datePublished: DateTime;
  headline: string;
  image: Array<Image | URL>;


  dateModified?: Date;
  description?: string;
  mainEntityOfPage?: URL;

}
