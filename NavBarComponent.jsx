import React from 'react'
import { Checkbox, Rate } from 'antd'
import { WrapperBelowText, WrapperContent, WrapperLabelText } from './styleNav'

const NavBarComponent = () => {
  const onChange = () => {

  }
  const RenderContent = (type, options) => {
    switch(type) {
      case 'checkbox':
          return (
            <Checkbox.Group style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '5px' }} onChange={onChange}>
                {options.map((option) => {
                  return (
                    <Checkbox style={{marginLeft: 0}} value={option.value}>{option.label}</Checkbox>           
                  )
                })}
          </Checkbox.Group>
          )
      case 'star': 
                return options.map((option) => {
                  return (
                    <div style={{display: 'flex'}}>
                      <Rate style={{fontSize: '10px', marginLeft: 0, marginTop: '10px', marginLeft: '5px'}} disabled defaultValue={option} />          
                      <div style={{paddingLeft: '7px'}}>
                      <span style={{fontSize: '17px'}}> {`từ ${option} sao`}</span>
                      </div>
                    </div>
                    
                  )
                })
      case 'price': 
                return options.map((option) => {
                  return (
                    <div style={{padding: '4px', color: 'rgb(56, 56, 61)', borderRadius: '10px', backgroundColor: 'rgb(238, 238, 238)', width: 'fit-content', marginLeft: '5px'}}>{option}</div>
                  )
                }) 
      default: 
        return {}
    }
  }
  return (
    <div style={{backgroundColor: '#efefef',  paddingTop: '22px'}}>
        <div>
        <WrapperContent style={{backgroundColor: '#fff', width: '280px'}}>
          <div>
          <div style={{width: '22px', backgroundColor:'#efefef'}}></div>
            <WrapperLabelText style={{marginLeft: '20px', width: 'fit-content', backgroundColor: '#fff', paddingTop: '10px'}}>Bộ lọc tìm kiếm</WrapperLabelText>
          </div>
          <div><WrapperBelowText style={{marginLeft: '20px'}}>Thể loại</WrapperBelowText></div>
          <div style={{border: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomWidth: 'thin', height: '250px', color: '#ddd', width: '250px', marginLeft: '15px'}}>
            {RenderContent('checkbox', [
              {value: 'a', label: 'Văn học hiện đại'},
              {value: 'b', label: 'Văn học kinh điển'},
              {value: 'c', label: 'Kinh dị'},
              {value: 'd', label: 'Lãng mạn'},
              {value: 'e', label: 'Văn học thiếu nhi'},
              {value: 'f', label: 'Kinh doanh'},
              {value: 'g', label: 'Nghệ thuật'},
              {value: 'h', label: 'Khác'},
            ])}
          </div>
        </WrapperContent>
        <div style={{ border: '1px solid #ddd', borderLeft: 'none', borderTop: 'none', borderRight: 'none', height: '320px'}}>
        <WrapperContent style={{backgroundColor: '#fff'}}>
        <div style={{border: '1px solid #ddd', height: '315px', borderTop: 'none', borderRight: 'none', borderLeft: 'none', width: '248px', marginLeft: '15px'}}>
            <div style={{}}>
            <WrapperBelowText style={{marginTop: '15px', marginLeft: '5px'}}>Giá</WrapperBelowText>
            <div style={{paddingTop: '10px'}}>
            {RenderContent('price', ['Dưới 80.000', '80.000 - 120.000', '120.000 - 280.000', 'Trên 280.000'])}
            </div>
            </div>
            <div style={{ paddingTop: '15px', paddingLeft: '3px'}}>
              <span>Khoảng giá</span>
            </div>
            <div style={{gap: '15px', display: 'flex', paddingLeft: '3px'}}>
              <div style={{paddingTop: '5px'}}>
                <input type="text" pattern='[0-9]*' style={{width: '65px', height: '25px', borderRadius: '5px', border: '1.5px solid black'}}></input>
              </div>
              <div style={{paddingLeft: '27px', paddingRight: '29px', paddingTop: '5px'}}>
                <span>      -     </span>
              </div>
              <div style={{paddingTop: '5px'}}>
                <input pattern='[0-9]*' style={{width: '65px', height: '25px', borderRadius: '5px', border: '1.5px solid black'}}></input>
              </div>
            </div>
            <div style={{paddingTop: '15px', paddingLeft: '3px'}}>
              <button style={{width: '235px', height: '35px', color:'rgb(11, 116, 229)', backgroundColor: '#fff', border: '1px solid rgb(11, 116, 229)', borderRadius: '3px', cursor: 'pointer'}}><span>Áp dụng</span></button>
            </div>
        </div>
        </WrapperContent>
          <WrapperContent style={{backgroundColor: '#fff', width: '280px', height: '180px'}}>
            <div style={{paddingLeft: '18px'}}><WrapperBelowText style={{marginTop: '15px'}}>Đánh giá</WrapperBelowText></div>
            <div style={{paddingLeft: '14px', paddingTop: '15px'}}>
              {RenderContent('star', [3, 4, 5])}
            </div>
          </WrapperContent>
        </div>
      </div>
    </div>
  )
}

export default NavBarComponent