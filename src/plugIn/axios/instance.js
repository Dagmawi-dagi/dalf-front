import { serverUrl } from '../../util/server';

import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: `${serverUrl}/api` // modify this on dynamic web dev like laravel php
})