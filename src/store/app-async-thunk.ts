import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from './app-selector';
import { AppDispatch } from './app-dispatch';
import { ApiError } from '../api/api-error';
import { $tsMigrateAny } from '../types/types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: ApiError;
  extra?: Record<string, $tsMigrateAny>;
}>();
