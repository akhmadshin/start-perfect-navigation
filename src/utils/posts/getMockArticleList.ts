import articlesList from '../../../public/mock.json';
import { APIResponseData, ApiResponseMedia, ArticleListApi, ArticleListItem } from '~/types/api';

export const getMockArticleList = (origId: number) => {
  const id = origId % 20;

  const articleAttributes = articlesList[id].attributes;

  const {
    description,
    headings,
    previewContent,
    thumbnail,
  } = articleAttributes;
  const title = `Lorem ipsum ${origId}`;
  const slug = `lorem-ipsum-${origId}`;
  return {
    ...articlesList[id],
    attributes: {
      description,
      headings,
      previewContent,
      thumbnail: thumbnail as ApiResponseMedia,
      slug,
      title,
    } as ArticleListItem
  }
};