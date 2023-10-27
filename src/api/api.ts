import axios, { AxiosError } from 'axios';
import { getConfig } from '../config';
import { ApiError, ERRORS } from './api-error';
import { $tsMigrateAny } from '../types/types';
import { getAccessToken } from '../utils';

export const getApi = async () => {
  const token = await getAccessToken();
  return axios.create({
    baseURL: getConfig().API_BASE,
    withCredentials: false,
    headers: {
      accept: 'application/json, image/png',
      'access-control-allow-origin': '*',
      authorization: token && `Bearer ${token}`,
    },
  });
};

export const formatQueryString = (params: {
  [x: string]: $tsMigrateAny;
}): string => {
  const formatValue = (value: $tsMigrateAny) =>
    Array.isArray(value) ? value.join(',') : String(value);
  return `?${Object.keys(params)
    .map((key: string) => `${key}=${formatValue(params[key] || '')}`)
    .join('&')}`;
};

export const parseApiError = (error: AxiosError | Error | $tsMigrateAny) => {
  if (error.response) {
    const response = error.response.data;
    return new ApiError(
      response.message,
      response.code,
      response.name,
      error.response.status
    );
  }

  console.error('unhandled api error', error);
  return new ApiError(
    'Unhandled API Error',
    ERRORS.GENERIC_ERROR,
    'GENERIC_ERROR',
    500
  );
};
