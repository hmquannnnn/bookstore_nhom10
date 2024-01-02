import React from 'react'
import { Input } from 'antd'
import { ShakeOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
const UserProfileComponent = () => {
    const onChange: DatePickerProps['onChange'] = () => {
        
      };
      
  return (
    <div style={{backgroundColor: '#fff', display: 'flex', paddingBottom: '50px', width: '1000px'}}>
        <div style={{paddingTop: '20px', width: '500px'}}>
            <div style={{border: 'solid', borderColor: 'rgb(120, 120, 120)', borderTop: 'none', borderBottom:'none', borderLeft: 'none', borderRightWidth: 'thin', height: '350px'}}>
                <div style={{paddingLeft: '25px', paddingRight: '10px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Thông tin cá nhân</span>
                </div>
                <div style={{paddingLeft: '25px', paddingTop: '15px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Tên tài khoản</span>
                    <Input placeholder="Thêm tên tài khoản"  style={{width: '300px', marginLeft: '15px'}}/>
                </div>
                <div style={{paddingLeft: '25px', paddingTop: '15px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Ngày sinh</span>
                    <DatePicker onChange={onChange} picker = "Ngày" style={{width: '100px', marginLeft: '44px'}} ><span>Ngay</span></DatePicker>
                    <DatePicker onChange={onChange} picker="Tháng" style={{width: '100px'}}/>
                    <DatePicker onChange={onChange} picker="Năm" style={{width: '100px'}}/>
                </div>
                <div style={{paddingTop: '151px', paddingLeft: '150px'}}>
                    <button style={{backgroundColor: 'rgb(10, 104, 255)', border: '1px solid rgb(10, 104, 255)', width: '150px', height: '35px', borderRadius: '5px'}}><span style={{color: '#fff'}}>Lưu thay đổi</span></button>
                </div>
            </div>
        </div>
        <div style={{paddingLeft: '40px', paddingTop: '15px'}}>
            <div style={{border: 'solid', borderColor: 'rgb(120, 120, 120)', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomWidth: 'thin', height: '210px'}}>
                <div style={{paddingBottom: '10px'}}>
                <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Email và số điện thoại</span>
                <div style={{paddingTop: '15px'}}>
                    <span><ShakeOutlined style={{color: 'rgb(120, 120, 120)'}}/></span>
                    <span style={{color: 'rgb(120, 120, 120)', marginLeft: '10px', fontSize: '20px'}}>Số điện thoại</span>
                    <span style={{paddingTop: '100px'}}>
                        <button style={{color: 'rgb(26, 148, 255)', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid rgb(26, 148, 255)', marginLeft: '150px', width: '150px', height: '35px'}}>Cập nhật</button>
                    </span>
                </div>
                <div style={{paddingLeft: '26px'}}>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>0987654321</span>
                </div>
                <div style={{paddingTop: '30px'}}>
                    <span ><MailOutlined style={{color: 'rgb(120, 120, 120)'}}/></span>
                    <span style={{color: 'rgb(120, 120, 120)', marginLeft: '10px', fontSize: '20px'}}>Email</span>
                    <button style={{color: 'rgb(26, 148, 255)', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid rgb(26, 148, 255)', marginLeft: '219px', width: '150px', height: '35px'}}>Cập nhật</button>
                </div>
                <div style={{paddingLeft: '27px'}}>
                        <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>youremail@gmail.com</span>
                </div>
                </div>
            </div>
            <div style={{paddingTop: '30px'}}>
                <div>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px'}}>Bảo mật</span>
                </div>
                <div style={{paddingTop: '10px'}}>
                    <LockOutlined style={{color: 'rgb(120, 120, 120)'}}/>
                    <span style={{color: 'rgb(120, 120, 120)', fontSize: '20px', marginLeft: '10px'}}>Đổi mật khẩu</span>
                    <button style={{color: 'rgb(26, 148, 255)', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid rgb(26, 148, 255)', marginLeft: '147px', width: '150px', height: '35px'}}>Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfileComponent