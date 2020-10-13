import React, {useEffect, useState} from "react";
import GamesService from "../services/GamesService";
import {Link} from "react-router-dom";

export default function GameList() {

    const [dataLoaded, setDataLoaded] = useState(false)
    const [gameList, setGameList] = useState([]);
    const [gameDetails, setGameDetails] = useState({});

    useEffect(() => {

        if (dataLoaded) {
            return;
        }

        GamesService.list()
            .then((response) => {
                setGameList(response.data || []);
                setDataLoaded(true);
            })
            .catch(error => {
                console.log('error', error);
            })
    }, [dataLoaded]);

    const viewGameDetails = (event) => {
        const selectedGame = gameList.find((game) => {
            return parseInt(game.id) === parseInt(event.target.id);
        });

        setGameDetails(selectedGame);
    };

    const GameList = gameList.map((game) =>
        <li key={game.id} id={game.id} onClick={viewGameDetails}><span role="img" aria-label="time icon">⏰</span> {game.formatted_started_at}</li>
    );


    return (
        <div className="Previous-Game-Page rpgui-content">
            <div className="Previous-Game-Wrapper">
                <div className="Previous-Game-List rpgui-container framed-golden">
                    <h2>Previous Games</h2>
                    {GameList}
                </div>
                <div className="Previous-Game-Details rpgui-container framed">
                {(gameDetails.id) ?
                    <>
                        <p>Player Score: {gameDetails.player_life}</p>
                        <p>Dragon Score: {gameDetails.dragon_life}</p>
                        <ul>
                            {gameDetails.logs.map((log, index) => {
                                return (
                                    <li key={index}>
                                        <span role="img" aria-label="flash icon">⚡️</span> {log.text}
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                    :
                    <p>Select a game to view details</p>
                }

            </div>
                </div>
            <div className="">
                <Link to="/dashboard">
                    <button className="rpgui-button">Go back to Home</button>
                </Link>
            </div>
        </div>
    );
}