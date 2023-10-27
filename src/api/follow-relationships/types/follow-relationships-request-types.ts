export enum FollowRequestDirection {
  outbound = 'outbound',
  inbound = 'inbound',
}

export type GetFollowRequestsRequestParams = {
  direction?: FollowRequestDirection;
  includeDenied?: boolean;
};

export type FollowRequestAcknowledgementRequestPayload = {
  userId: number;
  followDecision: boolean;
};
