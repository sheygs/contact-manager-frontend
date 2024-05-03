import { Routes as Switch, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Login, Register } from './pages';
import { AuthContextProvider, ToastContextProvider } from './context';

function App(): JSX.Element {
        return (
                <ToastContextProvider>
                        <AuthContextProvider>
                                <Layout navbar={true}>
                                        <Switch>
                                                <Route path="/" element={<Home />} />
                                                <Route
                                                        path="/login"
                                                        element={<Login />}
                                                />
                                                <Route
                                                        path="/register"
                                                        element={<Register />}
                                                />
                                        </Switch>
                                </Layout>
                        </AuthContextProvider>
                </ToastContextProvider>
        );
}

export default App;
