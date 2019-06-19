import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

import { Route } from 'react-router';

import { Users } from '../UserComponents/Users';
import { UserData } from '../UserComponents/UserData';

import { Resolutions } from '../ResolutionComponents/Resolutions';
import { ArchiveResolutions } from '../ResolutionComponents/ArchiveResolutions'

import { ArchiveVotes } from '../VoteComponents/ArchiveVotes'
import { Votes } from '../VoteComponents/Votes'


export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);

        console.log(this.props.SuperUser);
    };

    render() {
        return (
            <div>
                <NavMenu Logout={this.props.Logout} SuperUser={this.props.SuperUser} />
                <div className="wrapper">
                    <Route path='/' exact component={Votes} />
                    {this.props.SuperUser.data ? <Route path='/resolutions' exact component={Resolutions} /> : null}
                    {this.props.SuperUser.data ? <Route path='/archiveResolutions' exact component={ArchiveResolutions} /> : null}
                    {this.props.SuperUser.data ? <Route path='/archiveVotes' exact component={ArchiveVotes} /> : null}
                    {this.props.SuperUser.data ? <Route path='/users' component={Users} /> : null}
                    <Route path='/userdata' component={UserData} />
                </div>
            </div>
        );
    }
}
