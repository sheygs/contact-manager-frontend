import { FormEvent, useContext, useState } from 'react';
import { ToastContext } from '../../context';

type InputChangeEvent = {
        target: {
                name: string;
                value: string;
        };
};

export function AddContact() {
        const toastContext = useContext(ToastContext);

        const [userDetails, setUserDetails] = useState({
                first_name: '',
                last_name: '',
                phone_number: '',
        });

        const handleInputChange = (event: InputChangeEvent) => {
                const { name, value } = event.target;

                setUserDetails({ ...userDetails, [name]: value });
        };

        const handleSubmit = async (event: FormEvent) => {
                event.preventDefault();

                const res = await fetch(`http://localhost:3000/api/v1/contacts`, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify(userDetails),
                });

                const result = await res.json();

                if (result.status !== 'failure' || result.code < 400) {
                        toastContext?.toast.success('contact created');

                        setUserDetails({
                                first_name: '',
                                last_name: '',
                                phone_number: '',
                        });
                } else {
                        toastContext?.toast.error(result.error.message);
                }
        };
        return (
                <>
                        <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                        <label
                                                htmlFor="nameInput"
                                                className="form-label mt-4"
                                        >
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
                                        <label
                                                htmlFor="nameInput"
                                                className="form-label mt-4"
                                        >
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
                                        <label
                                                htmlFor="addressInput"
                                                className="form-label mt-4"
                                        >
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
                                        value="Add Contact"
                                        className="btn btn-info my-2"
                                />
                        </form>
                </>
        );
}
