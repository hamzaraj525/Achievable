import { TaskTimelineType } from './task-timeline-type';

export type TimelineRequestParams =
  | IncludeUsersTimelineRequestParams
  | IncludeUsersAndRatesTimelineRequestParams
  | IncludeCompletionRateTimelineRequestParams
  | BaseTimelineRequestParams;

export type BaseTimelineRequestParams = {
  fromDaysAgo?: number;
  toDaysFromNow?: number;
  startDate?: Date;
  endDate?: Date;
  taskTimelineTypes?: Array<TaskTimelineType | 'ALL'>;
  includeUsers?: boolean;
  includeCompletionRates?: boolean;
};

export const doesTimelineRequestIncludeUsers = (
  params: TimelineRequestParams
): params is IncludeUsersTimelineRequestParams => params.includeUsers === true;

export const doesTimelineRequestIncludeRates = (
  params: TimelineRequestParams
): params is IncludeCompletionRateTimelineRequestParams =>
  params.includeCompletionRates === true;

export const doesTimelineRequestIncludeUsersAndRates = (
  params: TimelineRequestParams
): params is IncludeUsersAndRatesTimelineRequestParams =>
  doesTimelineRequestIncludeRates(params) &&
  doesTimelineRequestIncludeUsers(params);

export type IncludeUsersTimelineRequestParams = BaseTimelineRequestParams & {
  includeUsers: true;
};

export type IncludeUsersAndRatesTimelineRequestParams =
  BaseTimelineRequestParams & {
    includeUsers: true;
    includeCompletionRates: true;
  };

export type IncludeCompletionRateTimelineRequestParams =
  BaseTimelineRequestParams & {
    includeCompletionRates: true;
  };
