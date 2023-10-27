import { ApiError } from '../api/api-error';
import { $tsMigrateAny } from './types';

export enum AsyncStatus {
  Void = 'void',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export type AsyncState<T = undefined> =
  | VoidAsyncState
  | RejectedAsyncState
  | PendingAsyncState
  | FullfilledAsyncState<T>;

export type VoidAsyncState = {
  status: AsyncStatus.Void;
};

export type RejectedAsyncState = {
  status: AsyncStatus.Rejected;
  error: ApiError;
};

export type PendingAsyncState = {
  status: AsyncStatus.Pending;
};

export type FullfilledAsyncState<T> = {
  status: AsyncStatus.Fulfilled;
  data: T;
};

export const isAsyncStatePending = (
  asyncState: AsyncState<$tsMigrateAny>
): asyncState is PendingAsyncState => {
  return asyncState.status === AsyncStatus.Pending;
};

export const isAsyncStateFulfilled = (
  asyncState: AsyncState<$tsMigrateAny>
): asyncState is FullfilledAsyncState<$tsMigrateAny> =>
  asyncState.status === AsyncStatus.Fulfilled;

export const isAsyncStateRejected = (
  asyncState: AsyncState<$tsMigrateAny>
): asyncState is RejectedAsyncState =>
  asyncState.status === AsyncStatus.Rejected;

export const isAsyncStateVoid = (
  asyncState: AsyncState<$tsMigrateAny>
): asyncState is PendingAsyncState => asyncState.status === AsyncStatus.Void;

export const createPendingAsyncState = (): PendingAsyncState => ({
  status: AsyncStatus.Pending,
});

export const createVoidAsyncState = (): VoidAsyncState => ({
  status: AsyncStatus.Void,
});

export const createFulfilledAsyncState = <T>(
  data: T
): FullfilledAsyncState<T> => ({
  status: AsyncStatus.Fulfilled,
  data,
});

export const createRejectedAsyncState = (
  error: ApiError
): RejectedAsyncState => ({
  status: AsyncStatus.Rejected,
  error,
});
