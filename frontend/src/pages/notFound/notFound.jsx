import { Button, Result } from 'antd';

const NotFound = () => (
    <Result
        status="404"
        title="404"
        subTitle="Trang bạn đến không tồn tại"
        extra={
            <a href="/">
                <Button type="primary">Quay lại trang chủ</Button>
            </a>  
        }
    />
);
export default NotFound;