import { configureStore } from '@reduxjs/toolkit';
import {
  WEB_VIEW_SLICE_NAMESPACE,
  reducer as webViewStateReducer,
} from './web-view';
import {
  USER_SETTINGS_NAMESPACE,
  reducer as userSettingsReducer,
} from './user-settings';

export const store = configureStore({
  reducer: {
    [USER_SETTINGS_NAMESPACE]: userSettingsReducer,
    [WEB_VIEW_SLICE_NAMESPACE]: webViewStateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * @deprecated use AppState
 */
export type RootState = ReturnType<typeof store.getState>;
