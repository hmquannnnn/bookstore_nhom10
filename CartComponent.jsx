import { Checkbox, Col, Row, Image, Button } from 'antd'
import React, { useState } from 'react'
import imageTamLy from '../../images/tamly.jpg'
import { PlusOutlined, MinusOutlined, DeleteFilled } from '@ant-design/icons'

const ButtonGroup = Button.Group;
const CartComponent = () => {
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
    <Row>
        <Col span={17} style={{backgroundColor: '#efefef'}}>
            <div style={{backgroundColor: '#fff', display: 'flex'}}>
                <Checkbox style={{paddingLeft: '15px'}}></Checkbox>
                <Image src={imageTamLy} alt="image Tamly" preview={false} style={{width: '100px', paddingTop: '12px', paddingBottom: '12px'}}></Image>
                <div style={{paddingTop: '6px', paddingLeft: '10px'}}>
                    <span style={{fontSize: '20px', color: 'rgb(120, 120, 120)'}}>Tâm lý học về tiền</span>
                </div>
                <div style={{paddingLeft: '100px', paddingTop: '45px'}}>
                    <span style={{fontSize: '20px'}}>117.600 đ</span>
                </div>
                <div  style={{paddingLeft: '50px', paddingTop: '45px'}}>
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
                <div style={{paddingLeft: '80px', paddingTop: '45px'}}>
                    <span style={{fontSize: '20px', color: 'rgb(255, 57, 69)'}}>117.600 đ</span>
                </div>
                <div style={{paddingLeft: '30px', paddingTop: '50px'}}>
                    <DeleteFilled style={{width: '50px',  cursor: 'pointer'}}/>
                </div>
            </div>
            <div style={{backgroundColor: '#efefef', paddingTop: '20px'}}>
                <div style={{backgroundColor: '#fff', display: 'flex'}}>
                    <Checkbox style={{paddingLeft: '15px'}}></Checkbox>
                    <Image src={imageTamLy} alt="image Tamly" preview={false} style={{width: '100px', paddingTop: '12px', paddingBottom: '12px'}}></Image>
                    <div style={{paddingTop: '6px', paddingLeft: '10px'}}>
                        <span style={{fontSize: '20px', color: 'rgb(120, 120, 120)'}}>Tâm lý học về tiền</span>
                    </div>
                    <div style={{paddingLeft: '100px', paddingTop: '45px'}}>
                        <span style={{fontSize: '20px'}}>117.600 đ</span>
                    </div>
                    <div  style={{paddingLeft: '50px', paddingTop: '45px'}}>
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
                    <div style={{paddingLeft: '80px', paddingTop: '45px'}}>
                        <span style={{fontSize: '20px', color: 'rgb(255, 57, 69)'}}>117.600 đ</span>
                    </div>
                    <div style={{paddingLeft: '30px', paddingTop: '50px'}}>
                        <DeleteFilled style={{width: '50px',  cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: '#efefef', paddingTop: '20px'}}>
                <div style={{backgroundColor: '#fff', display: 'flex'}}>
                    <Checkbox style={{paddingLeft: '15px'}}></Checkbox>
                    <Image src={imageTamLy} alt="image Tamly" preview={false} style={{width: '100px', paddingTop: '12px', paddingBottom: '12px'}}></Image>
                    <div style={{paddingTop: '6px', paddingLeft: '10px'}}>
                        <span style={{fontSize: '20px', color: 'rgb(120, 120, 120)'}}>Tâm lý học về tiền</span>
                    </div>
                    <div style={{paddingLeft: '100px', paddingTop: '45px'}}>
                        <span style={{fontSize: '20px'}}>117.600 đ</span>
                    </div>
                    <div  style={{paddingLeft: '50px', paddingTop: '45px', display: 'flex'}}>
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
                    <div style={{paddingLeft: '80px', paddingTop: '45px'}}>
                        <span style={{fontSize: '20px', color: 'rgb(255, 57, 69)'}}>117.600 đ</span>
                    </div>
                    <div style={{paddingLeft: '30px', paddingTop: '50px'}}>
                        <DeleteFilled style={{width: '50px', cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
        </Col>
        <Col span={6} style={{backgroundColor: '#efefef', paddingLeft: '20px'}}>
            <div style={{backgroundColor: '#fff',paddingLeft: '10px', paddingTop: '10px'}}>
                <div style={{}}>
                    <span style={{fontSize: '20px'}}>Giao tới</span>
                </div>
                <div style={{paddingTop: '10px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Tên người nhận: Nguyễn Văn A</span>
                </div>
                <div style={{paddingTop: '10px', paddingBottom:'35px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Số điện thoại: 0987654321</span>
                </div>
            </div>
            <div style={{backgroundColor: '#efefef', paddingTop: '20px'}}>
                <div style={{backgroundColor: '#fff'}}>
                    <div style={{paddingTop: '10px', paddingLeft: '10px'}}>
                        <span style={{fontSize: '20px'}}>Tổng tiền</span>
                    </div>
                    <div style={{alignContent: 'center', paddingLeft: '95px', paddingTop: '12px'}}>
                        <span style={{color:'rgb(120, 120, 120)', fontSize: '25px'}}>367.600 đ</span>
                    </div>
                    <div style={{paddingLeft:'42px', paddingTop: '18px', paddingBottom: '15px'}}>
                        <a href='http://localhost:3000/payment-method'><button style={{backgroundColor: 'rgb(255, 57, 69)', border: '1px solid rgb(255, 57, 69)', width: '220px', height: '40px', borderRadius: '5px', cursor: 'pointer'}}><span style={{color: '#fff', fontSize: '20px'}}>Mua hàng (3)</span></button></a>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
  )
}

export default CartComponent