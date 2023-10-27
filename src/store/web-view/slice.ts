import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WEB_VIEW_SLICE_NAMESPACE, initialState } from './model';

const webViewSlice = createSlice({
  name: WEB_VIEW_SLICE_NAMESPACE,
  initialState: initialState,
  reducers: {
    pushNavChange: (state, action: PayloadAction<{ url: string }>) => {
      const {
        payload: { url },
      } = action;
      const lastUrl = state.urlStack[state.urlStack.length - 1];

      if (url !== lastUrl) {
        state.urlStack.push(url);
      }
    },
    popNavChange: (state, action: PayloadAction<{ count?: number }>) => {
      const { count = 1 } = (action && action.payload) ?? {};

      state.urlStack.splice(state.urlStack.length - count, count);
    },
  },
});

export const { reducer, actions } = webViewSlice;
