/**
 * @link https://developers.google.com/search/docs/data-types/article#amp
 */
import Image from './image';
import Person from './person';
import Organization from './organization';
import { DateTime, URL } from './other-types';

export default interface Article {
  author: Person | Organization;
  publisher: Organization;
  datePublished: DateTime;
  headline: string;
  image: (Image | URL)[];

  dateModified?: Date;
  description?: string;
  mainEntityOfPage?: URL;
}
