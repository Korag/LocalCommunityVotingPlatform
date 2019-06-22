import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { NavMenu } from './NavMenu';

import { Route } from 'react-router';

import { Users } from '../UserComponents/Users';
import { UserData } from '../UserComponents/UserData';

import { Resolutions } from '../AdminResolutionComponents/Resolutions';
import { ArchiveResolutions } from '../AdminResolutionComponents/ArchiveResolutions'

import { Resolutions_User } from '../UserResolutionComponents/Resolutions_User'
import { ArchiveResolutions_User } from '../UserResolutionComponents/ArchiveResolutions_User'


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

                    {this.props.SuperUser ?
                        <Route path='/' exact component={Resolutions} />
                        :
                        <Route path='/' exact component={Resolutions_User} />
                    }

                    {this.props.SuperUser ?
                        <Route path='/archive'  component={ArchiveResolutions} />
                        :
                        <Route path='/archive'  component={ArchiveResolutions_User}/>
                    }

                    {this.props.SuperUser ?
                        <Route path='/users' component={Users} />
                        :
                        null
                    }

                    <Route path='/userdata' component={UserData} />
                </div>
            </div>
        );
    }
}
