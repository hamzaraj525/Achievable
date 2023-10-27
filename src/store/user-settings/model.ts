import { WebAppConfig } from '../../api/web-app/web-app-api';
import { ProfileVisiblityType, User } from '../../types/domain-models';

export const USER_SETTINGS_NAMESPACE = 'userSettings';

export const initialUserSettingState: UserSettingState = {
  user: {
    userId: -1,
    handle: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    createdOn: new Date(),
    verified: false,
    isOnboarded: false,
    profileVisibility: ProfileVisiblityType.PRIVATE,
  },
  accessToken: '',
  webAppConfig: { ACCESS_TOKEN: 'countbleAccessToken' },
};

export type UserSettingState = {
  user: User;
  accessToken: string;
  webAppConfig: WebAppConfig;
};
