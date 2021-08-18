import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
const apiPrefix = 'http://localhost:8080'

abstract class BaseApi {
  protected readonly instance: AxiosInstance;

  public constructor(config: AxiosRequestConfig = {baseURL: `${apiPrefix}/`}) {
    this.instance = axios.create(config);
    this.instance.defaults.headers['ApiKey'] = 'A5Nf5f5DS123Mddnad31mf1d1nF4K1ms3D5GgrasR54md4DS3dsa21'
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleGlobalResponseSuccess,
      this._handleGlobalResponseError,
    );
  };

  private _handleGlobalResponseSuccess = (response: AxiosResponse) => {
      if(response.data.auth_token){
          this.instance.defaults.headers['Authorization'] = `Basic ${response.data.auth_token}`;
      }
      return response;
  };

  private _handleGlobalResponseError = async (error: AxiosResponse) => {
    return Promise.reject(error);
  };
}

export { BaseApi, apiPrefix };
