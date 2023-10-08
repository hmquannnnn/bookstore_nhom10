import "./cart.scss"

const Cart = () => {
    return (
        <>
            <div className="cart-page">
                <h2>GIỎ HÀNG</h2>
                <main className="main">
                    
                    <div className="container">
                        
                        <div className="empty-cart">
                            <img className="cart-image" src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"></img>
                            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                            <a href="/">
                                <button className="btn-back" type="submit">Tiếp tục mua sắm</button>
                            </a>
                            
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Cart;