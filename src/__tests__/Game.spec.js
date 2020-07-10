import React from 'react';
import {shallow, mount, spyMethod} from 'enzyme';

import Game from "../Game";
import {utils} from "../utils";
import {render} from "@testing-library/react";
import {PlayNumber} from "../PlayNumber";

describe("Game", () => {
    // snapshot will be different every time because useGameState picks a random number of stars every time.
    it('should match snapshot', function () {
        const container = shallow(<Game/>);
        container.instance().setState({
            stars: 9,
            available: utils.range(1, 9),
            candidates: [],
            secondsLeft: 4,
            gameStatus: "active"
        });
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
        const originalStatus = game.find("[number=4]").props().status;
        game.find("[number=4]").simulate("click");
        const statusAfterClick = game.find("[number=4]").props().status;
        expect(originalStatus).not.toEqual(statusAfterClick);
        game.unmount();
    });

    it('should set the status from available to used if number clicked is not available', function () {
        const wrapper = mount(<Game/>);
        expect(wrapper.find("[number=4]").props().status).toEqual("available");
        wrapper.instance().setState({
            available: [1, 2]
        })
        wrapper.find("[number=4]").simulate("click");
        expect(wrapper.find("[number=4]").props().status).toEqual("used");
        wrapper.unmount();
    });

    it('should call the handleClick when a playnumber is clicked', function () {
        const wrapper = mount(<Game />);
        const spy = jest.spyOn(wrapper.instance(), "handleClick");
        wrapper.find("button").first().simulate("click");
        expect(spy).toHaveBeenCalled();
        expect(wrapper.contains(PlayNumber)).toBe(true);
    });

    it('should mock', function () {
        let mockFn = jest.fn();



        const wrapper = mount(<Game />);
        wrapper.instance().handleClick = mockFn;
        console.log(wrapper.find("button").first().props());
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
    /*
    state: {
        stars: 5,
        available: [
          1, 2, 3, 4, 5,
          6, 7, 8, 9
        ],
        candidates: [],
        secondsLeft: 10,
        gameStatus: 'active'
      },
      numberOfButtons: 9,
      setGameState: [Function (anonymous)],
      determineStatus: [Function (anonymous)],
      candidatesAreWrong: false,
      handleClick: [Function (anonymous)],
      setState: [Function (anonymous)],
      myInterval: 2
      */

    it('should give me more insights as to what is going on', function () {
        const wrapper = shallow(<Game/>);
        console.log(wrapper.instance());
    });

    /* in general not sure on how to manipulate the state of this component to control the flow of tests */
})

