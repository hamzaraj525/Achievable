import { useNavigate } from 'react-router-native';
import { useAppDispatch } from '../../../store';
import { isLogoutEvent } from '../models';
import { useWebViewMessaging } from './use-web-view-messaging';
import { thunks } from '../../../store/user-settings';

export const useWebViewLogout = () => {
  const { subscribe } = useWebViewMessaging();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  subscribe(event => {
    if (isLogoutEvent(event)) {
      dispatch(thunks.logoutThunk());
      navigate('/');
    }
  });
};
