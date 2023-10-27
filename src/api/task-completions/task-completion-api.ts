import { ReactionType } from '../../types/domain-models';
import { getApi, parseApiError } from '../api';
import { applyDefaultAPIResponseTransformations } from '../utils';
import { GetTaskCompletionReactionsResponse } from './task-completion-responses';
import { TaskCompletionRequestPayload } from './types/task-completion-request-type';
import { TaskCompletionResponse } from './types/task-completion-response-type';

export const markTaskAsComplete = async (
  taskId: number,
  createTaskCompletionPayload: TaskCompletionRequestPayload
) => {
  try {
    const response = await (
      await getApi()
    ).post<TaskCompletionResponse>(
      `/v1/tasks/schedules/${taskId}`,
      createTaskCompletionPayload
    );

    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getTaskCompletionsReactions = async (taskCompletionId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<GetTaskCompletionReactionsResponse>(
      `/v1/tasks/task-completions/${taskCompletionId}/reactions`
    );
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const reactToTaskCompletion = async (
  taskCompletionId: number,
  reactionType: ReactionType
) => {
  try {
    const response = await (
      await getApi()
    ).post('/v1/tasks/task-completions/reactions', {
      taskCompletionId,
      reactionType,
    });
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
