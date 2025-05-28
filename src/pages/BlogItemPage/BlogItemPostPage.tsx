import React, { useEffect, useRef } from 'react';
import { APIResponseData, ArticleItem, ArticleListItem } from '~/types/api';
import { BlogItemCarousel } from './BlogItemCarousel';
import { Container } from '~/components/Container';
import { RichText } from '~/components/RichText';
import { Component } from '~/types/general';
import { BlogItemPostPageLoader } from '~/pages/BlogItemPage/BlogItemPostPageLoader';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

interface BlogItemPostPageProps {
  article: APIResponseData<ArticleListItem | ArticleItem>;
}

export const BlogItemPostPage: Component<BlogItemPostPageProps> = ({ article }) => {
  const articleAttributes = article.attributes || {};
  let content: BlocksContent | undefined;
  if ('content' in articleAttributes) {
    content = articleAttributes.content;
  }

  let relatedArticles: APIResponseData<ArticleListItem>[] = [];
  if ('relatedArticles' in articleAttributes) {
    relatedArticles = articleAttributes.relatedArticles;
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!content || !ref.current) {
        return;
      }
      ref.current.style.opacity = '1';
    });
  }, [content]);

  if (!content) {
    return (
      <BlogItemPostPageLoader />
    );
  }

  return (
    <div
      ref={ref}
      className={"transition-opacity ease-linear duration-700 opacity-0"}
    >
      <BlogItemCarousel articles={relatedArticles} />
      <Container>
        <RichText content={content} />
      </Container>
    </div>
  );
};
