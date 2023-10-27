import { AxiosResponse } from 'axios';
import { formatQueryString, getApi, parseApiError } from '../api';
import { UserUpdateRequestPayload } from './types/user-request-types';
import {
  GetSelfResponse,
  GetUserResponse,
  SearchUsersResponse,
} from './types/user-response-types';
import { applyDefaultAPIResponseTransformations } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const spoofOnboarding = (response: AxiosResponse<GetSelfResponse>) => {
  return {
    user: {
      ...response.data.user,
      isOnboarded: false,
      lastCompletedOnboardingStep: '',
    },
  };
};

export const getSelf = async () => {
  try {
    const response = await (
      await getApi()
    ).get<GetSelfResponse>('/v1/users/me');
    // return spoofOnboarding(response);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const updateUser = async (
  userUpdatePayload: UserUpdateRequestPayload
) => {
  try {
    await (await getApi()).put('/v1/users', { user: userUpdatePayload });
  } catch (error) {
    throw parseApiError(error);
  }
};

export const searchUsers = async (searchTerm: string) => {
  try {
    const response = await (
      await getApi()
    ).get<SearchUsersResponse>(
      `/v1/users${formatQueryString({
        searchTerm,
      })}`
    );

    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<GetUserResponse>(`/v1/users/${userId}`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const checkIfUserHandleIsAvailable = async (handle: string) => {
  try {
    const response = await (
      await getApi()
    ).get<{ handleIsAvailable: boolean }>(
      `/v1/users/handle-availability?handle=${handle}`
    );

    return response.data.handleIsAvailable;
  } catch (error) {
    throw parseApiError(error);
  }
};

export const googleOauthFinalize = async (
  code: string,
  tz?: number | string
) => {
  try {
    const response = await (
      await getApi()
    ).get<{
      token: string;
    }>(`/v1/auth/google/callback?code=${code}&tz=${tz}`);

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

export const googleOauthBegin = async (): Promise<string> => {
  try {
    const response = await (await getApi()).get('/v1/auth/google');
    return response.data;
  } catch (error) {
    throw error;
  }
};
