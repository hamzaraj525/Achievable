import { Goal } from '../../types/domain-models';
import { getApi, parseApiError } from '../api';
import { applyDefaultAPIResponseTransformations } from '../utils';
import { GoalUpdateRequestPayload } from './types/goal-request-types';
import {
  CreateGoalResponse,
  GetGoalsResponse,
  UpdateGoalResponse,
} from './types/goal-response-types';

export const getMyGoals = async () => {
  try {
    const response = await (
      await getApi()
    ).get<GetGoalsResponse>('/v1/tasks/goals');
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getGoalById = async (goalId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<{
      goal: Goal;
    }>(`/v1/tasks/goals/${goalId}`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const createGoal = async (
  goalCreatePayload: GoalUpdateRequestPayload
) => {
  try {
    const response = await (
      await getApi()
    ).post<CreateGoalResponse>('/v1/tasks/goals', goalCreatePayload);

    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const deleteGoal = async (goalId: number) => {
  try {
    await (await getApi()).delete(`/v1/tasks/goals/${goalId}`);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const updateGoal = async (
  goalId: number,
  goalUpdatePayload: GoalUpdateRequestPayload
) => {
  try {
    const response = await (
      await getApi()
    ).patch<UpdateGoalResponse>(`/v1/tasks/goals/${goalId}`, goalUpdatePayload);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};

export const getUsersGoals = async (userId: number) => {
  try {
    const response = await (
      await getApi()
    ).get<GetGoalsResponse>(`/v1/tasks/goals/users/${userId}`);
    return applyDefaultAPIResponseTransformations(response.data);
  } catch (error) {
    throw parseApiError(error);
  }
};
