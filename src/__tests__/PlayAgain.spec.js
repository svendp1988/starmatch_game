import React from 'react';
import {shallow, mount} from 'enzyme';
import PlayAgain from "../PlayAgain";
import renderer from 'react-test-renderer';




describe("PlayAgain", () => {
    it('should match snapshot', function () {
        const props = {
            gameStatus: "lost"
        }
        const tree = renderer.create(
            <PlayAgain {...props}/>
            ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have a red colored message "Game Over" when the game is lost', function () {
        const props = {
            gameStatus: "lost"
        }
        const wrapper = shallow(<PlayAgain {...props}/>);
        expect(wrapper.find(".message").text()).toEqual("Game Over");
        expect(wrapper.find(".message").props().style).toEqual({ color: 'red' });
    });

    it('should have a green colored message "Well played!" when the game is won', function () {
        const props = {
            gameStatus: "won"
        }
        const wrapper = shallow(<PlayAgain {...props}/>);
        let messageBox = wrapper.find(".message");
        expect(messageBox.text()).toEqual("Well played!");
        expect(messageBox.props().style).toEqual({ color: "green" });
    });
})
