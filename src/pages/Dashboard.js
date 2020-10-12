import React from "react";
import {Link, useHistory} from "react-router-dom";
import GamesService from "../services/GamesService";
import AuthService from "../services/AuthService";

export default function Dashboard() {
    const history = useHistory();

    const handleStartNewGame = () => {
        GamesService.start()
            .then(response => {
                if (response.status === 201) {
                    history.push(`/game/${response.data.id}`);
                } else {
                    alert('Error while starting the game. Please try again.');
                }
            })
            .catch(error => {
                alert('Error while starting the game. Please try again.');
            });
    }

    const handleLogout = () => {
        AuthService.logOut()
            .then(() => {
                localStorage.removeItem("userInfo");
                history.push("/");
            })
            .catch(() => {
                localStorage.removeItem("userInfo");
            });
    }

    return (
        <div className="Dashboard-Page rpgui-content">
            <div className="Dashboard-Wrapper">
                <div className="Dashboard-Action rpgui-container framed-golden">
                    <button onClick={handleStartNewGame} className="rpgui-button">Start a New Game</button>
                </div>
                <div className="Dashboard-Action rpgui-container framed-golden-2">
                    <Link to="/game/list">
                        <button className="rpgui-button">View Past Games</button>
                    </Link>
                </div>
                <div className="Dashboard-Action rpgui-container framed-golden">
                    <button onClick={handleLogout} className="rpgui-button">Log out</button>
                </div>
            </div>
        </div>
    )
}