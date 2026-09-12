import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="admin-login-page">
          <div className="admin-login-box">
            <div className="admin-login-logo">⚙️</div>
            <h2 className="admin-login-title">Admin Login</h2>
            <p className="admin-login-sub">T&T Fashion Management</p>
            <div className="admin-login-form">
              <div className="admin-input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Nhập username..."
                  value={this.state.txtUsername}
                  onChange={(e) => this.setState({ txtUsername: e.target.value })}
                />
              </div>
              <div className="admin-input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Nhập password..."
                  value={this.state.txtPassword}
                  onChange={(e) => this.setState({ txtPassword: e.target.value })}
                />
              </div>
              <input
                type="submit"
                value="ĐĂNG NHẬP"
                className="admin-login-btn"
                onClick={(e) => this.btnLoginClick(e)}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
  btnLoginClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      this.apiLogin({ username: txtUsername, password: txtPassword });
    } else {
      alert('Please input username and password');
    }
  }
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;