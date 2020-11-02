import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {Object.keys(currentUser).length ? (
          <div>{currentUser.username.split(' ')[0]}</div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser || {},
  };
};

export default connect(mapStateToProps)(Profile);
