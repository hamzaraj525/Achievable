import { Task } from '../../../types/domain-models';

export type GetTasksResponse = {
  count: number;
  tasks: Task[];
};

export type CreateTaskResponse = {
  taskId: number;
};
