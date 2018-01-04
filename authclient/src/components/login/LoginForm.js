import React from "react";
import PropTypes from 'prop-types'; 
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
// import { browserHistory } from 'react-router';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if(Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Username or Email is required';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier:'',
      password:'',
      errors:{},
      isLoading:false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;

  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors:{}, isLoading:true});
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false})
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render() {
    const { errors, identifier, password, isLoading} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login<span class="glyphicon glyphicon-log-in"></span>
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, {login}) (LoginForm);
