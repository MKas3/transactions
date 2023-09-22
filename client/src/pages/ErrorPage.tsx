import { TbError404 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { PiMaskSadFill } from 'react-icons/pi';

function ErrorPage() {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center bg-slate-900 font-roboto text-white'>
      <TbError404
        className='absolute text-blue-200 opacity-20'
        size={500}
      ></TbError404>
      <div className='absolute z-10 flex gap-x-2 text-6xl font-bold text-blue-300'>
        <span className='whitespace-nowrap'>PAGE NOT FOUND</span>
        <PiMaskSadFill />
      </div>

      <Link
        to='/'
        className='absolute bottom-[20%] z-10 rounded-md bg-blue-500 px-6 py-2 hover:bg-blue-600'
      >
        Go Back
      </Link>
    </div>
  );
}

export default ErrorPage;
