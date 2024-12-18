import { getElementSelector } from './get-element-selector';
import { cleanUpTransition } from './clean-up-transition';

export const handleRouteChangeComplete = (routerKey?: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.__NRVT_previousRouterKey = window.__NRVT_routerKey;
  window.__NRVT_routerKey = routerKey;


  if (window.__NRVT_transitionImgSelector) {
    sessionStorage.setItem(`__NRVT_view_transition_image_selector_${window.__NRVT_previousRouterKey}-${routerKey}`, window.__NRVT_transitionImgSelector);

    window.__NRVT_transitionImgSelector = undefined;
  }
  // Navigation via back-forward
  const backRouterKey = `${routerKey}-${window.__NRVT_previousRouterKey}`;
  const imgSelector = sessionStorage.getItem(`__NRVT_view_transition_image_selector_${backRouterKey}`);
  const img = imgSelector ? document.querySelector<HTMLImageElement>(imgSelector) : undefined;

  cleanUpTransition();
  if (img) {
    img.style.viewTransitionName = '__NRVT_transition-img';
  } else {
    // Navigation via clicking link

    const transitionImg = document.querySelector<HTMLImageElement>(`[${window.__NRVT_transitionAttributeName}="${window.__NRVT_transitionAttributeValue}"]`);

    if (transitionImg) {
      const imgSelector = getElementSelector(transitionImg) || '';
      transitionImg.style.viewTransitionName = '__NRVT_transition-img';
      sessionStorage.setItem(`__NRVT_view_transition_image_selector_${backRouterKey}`, imgSelector);
    }
  }

  window.__NRVT_transitionAttributeValue = undefined;
}
