import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import withRouter from '../utils/withRouter';
import { getImageSrc } from '../../common/imageUtil';

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
      paymentMethod: 'cod', // default COD
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
    this.calculateShippingAndTotals();
  }

  // simple shipping rule (tương tự Highlands demo)
  calculateShippingAndTotals = () => {
    const subtotal = CartUtil.getTotal(this.context.mycart);
    let shippingFee = 0;
    // Ví dụ: miễn phí khi subtotal >= 500000 (tham khảo Highlands)
    if (subtotal > 0 && subtotal < 500000) {
      shippingFee = 30000;
    } else {
      shippingFee = 0;
    }
    this.setState({ shippingFee });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'city') {
      // nếu thay đổi city có thể cập nhật shipping
      setTimeout(this.calculateShippingAndTotals, 0);
    }
  };

  applyPromo = () => {
    const code = (this.state.promoCode || '').trim().toUpperCase();
    const promoCodes = {
      FREESHIP: { discount: 30000, type: 'fixed' },
      WELCOME: { discount: 50000, type: 'fixed' },
      SALE10: { discount: 10, type: 'percentage' }
    };
    if (!code) {
      alert('Vui lòng nhập mã giảm giá');
      return;
    }
    const promo = promoCodes[code];
    if (!promo) {
      alert('Mã giảm giá không hợp lệ');
      return;
    }
    const subtotal = CartUtil.getTotal(this.context.mycart);
    let discount = 0;
    if (promo.type === 'percentage') {
      discount = Math.floor((subtotal * promo.discount) / 100);
    } else {
      discount = promo.discount;
    }
    this.setState({ discount });
    alert(`Áp dụng mã ${code}, giảm ${new Intl.NumberFormat('vi-VN').format(discount)}đ`);
  };

  validateForm = () => {
    const required = ['fullName', 'email', 'address', 'city'];
    const errors = {};
    required.forEach((k) => {
      if (!this.state[k] || !this.state[k].toString().trim()) {
        errors[k] = 'Bắt buộc';
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!this.context.token || !this.context.customer) {
      // chưa login -> chuyển tới login
      this.props.navigate('/login');
      return;
    }

    const subtotal = CartUtil.getTotal(this.context.mycart);
    const total = subtotal - (this.state.discount || 0) + (this.state.shippingFee || 0);
    const items = this.context.mycart.map((it) => ({
      product: it.product,
      quantity: it.quantity
    }));

    const body = {
      total: total,
      items: items,
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
      paymentMethod: this.state.paymentMethod
    };

    try {
      this.setState({ placing: true });
      const config = { headers: { 'x-access-token': this.context.token } };
      const res = await axios.post('/api/customer/checkout', body, config);
      const result = res.data;
      // server trả object result (theo code server hiện tại)
      if (result) {
        alert('Đặt hàng thành công!');
        // xóa giỏ hàng global
        this.context.setMycart([]);
        // chuyển tới trang đơn hàng của khách
        this.props.navigate('/myorders');
      } else {
        alert('Đặt hàng thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi gửi đơn hàng: ' + (err.response?.data?.message || err.message));
    } finally {
      this.setState({ placing: false });
    }
  };

  renderOrderItems() {
    if (!this.context.mycart || this.context.mycart.length === 0) {
      return <div>Giỏ hàng trống</div>;
    }
    return (
      <div>
        {this.context.mycart.map((it, idx) => (
          <div key={it.product._id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <div style={{ width: 60, height: 60 }}>
              <img src={getImageSrc(it.product.image)} alt={it.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{it.product.name}</div>
              <div style={{ fontSize: 12, color: '#666' }}>Số lượng: {it.quantity}</div>
            </div>
            <div style={{ fontWeight: 700, color: '#c41e3a' }}>{new Intl.NumberFormat('vi-VN').format(it.product.price * it.quantity)}đ</div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const subtotal = CartUtil.getTotal(this.context.mycart);
    const discount = this.state.discount || 0;
    const shippingFee = this.state.shippingFee || 0;
    const total = subtotal - discount + shippingFee;

    return (
      <div className="align-center" style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
        <h2 className="text-center">Thanh toán</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          <form onSubmit={this.handlePlaceOrder}>
            <h3>Thông tin nhận hàng</h3>
            <div>
              <label>Họ và tên *</label><br />
              <input name="fullName" value={this.state.fullName} onChange={this.handleInputChange} />
              <div style={{ color: 'red' }}>{this.state.errors.fullName}</div>
            </div>
            <div>
              <label>Email *</label><br />
              <input name="email" value={this.state.email} onChange={this.handleInputChange} />
              <div style={{ color: 'red' }}>{this.state.errors.email}</div>
            </div>
            <div>
              <label>Số điện thoại</label><br />
              <input name="phone" value={this.state.phone} onChange={this.handleInputChange} />
            </div>
            <div>
              <label>Địa chỉ *</label><br />
              <input name="address" value={this.state.address} onChange={this.handleInputChange} />
              <div style={{ color: 'red' }}>{this.state.errors.address}</div>
            </div>
            <div>
              <label>Tỉnh/Thành *</label><br />
              <select name="city" value={this.state.city} onChange={this.handleInputChange}>
                <option value="">-- Chọn tỉnh/thành --</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="hanoi">Hà Nội</option>
                <option value="danang">Đà Nẵng</option>
              </select>
              <div style={{ color: 'red' }}>{this.state.errors.city}</div>
            </div>
            <div>
              <label>Quận/Huyện</label><br />
              <input name="district" value={this.state.district} onChange={this.handleInputChange} />
            </div>
            <div>
              <label>Phường/Xã</label><br />
              <input name="ward" value={this.state.ward} onChange={this.handleInputChange} />
            </div>

            <h3>Phương thức thanh toán</h3>
            <div>
              <label>
                <input type="radio" name="payment" value="cod" checked={this.state.paymentMethod === 'cod'} onChange={() => this.setState({ paymentMethod: 'cod' })} />
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="payment" value="online" checked={this.state.paymentMethod === 'online'} onChange={() => this.setState({ paymentMethod: 'online' })} />
                Thanh toán Online (chưa tích hợp)
              </label>
            </div>

            <div style={{ marginTop: 12 }}>
              <button type="submit" disabled={this.state.placing}>{this.state.placing ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}</button>
            </div>
          </form>

          <aside>
            <div style={{ background: '#fff', padding: 16, borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3>Đơn hàng ({this.context.mycart.length} sản phẩm)</h3>
              <div>{this.renderOrderItems()}</div>
              <div style={{ marginTop: 12 }}>
                <input name="promoCode" placeholder="Nhập mã giảm giá" value={this.state.promoCode} onChange={this.handleInputChange} />
                <button type="button" onClick={this.applyPromo}>Áp dụng</button>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Tạm tính</div><div>{new Intl.NumberFormat('vi-VN').format(subtotal)}đ</div></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Giảm</div><div>-{new Intl.NumberFormat('vi-VN').format(discount)}đ</div></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Phí vận chuyển</div><div>{shippingFee ? new Intl.NumberFormat('vi-VN').format(shippingFee) + ' \u20AB' : 'Miễn phí'}</div></div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><div>Tổng cộng</div><div>{new Intl.NumberFormat('vi-VN').format(total)}đ</div></div>
              </div>
            </div>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <button onClick={() => this.props.navigate('/mycart')}>Quay về giỏ hàng</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);