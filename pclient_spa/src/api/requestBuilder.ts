import axios, { AxiosResponse } from "axios";
import { AUTH_IGNORE_PAGES, DASHBOARD_PAGES } from "../config/page-url.config";
import {
  authService,
  getAccessToken,
  removeToken,
} from "../services/auth-token.service";
import {
  AxiosCustomConfig,
  PropsRequestBuilder,
  RBAxiosRequestConfig,
} from "../types/api.types";
import { errorCatch } from "./error";

const axiosCreate = axios.create();

axiosCreate.interceptors.request.use((config: AxiosCustomConfig) => {
  if (config.isAuth) {
    const accessToken = getAccessToken();

    if (config?.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

axiosCreate.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error?.config?.isAuth) {
      if (
        (error?.response?.status === 401 ||
          errorCatch(error) === "jwt expired" ||
          errorCatch(error) === "jwt must be provided") &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          await authService.getNewTokens();
          return axiosCreate.request(originalRequest);
        } catch (error) {
          if (errorCatch(error) === "jwt expired") {
            removeToken();
            window.location.replace(DASHBOARD_PAGES.AUTH);
          }
        }
      }
    }

    throw error;
  }
);

const requestBuilder = async <Req, Res, Params = undefined>({
  url,
  method,
  options,
  progressFnUp,
  progressFnDw,
}: PropsRequestBuilder<Req, Params>): Promise<AxiosResponse<Res, Res>> => {
  const baseURL = "/api/";
  // import.meta.env.MODE === "dev"
  //   ? `http://${window.location.hostname}:5555/api/`
  //   : "/api/";
  const config: RBAxiosRequestConfig = {
    baseURL,
    isAuth: options?.isAuth,
    method,
    responseType: options?.responseType,
    url,
    withCredentials: true,
    data: options?.data,
    params: options?.params,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    onUploadProgress: (progressEvent: any) => {
      let percentComplete: number = progressEvent.loaded / progressEvent.total;
      percentComplete = percentComplete * 100;
      if (progressFnUp) {
        progressFnUp(percentComplete);
      }
    },
    onDownloadProgress: (progressEvent: any) => {
      let percentComplete: number = progressEvent.loaded / progressEvent.total;
      percentComplete = percentComplete * 100;
      if (progressFnDw) {
        progressFnDw(percentComplete);
      }
    },
  };

  try {
    const response = await axiosCreate(config);

    return response;
  } catch (e: any) {
    if (e?.response?.status === 401)
      if (!AUTH_IGNORE_PAGES.includes(window.location.pathname)) {
        window.location.replace(DASHBOARD_PAGES.AUTH);
      }
    throw new Error(e?.response?.data?.message, { cause: e?.response?.data });
  }
};

export { requestBuilder };
