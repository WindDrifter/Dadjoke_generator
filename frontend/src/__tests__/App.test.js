import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import maincomponent from "../public_components/maincomponent";
import expect from 'expect';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });
// Testing for App.js for state and rendering


describe("Main app", () => {
  it('renders without crashing', () => {
    const component = renderer.create(<App/>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Joke_id state should be an empty string', () => {
    const component = renderer.create(<App/>);
    const instance = component.getInstance();
    expect(instance.state.url).toBe("");
  });

});
