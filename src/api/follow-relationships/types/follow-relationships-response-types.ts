import { User } from '../../../types/domain-models';

export type FollowUserModel = Pick<
  User,
  'userId' | 'handle' | 'firstName' | 'lastName' | 'email' | 'profilePicture'
>;

enum FollowRelationshipDirection {
  IS_FOLLOWING_YOU = 'IS_FOLLOWING_YOU',
  IS_FOLLOWED_BY_YOU = 'IS_FOLLOWED_BY_YOU',
  IS_REQUESTING_TO_FOLLOW_YOU = 'IS_REQUESTING_TO_FOLLOW_YOU',
  YOU_ARE_REQUESTING_TO_FOLLOW = 'YOU_ARE_REQUESTING_TO_FOLLOW',
}

export type FollowPair = {
  user: FollowUserModel;
  dateInitiated: Date;
  relationshipDirection: FollowRelationshipDirection;
  isFollowRelationshipApproved: boolean;
  dateFollowRelationshipAcknowledged?: Date;
};

export type GetFollowRelationshipsResponse = {
  count: number;
  usersFollowing: FollowPair[];
};

export type GetFollowRequestsResponse = {
  count: number;
  requests: FollowPair[];
};

export type SendFollowRequestResponse = {
  requestStatus: 'REQUESTED' | 'ACCEPTED';
};
