import React from "react";

export class PlayNumber extends React.Component {
    render() {
        return (
            <button
                className="number"
                onClick={() => this.props.onClick(this.props.number, this.props.status)}
                style={{backgroundColor: colors[this.props.status]}}
            >
                {this.props.number}
            </button>
        )
    }

}

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};
