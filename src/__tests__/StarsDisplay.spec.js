import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {StarsDisplay} from "../StarsDisplay";

describe('StarsDisplay', function () {
    const props = {
        count: 9
    }

    it('should match snapshot', function () {
        const tree = renderer.create(
            <StarsDisplay {...props}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should contain 9 divs with a class of star', function () {
        const wrapper = shallow(<StarsDisplay {...props} />);
        expect(wrapper.children()).toHaveLength(9);
        wrapper.children()
            .forEach(child =>
                expect(child.props().className).toEqual("star"));
    });
});
