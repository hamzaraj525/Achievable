import { buildWithStateSliceSelector } from '../state-utils';
import { USER_SETTINGS_NAMESPACE } from './model';

const withState = buildWithStateSliceSelector(USER_SETTINGS_NAMESPACE);

export const selectCurrentUser = withState(state => state.user);

export const selectIsCurrentUserAuthenticated = withState(
  state => state.user?.userId !== -1 && !!state.accessToken
);

export const selectAccessToken = withState(state => state.accessToken);

export const selectWebAppTokenLocation = withState(
  state => state.webAppConfig.ACCESS_TOKEN
);
