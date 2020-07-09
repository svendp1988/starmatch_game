import React from 'react';
import {shallow, mount} from 'enzyme';

import Game from "../Game";
import {useGameState} from "../useGameState";

describe("Game", () => {
    // snapshot will be different every time because useGameState picks a random number of stars every time.
    it('should match snapshot', function () {
        const container = shallow(<Game/>);
        expect(container.html()).toMatchSnapshot();
    });

    it('should display a helper text', function () {
        const game = shallow(<Game />);
        expect(game.find("div.help").text()).toEqual("Pick 1 or more numbers that sum to the number of stars");
    });

    it('should display a timer with the remaining seconds left', function () {
        const game = shallow(<Game/>);
        expect(game.find("div.timer").text()).toEqual("Time Remaining: 10");
    });

    it('should alter the status on the numbers on clicking it', function () {
        const game = mount(<Game/>);
        const originalStatus = game.find("[number=4]").props().status
        game.find("[number=4]").simulate("click")
        const statusAfterClick = game.find("[number=4]").props().status;
        expect(originalStatus).not.toEqual(statusAfterClick);
        game.unmount();
    });

    // test doesn't work because I'm unable to control the state of the Game component
    it('should set the status from available to used if number clicked is not available', function () {
        const Hook = () => {
            const props = useGameState();
            const myProps = Object.assign({}, props, { available: [1, 2, 3]})
            return <Game {...myProps}/>
        }
        const container = mount(<Hook/>);
        console.log(container.children().props())
        expect(container.find("[number=4]").props().status).toEqual("available");
        container.find("[number=4]").simulate("click");
        expect(container.find("[number=4]").props().status).toEqual("used");
    });
})

