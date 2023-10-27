import { User } from '../../../types/domain-models';

export type SearchUser = Pick<
  User,
  'userId' | 'handle' | 'email' | 'firstName' | 'lastName' | 'profilePicture'
> & {
  followRequestStatus: FollowingStatus;
};

export enum FollowingStatus {
  ACCEPTED = 'ACCEPTED',
  REQUESTED = 'REQUESTED',
  UNREQUESTED = 'UNREQUESTED',
}

export type SelfUserResponseType = User & {
  isSelf: true;
  hasViewPermission: true;
};

export type ViewableUserResponseType = SearchUser & {
  hasViewPermission: true;
  isSelf: false;
  requestStatus: FollowingStatus.ACCEPTED | FollowingStatus.UNREQUESTED;
};

export type LimitedViewUserResponseType = SearchUser & {
  hasViewPermission: false;
  isSelf: false;
  requestStatus: FollowingStatus.REQUESTED | FollowingStatus.UNREQUESTED;
};

type UserResponseType =
  | SelfUserResponseType
  | ViewableUserResponseType
  | LimitedViewUserResponseType;

export const isSelfUserReponseType = (
  userObject: UserResponseType
): userObject is SelfUserResponseType => {
  return userObject.isSelf;
};

export const isViewableUserReponseType = (
  userObject: UserResponseType
): userObject is ViewableUserResponseType => {
  return userObject.hasViewPermission;
};

export const isLimitedViewUserReponseType = (
  userObject: UserResponseType
): userObject is LimitedViewUserResponseType => {
  return !userObject.hasViewPermission;
};

export type GetSelfResponse = {
  user: SelfUserResponseType;
};

export type GetUserResponse = {
  user: UserResponseType;
};

type SearchUserWithFollowingCounts = SearchUser & {
  sharedFollowingIds: number[];
  followingCount: number;
};

export type SearchUsersResponse = {
  users: SearchUserWithFollowingCounts[];
};
