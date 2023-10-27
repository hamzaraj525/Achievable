export const ERRORS = {
  GENERIC_ERROR: 'APP_000',
  UNAUTHENTICATED: 'APP_001',
  NOT_FOLLOWING_USER: 'APP_002',
  INCOMPLETE_ACKKNOWLEDGE_FOLLOW_REQUEST_PARAMETERS: 'APP_003',
  INCOMPLETE_FOLLOW_REQUEST_PARAMETERS: 'APP_004',
  FOLLOW_REQUEST_ALREADY_SENT: 'APP_005',
  INCOMPLETE_CREATE_TASK_PARAMETERS: 'APP_006',
  TASK_SCHEDULE_END_DATE_AFTER_GOAL: 'APP_007',
  TASK_ALREADY_MARKED_AS_COMPLETE: 'APP_008',
  TIMELINE_INVALID_DATE_PARAMETERS: 'APP_009',
  FAILED_TO_CREATE_USER: 'APP_010',
  NO_VIEW_PERMISSIONS: 'APP_011',
} as const;

export class ApiError extends Error {
  code: string;
  name: string;
  statusCode: number;
  constructor(message: string, code: string, name: string, statusCode: number) {
    super(message);
    this.code = code;
    this.name = name;
    this.statusCode = statusCode;
  }
}
