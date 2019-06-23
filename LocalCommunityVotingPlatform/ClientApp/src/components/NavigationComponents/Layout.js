import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Route } from 'react-router';

import { Users } from '../UserComponents/Users';
import { UserData } from '../UserComponents/UserData';

import { Resolutions } from '../AdminResolutionComponents/Resolutions';
import { ArchiveResolutions } from '../AdminResolutionComponents/ArchiveResolutions'

import { ResolutionsUser } from '../UserResolutionComponents/ResolutionsUser'
import { ArchiveResolutionsUser } from '../UserResolutionComponents/ArchiveResolutionsUser'


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
                        <Route path='/' exact component={ResolutionsUser} />
                    }

                    {this.props.SuperUser ?
                        <Route path='/archive'  component={ArchiveResolutions} />
                        :
                        <Route path='/archive'  component={ArchiveResolutionsUser}/>
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
