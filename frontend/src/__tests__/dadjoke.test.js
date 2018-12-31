import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Dadjoke from "../dadjoke_folder/dadjoke";
import expect from 'expect';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });

describe("Dadjoke Component", () => {
  it('renders inside app', () => {
    const component = renderer.create(<App> <Dadjoke/> </App>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should vote joke when reactionButton is pressed', ()=>{
    const fn = jest.fn();
    let pastHistory = [];
    // simulate react-router passing history props
    // also simulate App passing functions as changeURL prop
    const wrapper = shallow(<Dadjoke history={pastHistory} match={{params: {url:"/dadjoke"}}} />);
    const instance =  wrapper.instance();
    const mockedEvent = {target:{"name": "like"}, preventDefault: ()=>{}}

    wrapper.find("#reactionLike").simulate('click', mockedEvent);
    expect(fn.mock.calls[0][0]).toBe("");

  });

});
