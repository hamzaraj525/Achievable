import { useContext } from 'react';
import {
  BottomNavigationId,
  BottomNavigationIds,
} from '../../../components/layout/navigation';
import { OutboundWebViewEventTypes } from '../models';
import { useWebViewMessaging } from './use-web-view-messaging';
import { AchievableWebViewContext } from '../context';

export const useBottomNavigation = () => {
  const { sendMessage } = useWebViewMessaging();
  const { currentWebViewUrl } = useContext(AchievableWebViewContext);

  const handleBottomNavigationChanged = (navItemId: BottomNavigationId) => {
    if (navItemId === BottomNavigationIds.HOME) {
      sendMessage({
        type: OutboundWebViewEventTypes.NAV_CHANGE,
        data: {
          url: '/home',
        },
      });
    }

    if (navItemId === BottomNavigationIds.PROFILE) {
      sendMessage({
        type: OutboundWebViewEventTypes.NAV_CHANGE,
        data: {
          url: '/profile/me',
        },
      });
    }

    if (navItemId === BottomNavigationIds.SEARCH) {
      sendMessage({
        type: OutboundWebViewEventTypes.NAV_CHANGE,
        data: {
          url: '/search',
        },
      });
    }

    if (navItemId === BottomNavigationIds.GOALS_AND_TASKS) {
      sendMessage({
        type: OutboundWebViewEventTypes.NAV_CHANGE,
        data: {
          url: '/goals-and-tasks',
        },
      });
    }

    if (navItemId === BottomNavigationIds.MEDIA) {
      sendMessage({
        type: OutboundWebViewEventTypes.NAV_CHANGE,
        data: {
          url: '/task-completion-flow',
        },
      });
    }
  };

  const getActiveNavItem = () => {
    console.log(currentWebViewUrl);
    if (currentWebViewUrl.includes('/home')) {
      return BottomNavigationIds.HOME;
    }

    if (currentWebViewUrl.includes('/task-completion-flow')) {
      return BottomNavigationIds.MEDIA;
    }

    if (currentWebViewUrl.includes('/profile')) {
      return BottomNavigationIds.PROFILE;
    }

    if (currentWebViewUrl.includes('/search')) {
      return BottomNavigationIds.SEARCH;
    }

    if (currentWebViewUrl.includes('/goal-and-tasks')) {
      return BottomNavigationIds.GOALS_AND_TASKS;
    }
  };

  return {
    onBottomNavigationChanged: handleBottomNavigationChanged,
    activeNavItem: getActiveNavItem(),
  };
};
