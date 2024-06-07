import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';

export const Home = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    !authContext?.user && navigate('/login', { replace: true });
  }, [authContext?.user, navigate]);
  return (
    <>
      <div className="jumbotron">
        <h1>
          Welcome, {authContext?.user ? authContext?.user.username : null}
        </h1>
        <hr className="my-4" />
        <a className="btn btn-info" href="#" role="button">
          Add Contacts
        </a>
      </div>
    </>
  );
};
