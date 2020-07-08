import React, { Component } from "react";

class PlayAgain extends Component {
    render() {
        return (
            <div className="game-done">
                <div
                    className="message"
                    style={{ color: this.props.gameStatus === "lost" ? "red" : "green"}}
                >
                    {this.props.gameStatus === "lost" ? "Game Over": "Well played!"}
                </div>
                <button onClick={this.props.onClick}>Play Again</button>
            </div>
        )
    }
}

export default PlayAgain;
