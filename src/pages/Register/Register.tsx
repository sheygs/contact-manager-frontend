import { FormEvent, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, ToastContext } from '../../context';

type InputChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

type Credentials = {
  username: string;
  email: string;
  password: string;
};

export const Register = () => {
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);

  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event: InputChangeEvent): void => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!credentials.username || !credentials.email || !credentials.password) {
      toastContext?.toast.error('please provide all credentials');
      return;
    }

    authContext?.register(credentials);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            aria-describedby="emailHelp"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="username"
          />
        </div>
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

        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-3"
        />
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};
