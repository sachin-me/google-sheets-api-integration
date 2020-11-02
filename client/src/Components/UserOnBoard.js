import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import HomeIcon from '../containers/HomeIcon';

class UserOnBoard extends Component {
	
  render() {
    return (
      <div className='columns column-wrapper'>
        <div className='column is-one-third'>
          <div className='hover'>
            <Link to='/'>
              <div>
                <HomeIcon /><span className='home-span'>Home</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(UserOnBoard);