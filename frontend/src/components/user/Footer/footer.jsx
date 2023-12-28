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
                        <img src="public\vite.svg" alt="" />
                        <p>Bởi vì sách là thế giới</p>
                    </Row>
                    <p className="description">
                        UEThuviensach là điểm đến lý tưởng cho những đam mê sách, nơi mang đến cho độc giả
                        trải nghiệm mua sắm sách trực tuyến độc đáo. Với bộ sưu tập đa dạng và chất lượng,
                        chúng tôi cam kết tạo ra môi trường đọc sách phong phú và thuận tiện cho mọi người.
                    </p>
                </Col>
                <Col className="info" md={7}>
                    <h5>Mạng xã hội</h5>
                    <Row>
                        <FaFacebook className="icon" />
                        <a href="https://www.facebook.com/profile.php?id=61552075941822" target="_blank" rel="noopener noreferrer">
                            <p>Facebook</p>
                        </a>
                    </Row>
                    <Row>
                        <FaInstagram className="icon" />
                        <a href="https://www.instagram.com/uethuviensach/?igshid=NzZlODBkYWE4Ng%3D%3D&fbclid=IwAR2PgwiCyo3fwBW0lBXKFqIhISfRTyC1dSOvaA4nMMZRpU5ecwjmAAfiqfY" target="_blank" rel="noopener noreferrer">
                            <p>Instagram</p>
                        </a>
                    </Row>
                </Col>
                <Col className="info" md={7}>
                    <h5>Thông tin liên hệ</h5>
                    <Row>
                        <FaLocationDot className="icon" />
                        <a href="https://www.google.com/maps/place/2QQM%2B83,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.038315,105.7814,18z/data=!3m1!4b1!4m5!3m4!1s0x3135ab5756f91033:0x25a23c2769744ae!8m2!3d21.0383125!4d105.7826875?hl=vi-VN&entry=ttu">
                            <p>E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
                        </a>
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
            </Row>
        </Row>
    );
};

export default Footer;
