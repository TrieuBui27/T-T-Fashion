import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "24px", color: "#6b7280", fontSize: 14 }}>
        <Link to="/" style={{ color: "#6b7280", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <span> &nbsp;/&nbsp; </span>
        <span>Chính sách bảo mật</span>
      </nav>

      {/* Nội dung */}
      <div
        style={{
          background: "#fff",
          padding: "32px 40px",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>
          Chính sách bảo mật
        </h1>

        <div style={{ lineHeight: 1.9, fontSize: 16, paddingLeft: 16 }}>
          <h3 style={sectionTitle}>BẢO MẬT THÔNG TIN KHÁCH HÀNG T&amp;T</h3>

          <h3 style={sectionTitle}>1. Thu thập và sử dụng thông tin của T&amp;T</h3>

          <p>
            T&amp;T chỉ thu thập các loại thông tin cơ bản liên quan đến đơn đặt hàng gồm:……
          </p>

          <p>
            Các thông tin này được sử dụng nhằm mục đích xử lý đơn hàng, nâng cao chất lượng dịch vụ,
            nghiên cứu thị trường, các hoạt động marketing, chăm sóc khách hàng, quản lý nội bộ hoặc
            theo yêu cầu của pháp luật. Khách hàng tùy từng thời điểm có thể chỉnh sửa lại các thông
            tin đã cung cấp để đảm bảo được hưởng đầy đủ các quyền mà T&amp;T dành cho Khách hàng của mình.
          </p>

          <p><strong>T&amp;T cam kết:</strong></p>

          <ul style={listStyle}>
            <li>Thông tin cá nhân của khách hàng được sử dụng đúng mục đích;</li>
            <li>Mọi việc sử dụng thông tin đều thông qua ý kiến khách hàng;</li>
            <li>Chỉ sử dụng thông tin khách hàng đã cung cấp;</li>
          </ul>

          <p><strong>Chỉ cho phép các đối tượng sau tiếp cận thông tin:</strong></p>

          <ul style={listStyle}>
            <li>Người cung cấp hàng hóa, dịch vụ theo yêu cầu khách hàng;</li>
            <li>Nhân viên chăm sóc khách hàng;</li>
            <li>Người xử lý thắc mắc của khách hàng;</li>
            <li>Cơ quan Nhà nước có thẩm quyền;</li>
          </ul>

          <p>
            Khách hàng có thể yêu cầu dừng việc sử dụng thông tin cho quảng cáo bất cứ lúc nào.
          </p>

          <h3 style={sectionTitle}>2. Cách thức bảo mật thông tin khách hàng</h3>

          <p>
            Việc bảo mật thông tin được đảm bảo thông qua hệ thống và nhân sự của T&amp;T. Trong trường
            hợp hệ thống bị tấn công dẫn đến mất dữ liệu, T&amp;T sẽ thông báo cho cơ quan chức năng và
            khách hàng.
          </p>

          <p>
            Tuy nhiên, do đặc thù internet, không có hệ thống nào bảo mật 100%. Vì vậy T&amp;T không cam
            kết tuyệt đối về bảo mật.
          </p>

          <h3 style={sectionTitle}>3. Trách nhiệm bảo mật thông tin khách hàng</h3>

          <p>
            Khách hàng chỉ nên cung cấp thông tin cần thiết và không cung cấp thông tin nhạy cảm nếu
            chưa được bảo mật.
          </p>

          <p>
            Khách hàng tự chịu trách nhiệm về tính chính xác của thông tin đã cung cấp.
          </p>

          <p>
            Nếu thông tin bị lộ do bên thứ ba, khách hàng cần xác định nguồn. T&amp;T không chịu trách
            nhiệm nếu không có bằng chứng rõ ràng.
          </p>

          <p>
            T&amp;T không chịu trách nhiệm nếu khách hàng không tuân thủ các yêu cầu bảo mật.
          </p>

          <h3 style={sectionTitle}>4. Luật áp dụng khi xảy ra tranh chấp</h3>

          <p>
            Mọi tranh chấp sẽ được hòa giải. Nếu không thành sẽ giải quyết tại Tòa án theo pháp luật Việt Nam.
          </p>
        </div>
      </div>
    </div>
  );
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 800,
  margin: "24px 0 12px"
};

const listStyle = {
  paddingLeft: 20,
  lineHeight: 2
};

export default PrivacyPolicy;