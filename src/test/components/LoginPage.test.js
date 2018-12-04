import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import {LoginPage} from '../../components/LoginPage';

test('should render LoginPage ',()=>{
    const wrapper = shallow(<LoginPage startLogin={()=>{}}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should call login on button click',()=>{
    const startLogin = jest.fn();//spies
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    wrapper.find('button').simulate('click');
    startLogin();
    expect(startLogin).toHaveBeenCalled();
});