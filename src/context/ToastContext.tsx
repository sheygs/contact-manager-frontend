import { createContext, ReactNode } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
}

interface Props {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContextProvider = ({ children }: Props): JSX.Element => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastContainer autoClose={2000} />
      {children}
    </ToastContext.Provider>
  );
};
export { ToastContext, ToastContextProvider };
