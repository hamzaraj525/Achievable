import { Task } from '../../types/domain-models';
import { formatQueryString, getApi, parseApiError } from '../api';
import { applyDefaultAPIResponseTransformations } from '../utils';
import {
  CreateTaskRequestPayload,
  GetTasksRequestParams,
  TaskScheduleRequestPayload,
  UpdateTaskRequestPayload,
} from './types/tasks-request-types';
import {
  CreateTaskResponse,
  GetTasksResponse,
} from './types/tasks-response-types';

export const getMyTasks = async (params: GetTasksRequestParams = {}) => {
  try {
    const response = await (
      await getApi()
    ).get<GetTasksResponse>(`/v1/tasks${formatQueryString(params)}`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getTaskById = async (taskId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<{
      task: Task;
    }>(`/v1/tasks/${taskId}`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const updateTask = async (
  taskId: number,
  updateTaskPayload: UpdateTaskRequestPayload
) => {
  try {
    await (
      await getApi()
    ).patch(`/v1/tasks/${taskId}`, {
      task: updateTaskPayload,
    });
  } catch (error) {
    throw parseApiError(error);
  }
};

export const createTask = async (
  createTaskPayload: CreateTaskRequestPayload
) => {
  try {
    const response = await (
      await getApi()
    ).post<CreateTaskResponse>(`/v1/tasks`, createTaskPayload);
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    await (await getApi()).delete<void>(`/v1/tasks/${taskId}`);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const updateTaskSchedule = async (
  taskId: number,
  updateSchedulePayload: TaskScheduleRequestPayload
) => {
  try {
    await (
      await getApi()
    ).post<void>(`/v1/tasks/${taskId}/schedule`, updateSchedulePayload);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUsersTasks = async (
  userId: number,
  params: GetTasksRequestParams = {}
) => {
  try {
    const response = await (
      await getApi()
    ).get<GetTasksResponse>(
      `/v1/tasks/users/${userId}${formatQueryString(params)}`
    );
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};
