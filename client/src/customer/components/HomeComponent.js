import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getImageSrc } from '../../common/imageUtil';

const fm = (n) => new Intl.NumberFormat('vi-VN').format(n) + '\u20AB';

class Home extends Component {
  constructor(props) {
    super(props);
    this.heroSlides = [
      {
        image: 'https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=1065',
      },
      {
        image: 'https://theme.hstatic.net/200000690725/1001078549/14/slide_2_img.jpg?v=1065',
      },
      {
        image: 'https://cdn.hstatic.net/files/1000253775/file/2048x813_-_banner_web_d__h__daily_-_ngang_800c0102d0cc4b88a544d383d5bc8865.jpg',
      }
    ];
    this.state = {
      newprods: [],
      hotprods: [],
      currentSlide: 0
    };
  }

  renderProductList(arr) {
    return (
      <div className="product-grid">
        {arr.map((item) => (
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
    );
  }

  render() {
    const slide = this.heroSlides[this.state.currentSlide];
    return (
      <div>
        <section className="hero hero-slider">
          <img src={slide.image} alt={slide.title} className="hero-bg" />
          <div className="hero-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <Link to={slide.cta}>
            </Link>
          </div>

          <button className="hero-arrow left" onClick={() => this.prevSlide()}>‹</button>
          <button className="hero-arrow right" onClick={() => this.nextSlide()}>›</button>

          <div className="hero-dots">
            {this.heroSlides.map((_, idx) => (
              <span
                key={idx}
                className={this.state.currentSlide === idx ? 'dot active' : 'dot'}
                onClick={() => this.setState({ currentSlide: idx })}
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2>SẢN PHẨM MỚI</h2>
          {this.renderProductList(this.state.newprods)}
        </section>

        {this.state.hotprods.length > 0 && (
          <section>
            <h2>SẢN PHẨM BÁN CHẠY</h2>
            {this.renderProductList(this.state.hotprods)}
          </section>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    this.slideTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.slideTimer);
  }

  prevSlide() {
    const total = this.heroSlides.length;
    this.setState((prev) => ({ currentSlide: (prev.currentSlide - 1 + total) % total }));
  }

  nextSlide() {
    const total = this.heroSlides.length;
    this.setState((prev) => ({ currentSlide: (prev.currentSlide + 1) % total }));
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;