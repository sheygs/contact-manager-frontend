import { Routes as Switch, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Login, Register } from './pages';

function App(): JSX.Element {
        return (
                <Layout navbar={true}>
                        <Switch>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                        </Switch>
                </Layout>
        );
}

export default App;
