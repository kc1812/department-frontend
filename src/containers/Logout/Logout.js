import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ActionCreators from '../../redux/actions/index'

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to='/' />
        );
    }
}

const mapDispatchToProps = dispatch => ({

    logout: () => dispatch(ActionCreators.logoutAndClear())
});

export default connect(null, mapDispatchToProps)(Logout);