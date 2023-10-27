import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    fetchToken();
  }
}

const fetchToken = async () => {
  const tokenDevice = await messaging().getToken();
  console.log('firebase messaging device token--->' + tokenDevice);
};

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message-->', remoteMessage);
    onDisplayNotification(remoteMessage);
  });

  return unsubscribe;
}

async function onDisplayNotification(remoteMessage) {
  // Request permissions (required for iOS)
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default5',
    name: 'Default Channel5',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage?.notification.title,
    body: remoteMessage?.notification.body,

    android: {
      channelId,
    },
  });
}
