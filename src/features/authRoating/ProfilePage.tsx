import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { CenterLayout } from '@/shared';

const { Title, Text } = Typography;

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/public', { replace: true });
  };

  if (!user) return null;

  return (
    <CenterLayout>
      <Card style={{ width: 400, textAlign: 'center' }}>
        <Title level={2}>Профиль</Title>
        <Text strong>Имя:</Text> <Text>{user.name}</Text>
        <br />
        <Text strong>Email:</Text> <Text>{user.email}</Text>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" danger onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>
    </CenterLayout>
  );
};
