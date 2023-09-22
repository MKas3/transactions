import { authInstance, instance } from './index.ts';
import { AppDispatch } from '../store/store.ts';

export const defaultServiceGetFunction = async <T>(
  route: string,
  dispatch?: AppDispatch,
  action?: (payload: T) => { payload: T; type: string },
  isAuth: boolean = false,
): Promise<T> => {
  const { data } = await (isAuth ? authInstance : instance).get<T | undefined>(
    route,
  );
  if (data === null || data === undefined)
    throw new Error('Что-то пошло не так');
  if (dispatch && action) dispatch(action(data));
  return data;
};

export const defaultServicePostFunction = async <T, K = T>(
  route: string,
  dispatch?: AppDispatch,
  action?: (payload: T) => { payload: T; type: string },
  isAuth: boolean = false,
  sentData?: K,
): Promise<T> => {
  const { data } = await (isAuth ? authInstance : instance).post<T | undefined>(
    route,
    sentData,
  );
  if (!data) throw new Error('Что-то пошло не так');
  if (dispatch && action) dispatch(action(data));
  return data;
};
