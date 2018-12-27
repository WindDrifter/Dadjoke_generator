import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import expect from 'expect';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("Main app", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('shows a p', () =>{
    const div = document.createElement('div');
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<p>
      Poopsiees
    </p>)).toEqual(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});
