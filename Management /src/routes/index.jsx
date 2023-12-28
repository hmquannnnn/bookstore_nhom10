import HomePage from '../pages/HomePage/HomePage';
import ProductsPage  from '../pages/ProductsPage/ProductsPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import UserProfile from '../pages/UserProfile/UserProfile';
import PaymentMethodPage from '../pages/PaymentMethodPage/PaymentMethodPage';
import CartPage from '../pages/CartPage/CartPage';
import UsersManagement from '../pages/UsersManagement/UsersManagement';
import BooksManagement from '../pages/BooksManagement/BooksManagement';

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/user-profile',
        page: UserProfile,
        isShowHeader: true
    },
    {
        path: '/payment-method',
        page: PaymentMethodPage,
        isShowHeader: true
        
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/user-management',
        page: UsersManagement,
        isShowHeader: false
    },
    {
        path: '/books-management',
        page: BooksManagement,
        isShowHeader: false
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]