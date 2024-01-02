import React from 'react'
import { Table, Image } from 'antd';
import imageTamLyHoc from '../../images/tamly.jpg'
import imageTamLyHocBG from '../../images/tamlybg1.jpg'
import './style.css';
const dataSource = [
  {
    key: '1',
    name: '1',
    age: 'Tâm Lý Học Về Tiền',
    address: 'Tác Giả',
    phonenumber: <Image src={imageTamLyHoc} alt="image TamLyHoc" preview={false} style={{height: '150px'}}></Image>,
    imageBG: <Image src={imageTamLyHocBG} alt="image TamLyHoc" preview={false} style={{height: '150px'}}></Image>
  },
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'name',
    key: 'name',
    backgroundColor: '#efefef',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Tác giả',
    dataIndex: 'address',
    key: 'address',
  },
  {  
    title: 'Ảnh mặt trước',
    dataIndex: 'phonenumber',
    key: 'phonenumber',
  },
  {  
    title: 'Ảnh mặt sau',
    dataIndex: 'imageBG',
    key: 'imageBG',
  },
];
const BooksManagementComponent = () => {
  return (
    <div style={{backgroundColor: '#fff'}}>
      <div style={{paddingTop: '50px'}}>
          <span style={{fontSize: '20px', fontWeight: 'bold'}}>Danh sách người dùng</span>
      </div>
      <div style={{paddingRight: '100px', paddingTop: '15px'}}>
          <Table dataSource={dataSource} columns={columns} bordered/> 
      </div>
      <div style={{paddingTop: '10px', paddingBottom: '20px', gap: '15px', display: 'flex'}}>
        <div>
          <button style={{backgroundColor: '#107c41', border: '1px solid #107c41', borderRadius: '5px', height: '30px', width: '190px'}}><span style={{fontSize: '15px', color: '#fff'}}>Xuất file Excel</span></button>
        </div>
        <div>
          <button style={{backgroundColor: '#ffd400', border: '1px solid #ffd400', borderRadius: '5px', height: '30px', width: '190px'}}><span style={{fontSize: '15px', color: 'black'}}>Thêm Sách</span></button>
        </div>
      </div>
    </div>
  )
}

export default BooksManagementComponent