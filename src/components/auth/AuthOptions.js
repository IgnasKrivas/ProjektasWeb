import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <>
      {userData.user ? (
        <li className="navbar-item">
          <Link to="/" onClick={logout} className="nav-link">
            Logout
          </Link>
        </li>
      ) : (
        <>
          <li className="navbar-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </>
      )}
    </>
  );
}
