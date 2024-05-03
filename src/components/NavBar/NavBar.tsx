import { Link } from 'react-router-dom';
import { NavBarList } from './NavBarList';

export const NavBar = ({ title = 'Contact Manager' }) => {
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
                                <div
                                        className="collapse navbar-collapse"
                                        id="navbarColor01"
                                >
                                        <NavBarList />
                                </div>
                        </div>
                </nav>
        );
};
