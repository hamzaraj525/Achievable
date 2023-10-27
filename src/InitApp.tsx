import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { actions } from './store/user-settings';
import {
  AsyncState,
  createFulfilledAsyncState,
  createPendingAsyncState,
  createRejectedAsyncState,
  createVoidAsyncState,
  isAsyncStateFulfilled,
  isAsyncStatePending,
  isAsyncStateVoid,
} from './types/async-state';
import { User } from './types/domain-models';
import { View } from 'react-native';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { getAccessToken } from './utils';
import { getSelf } from './api/users/users-api';
import { getWebAppConfig } from './api/web-app/web-app-api';

const VerifyAuthentication = (props: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [getSelfAsyncState, setGetSelfAsyncState] = useState<AsyncState<User>>(
    createVoidAsyncState()
  );

  const [readTokenAsyncState, setReadTokenAsyncState] = useState<
    AsyncState<string | null>
  >(createVoidAsyncState());

  const [getWebAppConfigAsyncState, setGetWebAppConfigAsyncState] = useState<
    AsyncState<Awaited<ReturnType<typeof getWebAppConfig>>>
  >(createVoidAsyncState());

  useEffect(() => {
    if (isAsyncStateVoid(readTokenAsyncState)) {
      setReadTokenAsyncState(createPendingAsyncState());
      getAccessToken().then(response => {
        setReadTokenAsyncState(createFulfilledAsyncState(response));
      });
    }
  }, [readTokenAsyncState]);

  useEffect(() => {
    if (isAsyncStateVoid(getWebAppConfigAsyncState)) {
      setGetWebAppConfigAsyncState(createPendingAsyncState());
      getWebAppConfig()
        .then(response => {
          dispatch(actions.setWebAppConfig(response));
          setGetWebAppConfigAsyncState(createFulfilledAsyncState(response));
        })
        .catch(error => {
          setGetWebAppConfigAsyncState(createRejectedAsyncState(error));
        });
    }
  });

  useEffect(() => {
    if (isAsyncStateFulfilled(readTokenAsyncState)) {
      if (isAsyncStateVoid(getSelfAsyncState)) {
        setGetSelfAsyncState(createPendingAsyncState());
        getSelf()
          .then(response => {
            dispatch(actions.setAccessToken(readTokenAsyncState.data || ''));
            dispatch(actions.setUser(response.user));
            setGetSelfAsyncState(createFulfilledAsyncState(response.user));
          })
          .catch(error => {
            setGetSelfAsyncState(createRejectedAsyncState(error));
          });
      }
    }
  }, [getSelfAsyncState, readTokenAsyncState, dispatch]);

  const isLoading =
    isAsyncStatePending(getSelfAsyncState) ||
    isAsyncStateVoid(getSelfAsyncState) ||
    isAsyncStatePending(readTokenAsyncState) ||
    isAsyncStateVoid(readTokenAsyncState) ||
    isAsyncStatePending(getWebAppConfigAsyncState) ||
    isAsyncStateVoid(getWebAppConfigAsyncState);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <LoadingSpinner />
      </View>
    );
  }

  return props.children;
};

export const InitApp = (props: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <VerifyAuthentication>{props.children}</VerifyAuthentication>
    </Provider>
  );
};
