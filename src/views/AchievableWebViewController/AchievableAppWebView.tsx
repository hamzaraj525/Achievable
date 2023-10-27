import React, {useContext, useEffect} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';

import {
  AchievableWebViewContext,
  provideWebViewContext,
} from './context/AchievableWebViewContext';
import {useShouldShowWebView} from './hooks/use-should-show-web-view';
import {getConfig} from '../../config';
import {useWebViewMessaging} from './hooks/use-web-view-messaging';
import {useAppSelector} from '../../store';
import {
  selectAccessToken,
  selectWebAppTokenLocation,
} from '../../store/user-settings';
import {useGetUrlOverrideComponent} from './hooks/use-get-url-override-component';
import {BottomNavigation} from '../../components/layout/navigation';
import {useBottomNavigation} from './hooks/use-bottom-navigation';
import {useWebViewAndroidBackButton} from './hooks/use-web-view-android-back-button';
import {useWebViewLogout} from './hooks/use-web-view-logout';
import {Notifications} from 'react-native-notifications';
import {notificationListeners, requestUserPermission} from './NotificationFun';

export const AchievableAppWebView = provideWebViewContext(() => {
  const {webViewRef, setCurrentWebViewUrl} = useContext(
    AchievableWebViewContext,
  );
  const accessToken = useAppSelector(selectAccessToken);
  const webAppTokenLocation = useAppSelector(selectWebAppTokenLocation);

  const shouldShowWebPage = useShouldShowWebView();
  const MaybeOverriddenComponent = useGetUrlOverrideComponent();

  useWebViewAndroidBackButton();
  useWebViewLogout();

  const {onWebViewMessage} = useWebViewMessaging();
  const {onBottomNavigationChanged, activeNavItem} = useBottomNavigation();

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    setCurrentWebViewUrl(event.url);
  };

  const styles = stylesheet({shouldShowWebPage});

  const initiateAccessToken = `
    localStorage.setItem('${webAppTokenLocation}', '${accessToken}');
  `;

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestUserPermission();
      notificationListeners();
    } else {
      requestUserPermission();
    }
  }, []);

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   if (Platform.OS == 'ios') {
  //     await notifee.requestPermission();
  //   }

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default1',
  //     name: 'Default Channel1',
  //     importance: AndroidImportance.HIGH,
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'ss',
  //     body: 'ss',

  //     android: {
  //       channelId,
  //     },
  //   });
  // }

  return (
    <SafeAreaView style={{flex: 1}}>
      {MaybeOverriddenComponent && <MaybeOverriddenComponent />}
      <SafeAreaView style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          userAgent={
            Platform.OS === 'android'
              ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
              : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
          }
          onMessage={onWebViewMessage}
          source={{uri: getConfig().WEB_APP_BASE}}
          style={{flex: 1}}
          injectedJavaScript={initiateAccessToken}
          onNavigationStateChange={handleNavigationStateChange}
        />
        {/* <Pressable
          onPress={onDisplayNotification}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Text>Press me to trigger notification</Text>
        </Pressable> */}
      </SafeAreaView>
      <BottomNavigation
        activeNavItemId={activeNavItem}
        onNavigate={onBottomNavigationChanged}
      />
    </SafeAreaView>
  );
});

const stylesheet = (props: {shouldShowWebPage: boolean}) =>
  StyleSheet.create({
    webViewContainer: props.shouldShowWebPage
      ? {
          flex: 1,
        }
      : {
          height: 1,
          width: 1,
        },
  });
