import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, ToastContext } from '../../context';

export const NavBar = ({ title = 'Contact Manager' }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);

  const handleLogout = (): void => {
    authContext?.setUser(null);
    localStorage.clear();
    toastContext?.toast.success('logged out');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand" href="#">
            {title}
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {authContext?.user ? (
              <>
                {' '}
                <li className="nav-item">
                  <Link to="/contacts">
                    <a className="nav-link">All Contacts</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create">
                    <a className="nav-link">Create</a>
                  </Link>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <button type="button" className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <a className="nav-link">Sign Up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
