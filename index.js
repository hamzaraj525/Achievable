/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import notifee, {AndroidImportance} from '@notifee/react-native';

// async function onDisplayNotification(remoteMessage) {
//   const channelId = await notifee.createChannel({
//     id: 'default5',
//     name: 'Default Channel5',
//     importance: AndroidImportance.HIGH,
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title: remoteMessage?.notification.title,
//     body: remoteMessage?.notification.body,

//     android: {
//       channelId,
//     },
//   });
// }

//BackGround and killed State
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Handle background notifications
  const {title, body} = remoteMessage.notification;
  console.log('backgrounf--->' + remoteMessage);
  // onDisplayNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
