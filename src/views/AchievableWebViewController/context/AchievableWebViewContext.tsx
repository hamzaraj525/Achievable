import React, {
  ComponentType,
  RefObject,
  createContext,
  useRef,
  useState,
} from 'react';
import WebView, { WebViewProps } from 'react-native-webview';
import { getConfig } from '../../../config';

export const AchievableWebViewContext = createContext<{
  webViewRef: RefObject<WebView<WebViewProps>>;
  currentWebViewUrl: string;
  setCurrentWebViewUrl: (next: string) => void;
}>({
  currentWebViewUrl: '',
  setCurrentWebViewUrl: () => undefined,
  webViewRef: React.createRef(),
});

export const provideWebViewContext = (ProvidedComponent: ComponentType) => {
  const AchievableWebViewContextProvider = () => {
    const [currentWebViewUrl, setCurrentWebViewUrl] = useState<string>(
      getConfig().WEB_APP_BASE
    );
    const webViewRef = useRef<WebView<WebViewProps>>(null);

    return (
      <AchievableWebViewContext.Provider
        value={{
          currentWebViewUrl,
          setCurrentWebViewUrl,
          webViewRef,
        }}
      >
        <ProvidedComponent />
      </AchievableWebViewContext.Provider>
    );
  };

  return AchievableWebViewContextProvider;
};
