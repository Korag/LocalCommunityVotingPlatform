import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import { Login } from './components/Login';
import AuthorizeComponent  from './components/AuthorizeComponent'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope)
library.add(faKey)

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Login} />
                <AuthorizeComponent>
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                </AuthorizeComponent>
            </Layout>
        );
    }
}
