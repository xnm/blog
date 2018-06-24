import titleUtil from '@/post/utils/title-util';

describe('title-util', function() {
  const DEFAULT_TITLE = 'Someone Blog';

  beforeEach(function() {
    document.title = DEFAULT_TITLE;
  });

  it('# should be set title with default app name', function() {
    const SOME_TITLE = 'Some Title';
    titleUtil.setTitle(SOME_TITLE);

    expect(document.title).toEqual(SOME_TITLE + ' | ' + DEFAULT_TITLE);
  });

  it('# should be set post title with default app name', function() {
    const SOME_ARTICLE_TITLE = 'Some Post Title';
    const post = {
      metadata: {
        title: SOME_ARTICLE_TITLE
      }
    };
    titleUtil.setPostTitle(post);

    expect(document.title).toEqual(SOME_ARTICLE_TITLE + ' | ' + DEFAULT_TITLE);
  });

  it('# should be set filter type and filter value as title with default app name', function() {
    const FILTER_TYPE = 'Categories';
    const FILTER_VALUE = 'Blog';
    titleUtil.setFilteredTitle(FILTER_TYPE, FILTER_VALUE);

    expect(document.title).toEqual(FILTER_TYPE + ' : ' + FILTER_VALUE + ' | ' + DEFAULT_TITLE);
  });
});
