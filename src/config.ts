export type AppConfig = {
  JWT_TOKEN_STORAGE_KEY: string;
  API_BASE: string;
  WEB_APP_BASE: string;
};

let config: AppConfig = {
  JWT_TOKEN_STORAGE_KEY: 'achievable-token',
  API_BASE: 'https://countble.com/api',
  WEB_APP_BASE: 'https://countble.com/',
};

export const setConfig = (nextConfig: AppConfig) => {
  config = nextConfig;
};

export const getConfig = () => config;
