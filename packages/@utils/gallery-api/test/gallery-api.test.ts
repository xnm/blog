import GalleryApi from '../lib';
import { startsWith } from 'lodash';

describe('@utils/picsum-api', (): void => {
  it('# should api return real response url', async (): Promise<void> => {
    let api = new GalleryApi({});
    const photoUrl = await api.getPhoto('some-article-title');

    expect(photoUrl).not.toBeNull();
    expect(startsWith(photoUrl, 'https://'));
  });


  it('# should hit cache with call two times with same criteria', async (): Promise<void> => {
    let api = new GalleryApi({});
    const photoUrl = await api.getPhoto('some-article-title');
    const dupPhotoUrl = await api.getPhoto('some-article-title');

    expect(photoUrl).toEqual(dupPhotoUrl);
  });
});
