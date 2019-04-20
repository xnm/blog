import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import categoryApi from '@/api/category-api';

// import mocks
import * as mockPosts from './__mocks__/posts.json';
import * as mockCategories from './__mocks__/categories.json';

describe('api: category-api', (): void => {
  it('# should load all categories correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/categories.json').reply(200, mockCategories);
    const actualResponse = await categoryApi.loadCategories();

    expect(actualResponse.data).toEqual(mockCategories);
  });


  it('# should load category by name correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/categories/life.json').reply(200, mockPosts);
    const actualResponse = await categoryApi.loadCategory('life');

    expect(actualResponse.data).toEqual(mockPosts);
  });
});
