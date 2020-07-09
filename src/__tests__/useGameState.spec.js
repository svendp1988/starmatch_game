import { useGameState } from "../useGameState";
import {shallow} from "enzyme";
import React from "react";

describe('useGameState', function () {
    const MockFuncComp = () => {
        const props = useGameState();
        const myProps = Object.assign({}, props, { stars: 9});
        return <div {...myProps}/>;
    }
    const container = shallow(<MockFuncComp/>);

    it('should have the proper props assigned', function () {
        expect(container.props()).toEqual({
            stars: 9,
            available: expect.any(Array),
            candidates: [],
            secondsLeft: 10,
            setGameState: expect.any(Function)
        })
    });

    // changes the candidates array but leaves the available array untouched
    // it('should give me access to its props', function () {
    //     console.log(container.props())
    //     container.props().setGameState([4, 5]);
    //     container.update();
    //     console.log(container.props())
    // });
});
