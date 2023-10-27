import { useState } from 'react';

import queryString from 'query-string';

import { googleOauthFinalize } from '../../../api/users/users-api';
import {
  AsyncState,
  createFulfilledAsyncState,
  createPendingAsyncState,
  createRejectedAsyncState,
  createVoidAsyncState,
} from '../../../types/async-state';
import { setAccessToken } from '../../../utils';
import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/user-settings';
import { getConfig } from '../../../config';

export const useFinalizeGoogleOauth = () => {
  const [asyncState, setAsyncState] = useState<
    AsyncState<Awaited<ReturnType<typeof googleOauthFinalize>>>
  >(createVoidAsyncState());
  const dispatch = useAppDispatch();

  const finalizeOauth = (loginSuccessUrl: string) => {
    const searchParams = queryString.parseUrl(loginSuccessUrl);
    const code = String(searchParams.query.code) ?? '';
    const tz = new Date().getTimezoneOffset() / 60;

    setAsyncState(createPendingAsyncState());
    googleOauthFinalize(code, tz)
      .then(async response => {
        const token = response.token;
        dispatch(actions.setAccessToken(token));
        await setAccessToken(token);
        setAsyncState(createFulfilledAsyncState(response));
      })
      .catch(error => {
        setAsyncState(createRejectedAsyncState(error));
      });
  };

  const isLoginSuccessUrl = (url: string) => {
    const regexp = new RegExp(
      `^${getConfig().WEB_APP_BASE}googleLoginSuccess`,
      'i'
    );
    const isFinalizeUrl = regexp.test(url);
    return isFinalizeUrl;
  };

  return {
    finalizeOauth,
    asyncState,
    isLoginSuccessUrl,
  };
};
