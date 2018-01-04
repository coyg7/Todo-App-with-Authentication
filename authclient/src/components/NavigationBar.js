import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import PropTypes from 'prop-types'; 
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;


    const userLinks = (
      <ul className="navbar navbar-nav navbar-right list-group">
        <li>
          <Link to="todo" className="list-group-item">Manage Todos</Link>
        </li>

        <li className="list-group-item">
          <a href="#" onClick={this.logout.bind(this)}>Logout</a>
        </li>

      </ul>
    );

    const guestLinks = (
      <ul className="navbar navbar-nav navbar-right list-group navbar-right">
        <li>
          <Link to="signup" className="list-group-item"><span class="glyphicon glyphicon-user">SignUp</span></Link>
        </li>
        <li>
          <Link to="login" className="list-group-item"><span class="glyphicon glyphicon-log-in">Login</span></Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src="../images/logo.jpg" />
            </Link>
          </div>
          <div className="collapse navbar-collapse nav navbar-nav navbar-left" />
            {isAuthenticated ? userLinks : guestLinks}
          </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
