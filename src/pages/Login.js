import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const history = useHistory();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        AuthService.login({email, password})
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    history.push('/dashboard');
                } else {
                    setLoginMessage('Login failed. Please try again.')
                }
            })
            .catch(error => {
                setLoginMessage(
                    error.response?.data?.message ||
                    'Login failed. Please try again.'
                );
            })
    };

    return (
        <div className="Login-Page rpgui-content">
            <div className="Login-Wrapper rpgui-container framed-golden">
                <div className="Game-Icon">
                    <span role="img" aria-labelledby="Dragon Slayer Logo">⚔️</span>
                </div>
                <h2>Dragon Slayer</h2>
                <h4>Login</h4>
                {(loginMessage) ? <p className="Login-Error-Message">{loginMessage}</p> : ""}
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <label htmlFor="exampleEmail">Email:</label>
                        <input type="email" name="email" id="exampleEmail" placeholder="joe@example.com"
                               value={email} onChange={ e => setEmail(e.target.value) } autoFocus/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="examplePassword">Password:</label>
                        <input type="password" name="password" id="examplePassword" placeholder="******"
                               value={password}
                               onChange={e => setPassword(e.target.value) }/>
                    </fieldset>
                    <button className="rpgui-button">Submit</button>
                    <div className="Extra-Link">
                        <Link to="/register">No account yet? Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}