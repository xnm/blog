/**
 * @link https://developers.google.com/search/docs/data-types/article#amp
 */
import ImageObject from './ImageObject';
import Person from './Person';
import Organization from './Organization';
import {DateTime, URL} from './types';


export default interface Article {

  author: Person | Organization;
  publisher: Organization;
  datePublished: DateTime;
  headline: string;
  image: Array<ImageObject | URL>;


  dateModified?: Date;
  description?: string;
  mainEntityOfPage?: URL;

}
