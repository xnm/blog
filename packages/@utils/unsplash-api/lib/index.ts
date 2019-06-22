import Unsplash from 'unsplash-js';


interface UnsplashApiConfig {
  applicationId: string;
  secret: string;
}

function createInstance(config: UnsplashApiConfig): Unsplash {
  return new Unsplash({
    ...config
  });
}

export default createInstance;
