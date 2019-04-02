export default interface SocialProfile {
  name: 'Facebook' | 'Twitter' | 'Google+' | 'Instagram' | 'YouTube' | 'LinkedIn';
  sameAs?: string | Array<string>;
  url: string;
}
