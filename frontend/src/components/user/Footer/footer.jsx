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
                        <p>Facebook</p>
                    </Row>
                    <Row>
                        <FaInstagram className="icon" />
                        <p>Instagram</p>
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
            </Row>
        </Row>
    );
};

export default Footer;
