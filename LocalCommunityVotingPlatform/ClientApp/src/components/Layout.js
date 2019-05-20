import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

import { Route } from 'react-router';

import { Counter } from './Counter';
import { FetchData } from './FetchData';

import { Users } from './Users';
import { Resolutions } from './Resolutions';
import { MyData } from './MyData';

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
                    <Route path='/' exact component={Resolutions} />
                    <Route path='/users' component={Users} />
                    <Route path='/mydata' component={MyData} />
                </Container>
            </div>
        );
    }
}
