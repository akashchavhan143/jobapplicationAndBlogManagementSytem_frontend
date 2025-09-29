import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, Space, Drawer, Button, Grid } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  DashboardOutlined,
  FileTextOutlined,
  GlobalOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  CommentOutlined,
  MenuOutlined,
  EditOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

// ✅ Menu for normal users
const userMenu = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/job-applications",
    icon: <FileTextOutlined />,
    label: "Job Applications",
  },
  {
    key: "/job-portal-accounts",
    icon: <UserOutlined />,
    label: "Job Portal Accounts",
  },
  {
    key: "/my-blogs",
    icon: <BookOutlined />,
    label: "My Blogs",
  },
  {
    key: "/notifications",
    icon: <BellOutlined />,
    label: "Notifications",
  },
];

// ✅ Menu for admins
const adminMenu = [

    {
    key: "/admin/dashboard",
    icon: <DashboardOutlined />,
    label: "Admin Dashboard",
  },
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: "User Management",
  },
  {
    key: "/admin/blogs",
    icon: <BookOutlined />,
    label: "Blogs Management",
  },
  {
    key: "/admin/vacancies",
    icon: <GlobalOutlined />,
    label: "Vacancy Management",
  },
];

// ✅ Pick menu based on role
const menuItems = user?.role === "ROLE_ADMIN" ? adminMenu : userMenu;

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setDrawerVisible(false); // Close drawer on mobile after navigation
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          display: !isMobile ? 'block' : 'none',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleDrawer}
        open={drawerVisible}
        width={280}
        style={{ display: isMobile ? 'block' : 'none' }}
      >
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Drawer>

      <Layout style={{ marginLeft: !isMobile && !collapsed ? 200 : 0 }}>
    <Header
  style={{
    background: '#fff',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    right: 0,
    left: !isMobile && !collapsed ? 200 : 0,
    zIndex: 1000,
  }}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {isMobile && (
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
        style={{ marginRight: 16 }}
      />
    )}

    {!isMobile && (
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={toggleCollapsed}
        style={{ marginRight: 16 }}
      />
    )}

    <Text strong style={{ fontSize: isMobile ? '14px' : '18px' }}>
      {isMobile ? 'Job Tracker' : 'Job Tracker & Management Platform'}
    </Text>
  </div>

  {/* RIGHT SIDE FIX */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Link to={"/job-vacancies"}><Button>vacancies</Button></Link>
  <Link to={"/blog-list"}><Button>Blogs</Button></Link>
      <Link to={"/blog-form"}>
          <Button type="primary" >Write Blog</Button>
        </Link>
 

    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      arrow
    >
      <Space style={{ cursor: 'pointer' }}>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<UserOutlined />}
        />
        <Text>{user ? user.username : 'User'}</Text>
      </Space>
    </Dropdown>
  </div>
</Header>

        <Content
          style={{
            margin: '88px 16px 24px',
            padding: 24,
            background: '#fff',
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
