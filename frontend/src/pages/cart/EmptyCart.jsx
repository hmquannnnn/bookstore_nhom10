import { Link } from "react-router-dom";
import "./DefaultCart/cart.scss"
import { useSelector } from "react-redux";
import path from "../../routes/path";

const EmptyCart = () => {
    return (
        <>
            <div className="empty-cart">
                <img className="cart-image" src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"></img>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <Link to={path.home}>
                    <button className="btn-back" type="submit">Tiếp tục mua sắm</button>
                </Link>
            </div>
        </>
    )
}

export default EmptyCart;