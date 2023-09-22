import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../store/hooks.ts';
import AuthService from '../services/auth.service.ts';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const authHandler = async (data: FormValues) => {
    try {
      if (
        !(await (isLogin ? AuthService.login : AuthService.register)(
          dispatch,
          data,
        ))
      )
        return;
      toast.success('Successful auth');
      navigate('/');
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;
        toast.error(message instanceof Array ? message[0] : message);
      } else toast.error(error.message);
    }
  };

  return (
    <div className='mt-40 flex flex-col items-center bg-slate-900 text-white'>
      <h1 className='mb-10 text-center text-xl'>
        {isLogin ? 'Login' : 'Registration'}
      </h1>

      <form
        className='mx-auto flex w-1/3 flex-col gap-5'
        onSubmit={handleSubmit(authHandler)}
      >
        <input
          type='text'
          className='input'
          placeholder='Email'
          {...register('email')}
        />
        <input
          type='password'
          className='input'
          placeholder='Password'
          {...register('password')}
        />
        <button className='btn btn-green mx-auto'>Submit</button>
      </form>

      <div className='mt-5 flex justify-center'>
        <button
          className='text-slate-300 hover:text-white'
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'You don`t have an account?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
