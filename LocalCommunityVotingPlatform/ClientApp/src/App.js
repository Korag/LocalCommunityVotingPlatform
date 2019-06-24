import React, { Component } from 'react';
import { Route } from 'react-router';

import AuthorizeComponent from './components/AuthorizationComponents/AuthorizeComponent';
import { NotificationContainer } from 'react-notifications';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import ResetPassword from './components/PasswordManagementComponents/ResetPassword';

library.add(faEnvelope)
library.add(faKey)

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Route path='/' exact render={() => (<AuthorizeComponent />)} />
                <Route path='/resetpassword' render={() => (<ResetPassword />)} />
                <Route path='/archive' render={() => (<AuthorizeComponent />)}  />
                <Route path='/users' render={() => (<AuthorizeComponent />)}  />
                <Route path='/userdata' render={() => (<AuthorizeComponent />)}  />

                <div style={{ marginTop: 30 }}>
                    <NotificationContainer />
                </div>
            </div>
        );
    }
}
