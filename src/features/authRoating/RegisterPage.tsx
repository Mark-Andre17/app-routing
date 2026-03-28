import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { CenterLayout } from '@/shared';

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.v2.react-learning.ru/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const token = data.accessToken?.replace('Bearer ', '');

      const userRes = await fetch('https://api.v2.react-learning.ru/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();

      login(token, userData);
      message.success('Регистрация успешна');
      navigate('/profile', { replace: true });
    } catch (error: any) {
      message.error(error.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterLayout>
      <Card title="Регистрация" style={{ width: 400 }}>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item name="name" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input prefix={<UserOutlined />} placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Введите email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/public">
            <Button type="link">На главную</Button>
          </Link>
        </div>
      </Card>
    </CenterLayout>
  );
};
