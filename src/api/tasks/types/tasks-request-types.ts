export type GetTasksRequestParams = {
  includeScheduleHistory?: boolean;
};

export type UpdateTaskRequestPayload = {
  name?: string;
  goalId?: number;
};

export type TaskScheduleRequestPayload = {
  onMonday?: boolean;
  onTuesday?: boolean;
  onWednesday?: boolean;
  onThursday?: boolean;
  onFriday?: boolean;
  onSaturday?: boolean;
  onSunday?: boolean;
  scheduleStartDate?: Date;
  scheduleEndDate?: Date | null;
};

export type CreateTaskRequestPayload = {
  name: string;
  goalId?: number;
  schedule: TaskScheduleRequestPayload;
};
