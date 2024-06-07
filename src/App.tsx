import { Routes as Switch, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  AddContact,
  Contacts,
  EditContact,
  Home,
  Login,
  Register,
} from './pages';
import { AuthContextProvider, ToastContextProvider } from './context';

function App(): JSX.Element {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout navbar={true}>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<AddContact />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
}

export default App;
