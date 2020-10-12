import React, {useCallback, useEffect, useState} from "react";
import GamesService from "../services/GamesService";
import {Link, useParams} from 'react-router-dom';
import CommentaryItems from "../components/CommentaryItems";
import GameOverDialog from "../components/GameOverDialog";



export default function Game() {

    const [gameOver, setGameOver] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [playerLife, setPlayerLife] = useState(25);
    const [dragonLife, setDragonLife] = useState(25);
    const [logs, setLogs] = useState([]);
    const { id } = useParams();

    const isGameFinished = useCallback(
        () => {
            return playerLife <= 0 || dragonLife <= 0 || secondsRemaining <= 0;
        },
        [playerLife, dragonLife, secondsRemaining],
    );


    const randomIntBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const attackDragonFor = (dragonLifeAttackedFor) => {
        const newDragonLife = dragonLife - dragonLifeAttackedFor;

        setPlayersTurn(false);
        setDragonLife(newDragonLife);
        setLogs((logs) => [...logs, `Dragon down by ${dragonLifeAttackedFor}`]);
    }

    const attackPlayerFor = (playerLifeAttackedFor) => {
        const newPlayerLife = playerLife - playerLifeAttackedFor;
        setPlayerLife(newPlayerLife);
        setLogs((logs) => [...logs, `Player down by ${playerLifeAttackedFor}`]);
        setPlayersTurn(true);
    }

    const healPlayerFor = (playerLifeHealedFor) => {
        const newPlayerLife = playerLife + playerLifeHealedFor;

        setPlayerLife(newPlayerLife);
        setLogs((logs) => [...logs, `Player healed by ${playerLifeHealedFor}`]);
        setPlayersTurn(true);
    }

    const handleAttack = (event) => {
        // setPlayersTurn(false);

        attackDragonFor(randomIntBetween(1, 10));

        setTimeout(() => {
            attackPlayerFor(randomIntBetween(1, 10));
        }, 1000);

    }

    const handleBlast = (event) => {

        attackDragonFor(randomIntBetween(10, 20));

        setTimeout(() => {
            attackPlayerFor(randomIntBetween(10, 20));
        }, 1000);

    }

    const handleHeal = (event) => {

        healPlayerFor(randomIntBetween(1, 10));

        setTimeout(() => {
            attackPlayerFor(randomIntBetween(1, 10));
        }, 1000);

    }

    useEffect(() => {
       const gameTimerInterval = setInterval(() => {
           setSecondsRemaining(secondsRemaining - 1);
       }, 1000);

       if (isGameFinished()) {
           clearInterval(gameTimerInterval);

           setGameOver(true);
       }

       return function cleanup() {
           clearInterval(gameTimerInterval);
       }
    }, [isGameFinished, secondsRemaining]);

    useEffect(() => {
        if (gameOver) {
            GamesService.finishGame({
                playerLife,
                dragonLife,
                logs
            }, id).then(response => {
                console.log('DONE', response);
            });
        }
    }, [gameOver]);

    return (
        <div className="Game-Page rpgui-content">
            {(!gameOver) ?
                <>
                    <div className="Game-Wrapper">
                        <div className="Stat-Wrapper Stat-Wrapper-Player rpgui-container framed-golden-2">
                            <h2>Player</h2>
                            <hr className="golden"/>
                            <div className="Player-Icon" role="img" aria-labelledby="player icon"
                                 style={{transform: "scaleX(-1)"}}>
                                🤺
                            </div>
                            <label>Stamina remaining:</label>
                            <div className="Stat">
                                {playerLife}%
                            </div>
                            <div id="stamina-bar" className="rpgui-progress green" data-rpguitype="progress">
                                <div className=" rpgui-progress-track">
                                    <div className=" rpgui-progress-fill green" style={{left: "0px", width: playerLife + '%'}} />
                                </div>
                                <div className=" rpgui-progress-left-edge" />
                                <div className=" rpgui-progress-right-edge" />
                            </div>
                        </div>
                        <div className="Stat-Wrapper Stat-Wrapper-Dragon rpgui-container framed">
                            <h2>Dragon</h2>
                            <hr className="golden"/>
                            <div className="Dragon-Icon" role="img" aria-labelledby="dragon icon">
                                🐉
                            </div>
                            <label>Stamina remaining:</label>
                            <div className="Stat">
                                {dragonLife}%
                            </div>
                            <div id="stamina-bar" className="rpgui-progress green" data-rpguitype="progress">
                                <div className=" rpgui-progress-track">
                                    <div className=" rpgui-progress-fill red" style={{left: "0px", width: dragonLife + '%'}} />
                                </div>
                                <div className=" rpgui-progress-left-edge" />
                                <div className=" rpgui-progress-right-edge" />
                            </div>
                        </div>
                        <div className="rpgui-container framed-golden Commentary-Box-Wrapper">
                            <h2>TIME: {secondsRemaining} seconds</h2>
                            <hr className="golden"/>
                            <h2>Commentary Box</h2>
                            <div className="Commentary-Box">
                                <ul>
                                    <CommentaryItems logs={logs}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Action-Wrapper rpgui-container framed-grey">
                    <button className="rpgui-button golden" disabled={!playersTurn} onClick={handleAttack} type="button"><p>Attack</p></button>
                    <button className="rpgui-button golden" disabled={!playersTurn} onClick={handleBlast} type="button"><p>Blast</p></button>
                    <button className="rpgui-button golden" disabled={!playersTurn} onClick={handleHeal} type="button"><p>Heal</p></button>
                    <button className="rpgui-button golden" disabled={!playersTurn} onClick={handleAttack} type="button"><p>Surrender</p></button>
                </div>
                </>
                :
                <GameOverDialog playerLife={playerLife} dragonLife={dragonLife} />
            }
        </div>
    );

}