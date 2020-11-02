import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../store/actions';
import helperFunctions from '../../utility';
import api from '../../utility/api';
import commonComponents from '../CommonComponents';

let { validateEmail, validatePassword, toProperCase } = helperFunctions;
let { InputBox, Message, SubmitButton } = commonComponents;

class Login extends Component {
  state = {
    name: '',
    password: '',
    message: '',
    error: '',
    validEmail: true,
    validPassword: true,
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateEmailPassword()
    );
  };

  validateEmailPassword = () => {
    let { password, validPassword } = this.state;
    this.setState(
      {
        validPassword: validatePassword(password),
      },
      () => {
        if (password && !validPassword) {
          return this.setState({
            error:
              '*Password must contain 4-8 characters and at least One Uppercase letter and one numeric value.',
          });
        } else {
          return this.setState({
            error: '',
          });
        }
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.state;

    const data = { name, password };
    this.props.dispatch(actions.loginUser(data, this.handleSubmitReturn));
  };

  handleSubmitReturn = (success, error) => {
    if (success) {
      console.log(success, 'inside if', this.props, actions, 'actions');
      this.props.dispatch(
        api.getCurrentUser((isUser) => {
          console.log(isUser, 'isUser');
          if (isUser) {
            return this.props.history.push('/');
          }
        })
      );
    } else {
      this.setState({
        error: error,
      });
    }
  };

  render() {
    const { name, password, message, error } = this.state;
    return (
      <div className="form-wrapper">
        <div>
          <h3 className="center" style={{ color: '#27a1e8' }}>Login</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <InputBox
            name="name"
            type="text"
            placeholder="Name"
            handleChange={this.handleChange}
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Enter the password"
            handleChange={this.handleChange}
            // onBlur={this.validateEmailPassword}
          />
          <SubmitButton text="Login" onClick={this.handleSubmit} />
        </form>
        <Message message={message} error={error} />
        <div className="center">
          <Link to="/signup">Create an account?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    error: state.error,
  };
};

export default connect(mapStateToProps)(Login);
