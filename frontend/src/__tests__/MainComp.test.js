import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MainComponent from "../public_components/maincomponent";
import expect from 'expect';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });

// Testing for public_components/maincomponent.js file


describe("Main Component", () => {
  it('renders inside app', () => {
    const component = renderer.create(<App> <MainComponent/> </App>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should generate joke when a button is pressed', ()=>{
    const fn = jest.fn();
    let pastHistory = [];
    // simulate react-router passing history props
    // also simulate App passing functions as changeURL prop
    const component = mount(<MainComponent history={pastHistory} changeURL={fn}/>);
    component.find("#maingen").simulate('click');
    expect(fn.mock.calls[0][0]).toBe("/getDadJoke");

  });

  it('should generate joke with id when id entered and submit', ()=>{
    const fn = jest.fn();
    let pastHistory = [];
    // simulate react-router passing history props
    // also simulate App passing functions as changeURL prop
    const component = mount(<MainComponent history={pastHistory} changeURL={fn}/>);
    component.find("#jokeIdText").simulate('change', {target: {value: "a1312"}});
    component.find("#submitWJokeId").simulate('click');
    expect(fn.mock.calls[0][0]).toBe("/getDadJoke/a1312");

  });

});
