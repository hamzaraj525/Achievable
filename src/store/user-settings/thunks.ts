import { removeAccessToken } from '../../utils';
import { createAppAsyncThunk } from '../app-async-thunk';
import { USER_SETTINGS_NAMESPACE } from './model';

const logoutThunk = createAppAsyncThunk(
  `${USER_SETTINGS_NAMESPACE}/logout`,
  async () => {
    await removeAccessToken();
  }
);

export const thunks = { logoutThunk };
