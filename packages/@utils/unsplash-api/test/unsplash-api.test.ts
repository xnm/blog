import createInstance from '../lib';
import fetch from 'node-fetch';


describe('@utils/unsplash-api', (): void => {

  beforeAll((): void => {
    global['fetch'] = fetch;
  });

  it('# should use demo app id and secret as sample', async (): Promise<void> => {

    const unsplash = createInstance({
      applicationId: '',
      secret: ''
    });

    let randomPhoto = await unsplash.photos.getRandomPhoto();

    expect(randomPhoto).not.toBeUndefined();
  });
});
