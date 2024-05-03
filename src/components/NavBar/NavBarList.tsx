import { Link } from 'react-router-dom';

export const NavBarList = () => {
        return (
                <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                                <Link to="/login">
                                        <a className="nav-link" href="#">
                                                Login
                                        </a>
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/register">
                                        <a className="nav-link" href="#">
                                                Sign Up
                                        </a>
                                </Link>
                        </li>
                </ul>
        );
};
