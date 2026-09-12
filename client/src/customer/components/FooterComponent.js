import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

// logo thanh toán
import vnpayLogo from "../../assets/vnpay.png.png";
import zalopayLogo from "../../assets/zalopay.png.png";
import mocaLogo from "../../assets/moca.png.png";
import kredivoLogo from "../../assets/kredivo.png.png";
import napasLogo from "../../assets/napas.png.png";
import visaLogo from "../../assets/visa.png.png";

// logo vận chuyển
import ghnLogo from "../../assets/ghn.png.png";
import ninjaLogo from "../../assets/ninjavan.png.png";
import ahamoveLogo from "../../assets/ahamove.png.png";
import jtLogo from "../../assets/jt.png.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paymentLogos = [
    { src: vnpayLogo, alt: "VNPAY" },
    { src: zalopayLogo, alt: "ZaloPay" },
    { src: mocaLogo, alt: "Moca" },
    { src: kredivoLogo, alt: "Kredivo" },
    { src: napasLogo, alt: "Napas" },
    { src: visaLogo, alt: "VISA" }
  ];

  const shippingLogos = [
    { src: ghnLogo, alt: "GHN" },
    { src: ninjaLogo, alt: "Ninja Van" },
    { src: ahamoveLogo, alt: "Ahamove" },
    { src: jtLogo, alt: "J&T Express" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Cột 1 */}
        <div className="footer-col">
          <h3 className="footer-title">Thời trang nam T&T</h3>
          <p className="footer-text">
            Hệ thống thời trang cho phái mạnh hàng đầu Việt Nam, hướng tới phong
            cách nam tính, lịch lãm và trẻ trung.
          </p>

          <div className="social">
            <div className="social-item"><FaFacebookF /></div>
            <div className="social-item"><FaTwitter /></div>
            <div className="social-item"><FaInstagram /></div>
            <div className="social-item"><FaTiktok /></div>
            <div className="social-item"><FaYoutube /></div>
          </div>

          <h4 className="footer-subtitle">Phương thức thanh toán</h4>
          <div className="logo-grid">
            {paymentLogos.map((logo, index) => (
              <div className="logo-card" key={index}>
                <img src={logo.src} alt={logo.alt} className="footer-logo-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Cột 2 */}
        <div className="footer-col">
          <h3 className="footer-title">Thông tin liên hệ</h3>
          <p className="footer-text"><strong>Địa chỉ:</strong> 67/7 Đường Tân Chánh Hiệp, Quận 12, TP.HCM</p>
          <p className="footer-text"><strong>Điện thoại:</strong> 0707218413</p>
          <p className="footer-text"><strong>Fax:</strong> 0904636356</p>
          <p className="footer-text"><strong>Email:</strong> t&tfashion@gmail.com</p>

          <h4 className="footer-subtitle footer-subtitle-spacing">
            Phương thức vận chuyển
          </h4>

          <div className="logo-grid">
            {shippingLogos.map((logo, index) => (
              <div className="logo-card" key={index}>
                <img src={logo.src} alt={logo.alt} className="footer-logo-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Cột 3 */}
        <div className="footer-col">
          <h3 className="footer-title">Nhóm liên kết</h3>
          <ul className="footer-list">
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/return-policy">Chính sách đổi trả</a></li>
            <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
            <li><a href="/contact">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div className="footer-col footer-col-last">
          <h3 className="footer-title">Đăng ký nhận tin</h3>
          <p className="footer-text">
            Nhận thông tin sản phẩm mới và ưu đãi hấp dẫn.
          </p>

          <div className="subscribe">
            <div className="subscribe-icon">✉</div>
            <input type="email" placeholder="Nhập email của bạn" />
            <button>ĐĂNG KÝ</button>
          </div>
        </div>

      </div>

      <button className="scroll-top" onClick={scrollToTop}>
        ↑ Về đầu trang
      </button>

      <div className="footer-bottom">
        © 2026 T&T Fashion
      </div>
    </footer>
  );
};

export default Footer;