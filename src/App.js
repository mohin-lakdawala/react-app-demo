import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GameList from "./pages/GameList";

import AuthService from "./services/AuthService";

export default function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <GuestRoute exact path="/login">
                    <Login />
                </GuestRoute>
                <GuestRoute exact path="/register">
                    <Register />
                </GuestRoute>
                <PrivateRoute exact path="/game/list">
                    <GameList />
                </PrivateRoute>
                <PrivateRoute exact path="/game/:id">
                    <Game />
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
            </Switch>
        </div>
      </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                AuthService.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function GuestRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                ! AuthService.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}