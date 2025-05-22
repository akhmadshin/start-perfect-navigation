import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps } from '@tanstack/react-router';
import { handleTransitionStarted } from '@/rich-view-transitions/handle-transition-started';
import { usePlaceholderDataStore } from '@/stores/placeholderDataStore';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, ...props }) => {
  const setPlaceholderData = usePlaceholderDataStore(state => state.setPlaceholderData);
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    setPlaceholderData(placeholderData);

    // Find an image that should start transitioning. Feel free to change that code.
    const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');
    const src = transitionImg ? transitionImg.src.replace(location.origin || '', '') : '';

    handleTransitionStarted({
      element: transitionImg,
      attributeName: 'src',
      attributeValue: src,
    });
  }

  return (
    <TanstackLink
      viewTransition={true}
      onClick={handleClick}
      {...props}
    >
      {children}
    </TanstackLink>
  )
}