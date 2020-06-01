import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Loader from '../../components/Loader/Loader';


class Layout extends Component {
    state = {
        showSideDrawer: false
      }
    
      sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
      }
      sideDrawerTogglehandler = () => {
        this.setState((prevState) => {
          return { showSideDrawer: !prevState.showSideDrawer }
        })
      }
    render() {
        const showToolbar = this.props.isAuthenticated;
        let loader = null;
        if (this.props.isLoading) {
            loader = <Loader />
        }
        return (
            <>
                {loader}
                {showToolbar && <Toolbar drawerToggleClicked={this.sideDrawerTogglehandler} />}
                {showToolbar && <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />}

                <main className={showToolbar?Classes.ContentWithToolbar:Classes.ContentWithoutToolbar}>
                    {this.props.children}
                </main>
            </>
        );
    }

}
const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.token != null,
      isLoading: state.department.loading,
    }
  };
  
  // const mapDispatchToProps = dispatch => ({
  
  //   authenticate: (email, password) => dispatch(ActionCreators.auth(email, password))
  // });
  
export default withRouter(connect(mapStateToProps)(Layout));