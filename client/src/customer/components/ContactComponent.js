import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã gửi liên hệ!");
    e.target.reset();
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", color: "#6b7280", fontSize: 14 }}>
        <Link to="/" style={{ color: "#6b7280", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <span> &gt; </span>
        <span>Liên hệ</span>
      </nav>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h1 style={{ marginBottom: "16px" }}>LIÊN HỆ HỖ TRỢ KHÁCH HÀNG</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <div>📞 Số điện thoại: 0707218413</div>
          <div>✉️ Email: T&TFASHION@gmail.com</div>
        </div>

        <hr />

        <div style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "16px" }}>LIÊN HỆ VỚI CHÚNG TÔI</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
            <input type="text" placeholder="Họ Tên*" required style={{ padding: "10px" }} />
            <input type="email" placeholder="Email*" required style={{ padding: "10px" }} />
            <input type="tel" placeholder="Số điện thoại*" required style={{ padding: "10px" }} />
            <textarea placeholder="Nội dung đóng góp*" rows="6" required style={{ padding: "10px" }} />
            <button type="submit" style={{ padding: "10px 16px", cursor: "pointer" }}>
              Gửi liên hệ của bạn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;