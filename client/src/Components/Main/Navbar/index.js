import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
import { Navbar, Button, Nav } from 'react-bootstrap';

import HomeIcon from '../../../containers/HomeIcon';
import Profile from './Profile';

class Navbars extends Component {
  
  render() {
    const { currentUser } = this.props;
    const userId = currentUser._id || '';

    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <Button>
                <HomeIcon />
              </Button>
            </Link>
          </Nav>

          {userId ? (
            <Nav>
              <Link to="/profile">
                <Button>
                  <Profile />
                </Button>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>

              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser || {},
  };
};

export default connect(mapStateToProps)(Navbars);
