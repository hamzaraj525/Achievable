import { Goal } from '../../../types/domain-models';

export type GetGoalsResponse = {
    count: number;
    goals: Goal[];
};

export type UpdateGoalResponse = {
    updatedGoal: Goal;
};

export type CreateGoalResponse = {
    goal: Goal;
};
