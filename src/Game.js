import React, {useState} from "react";
import "./Game.css";
import {PlayNumber} from "./PlayNumber";
import {Star} from "./Star";
import {StarsDisplay} from "./StarsDisplay";
import {utils} from "./utils";

export class Game extends React.Component {
    numberOfStarsAndButtons = 9;
    state = {
        available: [utils.range(1, 9)],
        candidates: [],
        status: ""
    }


    // let stars = generateHtml("div", "star", "");
    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {/*{stars}*/}
                        {<StarsDisplay count={this.numberOfStarsAndButtons} />}
                        {/*{utils.range(1, numberOfStars)*/}
                        {/*    .map(starId => <Star key={starId}/>)}*/}

                        {/*{generateStars()}*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                        {/*<div className="star" />*/}
                    </div>
                    <div className="right">
                        {utils.range(1, this.numberOfStarsAndButtons)
                            .map(number =>
                                <PlayNumber
                                    key={number}
                                    number={number}
                                    status={this.determineStatus(number)}
                                    onClick={this.handleClick}
                                />)}
                        {/*{generateButtons()}*/}
                        {/*<button className="number">1</button>*/}
                        {/*<button className="number">2</button>*/}
                        {/*<button className="number">3</button>*/}
                        {/*<button className="number">4</button>*/}
                        {/*<button className="number">5</button>*/}
                        {/*<button className="number">6</button>*/}
                        {/*<button className="number">7</button>*/}
                        {/*<button className="number">8</button>*/}
                        {/*<button className="number">9</button>*/}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        )
    }

    determineStatus(number) {
        if(!this.state.available.includes(number)) {
            return "used";
        }
        if(this.state.candidates.includes(number)) {
            return this.candidatesAreWrong() ? "wrong" : "candidate";
        }
        return "available";
    }

    candidatesAreWrong() {
        return utils.sum(this.state.candidates) > this.numberOfStarsAndButtons;
    }

    handleClick = (number, status) => {
        console.log(number + " " + status);
    }

}

// function generateHtml(elt, className, txtContent) {
//     let elts = [];
//     for (let i = 1; i <= 9; i++) {
//         elts.push(`<${elt} className=${className}>${txtContent}</${elt}>`);
//     }
//     return elts;
// }

// function generateStars() {
//     let elts = [];
//     for (let i = 1; i<= 9; i++) {
//         elts.push(<div className="star" />);
//     }
//     return (elts);
// }
//
// function generateButtons() {
//     let elts = [];
//     for (let i = 1; i <= 9; i++) {
//         elts.push(<button className="number">{i}</button> )
//     }
//     return elts;
// }

