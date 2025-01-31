import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DealForm from './components/DealForm';
import BuyOptionForm from './components/BuyOptionForm';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/deal" component={DealForm} />
            <Route path="/buy-option" component={BuyOptionForm} />
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
