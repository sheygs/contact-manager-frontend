import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { ToastContext } from './ToastContext';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
        login: (requestPayload: { email: string; password: string }) => Promise<void>;
        register: (requestPayload: { email: string; password: string }) => Promise<void>;
        user: unknown;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUser: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
        const navigate = useNavigate();
        const toastContext = useContext(ToastContext);
        const [user, setUser] = useState(null);

        useEffect(() => {
                const checkLoggedIn = async () => {
                        try {
                                const response = await fetch(
                                        `http://localhost:3000/api/v1/auth/me`,
                                        {
                                                method: 'GET',
                                                headers: {
                                                        Authorization: `Bearer ${localStorage.getItem(
                                                                'token'
                                                        )}`,
                                                },
                                        }
                                );

                                const result = await response.json();

                                if (result.status !== 'failure' || result.code < 400) {
                                        setUser(result.data);
                                        navigate('/', { replace: true });
                                }
                        } catch (error) {
                                console.log({ error });
                        }
                };

                checkLoggedIn();
        }, [navigate]);

        // login
        const login = async (requestPayload: { email: string; password: string }) => {
                try {
                        const response = await fetch(
                                `http://localhost:3000/api/v1/auth/login`,
                                {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ ...requestPayload }),
                                }
                        );

                        const result = await response.json();

                        if (result.status !== 'failure' || result.code < 400) {
                                localStorage.setItem('token', result.data.token);
                                setUser(result.data.user);
                                toastContext?.toast.success('User logged In');
                                navigate('/', { replace: true });
                        } else {
                                toastContext?.toast.error(result.error.message);
                        }
                } catch (error) {
                        console.log({ error });
                }
        };

        // register
        const register = async (requestPayload: { email: string; password: string }) => {
                try {
                        const response = await fetch(
                                `http://localhost:3000/api/v1/auth/signup`,
                                {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ ...requestPayload }),
                                }
                        );

                        const result = await response.json();

                        if (result.status !== 'failure' || result.code < 400) {
                                toastContext?.toast.success('User registered');
                                navigate('/login', { replace: true });
                        } else {
                                toastContext?.toast.error(result.error.message);
                        }
                } catch (error) {
                        console.log({ error });
                }
        };

        return (
                <AuthContext.Provider value={{ login, register, user, setUser }}>
                        {children}
                </AuthContext.Provider>
        );
};

export { AuthContext, AuthContextProvider };
