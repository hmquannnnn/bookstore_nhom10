import React from 'react'
import { WrapperBody, WrapperTextBody, WrapperTextBodyBelow } from './styleBody'
import { Col } from 'antd'

const BodyComponent = () => {

return (
  <div style={{float: 'left'}}>
      <WrapperBody style={{width: '280px'}}>
          <Col span={30}>
              <WrapperTextBody style={{textAlign: 'left'}}>Bộ lọc tìm kiếm</WrapperTextBody><br/>
              <WrapperTextBodyBelow style={{textAlign: 'left'}}>Thể loại</WrapperTextBodyBelow>
          </Col>
          <Col span={20}></Col>
      </WrapperBody>
  </div>
)
}
export default BodyComponent