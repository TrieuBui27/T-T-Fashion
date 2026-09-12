import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { getImageSrc } from '../../common/imageUtil';
const fm = (n) => new Intl.NumberFormat('vi-VN').format(n) + ' \u20AB';

class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
      selectedSize: ''
    };
  }

  render() {
    const prod = this.state.product;
    if (!prod) return <div />;
    return (
      <div>
        <h2>Chi tiết sản phẩm</h2>
        <div className="product-detail">
          <div>
            <img src={getImageSrc(prod.image)} alt={prod.name} />
          </div>
          <div>
            <h3 style={{ marginTop: 0, fontSize: '24px', fontWeight: 800  }}>{prod.name}</h3>
            <p style={{ color: '#6b7280' }}>Danh mục: {prod.category.name}</p>
            <p className="money" style={{ fontSize: 24 }}>{fm(prod.price)}</p>

            {prod.description && (
              <div className="product-description">
                <h4>Mô tả sản phẩm</h4>
                <p>{prod.description}</p>
              </div>
            )}

            {prod.sizes && prod.sizes.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Kích thước:</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {prod.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => this.setState({ selectedSize: size })}
                      style={{
                        padding: '6px 16px',
                        border: '1.5px solid #333',
                        borderRadius: 6,
                        background: this.state.selectedSize === size ? '#333' : '#fff',
                        color: this.state.selectedSize === size ? '#fff' : '#333',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 14,
                        transition: 'all .2s'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form>
              <div style={{ maxWidth: 160, marginBottom: 12 }}>
                <label>Số lượng</label>
                <input
                  type="number" min="1" max="99"
                  value={this.state.txtQuantity}
                  onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                />
              </div>
              <input type="submit" value="THÊM VÀO GIỎ"
                onClick={(e) => this.btnAdd2CartClick(e)} />
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetProduct(this.props.params.id);
  }

  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    const selectedSize = this.state.selectedSize;
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Vui lòng chọn kích thước!');
      return;
    }
    if (quantity) {
      const mycart = [...this.context.mycart];
      const index = mycart.findIndex((x) => x.product._id === product._id && x.size === selectedSize);
      if (index === -1) mycart.push({ product, quantity, size: selectedSize });
      else mycart[index].quantity += quantity;
      this.context.setMycart(mycart);
      alert('Đã thêm vào giỏ hàng!');
    } else {
      alert('Vui lòng nhập số lượng');
    }
  }

  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      this.setState({ product: res.data });
    });
  }
}

export default withRouter(ProductDetail);