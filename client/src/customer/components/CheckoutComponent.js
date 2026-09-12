import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import withRouter from '../utils/withRouter';
import { getImageSrc } from '../../common/imageUtil';

const API_BASE_URL = '';
const fm = (n) => new Intl.NumberFormat('vi-VN').format(n) + ' \u20AB';

class Checkout extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      ward: '',
      promoCode: '',
      discount: 0,
      shippingFee: 0,
      placing: false,
      errors: {}
    };
  }

  componentDidMount() {
    const customer = this.context.customer;
    if (customer) {
      this.setState({
        fullName: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || ''
      });
    }
    this.calculateShipping();
  }

  calculateShipping = () => {
    const subtotal = CartUtil.getTotal(this.context.mycart);
    let shippingFee = 0;
    if (subtotal > 0 && subtotal < 500000) shippingFee = 30000;
    this.setState({ shippingFee });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === 'city') this.calculateShipping();
    });
  };

  applyPromo = () => {
    const code = (this.state.promoCode || '').trim().toUpperCase();
    const promoCodes = {
      FREESHIP: { discount: 30000, type: 'fixed' },
      WELCOME: { discount: 50000, type: 'fixed' },
      SALE10: { discount: 10, type: 'percentage' }
    };

    if (!code) return window.alert('Vui lòng nhập mã giảm giá');
    const promo = promoCodes[code];
    if (!promo) return window.alert('Mã giảm giá không hợp lệ');

    const subtotal = CartUtil.getTotal(this.context.mycart);
    const discount =
      promo.type === 'percentage'
        ? Math.floor((subtotal * promo.discount) / 100)
        : promo.discount;

    this.setState({ discount });
    window.alert(`Đã áp dụng mã ${code}`);
  };

  validateForm = () => {
    const required = ['fullName', 'email', 'address', 'city'];
    const errors = {};
    required.forEach((k) => {
      if (!this.state[k] || !this.state[k].toString().trim()) errors[k] = 'Bắt buộc';
    });
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      window.alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!this.context.token || !this.context.customer) {
      this.props.navigate('/login');
      return;
    }

    const subtotal = CartUtil.getTotal(this.context.mycart);
    const discount = this.state.discount || 0;
    const shippingFee = this.state.shippingFee || 0;
    const total = subtotal - discount + shippingFee;

    const items = this.context.mycart.map((it) => ({
      product: it.product,
      quantity: it.quantity
    }));

    try {
      this.setState({ placing: true });

      const body = {
        total,
        items,
        customer: {
          ...this.context.customer,
          shipping: {
            fullName: this.state.fullName,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            district: this.state.district,
            ward: this.state.ward
          },
          email: this.state.email
        },
        paymentMethod: 'cod'
      };

      const config = { headers: { 'x-access-token': this.context.token } };
      const checkoutUrl = `${API_BASE_URL}/api/customer/checkout`;
      const res = await axios.post(checkoutUrl, body, config);

      if (res.data) {
        window.alert('Đặt hàng COD thành công!');
        this.context.setMycart([]);
        this.props.navigate('/myorders');
      } else {
        window.alert('Đặt hàng thất bại');
      }
    } catch (err) {
      console.error('Checkout COD error:', err);
      window.alert('Lỗi đặt hàng: ' + (err.response?.data?.message || err.message));
    } finally {
      this.setState({ placing: false });
    }
  };

  renderOrderItems() {
    if (!this.context.mycart || this.context.mycart.length === 0) {
      return <div>Giỏ hàng trống</div>;
    }

    return this.context.mycart.map((it) => (
      <div
        key={it.product._id}
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid #eee'
        }}
      >
        <img
          src={getImageSrc(it.product.image)}
          alt={it.product.name}
          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>{it.product.name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>SL: {it.quantity}</div>
        </div>
        <div className="money">{fm(it.product.price * it.quantity)}</div>
      </div>
    ));
  }

  render() {
    const subtotal = CartUtil.getTotal(this.context.mycart);
    const discount = this.state.discount || 0;
    const shippingFee = this.state.shippingFee || 0;
    const total = subtotal - discount + shippingFee;

    return (
      <div style={{ padding: '8px 0 20px' }}>
        <h2>Thanh toán</h2>

        <div className="cart-grid">
          <form className="panel" onSubmit={this.handlePlaceOrder}>
            <h3>Thông tin nhận hàng</h3>

            <div>
              <label>Họ và tên *</label>
              <input name="fullName" value={this.state.fullName} onChange={this.handleInputChange} />
              <div className="error-text">{this.state.errors.fullName}</div>
            </div>

            <div>
              <label>Email *</label>
              <input name="email" value={this.state.email} onChange={this.handleInputChange} />
              <div className="error-text">{this.state.errors.email}</div>
            </div>

            <div>
              <label>Số điện thoại</label>
              <input name="phone" value={this.state.phone} onChange={this.handleInputChange} />
            </div>

            <div>
              <label>Địa chỉ *</label>
              <input name="address" value={this.state.address} onChange={this.handleInputChange} />
              <div className="error-text">{this.state.errors.address}</div>
            </div>

            <div>
              <label>Tỉnh/Thành *</label>
              <select name="city" value={this.state.city} onChange={this.handleInputChange}>
                <option value="">-- Chọn tỉnh/thành --</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="hanoi">Hà Nội</option>
                <option value="danang">Đà Nẵng</option>
              </select>
              <div className="error-text">{this.state.errors.city}</div>
            </div>

            <div>
              <label>Quận/Huyện</label>
              <input name="district" value={this.state.district} onChange={this.handleInputChange} />
            </div>

            <div>
              <label>Phường/Xã</label>
              <input name="ward" value={this.state.ward} onChange={this.handleInputChange} />
            </div>

            <div style={{ marginTop: 12 }}>
              <button type="submit" disabled={this.state.placing}>
                {this.state.placing ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
              </button>
            </div>
          </form>

          <aside className="panel">
            <h3>Đơn hàng ({this.context.mycart.length} sản phẩm)</h3>
            <div>{this.renderOrderItems()}</div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <input
                name="promoCode"
                placeholder="Nhập mã giảm giá"
                value={this.state.promoCode}
                onChange={this.handleInputChange}
              />
              <button type="button" onClick={this.applyPromo}>Áp dụng</button>
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Tạm tính</div><div>{fm(subtotal)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Giảm</div><div>-{fm(discount)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Phí vận chuyển</div><div>{shippingFee ? fm(shippingFee) : 'Miễn phí'}</div>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <div>Tổng cộng</div><div>{fm(total)}</div>
              </div>
            </div>

            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <button type="button" onClick={() => this.props.navigate('/mycart')}>
                Quay về giỏ hàng
              </button>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);