import React, { Component } from "react";
import Menu from "./MenuComponent";
import Inform from "./InformComponent";
import Home from "./HomeComponent";
import Product from "./ProductComponent";
import { Routes, Route } from "react-router-dom";
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Checkout from './CheckoutComponent';
import PaymentResult from './PaymentResultComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import ReturnPolicy from './ReturnPolicyComponent';
import PrivacyPolicy from './PrivacyPolicyComponent';


class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        <Menu />
        <Inform />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/category/:cid" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/active" element={<Active />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer></Footer>
      </div>
    );
  }
}

export default Main;