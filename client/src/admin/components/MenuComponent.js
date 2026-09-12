import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="admin-navbar">
        <div className="admin-brand">⚙️ Admin Panel</div>
        <ul className="admin-menu">
          <li><Link to="/admin/home">Home</Link></li>
          <li><Link to="/admin/category">Category</Link></li>
          <li><Link to="/admin/product">Product</Link></li>
          <li><Link to="/admin/order">Order</Link></li>
          <li><Link to="/admin/customer">Customer</Link></li>
        </ul>
        <div className="admin-user">
          Hello <b>{this.context.username}</b>
          <Link to="/admin/home" className="admin-logout" onClick={() => this.lnkLogoutClick()}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;