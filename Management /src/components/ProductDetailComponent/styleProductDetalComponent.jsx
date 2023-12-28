import styled from "styled-components";
import { Image, InputNumber } from "antd";

export const WrapperStyleImageSmall = styled(Image)`
    height: 200px;
    width: 100px;
`
export const WrapperStyleImageChinhhang = styled(Image) `
    height: 50px;
    width: 50px;
`
export const WrapperPriceTextProduct = styled.span`
    font-weight: 500px;
`
export const WrapperPerCent = styled.span`
    width: 100px;
    height: 100px;
`
export const WrapperQuantityProduct = styled.div`

`
export const WrapperInputNumber = styled(InputNumber)`
    .ant-input-number.ant-input-number-sm {
        width: 40px;
    }
`