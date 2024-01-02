import { Col, Row, Image } from 'antd'
import React from 'react'
import imageFaceBookIconFooter from '../../images/footerfacebookicon.jpg'
import imageInstagramIcon from '../../images/instagramicon.jpg'
import imageTwitterIcon from '../../images/twittericon.jpg'
import imageCopyRight from '../../images/copyrighticon.jpg'
const FooterComponent = () => {
  return (
    <Row style={{backgroundColor: '#fff', height: '170px'}}>
      <Col span={7}>
        <div style={{paddingTop: '45px', paddingLeft: '20px'}}>
          <span style={{fontSize: '17px'}}>Trụ sở chính: </span>
        </div>
        <div style={{paddingTop: '10px', paddingLeft: '20px'}}>
          <span style={{fontSize: '17px'}}>144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</span>
        </div>
      </Col>
      <Col span={6}>
        <div style={{paddingTop: '45px'}}>
          <span style={{fontSize: '17px'}}>Thông tin liên lạc</span>
        </div>
        <div style={{paddingTop: '10px'}}>
          <span style={{fontSize: '17px'}}>SĐT: +0964678910</span>
        </div>
        <div>
          <span style={{fontSize: '17px'}}>Email: emailcloneX@gmail.com</span>
        </div>
      </Col>
      <Col span={5}>
        <div style={{paddingTop: '45px'}}> 
          <span style={{fontSize: '17px'}}>Mạng xã hội</span>
        </div>
        <div style={{paddingTop: '10px'}}>
        <a href='https://www.instagram.com/uethuviensach/'><Image src={imageInstagramIcon} alt="image FooterFaceBookIcon" preview={false} style={{width: '35px'}}></Image></a>
          <a href='https://www.facebook.com/profile.php?id=61552075941822'><Image src={imageFaceBookIconFooter} alt="image FooterFaceBookIcon" preview={false} style={{width: '45px', paddingLeft: '10px'}}></Image></a>
          <Image src={imageTwitterIcon} alt="image FooterFaceBookIcon" preview={false} style={{width: '45px', paddingLeft: '10px'}}></Image>
        </div>
      </Col>
      <Col span={5}>
        <div style={{paddingTop:'72px'}}>
          <span style={{fontSize: '17px'}}><Image src={imageCopyRight} alt="image FooterFaceBookIcon" preview={false} style={{width: '20px', paddingRight: '5px', paddingBottom: '2px'}}></Image>Coypright UEThuVienSach.</span>
        </div>
        <div>
          <span style={{fontSize: '17px'}}>All Right Reserved Designed by Nhom 10</span>
        </div>
      </Col>
    </Row>
  )
}

export default FooterComponent