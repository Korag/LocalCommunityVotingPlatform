import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

import { Route } from 'react-router';

import { Users } from './UserComponents/Users';
import { Resolutions } from './ResolutionComponents/Resolutions';
import { MyData } from './MyData';
import { Votes } from './VoteComponents/Votes'

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div>
                <NavMenu Logout={this.props.Logout} />
                <Container>
                    <Route path='/' exact component={Votes} />
                    <Route path='/resolutions' exact component={Resolutions} />
                    <Route path='/users' component={Users} />
                    <Route path='/mydata' component={MyData} />
                </Container>
            </div>
        );
    }
}
