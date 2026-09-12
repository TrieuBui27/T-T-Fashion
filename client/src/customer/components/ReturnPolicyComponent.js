import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px 40px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "24px", color: "#6b7280", fontSize: 14 }}>
        <Link to="/" style={{ color: "#6b7280", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <span> &nbsp;/&nbsp; </span>
        <span>Chính sách đổi hàng</span>
      </nav>

      {/* Nội dung */}
      <div style={{ background: "#fff", padding: "8px 0" }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginBottom: 28,
            color: "#111827"
          }}
        >
          Chính sách đổi trả
        </h1>

        <div
            style={{
                color: "#222",
                lineHeight: 1.9,
                fontSize: 16,
                paddingLeft: 12   
                   }}
>
          <h3 style={sectionTitle}>1. CHÍNH SÁCH ÁP DỤNG</h3>

          <p>Áp dụng từ ngày 01/09/2018.</p>

          <p>Trong vòng 30 ngày kể từ ngày mua sản phẩm với các sản phẩm T&amp;T.</p>

          <p>Áp dụng đối với sản phẩm nguyên giá và sản phẩm giảm giá ít hơn 50%.</p>

          <p>
            Sản phẩm nguyên giá chỉ được đổi 01 lần duy nhất sang sản phẩm nguyên giá khác và
            không thấp hơn giá trị sản phẩm đã mua.
          </p>

          <p>
            Sản phẩm giảm giá/khuyến mại ít hơn 50% được đổi 01 lần sang màu khác hoặc size khác
            trên cùng 1 mã trong điều kiện còn sản phẩm hoặc theo quy chế chương trình (nếu có).
            Nếu sản phẩm đổi đã hết hàng khi đó KH sẽ được đổi sang sản phẩm khác có giá trị ngang
            bằng hoặc cao hơn. Khách hàng sẽ thanh toán phần tiền chênh lệch nếu sản phẩm đổi có
            giá trị cao hơn sản phẩm đã mua.
          </p>

          <p>
            Chính sách chỉ áp dụng khi sản phẩm còn hóa đơn mua hàng, còn nguyên nhãn mác, thẻ bài
            đính kèm sản phẩm và sản phẩm không bị dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa
            hàng sau khi mua sản phẩm.
          </p>

          <p>Sản phẩm đồ lót và phụ kiện không được đổi trả.</p>

          <h3 style={sectionTitle}>2. ĐIỀU KIỆN ĐỔI SẢN PHẨM</h3>

          <p>Đổi hàng trong vòng 07 ngày kể từ ngày khách hàng nhận được sản phẩm.</p>

          <p>Sản phẩm còn nguyên tem, mác và chưa qua sử dụng.</p>

          <h3 style={sectionTitle}>3. THỰC HIỆN ĐỔI SẢN PHẨM</h3>

          <p>
            Quý khách có thể đổi hàng Online tại hệ thống cửa hàng và đại lý T&amp;T trên toàn quốc.
            Lưu ý: vui lòng mang theo sản phẩm và phiếu giao hàng.
          </p>

          <p>
            Nếu tại khu vực bạn không có cửa hàng T&amp;T hoặc sản phẩm bạn muốn đổi thì vui lòng
            làm theo các bước sau:
          </p>

          <p>
            <strong>Bước 1:</strong> Gọi đến Tổng đài: 0707218413 các ngày trong tuần (trừ ngày lễ),
            cung cấp mã đơn hàng và mã sản phẩm cần đổi.
          </p>

          <p>
            <strong>Bước 2:</strong> Vui lòng gửi hàng đổi về địa chỉ: Kho Online T&amp;T - 67/7 Đường Tân Chánh Hiệp, Quận 12, TP.HCM.
          </p>

          <p>
            <strong>Bước 3:</strong> T&amp;T gửi đổi sản phẩm mới khi nhận được hàng. Trong trường
            hợp hết hàng, T&amp;T sẽ liên hệ xác nhận.
          </p>
        </div>
      </div>
    </div>
  );
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 800,
  margin: "0 0 12px",
  color: "#111827"
};

export default ReturnPolicy;