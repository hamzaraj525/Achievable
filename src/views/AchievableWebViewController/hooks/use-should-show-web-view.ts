import { useContext } from 'react';

import { AchievableWebViewContext } from '../context';
import { NATIVE_VIEW_OVERRIDES } from '../native-webview-page-overrides';

export const useShouldShowWebView = () => {
  const { currentWebViewUrl } = useContext(AchievableWebViewContext);

  return !NATIVE_VIEW_OVERRIDES.some(({ match }) => match(currentWebViewUrl));
};
