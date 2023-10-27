import { useContext, useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { AchievableWebViewContext } from '../context';

export const useWebViewAndroidBackButton = () => {
  const { webViewRef } = useContext(AchievableWebViewContext);

  const onAndroidBackPress = () => {
    if (webViewRef && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress
        );
      };
    }
  }, []);
};
