import { formatQueryString, getApi, parseApiError } from '../api';
import {
  DefaultAPITransformationOverrides,
  applyDefaultAPIResponseTransformations,
} from '../utils';
import {
  BaseTimelineRequestParams,
  IncludeCompletionRateTimelineRequestParams,
  IncludeUsersAndRatesTimelineRequestParams,
  IncludeUsersTimelineRequestParams,
  TimelineRequestParams,
  doesTimelineRequestIncludeRates,
  doesTimelineRequestIncludeUsers,
  doesTimelineRequestIncludeUsersAndRates,
} from './types/timeline-request-types';
import {
  BaseTaskTimelineResponse,
  IncludeCompletionRateTaskTimelineResponse,
  IncludeUsersAndRatesTaskTimelineResponse,
  IncludeUsersTaskTimelineResponse,
} from './types/timeline-response-types';

function getTimeline(
  url: string,
  params: BaseTimelineRequestParams
): Promise<BaseTaskTimelineResponse>;

function getTimeline(
  url: string,
  params: IncludeUsersTimelineRequestParams
): Promise<IncludeUsersTaskTimelineResponse>;

function getTimeline(
  url: string,
  params: IncludeCompletionRateTimelineRequestParams
): Promise<IncludeCompletionRateTaskTimelineResponse>;

function getTimeline(
  url: string,
  params: IncludeUsersAndRatesTimelineRequestParams
): Promise<IncludeUsersAndRatesTaskTimelineResponse>;

async function getTimeline(url: string, params: TimelineRequestParams) {
  try {
    const formattedUrl = `${url}${formatQueryString(params)}`;
    const api = await getApi();

    const transformOverrides: DefaultAPITransformationOverrides = {
      dateTransformOverrides: {
        createdOn: str => new Date(str),
      },
    };

    if (doesTimelineRequestIncludeUsersAndRates(params)) {
      return applyDefaultAPIResponseTransformations(
        (await api.get(formattedUrl)).data,
        transformOverrides
      );
    }

    if (doesTimelineRequestIncludeRates(params)) {
      return applyDefaultAPIResponseTransformations(
        (await api.get(formattedUrl)).data,
        transformOverrides
      );
    }

    if (doesTimelineRequestIncludeUsers(params)) {
      return applyDefaultAPIResponseTransformations(
        (await api.get(formattedUrl)).data,
        transformOverrides
      );
    }

    return applyDefaultAPIResponseTransformations(
      (await api.get(formattedUrl)).data,
      transformOverrides
    );
  } catch (error) {
    throw parseApiError(error);
  }
}
export function getTimelineFeed(
  params: IncludeUsersAndRatesTimelineRequestParams
): Promise<IncludeUsersAndRatesTaskTimelineResponse>;

export function getTimelineFeed(
  params: IncludeUsersTimelineRequestParams
): Promise<IncludeUsersTaskTimelineResponse>;

export function getTimelineFeed(
  params: IncludeCompletionRateTimelineRequestParams
): Promise<IncludeCompletionRateTaskTimelineResponse>;

export function getTimelineFeed(
  params: BaseTimelineRequestParams
): Promise<BaseTaskTimelineResponse>;

export async function getTimelineFeed(params: TimelineRequestParams) {
  return await getTimeline('/v1/tasks/timeline', params);
}

export function getMyTimeline(
  params: IncludeUsersAndRatesTimelineRequestParams
): Promise<IncludeUsersAndRatesTaskTimelineResponse>;

export function getMyTimeline(
  params: IncludeUsersTimelineRequestParams
): Promise<IncludeUsersTaskTimelineResponse>;

export function getMyTimeline(
  params: IncludeCompletionRateTimelineRequestParams
): Promise<IncludeCompletionRateTaskTimelineResponse>;

export function getMyTimeline(
  params: BaseTimelineRequestParams
): Promise<BaseTaskTimelineResponse>;

export async function getMyTimeline(params: TimelineRequestParams) {
  const url = '/v1/users/me/timeline';
  return await getTimeline(url, params);
}

export function getUsersTimeline(
  userId: number,
  params: IncludeUsersAndRatesTimelineRequestParams
): Promise<IncludeUsersAndRatesTaskTimelineResponse>;

export function getUsersTimeline(
  userId: number,
  params: IncludeUsersTimelineRequestParams
): Promise<IncludeUsersTaskTimelineResponse>;

export function getUsersTimeline(
  userId: number,
  params: IncludeCompletionRateTimelineRequestParams
): Promise<IncludeCompletionRateTaskTimelineResponse>;

export function getUsersTimeline(
  userId: number,
  params: BaseTimelineRequestParams
): Promise<BaseTaskTimelineResponse>;

export async function getUsersTimeline(
  userId: number,
  params: TimelineRequestParams
) {
  return await getTimeline(`/v1/users/${userId}/timeline`, params);
}
