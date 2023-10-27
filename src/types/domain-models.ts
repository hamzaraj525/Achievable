export type TaskSchedule = {
  taskScheduleId: number;
  taskId: number;
  onMonday: boolean;
  onTuesday: boolean;
  onWednesday: boolean;
  onThursday: boolean;
  onFriday: boolean;
  onSaturday: boolean;
  onSunday: boolean;
  scheduleStartDate: Date;
  scheduleEndDate: Date | null;
  createdOn: Date;
  isPrimary: boolean;
};

export type Task = {
  taskId: number;
  userId: number;
  name: string;
  createdOn: Date;
  activeSchedule: TaskSchedule;
  scheduleHistory?: TaskSchedule[];
  goal?: Goal;
};

export type Goal = {
  goalId: number;
  name: string;
  targetCompletionDate?: Date | null;
  createdOn: Date;
};

export type TaskCompletion = {
  taskId: number;
  taskCompletionId: number;
  createdOn: Date;
  images: string[];
  usersReactedBy: number[];
  countOfLikes: number;
  description?: string;
};

export type User = {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  handle: string;
  profilePicture: string;
  createdOn: Date;
  verified: boolean;
  profileVisibility: ProfileVisiblityType;
  lastCompletedOnboardingStep?: string;
  isOnboarded: boolean;
};

export enum ReactionType {
  LIKE = 'LIKE',
}

export type TaskCompletionReaction = {
  reactionId: number;
  userId: number;
  taskCompletionId: number;
  type: ReactionType;
  createdOn: Date;
};

export enum ProfileVisiblityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
