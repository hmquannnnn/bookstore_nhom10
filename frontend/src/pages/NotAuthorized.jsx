import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            title="403"
            subTitle="Bạn không có quyền truy cập trang"
            extra={
                <Button type="primary"
                onClick={() => navigate("/")}
                >Quay lại trang chủ</Button>
            }
        />
    )
    
}

export default NotAuthorized;