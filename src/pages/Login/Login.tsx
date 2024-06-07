import { Link } from 'react-router-dom';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext, ToastContext } from '../../context';

type InputChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

type Credentials = {
  email: string;
  password: string;
};

export const Login = () => {
  const toastContext = useContext(ToastContext);
  const authContext = useContext(AuthContext);

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: InputChangeEvent): void => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toastContext?.toast.error('provide all credentials');
      return;
    }

    authContext?.login(credentials);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
          />
        </div>
        <input type="submit" className="btn btn-primary my-3" value="Login" />
        <p>
          Don't have an account ? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </>
  );
};
