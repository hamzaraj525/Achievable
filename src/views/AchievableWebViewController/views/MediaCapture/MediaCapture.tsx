import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { useHandleAndroidBackButton } from '../../../../hooks/use-android-back-button';
import { AchievableWebViewContext } from '../../context/AchievableWebViewContext';
import { useWebViewMessaging } from '../../hooks/use-web-view-messaging';
import { OutboundWebViewEventTypes } from '../../models';

export const MediaCapture = () => {
  const { webViewRef } = useContext(AchievableWebViewContext);

  const { sendMessage } = useWebViewMessaging();
  useHandleAndroidBackButton(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      webViewRef.current.goBack();
    }
  });

  const handleSendMediaToWebView = () => {
    sendMessage({
      type: OutboundWebViewEventTypes.MEDIA_CAPTURE,
    });
    // sendMessage({
    //   type: OutboundWebViewEventTypes.NAV_CHANGE,
    //   data: {
    //     url: '/',
    //   },
    // });
  };

  return (
    <View>
      <Text>Media Capture</Text>
      <Button
        onPress={handleSendMediaToWebView}
        title="Send Media To WebView"
      />
    </View>
  );
};
