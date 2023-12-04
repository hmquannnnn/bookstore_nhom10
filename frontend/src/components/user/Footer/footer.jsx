import "./footer.scss"
// import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
    return (
        <div className="footer" style={{marginTop: "40px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <a href="/" className="logo">
                            <img src="/vite.svg" alt="nhom11"></img>
                            <p className="slogan">Bởi vì sách là thế giới</p>
                        </a>
                        <a href="https://www.google.com/maps/place/2QQM%2B83,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.038315,105.7814,18z/data=!3m1!4b1!4m5!3m4!1s0x3135ab5756f91033:0x25a23c2769744ae!8m2!3d21.0383125!4d105.7826875?hl=vi-VN&entry=ttu">
                            <i className="fa-solid fa-location-dot"></i>
                            E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội
                        </a>
                        <a href="mailto:minhquanhoang040103@gmail.com">
                            <i className="fa-solid fa-envelope"></i>
                            uet@vnu.edu.vn
                            </a>
                        <a href="tel:+84936014112">
                            <i className="fa-solid fa-phone"></i>
                            0987654321
                        </a>
                    </div>
                    <div className="col-lg-3">
                        <h4>Giới thiệu</h4>
                        <a href="/gioi-thieu">Về chúng tôi</a>
                        <a href="/he-thong-cua-hang">Hệ thống cửa hàng</a>
                    </div>
                    <div className="col-lg-3">
                        <h4>Chính sách</h4>
                        <a href="/chinh-sach-su-dung">Chính sách sử dụng</a>
                        <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                        <a href="/chinh-sach-doi/tra-hang">Chính sách đổi/trả hàng</a>
                    </div>
                    {/* <div className="col-lg-3">
                        <h4>Phương thức thanh toán</h4>
                        <div className="payment">
                            <img src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/payment_method.png?1695376539935"></img>
                        </div>
                    </div> */}
                    <div className="col-lg-3">
                        <h4>mạng xã hội</h4>
                        

                        <a href="https://www.facebook.com/profile.php?id=61552075941822" target="_blank" rel="noopener noreferrer">
                            {/* <i className="fa-brands fa-facebook" style={{ color: "black" }}></i> */}
                            <p>Facebook</p>
                        </a>
                        {/* <a href="https://www.facebook.com/profile.php?id=100010515218862" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'facebook']} style={{ color: "black" }} />
                            <p>Facebook</p>
                        </a> */}


                        <a href="https://www.instagram.com/uethuviensach/?igshid=NzZlODBkYWE4Ng%3D%3D&fbclid=IwAR2PgwiCyo3fwBW0lBXKFqIhISfRTyC1dSOvaA4nMMZRpU5ecwjmAAfiqfY" target="_blank" rel="noopener noreferrer">
                            {/* <i className="fa-brands fa-instagram" style={{ color: "black" }}></i> */}
                            <p>Instagram</p>
                        </a>

                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Footer;

