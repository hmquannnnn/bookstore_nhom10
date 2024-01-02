import styled from "styled-components";
import Card from "antd/es/card/Card";
export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`
export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137); 
    display: flex;
    align-items: center;
`
export const WrapperPriceText = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
`
export const WrapperDiscountText = styled.span`
    color: black;
    font-size: 10px;
    font-weight: 400;
    margin-left: 5px;
    margin-bottom: 100px;
`
export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }

`