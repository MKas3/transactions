import { useAppSelector } from '../store/hooks.ts';

export const useAuth = () => {
  return useAppSelector((state) => state.users.isAuth);
};
