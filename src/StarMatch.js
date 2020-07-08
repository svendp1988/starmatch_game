import React, {useState} from "react";
import Game from "./Game";

function StarMatch() {
    const [gameId, setGameId] = useState(1);

    return (
        <Game key={gameId} resetGame={() => setGameId(gameId + 1)}/>
    )
}

export default StarMatch;
