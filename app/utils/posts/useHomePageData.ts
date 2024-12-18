import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'redaxios';

const fetchPosts = async () => {
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts`) as any
  return post;
}

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPosts(),
  })

export const useHomePageData = () => {
  const queryData = useQuery(
    postsQueryOptions(),
  );
  return queryData;
}