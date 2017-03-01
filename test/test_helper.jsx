import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from '../frontend/src/reducers/RootReducer';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);


function renderComponent(ComponentClass, props = {}, state = {}) {   
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={applyMiddleware(ReduxThunk)(createStore)(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );      
  return $(ReactDOM.findDOMNode(componentInstance));
}

function renderPlainComponent(ComponentClass, props = {}) {   
  const componentInstance =  TestUtils.renderIntoDocument(    
    <ComponentClass {...props} />    
  );      
  return $(ReactDOM.findDOMNode(componentInstance));
}


$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};


export {renderComponent, renderPlainComponent, expect};
