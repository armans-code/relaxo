import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Relaxo from './pages/Relaxo';
import Journal from './pages/Journal';
import Breathing from './pages/Breathing';
import Login from './pages/Login';
import { AuthProvider } from './auth/AuthContext';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Register from './pages/Register';

function App() {
    const client = new ApolloClient({
        uri: 'http://localhost:8080/graphql',
        cache: new InMemoryCache(),
        credentials: false,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'network-only',
            },
        },
    });
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Relaxo />
                            </Layout>
                        }
                    />
                    <Route
                        path="/journal"
                        element={
                            <Layout>
                                <Journal />
                            </Layout>
                        }
                    />
                    <Route
                        path="/breathing"
                        element={
                            <Layout>
                                <Breathing />
                            </Layout>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
