import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/AuthService";

export default class Home extends Component {
    render() {
        return (
            <div className="Home-Page rpgui-content">
                <div className="Home-Wrapper rpgui-container framed">
                    <h1 className="Game-Icon">
                        <span role="img" aria-labelledby="Dragon Slayer Logo">⚔️</span>
                    </h1>
                    <h2 className="Game-Title">DRAGON SLAYER</h2>
                    <p className="lead">
                        Welcome to the dragon slayer game! To get started, login in to your account or
                        create a new one.
                    </p>
                    {
                        AuthService.isAuthenticated() ?
                        <Link className="rpgui-button" to={"/dashboard"} role="button"><p>Home</p></Link>
                        :
                        <>
                            <Link className="rpgui-button" to={"/login"} role="button"><p>Login</p></Link>
                            <Link className="rpgui-button" to={"/register"} role="button"><p>Register</p></Link>
                        </>
                    }

                </div>
            </div>
        );
    }
}