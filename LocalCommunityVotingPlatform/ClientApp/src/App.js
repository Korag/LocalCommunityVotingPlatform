import React, { Component } from 'react';
import { Route } from 'react-router';

import AuthorizeComponent from './components/AuthorizationComponents/AuthorizeComponent'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope)
library.add(faKey)

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Route path='/' render={() => (<AuthorizeComponent />)} />
            </div>
        );
    }
}
