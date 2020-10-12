import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Register() {

    const [name, setName] = useState('John');
    const [email, setEmail] = useState('6@m.com');
    const [password, setPassword] = useState('password');
    const [registerMessage, setRegisterMessage] = useState('');

    const history = useHistory();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        AuthService.register({name, email, password})
            .then(res => {
                console.log('response', res);
                if (res.status === 200) {
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    history.push('/dashboard');
                } else {
                    setRegisterMessage('Registration failed. Please try again.')
                }
            })
            .catch(error => {
                setRegisterMessage(error.response.data.message);
            })
    };

    return (
        <div className="Login-Page rpgui-content">
            <div className="Login-Wrapper rpgui-container framed-golden">
                <div className="Game-Icon">
                    <span role="img" aria-labelledby="Dragon Slayer Logo">⚔️</span>
                </div>
                <h2>Dragon Slayer</h2>
                <h4>Register</h4>
                {(registerMessage) ? <p className="Login-Error-Message">{registerMessage}</p> : ""}
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <label htmlFor="exampleName">Name:</label>
                        <input type="text" name="name" id="exampleName" placeholder="John Doe"
                               value={name} onChange={ e => setName(e.target.value) } autoFocus/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="exampleEmail">Email:</label>
                        <input type="email" name="email" id="exampleEmail" placeholder="joe@example.com"
                               value={email} onChange={ e => setEmail(e.target.value) }/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="examplePassword">Password:</label>
                        <input type="password" name="password" id="examplePassword" placeholder="******"
                               value={password}
                               onChange={e => setPassword(e.target.value) }/>
                    </fieldset>
                    <button className="rpgui-button">Submit</button>
                    <div className="Extra-Link">
                        <Link to="/login">Already a user? Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}