import React from 'react';
import {shallow} from 'enzyme';
import PlayNumber from "../PlayNumber";
import renderer from 'react-test-renderer';


describe('PlayNumber', function () {
    it('should match snapshot', function () {
        let wrapper = renderer.create(
            <PlayNumber/>
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have a lightgray background color if it is available and display the correct number as text', () => {
        const props = {
            number: 14,
            status: "available"
        }
        const wrapper = shallow(<PlayNumber {...props}/>);

        const button = wrapper.get(0);
        expect(button).toHaveProperty("type", "button");
        expect(button.props.style).toEqual({ backgroundColor: 'lightgray' });
        expect(wrapper.text()).toBe("14");
    })
});
