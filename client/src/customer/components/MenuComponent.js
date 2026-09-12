import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import logo from '../../assets/logo.webp';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.hoverTimeout = null;
    this.state = {
      categories: [],
      txtKeyword: '',
      hoveredCat: null
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      const subs = item.subcategories || [];
      return (
        <li
          key={item._id}
          className="menu dropdown-parent"
          onMouseEnter={() => {
  clearTimeout(this.hoverTimeout);
  this.setState({ hoveredCat: item._id });
}}
onMouseLeave={() => {
  this.hoverTimeout = setTimeout(() => {
    this.setState({ hoveredCat: null });
  }, 150);
}}
        >
          <Link to={'/product/category/' + item._id}>{item.name} ▾</Link>
          {this.state.hoveredCat === item._id && subs.length > 0 && (
            <div className="dropdown-menu">
              <div className="dropdown-header">{item.name}</div>
              {subs.map((sub) => (
                <Link
                  key={sub._id}
                  to={'/product/category/' + sub._id}
                  className="dropdown-item"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </li>
      );
    });

    return (
      <div className="border-bottom top-nav">
        <div className="menu-row">
          <div className="brand">
            <img src={logo} alt="T&T logo" className="brand-logo" />
            <span>T&T FASHION</span>
          </div>
          <ul className="menu">
            <li className="menu"><Link to="/">Trang chủ</Link></li>
            <li className="menu"><Link to="/about">Giới thiệu</Link></li>
            <li className="menu"><Link to="/contact">Liên hệ</Link></li>
            {cates}
          </ul>
          <form className="search">
            <input
              type="search"
              placeholder="Tìm sản phẩm..."
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <input
              type="submit"
              value="Tìm"
              onClick={(e) => this.btnSearchClick(e)}
            />
          </form>
          <Link to="/admin" className="admin-link">Admin</Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  btnSearchClick(e) {
    e.preventDefault();
    const keyword = (this.state.txtKeyword || '').trim();
    if (!keyword) return;
    this.props.navigate('/product/search/' + keyword);
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const all = Array.isArray(res.data) ? res.data : [];
      const byParent = {};

      all.forEach((cat) => {
        const key = cat.parent ? String(cat.parent) : 'root';
        if (!byParent[key]) byParent[key] = [];
        byParent[key].push(cat);
      });

      const parents = (byParent.root || []).map((parent) => ({
        ...parent,
        subcategories: byParent[String(parent._id)] || []
      }));

      this.setState({ categories: parents });
    });
  }
}

export default withRouter(Menu);