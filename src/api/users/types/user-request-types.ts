import { ProfileVisiblityType } from '../../../types/domain-models';

export type UserUpdateRequestPayload = {
  firstName?: string;
  lastName?: string;
  handle?: string;
  verified?: boolean;
  isOnboarded?: boolean;
  lastCompletedOnboardingStep?: string;
  profileVisibility?: ProfileVisiblityType;
};
