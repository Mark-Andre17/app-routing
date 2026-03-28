import { CenterLayout } from '@/shared';
import { Button, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export const PublicPage = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout>
      <Card title="Добро пожаловать" style={{ width: 400, textAlign: 'center' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button type="primary" block onClick={() => navigate('/login')}>
            Войти
          </Button>
          <Button block onClick={() => navigate('/register')}>
            Зарегистрироваться
          </Button>
        </Space>
      </Card>
    </CenterLayout>
  );
};
