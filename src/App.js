import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import Pending from './containers/Pending/Pending';
import Approved from './containers/Approved/Approved';
import Sent from './containers/Sent/Sent';
import Approval from './containers/Approval/Approval';
import Home from './containers/Home/Home';
import Logout from './containers/Logout/Logout';
import Rejected from './containers/Rejected/Rejected';
import Loader from './components/Loader/Loader';

import * as Action from './redux/actions/index';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthOnLoad();
    this.props.fetchDepartments();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/home' exact component={Home} />
          <Route path='/pending' exact component={Pending} />
          <Route path='/approved' exact component={Approved} />
          <Route path='/rejected' exact component={Rejected} />
          <Route path='/sent' exact component={Sent} />
          <Route path='/approval' exact component={Approval} />
          <Redirect to='/' />
        </Switch>
      );
    }

    let loader = null;
    if (this.props.isLoading) {
        loader = <Loader />
    }
    return (
      <div>
        {loader}
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    isLoading: state.auth.loading,
  }
};

const mapDispatchToProps = dispatch => ({

  checkAuthOnLoad: () => dispatch(Action.checkAuthOnLoad()),
  fetchDepartments: () => dispatch(Action.fetchDepartments())

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
