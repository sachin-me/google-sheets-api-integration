import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import Navbars from './Navbar';
import PublicRoutes from '../Routes/PublicRoutes';
import AuthRoutes from '../Routes/AuthRoutes';
import api from '../../utility/api';

class Main extends Component {
  
  render() {
    const { currentUser } = this.props;
    const id = currentUser && currentUser._id || null;
    
    return (
      <>
        {
          <Router>
            <Navbars />
            {
              Object.keys(currentUser).length !== 0 ? (
                <Switch>
                  <>
                  {
                    id ? <AuthRoutes /> : (
                      <div className="main-loader">
                        <Loader
                          type="Audio"
                          color="#00BFFF"
                          height={50}
                          width={50}
                          timeout={3000} //3 secs
                        />
                      </div>
                    )
                  }
                  </>
                </Switch>
              ) : <PublicRoutes />
            }
          </Router>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(Main);
