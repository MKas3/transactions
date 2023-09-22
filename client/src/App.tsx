import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { useAppDispatch } from './store/hooks.ts';
import { login, logout } from './store/user/userSlice.ts';
import { useEffect, useState } from 'react';
import authService from './services/auth.service.ts';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await authService.check(dispatch);
      if (data) dispatch(login(data));
      else dispatch(logout());
    };
    checkAuth()
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading)
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-y-3 bg-slate-900 font-roboto text-white'></div>
    );
  return <RouterProvider router={router} />;
}

export default App;
