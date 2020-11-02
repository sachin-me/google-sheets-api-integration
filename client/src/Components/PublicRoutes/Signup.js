import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../../store/actions';
import helperFunctions from '../../utility';
import commonComponents from '../CommonComponents';

let { validateEmail, validatePassword, toProperCase } = helperFunctions;
let { InputBox, Message, SubmitButton } = commonComponents;

class Signup extends Component {
  state = {
    name: '',
    email: '',
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
    let { email, password, validEmail, validPassword } = this.state;

    this.setState(
      {
        validEmail: validateEmail(email),
        validPassword: validatePassword(password),
      },
      () => {
        if (email || password) {
          if (email && !validEmail) {
            return this.setState({
              error: '*Enter valid email address (e.g. abc@gmail.com)',
            });
          }
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
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, validEmail, validPassword } = this.state;

    if (validatePassword(password)) {
      const data = { name, password };
      this.props.dispatch(actions.createUser(data, this.handleSubmitReturn));
    } else {
      this.setState({
        error: 'Email or Password is invalid',
      });
    }
  };

  handleSubmitReturn = (success, error) => {
    if (success) {
      this.props.history.push('/login');
    } else {
      this.setState({
        error: error,
      });
    }
  };

  render() {
    const {
      name,
      email,
      password,
      message,
      error,
      validEmail,
      validPassword,
    } = this.state;
    return (
      <div className="form-wrapper">
        <div>
          <h3 className="center" style={{ color: '#27a1e8' }}>Create an account</h3>
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
            placeholder="Password"
            handleChange={this.handleChange}
            onBlur={this.validateEmailPassword}
          />
          <SubmitButton text="Sign up" onClick={this.handleSubmit} />
        </form>
        <Message message={message} error={error} />
        <div className="goto-login center">
          <span style={{ color: '#263238' }}>Already has an account, </span>
          <Link to="/login">login?</Link>
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

export default connect(mapStateToProps)(Signup);
