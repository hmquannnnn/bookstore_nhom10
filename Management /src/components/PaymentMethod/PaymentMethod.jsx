import React from 'react'
import { Radio, Image, Row, Col } from 'antd'
import imageViettelMoney from '../../images/viettelmoney1.jpg'
import imageMomo from '../../images/momologo1.jpg'
import imageCod from '../../images/codimage.jpg'
import imageZaloPay from '../../images/zalopay.jpg'
import imageVNPay from '../../images/vnpay.jpg'
import imageVisa from '../../images/visa.jpg'
import imageBanking from '../../images/banking.jpg'
const PaymentMethod = () => {
  return (
    <Row>
        <Col span={14} style={{backgroundColor: '#fff'}}>
            <div style={{paddingTop: '10px'}}>
                <span style={{fontSize: '20px', paddingLeft: '50px'}}>Chọn hình thức thanh toán</span>
            </div>
            <div style={{paddingLeft: '50px', paddingTop: '15px'}}>
                <Radio>
                    <Image src={imageCod} alt="image Cod" preview={false} style={{width: '20px', paddingBottom: '7px'}}></Image>
                    <span style={{paddingLeft: '8px', fontSize: '18px'}}>Thanh toán tiền mặt khi nhận hàng</span>
                </Radio>
            </div>
            <div style={{paddingLeft: '50px', paddingTop: '10px'}}>
                <div style={{paddingRight: '0px'}}>
                    <Radio>
                            <Image src={imageViettelMoney} alt="image ViettelMoney" preview={false} style={{width: '20px', paddingBottom: '5px', paddingLeft: '0px', paddingright: '8px'}}></Image>
                            <span style={{paddingLeft: '8px', fontSize: '18px'}}>Thanh toán bằng ví Viettel Money</span>
                    </Radio>
                </div>
            </div>
            <div style={{paddingLeft: '50px', paddingTop: '10px'}}>
                <Radio>
                    <Image src={imageMomo} alt="image Momo" preview={false} style={{width: '25px', paddingBottom: '2px'}}></Image>
                    <span style={{paddingLeft: '4px', fontSize: '18px'}}>Thanh toán bằng ví Momo</span>
                </Radio>
            </div>
            <div style={{paddingLeft: '50px', paddingTop: '10px'}}>
                <Radio>
                    <Image src={imageZaloPay} alt="image ZaloPay" preview={false} style={{width: '20px', paddingBottom: '4px'}}></Image>
                    <span style={{paddingLeft: '9px', fontSize: '18px'}}>Thanh toán bằng ví ZaloPay</span>
                </Radio>
            </div>
            <div style={{paddingLeft: '50px', display: 'flex', paddingTop: '10px'}}>
                <Radio>
                    <div style={{display: 'flex'}}>
                    <Image src={imageVNPay} alt="image VNPay" preview={false} style={{width: '20px', paddingBottom: '2px', paddingTop: '18px'}}></Image>
                    <div style={{display:'flex', flexDirection: 'column', paddingLeft: '9px'}}>
                        <span style={{paddingBottom: '0px', fontSize: '18px'}}>Thanh toán bằng VNPay</span>
                        <span style={{color: 'rgb(120, 120, 120)', fontSize: '18px'}}>Quét mã QR từ ứng dụng ngân hàng</span>
                    </div>
                    </div>
                </Radio>
            </div>
            <div style={{paddingLeft: '50px', paddingTop: '10px', paddingBottom: '30px'}}>
                <Radio>
                    <div style={{display:'flex'}}>
                    <Image src={imageVisa} alt="image Visa" preview={false} style={{width: '20px', paddingBottom: '2px', paddingTop: '15px'}}></Image>
                    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '9px'}}>
                        <span style={{fontSize: '18px'}}>Thanh toán bằng thẻ quốc tế Visa,Master,JCB</span>
                        <Image src={imageBanking} alt="image Banking" preview={false} style={{width: '90px'}}></Image>
                    </div>
                    </div>
                </Radio>
            </div>
        </Col>
        <Col span={6} style={{backgroundColor: '#efefef', paddingLeft: '20px'}}>
            <div style={{backgroundColor: '#fff', paddingLeft: '10px'}}>
                <div style={{paddingTop: '12px'}}>
                    <span style={{fontSize: '20px'}}>Giao tới</span>
                </div>
                <div style={{paddingTop: '8px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '15px'}}>Tên người nhận: Nguyễn Văn A</span>
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '15px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '15px'}}>Số điện thoại: 0987654321</span>
                </div>
            </div>
            <div style={{backgroundColor: '#efefef', paddingTop: '20px'}}>
                <div style={{backgroundColor: '#fff'}}>
                    <div style={{paddingTop: '10px', paddingLeft: '10px'}}>
                        <span style={{fontSize: '20px'}}>Tổng tiền</span>
                    </div>
                    <div style={{alignContent: 'center', paddingLeft: '78px', paddingTop: '12px'}}>
                        <span style={{color:'rgb(120, 120, 120)', fontSize: '25px'}}>367.600 đ</span>
                    </div>
                    <div style={{paddingLeft:'33px', paddingTop: '18px', paddingBottom: '15px'}}>
                        <button style={{backgroundColor: 'rgb(255, 57, 69)', border: '1px solid rgb(255, 57, 69)', width: '200px', height: '40px', borderRadius: '5px',  cursor: 'pointer'}}><span style={{color: '#fff', fontSize: '20px'}}>Thanh toán</span></button>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
    
  )
}

export default PaymentMethod