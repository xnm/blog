import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import tagApi from '@/api/tag-api';


// import mocks
import * as mockPosts from './__mocks__/posts.json';
import * as mockTags from './__mocks__/tags.json';


describe('api: tag-api', (): void => {
  it('# should load all tags correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/tags.json').reply(200, mockTags);
    const actualResponse = await tagApi.loadTags();

    expect(actualResponse.data).toEqual(mockTags);
  });

  it('# should load tag by name correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/tags/memory.json').reply(200, mockPosts);

    const actualResponse = await tagApi.loadTag('memory');

    expect(actualResponse.data).toEqual(mockPosts);
  });
});
