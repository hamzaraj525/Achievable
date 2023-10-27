import {
  Goal,
  Task,
  TaskCompletion,
  TaskSchedule,
  User,
} from '../../../types/domain-models';
import { TaskTimelineType } from './task-timeline-type';

export type TaskTimelineResponse =
  | IncludeUsersAndRatesTaskTimelineResponse
  | IncludeCompletionRateTaskTimelineResponse
  | IncludeUsersTaskTimelineResponse
  | BaseTaskTimelineResponse;

export type IncludeUsersTaskTimelineResponse = {
  users: Record<string, TimelineUser>;
} & BaseTaskTimelineResponse;

export type IncludeUsersAndRatesTaskTimelineResponse = {
  totalTaskCompletionRate: number;
  users: Record<string, TimelineUserWithCompletionRate>;
} & BaseTaskTimelineResponse;

export type IncludeCompletionRateTaskTimelineResponse = {
  totalTaskCompletionRate: number;
} & BaseTaskTimelineResponse;

export type BaseTaskTimelineResponse = {
  _meta: {
    timelineTaskCount: number;
    timelineStartDate: Date;
    timelineEndDate: Date;
  };
  timeline: TimelineTask[];
  tasks: Record<string, TaskInTimeline>;
  goals: Record<string, Goal>;
  schedules: Record<string, TaskSchedule>;
};
export function isCompletedTimelineTask(
  timelineTask: TimelineTask
): timelineTask is CompletedTimelineTask {
  return timelineTask.timelineType === TaskTimelineType.COMPLETED;
}

export function isMissedTimelineTask(
  timelineTask: TimelineTask
): timelineTask is MissedTimelineTask {
  return timelineTask.timelineType === TaskTimelineType.MISSED;
}

export function isScheduledTimelineTask(
  timelineTask: TimelineTask
): timelineTask is ScheduledTimelineTask {
  return timelineTask.timelineType === TaskTimelineType.SCHEDULED;
}

type ScheduledTimelineTask = {
  timelineType: TaskTimelineType.SCHEDULED;
} & BaseTimelineTask;

type MissedTimelineTask = {
  timelineType: TaskTimelineType.MISSED;
} & BaseTimelineTask;

export type CompletedTimelineTask = {
  timelineType: TaskTimelineType.COMPLETED;
  completion: TaskCompletion;
} & BaseTimelineTask;

type BaseTimelineTask = {
  scheduledOn: Date;
  scheduleId: number;
  taskId: number;
  userId: number;
  goalId?: number;
};

export type TimelineTask =
  | ScheduledTimelineTask
  | MissedTimelineTask
  | CompletedTimelineTask;

type TimelineUser = Pick<
  User,
  'userId' | 'handle' | 'firstName' | 'lastName' | 'email' | 'profilePicture'
> & {
  taskCompletionRate: number;
};

export type TimelineUserWithCompletionRate = TimelineUser & {
  taskCompletionRate: number;
};

export type TaskInTimeline = Pick<
  Task,
  'taskId' | 'name' | 'createdOn' | 'userId'
> & {
  goalId?: number;
  scheduleId: number;
};
