import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import MainPage from './main-page';
import './styles/app.less'

//require.context('./images', true, /^\.\//);

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={MainPage}/>
    </Router>),
  document.getElementById('contents')
);
