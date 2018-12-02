import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import LoginPage from '../../components/LoginPage';

test('should render LoginPage ',()=>{
    const wrapper = shallow(<LoginPage startLogin={()=>{}}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});