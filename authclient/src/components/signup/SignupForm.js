import React from "react";
import PropTypes from 'prop-types'; 
import timezones from "../../data/timezones";
import axios from "axios";
import classnames from "classnames";
import TextFieldGroup from "../common/TextFieldGroup";
import { browserHistory } from 'react-router';
import Validator from "validator";
import isEmpty from "lodash/isEmpty";

function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation field is required";
  }

  if(!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = "This field  is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      timezone: "",
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .userSignupRequest(this.state)
        .then(
          () => {
            browserHistory.push('/');
            this.props.addFlashMessage({
              type: 'success',
              text: 'you have signed up successfully'
            })
          },
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if(val !== '') {
      this.props.isUserExists(val).then( res => {
        let errors = this.state.errors;
        let invalid;
        if(res.data.user) {
          errors[field] = 'There is a user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid  });
      });
    }
  }


  render() {
    const { errors } = this.state;
    const options = Object.keys(timezones).map(key => {
      return (
        <option key={timezones[key]} value={timezones[key]}>
          {key}
        </option>
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Confirm password"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

       
        <div
          className={classnames("form-group", { "has-error": errors.timezone })}
        >
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>
              Choose your timezone
            </option>
            {options}
          </select>
          {errors.passwordConfirmation && (
            <span className="help-block">{errors.timezone}</span>
          )}
        </div>

        <div className="form-group">
          <button
            disabled={this.state.isLoading || this.state.invalid}
            className="btn btn-primary btn-lg"
          >
            <span class="glyphicon glyphicon-user">SignUp</span>
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default SignupForm;
