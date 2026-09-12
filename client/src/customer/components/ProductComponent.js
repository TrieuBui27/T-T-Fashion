import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { getImageSrc } from '../../common/imageUtil';
const fm = (n) => new Intl.NumberFormat('vi-VN').format(n) + '₫';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], title: 'LIST PRODUCTS' };
  }
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <div className="product-grid">
          {this.state.products.map((item) => (
            <div key={item._id} className="product-card">
              <Link to={'/product/' + item._id}>
                <img src={getImageSrc(item.image)} alt={item.name} />
              </Link>
              <div className="product-body">
                <div className="product-name">{item.name}</div>
                <div className="product-price">{fm(item.price)}</div>
                <Link to={'/product/' + item._id}>
                  <button>Xem chi tiết</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.loadByParams(this.props.params);
  }
  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.loadByParams(params);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.loadByParams(params);
    }
  }
  loadByParams(params) {
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
      this.apiGetCategoryName(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
      this.setState({ title: 'Kết quả tìm kiếm: ' + params.keyword });
    } else {
      this.setState({ title: 'LIST PRODUCTS' });
    }
  }
  apiGetCategoryName(cid) {
    axios.get('/api/customer/categories').then((res) => {
      const cates = Array.isArray(res.data) ? res.data : [];
      const found = cates.find((c) => c._id === cid);
      this.setState({ title: found ? found.name : 'LIST PRODUCTS' });
    }).catch(() => {
      this.setState({ title: 'LIST PRODUCTS' });
    });
  }
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }
}
export default withRouter(Product);