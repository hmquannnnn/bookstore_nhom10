import React from 'react'
import Input from 'antd/es/input/Input'

const InputComponent = ({size, placeholder, bordered1, style, ...rests}) => {
  return (
    <Input 
        size={size} 
        placeholder={placeholder} 
        bordered={bordered1} 
        style={style}
        {...rests}
    />
  )
}

export default InputComponent