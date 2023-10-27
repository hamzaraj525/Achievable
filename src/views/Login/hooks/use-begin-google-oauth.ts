import { useState } from 'react';
import {
  AsyncState,
  createFulfilledAsyncState,
  createPendingAsyncState,
  createRejectedAsyncState,
  createVoidAsyncState,
  isAsyncStateFulfilled,
  isAsyncStatePending,
} from '../../../types/async-state';
import { googleOauthBegin } from '../../../api/users/users-api';

export const useBeginGoogleOauth = () => {
  const [asyncState, setAsyncState] = useState<
    AsyncState<Awaited<ReturnType<typeof googleOauthBegin>>>
  >(createVoidAsyncState());

  const beginGoogleOauth = () => {
    setAsyncState(createPendingAsyncState());
    googleOauthBegin()
      .then(response => {
        setAsyncState(createFulfilledAsyncState(response));
      })
      .catch(error => {
        setAsyncState(createRejectedAsyncState(error));
      });
  };

  return {
    beginGoogleOauth,
    asyncState,
    hasBeganGoogleOauth:
      isAsyncStatePending(asyncState) || isAsyncStateFulfilled(asyncState),
  };
};
