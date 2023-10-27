// Copied from BE ./src/services/push-notifications/push-event-types.ts

export enum PushNotificationEventType {
  NOTIFY_FOLLOWERS_OF_TASK_COMPLETION = 'NOTIFY_FOLLOWERS_OF_TASK_COMPLETION',
  NOTIFY_USER_OF_FOLLOW_REQUEST = 'NOTIFY_USER_OF_FOLLOW_REQUEST',
  NOTIFY_USER_OF_ACCEPTED_FOLLOW_REQUEST = 'NOTIFY_USER_OF_ACCEPTED_FOLLOW_REQUEST',
  NOTIFY_OF_INCOMPLETE_TASKS = 'NOTIFY_OF_INCOMPLETE_TASKS',
  NOTIFY_OF_REACTION_TO_COMPLETION = 'NOTIFY_OF_REACTION_TO_COMPLETION',
}

export type PushNotificationMessage =
  | NotifyUserOfFollowRequestPushMessage
  | NotifyUserOfAcceptedFollowRequestPushMessage
  | NotifiyFollowersOfTaskCompletion
  | NotifyOfIncompleteTasks
  | NotifyOfReactionToCompletion;

type NotifyOfIncompleteTasks = BasePushNotificationMessage<
  PushNotificationEventType.NOTIFY_OF_INCOMPLETE_TASKS,
  {
    taskIds: number[];
  }
>;

type NotifyUserOfFollowRequestPushMessage = BasePushNotificationMessage<
  PushNotificationEventType.NOTIFY_USER_OF_FOLLOW_REQUEST,
  {
    followeeUserId: number;
    followeeFirstName: string;
  }
>;

type NotifyUserOfAcceptedFollowRequestPushMessage = BasePushNotificationMessage<
  PushNotificationEventType.NOTIFY_USER_OF_ACCEPTED_FOLLOW_REQUEST,
  {
    followeeUserId: number;
    followeeFirstName: string;
  }
>;

type NotifiyFollowersOfTaskCompletion = BasePushNotificationMessage<
  PushNotificationEventType.NOTIFY_FOLLOWERS_OF_TASK_COMPLETION,
  {
    taskCompletionId: number;
    userId: number;
    firstName: string;
  }
>;

type NotifyOfReactionToCompletion = BasePushNotificationMessage<
  PushNotificationEventType.NOTIFY_OF_REACTION_TO_COMPLETION,
  {
    taskCompletionId: number;
    firstName: string;
  }
>;

type BasePushNotificationMessage<
  PushEventType extends PushNotificationEventType,
  Payload
> = {
  type: PushEventType;
  data?: Payload;
};
