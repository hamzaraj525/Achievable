import { formatQueryString, getApi, parseApiError } from '../api';
import { applyDefaultAPIResponseTransformations } from '../utils';
import {
  FollowRequestAcknowledgementRequestPayload,
  FollowRequestDirection,
  GetFollowRequestsRequestParams,
} from './types/follow-relationships-request-types';
import {
  GetFollowRelationshipsResponse,
  GetFollowRequestsResponse,
  SendFollowRequestResponse,
} from './types/follow-relationships-response-types';

export const getUsersFollowingMe = async () => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRelationshipsResponse>('/v1/users/following');
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUsersFollowedByMe = async () => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRelationshipsResponse>('/v1/users/followed-by');
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUsersFollowingUser = async (userId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRelationshipsResponse>(`/v1/users/${userId}/following`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUsersFollowedByUser = async (userId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRelationshipsResponse>(`/v1/users/${userId}/followed-by`);
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

export const sendFollowRequest = async (followRequestPayload: {
  userId: number;
}) => {
  try {
    const response = await (
      await getApi()
    ).post<SendFollowRequestResponse>(
      '/v1/users/follow-request',
      followRequestPayload
    );
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const unfollowUser = async (userId: number) => {
  try {
    return await (await getApi()).delete(`/v1/users/follow-request/${userId}`);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const acknowledgeFollowRequest = async (
  acknowledgementPayload: FollowRequestAcknowledgementRequestPayload
) => {
  try {
    await (
      await getApi()
    ).post('/v1/users/follow-request/acknowledge', acknowledgementPayload);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getMyIncomingFollowRequests = async (
  params: Omit<GetFollowRequestsRequestParams, 'direction'>
) => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRequestsResponse>(
      `/v1/users/follow-requests${formatQueryString({
        ...params,
        direction: FollowRequestDirection.inbound,
      })}`
    );
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getMyOutgoingFollowRequests = async (
  params: Omit<GetFollowRequestsRequestParams, 'direction'>
) => {
  try {
    const response = await (
      await getApi()
    ).get<GetFollowRequestsResponse>(
      `/v1/users/follow-requests${formatQueryString({
        ...params,
        direction: FollowRequestDirection.outbound,
      })}`
    );
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};
