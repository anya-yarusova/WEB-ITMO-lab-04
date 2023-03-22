import React, { useEffect } from 'react';
import './App.css';
import Main from '../Main/Main';
import Login from '../Login/Login';
import { useToken } from './useToken';
import Header from '../Header/Header';
import {Provider} from "react-redux";
import {store} from "../../redux/store.js";

function App() {
    const { token, setToken, validToken, setValidToken } = useToken();

    useEffect(() => {
        setValidToken()
    }, [token]);

    if(validToken === true) {
        return (
            <div className="wrapper">
                <Provider store={store}>
                    <main className="content">
                        <Header/>
                        <Main/>
                    </main>
                </Provider>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <div className="content">
                <Header/>
                <Login setToken={setToken} />
            </div>
        </div>
    );
}

export default App;
