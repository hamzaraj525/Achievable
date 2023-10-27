import React from 'react';

import { Platform, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { Navigate } from 'react-router-native';

import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import {
  isAsyncStateFulfilled,
  isAsyncStatePending,
} from '../../../types/async-state';

import { useFinalizeGoogleOauth } from '../hooks/use-finalize-google-oauth';

type Props = {
  redirectUrl: string;
  oauthProvider: 'google';
};

export const OauthRedirectView = ({ redirectUrl, oauthProvider }: Props) => {
  const {
    isLoginSuccessUrl,
    finalizeOauth,
    asyncState: googleFinalizeAsyncState,
  } = useFinalizeGoogleOauth();
  const isFinalized = isAsyncStateFulfilled(googleFinalizeAsyncState);
  const isLoading = isAsyncStatePending(googleFinalizeAsyncState);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (!isLoading && !isFinalized) {
      if (oauthProvider === 'google' && isLoginSuccessUrl(navState.url)) {
        finalizeOauth(navState.url);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <LoadingSpinner />
      </View>
    );
  }

  if (isFinalized) {
    return <Navigate to="/app" />;
  }

  return (
    <WebView
      source={{ uri: redirectUrl }}
      style={{ flex: 1 }}
      userAgent={
        Platform.OS === 'android'
          ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
          : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
      }
      onNavigationStateChange={event => handleNavigationStateChange(event)}
    />
  );
};
