import { useContext } from 'react';
import { AchievableWebViewContext } from '../context/AchievableWebViewContext';
import { NATIVE_VIEW_OVERRIDES } from '../native-webview-page-overrides';

export const useGetUrlOverrideComponent = () => {
  const { currentWebViewUrl } = useContext(AchievableWebViewContext);

  const maybeOverride = NATIVE_VIEW_OVERRIDES.find(({ match }) =>
    match(currentWebViewUrl)
  );

  return maybeOverride ? maybeOverride.Component : undefined;
};
