/**
 * @link https://developers.google.com/search/docs/data-types/article#amp
 */
import URL from './URL';
import ImageObject from './ImageObject';
import DateTime from './DateTime';
import Person from './Person';
import Organization from './Organization';


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
