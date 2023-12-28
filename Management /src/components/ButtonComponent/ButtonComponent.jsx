import React from 'react'
import { Button } from 'antd'
const ButtonComponent = ({size, styleButton, styleTextButton, textButton, ...rest}) => {
  return (
    <Button 
          size= {size} 
          //bordered={bordered1} 
          style={styleButton}
          //style={{backgroundColor: backgroundColorButton, border:'none'}} 
          {...rest}
    ><span  style={styleTextButton} >{textButton}</span>
    </Button>
  )
}

export default ButtonComponent