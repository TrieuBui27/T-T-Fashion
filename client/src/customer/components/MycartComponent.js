import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import { getImageSrc } from '../../common/imageUtil';

const fm = (n) => new Intl.NumberFormat('vi-VN').format(n) + ' \u20AB';

class Mycart extends Component {
  static contextType = MyContext;
  render() {
    const total = CartUtil.getTotal(this.context.mycart);
    return (
      <div>
        <h2>GIỎ HÀNG</h2>
        {this.context.mycart.length === 0 ? (
          <div className="panel">Giỏ hàng trống.</div>
        ) : (
          <div className="cart-grid">
            <div className="panel">
              {this.context.mycart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr auto',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid #eee',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={getImageSrc(item.product.image)}
                    alt={item.product.name}
                    style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 10 }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.product.name}</div>
                    <div style={{ color: '#6b7280' }}>{item.product.category.name}</div>
                    {item.size && (
                      <div style={{ color: '#6b7280' }}>Size: <b>{item.size}</b></div>
                    )}
                    <div>Số lượng: {item.quantity}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="money">{fm(item.product.price * item.quantity)}</div>
                    <div
                      className="link"
                      style={{ marginTop: 8 }}
                      onClick={() => this.lnkRemoveClick(index)}
                    >
                      Xóa
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="panel">
              <h3>Tóm tắt đơn hàng</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tạm tính</span>
                <span className="money">{fm(total)}</span>
              </div>
              <hr />
              <button style={{ width: '100%', marginTop: 8 }} onClick={() => this.lnkCheckoutClick()}>
                TIẾN HÀNH THANH TOÁN
              </button>
            </aside>
          </div>
        )}
      </div>
    );
  }

  lnkRemoveClick(index) {
    const mycart = [...this.context.mycart];
    mycart.splice(index, 1);
    this.context.setMycart(mycart);
  }

  lnkCheckoutClick() {
    if (!window.confirm('Xác nhận thanh toán?')) return;
    if (this.context.mycart.length > 0) {
      if (this.context.customer) this.props.navigate('/checkout');
      else this.props.navigate('/login');
    } else {
      window.alert('Giỏ hàng trống');
    }
  }
}
export default withRouter(Mycart);