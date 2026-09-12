import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { getImageSrc } from '../../common/imageUtil';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      txtDescription: '',
      txtSizes: '',
      cmbCategory: '',
      imgProduct: null
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (
          <option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>
            {cate.name}
          </option>
        );
      } else {
        return <option key={cate._id} value={cate._id}>{cate.name}</option>;
      }
    });

    return (
      <div className="float-right">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" value={this.state.txtID} readOnly /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" value={this.state.txtName}
                    onChange={(e) => this.setState({ txtName: e.target.value })} />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.,]/g, '');
                      this.setState({ txtPrice: val });
                    }}
                    placeholder="VD: 1,399,000"
                  />
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <textarea rows="4" value={this.state.txtDescription}
                    onChange={(e) => this.setState({ txtDescription: e.target.value })}
                    placeholder="Nhập mô tả sản phẩm..." />
                </td>
              </tr>
              <tr>
                <td>Sizes</td>
                <td>
                  <input type="text" value={this.state.txtSizes}
                    onChange={(e) => this.setState({ txtSizes: e.target.value })}
                    placeholder="S, M, L, XL..." />
                </td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <input type="file" accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)} />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select value={this.state.cmbCategory}
                    onChange={(e) => this.setState({ cmbCategory: e.target.value })}>
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {this.state.imgProduct ? (
                    <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item && this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        txtDescription: this.props.item.description || '',
        txtSizes: this.props.item.sizes ? this.props.item.sizes.join(', ') : '',
        cmbCategory: this.props.item.category._id,
        imgProduct: getImageSrc(this.props.item.image)
      });
    }
  }

  async btnAddClick(e) {
    e.preventDefault();
    try {
      const name = this.state.txtName;
      const price = parseInt(this.state.txtPrice.toString().replace(/[.,]/g, ''));
      const category = this.state.cmbCategory;
      const description = this.state.txtDescription;
      const sizes = this.state.txtSizes.split(',').map(s => s.trim()).filter(s => s);
      const image = await this.uploadImageIfNeeded(this.state.imgProduct);
      if (name && price && category && image) {
        this.apiPostProduct({ name, price, category, image, description, sizes });
      } else {
        alert('Please input name and price and category and image');
      }
    } catch (err) {
      alert(err.message || 'Upload image failed');
    }
  }

  async btnUpdateClick(e) {
    e.preventDefault();
    try {
      const id = this.state.txtID;
      const name = this.state.txtName;
      const price = parseInt(this.state.txtPrice.toString().replace(/[.,]/g, ''));
      const category = this.state.cmbCategory;
      const description = this.state.txtDescription;
      const sizes = this.state.txtSizes.split(',').map(s => s.trim()).filter(s => s);
      const image = await this.uploadImageIfNeeded(this.state.imgProduct);
      if (id && name && price && category && image) {
        this.apiPutProduct(id, { name, price, category, image, description, sizes });
      } else {
        alert('Please input id and name and price and category and image');
      }
    } catch (err) {
      alert(err.message || 'Upload image failed');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImageIfNeeded(imgValue) {
    if (!imgValue) return '';
    if (imgValue.startsWith('http://') || imgValue.startsWith('https://')) return imgValue;
    if (!imgValue.startsWith('data:image/')) return imgValue;

    try {
      const config = { headers: { 'x-access-token': this.context.token } };
      const res = await axios.post('/api/admin/upload', { imageData: imgValue }, config);
      if (res.data && res.data.url) return res.data.url;
      throw new Error('Upload image failed: empty url');
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Upload image failed';
      throw new Error(message);
    }
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      if (res.data) { alert('OK BABY!'); this.apiGetProducts(); }
      else { alert('SORRY BABY!'); }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      if (res.data) { alert('OK BABY!'); this.apiGetProducts(); }
      else { alert('SORRY BABY!'); }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      if (res.data) { alert('OK BABY!'); this.apiGetProducts(); }
      else { alert('SORRY BABY!'); }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    });
  }
}

export default ProductDetail;