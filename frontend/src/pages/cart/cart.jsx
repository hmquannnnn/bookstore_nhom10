import "./cart.scss"

const Cart = () => {
    return (
        <>
            <div className="cart-page">
                <div className="page-title">
                    <h4>GIỎ HÀNG</h4>
                </div>
                
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