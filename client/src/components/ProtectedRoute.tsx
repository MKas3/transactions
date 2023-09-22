import { useAuth } from '../hooks/useAuth.ts';

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuth();
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className='mt-20 flex flex-col items-center justify-center gap-10'></div>
      )}
    </>
  );
}

export default ProtectedRoute;
