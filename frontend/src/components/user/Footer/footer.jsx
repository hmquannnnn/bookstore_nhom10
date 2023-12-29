import { Col, Row } from "antd";
import "./footer.scss";
import { FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
    return (
        <Row className="footer">
            <Row className="content">
                <Col md={10} className="brand-description">
                    <Row className="logo">
                        <img src="\vite.svg" alt="" />
                        <p>Bởi vì sách là thế giới</p>
                    </Row>
                    <p className="description">
                        UEThuviensach là điểm đến lý tưởng dành cho những ai đam mê sách, nơi mang đến cho độc giả
                        trải nghiệm mua sắm sách trực tuyến và độc đáo. Với kho tàng sách đa dạng về số lượng và thể loại,
                        chúng tôi cam kết tạo nên một môi trường đọc sách uy tín, chất lượng hàng đầu cho mọi người.
                    </p>
                </Col>
                <Col className="info" md={7}>
                    <h5>Mạng xã hội</h5>
                    <Row>
                        <FaFacebook className="icon" />
                        <a href="https://www.facebook.com/profile.php?id=61552075941822" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                            <p>Facebook</p>
                        </a>
                    </Row>
                    <Row>
                        <FaInstagram className="icon" />
                        <a href="https://www.instagram.com/uethuviensach/?igshid=NzZlODBkYWE4Ng%3D%3D&fbclid=IwAR2PgwiCyo3fwBW0lBXKFqIhISfRTyC1dSOvaA4nMMZRpU5ecwjmAAfiqfY" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                            <p>Instagram</p>
                        </a>
                    </Row>
                </Col>
                <Col className="info" md={7}>
                    <h5>Thông tin liên hệ</h5>
                    <Row>
                        <FaLocationDot className="icon" />
                        <p>E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
                    </Row>
                    <Row>
                        <IoMdMail className="icon" />
                        <p>uet@vnu.edu.vn</p>
                    </Row>
                    <Row>
                        <FaPhone className="icon" />
                        <p>0987654321</p>
                    </Row>
                </Col>
            </Row >
        </Row >
    );
};

export default Footer;
