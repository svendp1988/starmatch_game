import React from "react";
import "./Game.css";
import {PlayNumber} from "./PlayNumber";
import {StarsDisplay} from "./StarsDisplay";
import {utils} from "./utils";
import PlayAgain from "./PlayAgain";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: utils.random(1, 9),
            available: utils.range(1, 9),
            candidates: [],
            secondsLeft: 10,
            gameStatus: "active"
        }
        this.numberOfButtons = 9;
        this.myInterval = "";
    }
    // numberOfButtons = 9;
    // myInterval;

    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.setState(({secondsLeft}) => ({
                secondsLeft: secondsLeft - 1
            }))
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.secondsLeft === 0 || this.state.gameStatus !== "active") {
            clearInterval(this.myInterval);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.available.length > this.state.available.length || prevState.secondsLeft > this.state.secondsLeft) {
            const gameStatus = this.state.available.length === 0
                ? "won"
                : this.state.secondsLeft === 0
                    ? "lost"
                    : "active";
            this.setState({
                gameStatus
            })
        }
        return null;
    }


    setGameState = (newCandidates) => {
        if (utils.sum(newCandidates) !== this.state.stars) {
            this.setState({
                candidates: newCandidates
            })
        } else {
            const newAvailables = this.state.available.filter(
                num => !newCandidates.includes(num)
            );
            this.setState({
                stars: utils.randomSumIn(newAvailables, 9),
                available: newAvailables,
                candidates: [],
            })
        }
    }


    determineStatus = (number) => {
        if (!this.state.available.includes(number)) {
            return "used";
        }
        if (this.state.candidates.includes(number)) {
            return this.candidatesAreWrong ? "wrong" : "candidate";
        }
        return "available";
    }

    candidatesAreWrong = utils.sum(this.state.candidates) > this.state.stars;


    handleClick = (number, status) => {
        if (this.state.gameStatus !== "active" || status === "used") {
            return;
        }
        const newCandidates =
            status === "available"
                ? this.state.candidates.concat(number)
                : this.state.candidates.filter(candidateNum => candidateNum !== number);
        this.setGameState(newCandidates);
    }

    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {this.state.gameStatus !== "active" ?
                            <PlayAgain onClick={this.props.resetGame} gameStatus={this.state.gameStatus}/> :
                            <StarsDisplay count={this.state.stars}/>}
                    </div>
                    <div className="right">
                        {utils.range(1, this.numberOfButtons)
                            .map(number =>
                                <PlayNumber
                                    key={number}
                                    number={number}
                                    onClick={this.handleClick}
                                    status={this.determineStatus(number)}
                                />)}
                    </div>
                </div>
                <div data-testid="timer" className="timer">Time Remaining: {this.state.secondsLeft}</div>
            </div>
        )
    }
}

// export class Game extends React.Component {
//     numberOfButtons = 9;
//     state = {
//         stars: utils.random(1, 9),
//         available: utils.range(1, 9),
//         candidates: [],
//         status: ""
//     }
//
//
//     // let stars = generateHtml("div", "star", "");
//
//     determineStatus(number) {
//         if (!this.state.available.includes(number)) {
//             return "used";
//         }
//         if (this.state.candidates.includes(number)) {
//             return this.candidatesAreWrong() ? "wrong" : "candidate";
//         }
//         return "available";
//     }
//
//     candidatesAreWrong() {
//         return utils.sum(this.state.candidates) > this.state.stars;
//     }
//
//     gameIsDone() {
//         return this.state.available.length === 0;
//     }
//
//     handleClick = (number, status) => {
//         console.log("click");
//         if (status === "used") {
//             return;
//         }
//         const newCandidates =
//             status === "available"
//                 ? this.state.candidates.concat(number)
//                 : this.state.candidates.filter(candidateNum => candidateNum !== number);
//         if (utils.sum(newCandidates) !== this.state.stars) {
//             this.setState({
//                 candidates: newCandidates,
//             })
//         } else {
//             const newAvailables = this.state.available.filter(
//                 num => !newCandidates.includes(num)
//             );
//             this.setState({
//                 stars: utils.randomSumIn(newAvailables, 9),
//                 available: newAvailables,
//                 candidates: [],
//             })
//         }
//         // console.log(number + " " + status);
//         // console.log("This: ", this);
//     }
//
//     resetGame = () => {
//         this.setState({
//             stars: utils.random(1, 9),
//             available: utils.range(1, 9),
//             candidates: [],
//         })
//     }
//
//
//
// // function generateHtml(elt, className, txtContent) {
// //     let elts = [];
// //     for (let i = 1; i <= 9; i++) {
// //         elts.push(`<${elt} className=${className}>${txtContent}</${elt}>`);
// //     }
// //     return elts;
// // }
//
// // function generateStars() {
// //     let elts = [];
// //     for (let i = 1; i<= 9; i++) {
// //         elts.push(<div className="star" />);
// //     }
// //     return (elts);
// // }
// //
// // function generateButtons() {
// //     let elts = [];
// //     for (let i = 1; i <= 9; i++) {
// //         elts.push(<button className="number">{i}</button> )
// //     }
// //     return elts;
// // }
//
//     render() {
//         return (
//             <div className="game">
//                 <div className="help">
//                     Pick 1 or more numbers that sum to the number of stars
//                 </div>
//                 <div className="body">
//                     <div className="left">
//                         {/*{stars}*/}
//                         {this.gameIsDone() ? (<PlayAgain onClick={this.resetGame}/>) : (<StarsDisplay count={this.state.stars}/>)}
//                         {/*{utils.range(1, numberOfStars)*/}
//                         {/*    .map(starId => <Star key={starId}/>)}*/}
//
//                         {/*{generateStars()}*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                         {/*<div className="star" />*/}
//                     </div>
//                     <div className="right">
//                         {utils.range(1, this.numberOfButtons)
//                             .map(number =>
//                                 <PlayNumber
//                                     key={number}
//                                     number={number}
//                                     onClick={this.handleClick}
//                                     status={this.determineStatus(number)}
//                                 />)}
//                         {/*{generateButtons()}*/}
//                         {/*<button className="number">1</button>*/}
//                         {/*<button className="number">2</button>*/}
//                         {/*<button className="number">3</button>*/}
//                         {/*<button className="number">4</button>*/}
//                         {/*<button className="number">5</button>*/}
//                         {/*<button className="number">6</button>*/}
//                         {/*<button className="number">7</button>*/}
//                         {/*<button className="number">8</button>*/}
//                         {/*<button className="number">9</button>*/}
//                     </div>
//                 </div>
//                 <div className="timer">Time Remaining: 10</div>
//             </div>
//         )
//     }
// }

export default Game;
