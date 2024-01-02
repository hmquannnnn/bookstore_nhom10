import React from 'react'
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import ButtoninputSearch from '../ButtoninputSearch/ButtoninputSearch';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="http://localhost:3000/sign-in">
          Đăng nhập
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="http://localhost:3000/sign-up">
          Đăng ký
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" href="http://localhost:3000/user-profile">
          Tài khoản
        </a>
      ),
    },
  ];
const HeaderComponent = () => {
  return (
    <div>
      
        <WrapperHeader style={{paddingLeft: '125px'}}>
          <Col span={4}>
            <a href='http://localhost:3000/'><WrapperTextHeader>UETHUVIENSACH</WrapperTextHeader></a>
          </Col>
          <Col span={12}>
          <ButtoninputSearch size="large" placeholder="Bạn đọc gì hôm nay" textButton="Tìm kiếm"  style={{borderColor: 'rgb(120, 120, 120)'}}/>
          </Col>
          <Col span={8} style={{display: 'flex', gap: '25px', float: 'right', alignItems: 'center'}}>
            <WrapperHeaderAccount>
            <a href='http://localhost:3000/'><HomeOutlined style={{fontSize: '25px', marginLeft: '15px'}}/></a>
              <div>
              <a href='http://localhost:3000/'><WrapperTextHeaderSmall >Trang chủ</WrapperTextHeaderSmall></a>
              </div>
            </WrapperHeaderAccount>
            <WrapperHeaderAccount>
            <Badge count={1} size='small'>
            <a href='http://localhost:3000/cart'><ShoppingCartOutlined style={{fontSize: '27px', color: 'rgb(26, 148, 255)'}}/></a>
            </Badge>
              <div>
                <a href='http://localhost:3000/cart'><WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall></a>
              </div>
              <div style={{width: '100px', paddingLeft: '30px'}}>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button>Quản lý tài khoản</Button>
                </Dropdown>
              </div>
            </WrapperHeaderAccount>
          </Col>
        </WrapperHeader>
    </div>
  )
}

export default HeaderComponent