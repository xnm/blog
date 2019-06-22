import createInstance from '../lib';


describe('@utils/unsplash-api', (): void => {

  it('# should use demo app id and secret as sample', async (): Promise<void> => {

    const unsplash = createInstance({
      applicationId: '',
      secret: ''
    });

    let randomPhoto = await unsplash.photos.getRandomPhoto();

    console.log(randomPhoto);
    expect(randomPhoto).not.toBeUndefined();
  });
});
