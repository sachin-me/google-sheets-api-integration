import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class Subscription extends Component {
  render() {
    return (
      <div className="btn-wrapper">
        <Button>Login with google</Button>
      </div>
    )
  }
}

export default connect(null)(Subscription);