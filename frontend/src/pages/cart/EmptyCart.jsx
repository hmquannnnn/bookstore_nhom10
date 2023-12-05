import "./cart.scss"
import {useSelector} from "react-redux";

const EmptyCart = () => {
    return (
        <>
            <div className="empty-cart">
                <img className="cart-image" src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"></img>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <a href="/">
                    <button className="btn-back" type="submit">Tiếp tục mua sắm</button>
                </a>
            </div>
        </>
    )
}

export default EmptyCart;