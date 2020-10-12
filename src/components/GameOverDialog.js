import React from "react";
import {Link} from "react-router-dom";

export default function GameOverDialog({playerLife, dragonLife}) {

    const errorMessage =  (playerLife > dragonLife) ?
        'Woah! You beat the dragon!' :
        'Uh oh! Dragon has claimed you as his next victim!';

    return (
        <div className="Game-Over-Dialog rpgui-container framed">
            <h2 className="Game-Icon">
                ⚔️
            </h2>
            <h2>Game Over</h2>
            <p>{errorMessage}</p>
            <hr className="golden"/>
            <Link to="/dashboard">
                <button className="rpgui-button" type="button">Continue</button>
            </Link>
        </div>
    );
}