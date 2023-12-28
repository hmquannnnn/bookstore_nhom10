import React from 'react'
import UsersManagementComponent from '../../components/UsersManagementComponent/UsersManagementComponent'

const UsersManagement = () => {
  return (
    <div>
        <div style={{backgroundColor: '#efefef', display: 'flex', height: '50px'}}>
            <div style={{paddingTop: '10px', paddingLeft: '90px'}}>
                <span style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'inherit'}}>Quản trị viên</span>
            </div>
            <div style={{paddingTop: '14px', paddingLeft: '450px'}}>
                <span>Người dùng</span>
            </div>
            <div style={{paddingTop: '14px', paddingLeft: '100px'}}>
                <span>Sản phẩm</span>
            </div>
            <div style={{paddingTop: '14px', paddingLeft: '100px'}}>
                <span>Đơn hàng</span>
            </div>
            <div style={{paddingTop: '10px', paddingLeft: '100px'}}>
                <button style={{borderRadius: '5px', height: '30px'}}><span style={{fontSize: '15px'}}>Quản lý tài khoản</span></button>
            </div>
        </div>
        <div style={{paddingLeft: '90px'}}>
            <UsersManagementComponent/>
        </div>
    </div>
  )
}

export default UsersManagement