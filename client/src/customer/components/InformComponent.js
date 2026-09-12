import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="inform-bar">
        <div>
          {this.context.token === '' ? (
            <div>
              <Link to="/login">Đăng nhập</Link> |{' '}
              <Link to="/signup">Đăng ký</Link> |{' '}
              <Link to="/active">Kích hoạt</Link>
            </div>
          ) : (
            <div>
              Xin chào <b>{this.context.customer.name}</b> |{' '}
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link> |{' '}
              <Link to="/myprofile">Tài khoản</Link> |{' '}
              <Link to="/myorders">Đơn hàng</Link>
            </div>
          )}
        </div>

        <div>
          <Link to="/mycart">Giỏ hàng</Link>: <b>{this.context.mycart.length}</b> sản phẩm
        </div>
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;