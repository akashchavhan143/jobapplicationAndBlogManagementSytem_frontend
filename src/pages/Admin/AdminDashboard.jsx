import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Spin, Button, Space, Avatar, Statistic } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  SettingOutlined,
  CrownOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { getAllUsers } from "../../services/userService";
import { getAllBlogs } from "../../services/blogService";
import { getAllJobVacancies } from "../../services/jobVacancyService";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
    vacancies: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, blogs, vacancies] = await Promise.all([
          getAllUsers(),
          getAllBlogs(),
          getAllJobVacancies(),
        ]);
        setStats({
          users: users.data.length,
          blogs: blogs.data.length,
          vacancies: vacancies.data.length,
        });
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#ffffff',
      minHeight: '100vh',
    
    }}>
        {/* Header */}
        <div style={{ 
          marginBottom: 24,
          textAlign: 'center',
          background: '#f8f9fa',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #e9ecef'
        }}>
          <Title level={4} style={{ color: '#262626', margin: 0, fontSize: '18px' }}>Admin Dashboard</Title>
          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>Welcome, {user?.username}</Text>
        </div>

        {/* Stats */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ 
              borderRadius: '8px',
              border: '1px solid #bde0ff',
              boxShadow: 'none',
              background: '#f0f8ff',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} hoverable>
              <Statistic
                title="Total Users"
                value={stats.users}
                prefix={<TeamOutlined style={{ color: '#4a90e2', fontSize: '20px' }} />}
                valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: '600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ 
              borderRadius: '8px',
              border: '1px solid #b7eb8f',
              boxShadow: 'none',
              background: '#f6ffed',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} hoverable>
              <Statistic
                title="Total Blogs"
                value={stats.blogs}
                prefix={<BookOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: '600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ 
              borderRadius: '8px',
              border: '1px solid #d3adf7',
              boxShadow: 'none',
              background: '#f9f0ff',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} hoverable>
              <Statistic
                title="Job Vacancies"
                value={stats.vacancies}
                prefix={<DashboardOutlined style={{ color: '#722ed1', fontSize: '20px' }} />}
                valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: '600' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} lg={12}>
            <Card 
              title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f1f1f' }}>Management</span>} 
              style={{ 
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: 'none',
                background: '#f8f9fa',
                height: '100%'
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <Button
                  type="primary"
                  icon={<TeamOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/admin/users")}
                  style={{
                    height: '50px',
                    borderRadius: '8px',
                    background: '#3b82f6',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  Manage Users
                </Button>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/admin/blogs")}
                  style={{
                    height: '50px',
                    borderRadius: '8px',
                    background: '#22c55e',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)'
                  }}
                >
                  Manage Blogs
                </Button>
                <Button
                  type="primary"
                  icon={<SettingOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/admin/settings")}
                  style={{
                    height: '50px',
                    borderRadius: '8px',
                    background: '#a855f7',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    boxShadow: '0 2px 8px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  Platform Settings
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f1f1f' }}>Analytics</span>} 
              style={{ 
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: 'none',
                background: '#f8f9fa',
                height: '100%'
              }}
            >
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '200px',
                background: '#f8f8f8',
                borderRadius: '8px',
                padding: '24px',
                border: '1px solid #e8e8e8'
              }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#3b82f6', marginBottom: '16px' }} />
                <Text type="secondary" style={{ fontSize: '16px', textAlign: 'center' }}>Platform Analytics</Text>
                <Text type="secondary" style={{ fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>Detailed reports and insights coming soon</Text>
              </div>
            </Card>
          </Col>
        </Row>
    </div>
  );
};

export default AdminDashboard;