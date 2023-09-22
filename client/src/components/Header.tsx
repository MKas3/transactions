import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { logout } from '../store/user/userSlice.ts';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper.ts';
import { toast } from 'react-toastify';

function Header() {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage();
    toast.success('Log Out Successful');
    navigate('/');
  };

  return (
    <header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
      <Link to='/'>
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className='ml-auto mr-10'>
          <ul className='flex items-center gap-5'>
            <li>
              <NavLink
                to='/transactions'
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/categories'
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className='btn btn-red' onClick={() => logoutHandler()}>
          <span>Log out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          className='ml-auto mr-10 py-2 text-white/50 hover:text-white'
          to='auth'
        >
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;
