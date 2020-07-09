let __stars = 9;
let __available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let __candidates = [];
let __secondsLeft = 10;

const useGameState = jest.fn(() => {
    return {
        __stars,
        __available,
        __candidates,
        __secondsLeft
    }
})

useGameState.__setStars = v => __stars = v;
useGameState.__setAvailable = v => __available = v;
useGameState.__setCandidates = v => __candidates = v;
useGameState.__setSecondsLeft = v => __secondsLeft = v;

export default useGameState;
