import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", color: "#6b7280", fontSize: 14 }}>
        <Link to="/" style={{ color: "#6b7280" }}>Trang chủ</Link>
        <span> &gt; </span>
        <span>Giới thiệu</span>
      </nav>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b, #334155)",
        borderRadius: 16,
        padding: "48px 40px",
        color: "#fff",
        marginBottom: 32,
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>T&T FASHION</h1>
        <p style={{ fontSize: 18, color: "#cbd5e1", maxWidth: 600, margin: "0 auto" }}>
          Thời trang cho chính bạn - Phong cách tạo nên bản lĩnh
        </p>
      </div>

      {/* Nội dung */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>🏪 Về chúng tôi</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
            T&T Fashion được thành lập với sứ mệnh mang đến những sản phẩm thời trang nam
            chất lượng cao, giá cả hợp lý cho mọi người. Chúng tôi tin rằng mỗi người
            đều xứng đáng được mặc đẹp mỗi ngày.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>🎯 Tầm nhìn</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
            Trở thành thương hiệu thời trang nam được yêu thích nhất Việt Nam,
            với cam kết mang lại trải nghiệm mua sắm tuyệt vời và sản phẩm
            đạt chuẩn chất lượng quốc tế.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>💎 Giá trị cốt lõi</h2>
          <ul style={{ color: "#4b5563", lineHeight: 2, paddingLeft: 20 }}>
            <li>Chất lượng sản phẩm hàng đầu</li>
            <li>Giá cả minh bạch, hợp lý</li>
            <li>Dịch vụ khách hàng tận tâm</li>
            <li>Đổi trả dễ dàng, nhanh chóng</li>
          </ul>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>📞 Liên hệ</h2>
          <ul style={{ color: "#4b5563", lineHeight: 2, listStyle: "none", padding: 0 }}>
            <li>📞 0707218413</li>
            <li>✉️ ttfashion@gmail.com</li>
            <li>🕐 8:00 - 22:00 mỗi ngày</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <Link to="/" style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          padding: "12px 32px",
          borderRadius: 999,
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 16
        }}>
          Khám phá sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default About;