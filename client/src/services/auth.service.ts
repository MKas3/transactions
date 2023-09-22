import { IResponseUserData, IUserData } from '../types/types.ts';
import {
  API_AUTH_ROUTE,
  API_LOGIN_ROUTE,
  API_REGISTRATION_ROUTE,
} from '../helpers/consts.ts';
import { login } from '../store/user/userSlice.ts';
import {
  defaultServiceGetFunction,
  defaultServicePostFunction,
} from './default.service.ts';
import { AppDispatch } from '../store/store.ts';

class AuthService {
  register = async (dispatch: AppDispatch, userData: IUserData) => {
    const data = await defaultServicePostFunction<IResponseUserData, IUserData>(
      API_REGISTRATION_ROUTE,
      dispatch,
      login,
      false,
      userData,
    );
    localStorage.setItem('token', data.token);
    return data;
  };

  login = async (dispatch: AppDispatch, userData: IUserData) => {
    const data = await defaultServicePostFunction<IResponseUserData, IUserData>(
      API_LOGIN_ROUTE,
      dispatch,
      login,
      false,
      userData,
    );
    localStorage.setItem('token', data.token);
    return data;
  };

  check = async (dispatch: AppDispatch) => {
    return await defaultServiceGetFunction<IResponseUserData>(
      API_AUTH_ROUTE,
      dispatch,
      login,
      true,
    );
  };
}

export default new AuthService();
