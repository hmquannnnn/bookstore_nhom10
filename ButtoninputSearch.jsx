import React from 'react'
//import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtoninputSearch = (props) => {
  const { size, placeholder, textButton, bordered1, backgroundColorInput='#fff', backgroundColorButton='#fff', colorButton='rgb(26, 148, 255)' } = props
  return (
    <div style={{display: 'flex', backgroundColor: '#fff'}}>
        <InputComponent 
          size={size} 
          placeholder={placeholder} 
          bordered={bordered1} 
          style={{backgroundColor: backgroundColorInput}}
        />
        <ButtonComponent 
          size= {size} 
          //bordered={bordered1} 
          styleButton={{backgroundColor: backgroundColorButton, border:'none'}} 
          icon={<SearchOutlined color={colorButton} style={{color: 'rgb(26, 148, 255)'}}/>}
          textButton={textButton}
          styleTextButton={{color: colorButton}}
        />
    </div>
  )
}

export default ButtoninputSearch