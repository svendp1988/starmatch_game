import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import Game from "../Game";
import {utils} from "../utils";

describe("Game", () => {
    it('should match snapshot', function () {
        const state = {
            stars: 9,
            available: utils.range(1, 9),
            candidates: [],
            secondsLeft: 10,
        }
        const tree = renderer.create(
            <Game {...state}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

})

