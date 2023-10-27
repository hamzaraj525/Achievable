import { Subject } from 'rxjs';
import { WebViewMessageEvent } from 'react-native-webview';
import { useContext } from 'react';

import { InboundWebViewEvent, OutboundWebViewEvent } from '../models';
import { AchievableWebViewContext } from '../context';

let _observable: Subject<InboundWebViewEvent> | null;

function getInboundWebViewEventObservable() {
  if (!_observable) {
    _observable = new Subject<InboundWebViewEvent>();
  }
  return _observable;
}

export const useWebViewMessaging = () => {
  const observable = getInboundWebViewEventObservable();
  const { webViewRef } = useContext(AchievableWebViewContext);

  const sendMessage = (event: OutboundWebViewEvent) => {
    if (webViewRef && webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.postMessage('${JSON.stringify(event)}')
      `);
    } else {
      console.log('no web view ref');
    }
  };

  const handleInboundWebViewMessage = (message: WebViewMessageEvent) => {
    const {
      nativeEvent: { data },
    } = message;

    const event = JSON.parse(data) as InboundWebViewEvent;
    observable.next(event);
  };

  const handleSubscribe = (callback: (event: InboundWebViewEvent) => void) => {
    observable.subscribe(callback);
  };

  return {
    subscribe: handleSubscribe,
    unsubscribe: observable.unsubscribe,
    sendMessage,
    onWebViewMessage: handleInboundWebViewMessage,
  };
};
