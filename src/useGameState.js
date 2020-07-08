import {useEffect, useState} from "react";
import {utils} from "./utils";

export function useGameState() {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [available, setAvailable] = useState(utils.range(1, 9));
    const [candidates, setCandidates] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && available.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidates) => {
        if (utils.sum(newCandidates) !== stars) {
            setCandidates(newCandidates);
        } else {
            const newAvailables = available.filter(
                num => !newCandidates.includes(num)
            );
            setStars(utils.randomSumIn(newAvailables, 9));
            setAvailable(newAvailables);
            setCandidates([]);
        }
    }

    return {
        stars,
        available,
        candidates,
        secondsLeft,
        setGameState
    }
}
