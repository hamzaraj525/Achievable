import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/domain-models';
import { initialUserSettingState, USER_SETTINGS_NAMESPACE } from './model';
import { thunks } from './thunks';
import { WebAppConfig } from '../../api/web-app/web-app-api';

const userSettingSlice = createSlice({
  name: USER_SETTINGS_NAMESPACE,
  initialState: initialUserSettingState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setWebAppConfig: (state, action: PayloadAction<WebAppConfig>) => {
      state.webAppConfig = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(thunks.logoutThunk.pending, state => {
      state.user = initialUserSettingState.user;
      state.accessToken = '';
    });
  },
});

export const { reducer, actions } = userSettingSlice;
