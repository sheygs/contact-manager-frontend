/* eslint-disable no-useless-catch */
import { Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components';
import { ToastContext } from '../../context';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

interface Contact {
        id: string;
        created_at?: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        updated_at?: string;
        user_id?: string;
}

interface ModalData {
        id: string;
        first_name: string;
        last_name: string;
        phone_number: string;
}

export const Contacts = () => {
        const toastContext = useContext(ToastContext);

        const [showModal, setShowModal] = useState(false);
        const [modalData, setModalData] = useState<ModalData>({
                id: '',
                first_name: '',
                last_name: '',
                phone_number: '',
        });
        const [loading, setLoading] = useState(false);
        const [contacts, setContacts] = useState<Contact[]>([]);

        useEffect(() => {
                setLoading(true);

                async function fetchContacts() {
                        try {
                                const res = await fetch(
                                        `http://localhost:3000/api/v1/contacts`,
                                        {
                                                method: 'GET',
                                                headers: {
                                                        Authorization: `Bearer ${localStorage.getItem(
                                                                'token'
                                                        )}`,
                                                },
                                        }
                                );
                                const result = await res.json();

                                if (result.status !== 'failure' || result.code < 400) {
                                        setContacts(result.data);
                                        setLoading(false);
                                } else {
                                        setLoading(false);
                                }
                        } catch (error) {
                                throw error;
                        }
                }

                fetchContacts();
        }, []);

        const deleteContact = async (id: string) => {
                const result = window.confirm(
                        'are you sure you want to delete this contact ?'
                );

                if (!result) return;

                try {
                        const response = await fetch(
                                `http://localhost:3000/api/v1/contacts/${id}`,
                                {
                                        method: 'DELETE',
                                        headers: {
                                                Authorization: `Bearer ${localStorage.getItem(
                                                        'token'
                                                )}`,
                                        },
                                }
                        );
                        const result = await response.json();

                        if (result.status !== 'failure' || result.code < 400) {
                                setContacts(result.data);
                                toastContext?.toast.success('Deleted contact');
                                setShowModal(false);
                        } else {
                                toastContext?.toast.error(result.error.message);
                        }
                } catch (error) {
                        throw error;
                }
        };

        return (
                <>
                        <div>
                                <a href="/contacts" className="btn btn-danger my-2">
                                        Reload Contact
                                </a>
                                <hr className="my-4" />
                                {loading ? (
                                        <Spinner splash="Loading Contacts..." />
                                ) : (
                                        <>
                                                {contacts.length === 0 ? (
                                                        <h3>No contacts created yet</h3>
                                                ) : (
                                                        <>
                                                                <p>
                                                                        Your Total
                                                                        Contacts:{' '}
                                                                        <strong>
                                                                                {
                                                                                        contacts.length
                                                                                }
                                                                        </strong>
                                                                </p>
                                                                <table className="table table-hover">
                                                                        <thead>
                                                                                <tr className="table-dark">
                                                                                        <th scope="col">
                                                                                                First
                                                                                                Name
                                                                                        </th>
                                                                                        <th scope="col">
                                                                                                Last
                                                                                                Name
                                                                                        </th>

                                                                                        <th scope="col">
                                                                                                Phone
                                                                                                Number
                                                                                        </th>
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                                {contacts.map(
                                                                                        (
                                                                                                contact
                                                                                        ) => (
                                                                                                <tr
                                                                                                        key={
                                                                                                                contact.id
                                                                                                        }
                                                                                                        onClick={() => {
                                                                                                                setModalData(
                                                                                                                        {
                                                                                                                                id: '',
                                                                                                                                first_name: '',
                                                                                                                                last_name: '',
                                                                                                                                phone_number:
                                                                                                                                        '',
                                                                                                                        }
                                                                                                                );
                                                                                                                setModalData(
                                                                                                                        contact
                                                                                                                );
                                                                                                                setShowModal(
                                                                                                                        true
                                                                                                                );
                                                                                                        }}
                                                                                                >
                                                                                                        <th scope="row">
                                                                                                                {
                                                                                                                        contact.first_name
                                                                                                                }
                                                                                                        </th>

                                                                                                        <td>
                                                                                                                {
                                                                                                                        contact.last_name
                                                                                                                }
                                                                                                        </td>
                                                                                                        <td>
                                                                                                                {
                                                                                                                        contact.phone_number
                                                                                                                }
                                                                                                        </td>
                                                                                                </tr>
                                                                                        )
                                                                                )}
                                                                        </tbody>
                                                                </table>
                                                        </>
                                                )}
                                        </>
                                )}
                        </div>

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                        <Modal.Title>
                                                {modalData.first_name}
                                                {modalData.last_name}
                                        </Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                        <p>
                                                <strong>First Name</strong>:{' '}
                                                {modalData.first_name}
                                        </p>
                                        <p>
                                                <strong>Last Name</strong>:{' '}
                                                {modalData.last_name}
                                        </p>
                                        <p>
                                                <strong>Phone Number</strong>:{' '}
                                                {modalData.phone_number}
                                        </p>
                                </Modal.Body>

                                <Modal.Footer>
                                        <Link
                                                className="btn btn-info"
                                                to={`/edit/:${modalData.id}`}
                                        >
                                                Edit
                                        </Link>
                                        <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                        deleteContact(modalData.id)
                                                }
                                        >
                                                Delete
                                        </button>
                                        <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() => setShowModal(false)}
                                        >
                                                Close
                                        </button>
                                </Modal.Footer>
                        </Modal>
                </>
        );
};
