import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
      message.success('Login successful');

      // Check if user is admin and redirect accordingly
      const user = response.user;
      if (user && user.roles && user.roles.includes('ROLE_ADMIN')) {
        console.log("you are admin")
        navigate('/admin-panel');
      } else {
        console.log("you are not admin")
       navigate('/dashboard');
      }
    } catch (error) {
      message.error('Login failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderRadius: 10,
          border: 'none'
        }}
        bodyStyle={{ padding: 40 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={{ borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                height: 48,
                borderRadius: 6,
                fontWeight: 600
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1890ff', fontWeight: 500 }}>
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
