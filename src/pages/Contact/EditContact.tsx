/* eslint-disable no-useless-catch */
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContext } from '../../context';
import { Spinner } from '../../components';
import config from '../../config';

type InputChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

const API_URL: string = `${config.BASE_URL}/api/v1`;

export const EditContact = () => {
  let { id } = useParams();

  id = id?.replace(':', '');

  const navigate = useNavigate();

  const toastContext = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await response.json();

    if (result.status !== 'failure' || result.code < 400) {
      toastContext?.toast.success('updated contact');

      setUserDetails({
        first_name: '',
        last_name: '',
        phone_number: '',
      });
      navigate('/contacts');
    } else {
      toastContext?.toast.error(result.error);
    }
  };

  useEffect(() => {
    setLoading(true);

    async function getContactByID() {
      try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await response.json();

        if (result.status !== 'failure' || result.code < 400) {
          setUserDetails({
            first_name: result.data.first_name,
            last_name: result.data.last_name,
            phone_number: result.data.phone_number,
          });
          setLoading(false);
        } else {
          toastContext?.toast.error(result.error.message);
        }
      } catch (error) {
        throw error;
      }
    }

    getContactByID();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your contact</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleInputChange}
                placeholder="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleInputChange}
                placeholder="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phone_number"
                value={userDetails.phone_number}
                onChange={handleInputChange}
                placeholder="phone number"
              />
            </div>

            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};
