import { GITHUB_API_TOKEN } from '../constants/env';

const TOKEN = GITHUB_API_TOKEN;

export const GITHUB_API_SETTINGS = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};