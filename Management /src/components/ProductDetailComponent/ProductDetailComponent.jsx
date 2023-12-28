import React, { useState } from 'react'
import { Row, Col, Image, Button } from 'antd'
import imageProduct from '../../images/tamly.jpg'
import imageSmall from '../../images/tamlybg1.jpg'
import imagebeside from '../../images/tamly5.jpg'
import chinhang from '../../images/chinhhang.jpg'
import { WrapperStyleImageSmall, WrapperStyleImageChinhhang, WrapperPriceTextProduct, WrapperPerCent, WrapperQuantityProduct } from './styleProductDetalComponent'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'

const ButtonGroup = Button.Group;
const ProductDetailComponent = () => {
    const [count, setCount] = useState(5);
    //const [show, setShow] = useState(true);

    const increase = () => {
        setCount(count + 1);
    };

    const decline = () => {
        let newCount = count - 1;
        if (newCount < 0) {
        newCount = 0;
        }
        setCount(newCount);
    };

    const random = () => {
        const newCount = Math.floor(Math.random() * 100);
        setCount(newCount);
    };

  return (
    <Row style={{paddingTop: '5px'}}>
        <Col span={9} style={{backgroundColor: '#fff', padding: '16px', width: '800px', height: '527.9px', display: 'inline-block'}}>
        <div style={{marginRight: '100px'}}>
            <Image src = {imageProduct} alt ="image product" preview = {false} style={{width: '550px', height: '380px', paddingRight: '172px', justifyItems: 'center'}}></Image>
        </div>
            <Row style={{paddingTop: '50px', gap: '20px'}}>
                <Col span={4}>
                    <WrapperStyleImageSmall src={imageProduct} alt ="image product" preview = {false} style={{alignContent: 'center', height: '70px', width: '70px'}}></WrapperStyleImageSmall>
                </Col>
                <Col span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt ="image small" preview = {false} style={{height: '70px', width: '70px'}}></WrapperStyleImageSmall>
                </Col>
                <Col span={4}>
                    <WrapperStyleImageSmall src={imagebeside} alt ="image beside" preview = {false} style={{height: '70px', width: '70px'}}></WrapperStyleImageSmall>
                </Col>
            </Row>
        </Col>
        <Col span={14} style={{display: 'inline-block', backgroundColor: '#efefef'}}>
            <div style={{backgroundColor: '#fff', marginLeft: '20px', width: '520px'}}>
                <div style={{display: 'flex'}}>
                    <WrapperStyleImageChinhhang src={chinhang} alt="image chinhhang" preview={false} style={{width: '120px', paddingTop: '10px', paddingLeft: '10px', gap: '10px'}}>
                    </WrapperStyleImageChinhhang>
                    <span style={{ fontSize: '20px', marginLeft: '10px', paddingTop: '8px'}}>Tác giả:</span>
                    <span style={{color: 'rgb(26, 148, 255)', marginLeft: '5px', marginTop: '8px', fontSize: '20px'}}>Morgan Housel</span>
                </div>
                <p style={{fontSize: '30px', fontWeight: '200px', marginTop: '10px', marginLeft: '10px', marginBottom: '15px'}}>Tâm Lý Học Về Tiền</p>
                <div>   
                    <span style={{fontWeight: '500px', fontSize: '20px', marginLeft: '10px'}}>4.8</span>
                    <StarFilled style={{fontSize:'20px', color:'orange', marginLeft: '8px' }}/>
                    <StarFilled style={{fontSize:'20px', color:'orange' }}/>
                    <StarFilled style={{fontSize:'20px', color:'orange' }}/>
                    <StarFilled style={{fontSize:'20px', color:'orange' }}/>
                    <StarFilled style={{fontSize:'20px', color:'orange' }}/>
                    <span style={{fontSize: '20px', color: 'rgb(120, 120, 120)', marginLeft: '10px'}}>(3470) | Đã bán 5000+</span>
                </div>
                <div style={{marginTop: '15px', paddingLeft: '10px', fontWeight: '500px', paddingBottom: '30px'}}>
                    <WrapperPriceTextProduct style={{fontSize: '35px', fontWeight: '500', marginBottom: '50px'}}>117.600<sup>đ</sup></WrapperPriceTextProduct>
                    <WrapperPerCent style={{backgroundColor: '#efefef', borderRadius:'25px', alignItems: 'center', padding: '0 6px', marginLeft: '10px'}}>-34%</WrapperPerCent>
                </div>
            </div>
        <div style={{backgroundColor: '#efefef', paddingTop: '20px', paddingLeft: '20px'}}>
            <WrapperQuantityProduct style={{backgroundColor: '#fff', paddingLeft: '10px', width: '510px'}}>
                <span style={{fontWeight: 'bold', fontSize: '20px', marginTop: '10px'}}>Số Lượng</span>
                <div style={{paddingTop: '10px'}}>
                        <ButtonGroup style={{display: 'flex'}}>
                            <div>
                            <Button onClick={decline} icon={<MinusOutlined />} />
                            </div>
                            <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
                            {/*<Button onClick={random}/>*/}
                            <input type="text"  pattern='[0-9]*' style={{width: '28px', border: '1px solid #d9d9d9', height: '29px', borderRadius: '5px', outline: 'none'}}></input>
                            </div>
                            <div>
                            <Button onClick={increase} icon={<PlusOutlined />} style={{}}/>
                            </div>
                        </ButtonGroup>
                </div>
                <div style={{paddingTop: '10px'}}>
                    <span style={{fontWeight: 'bold', fontSize: '20px'}}>Tạm tính</span>
                </div>
                <div style={{paddingTop: '10px'}}>
                    <span style={{fontWeight: 'bold', fontSize: '30px'}}>117.600<sup>đ</sup></span>
                </div>
                <div style={{paddingTop: '25px'}}>
                    <a href='http://localhost:3000/cart'><button style={{backgroundColor: 'rgb(255, 57, 69)', borderRadius: '5px', width: '500px', height: '40px', offset: '0px', border: '1px solid rgb(255, 57, 69)', cursor: 'pointer'}}><span style={{fontSize: '20px', color: '#fff', fontWeight: '50px'}}>Mua ngay</span></button></a>
                </div>
                <div style={{paddingTop:'10px', paddingBottom: '10px'}}>
                    <a href='http://localhost:3000/cart'><button style={{backgroundColor: '#fff', borderRadius: '5px', width: '500px', height: '40px', border: '1px solid rgb(26, 148, 255)'}}><span style={{fontSize: '20px', color: 'rgb(26, 148, 255)'}}>Thêm vào giỏ</span></button></a>    
                </div>
            </WrapperQuantityProduct>
        </div>
        </Col>
        
    </Row>
  )
}

export default ProductDetailComponent