import { getConfig } from '../../config';
import { getApi } from '../api';

export type WebAppConfig = {
  ACCESS_TOKEN: string;
};

export const getWebAppConfig = async () => {
  const webAppUrl = getConfig().WEB_APP_BASE;
  const api = await getApi();

  const response = await api.get<WebAppConfig>(`${webAppUrl}config.json`);

  return response.data;
};
