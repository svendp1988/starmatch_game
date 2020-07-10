import React from "react";
import {utils} from "./utils";

export class StarsDisplay extends React.Component {
    render() {
        return (
            <React.Fragment>
                {utils.range(1, this.props.count)
                    .map(starId => <div key={starId} className="star"/>)}
            </React.Fragment>
        )
    }
}


