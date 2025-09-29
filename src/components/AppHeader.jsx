import { Layout, Button, Typography, Dropdown, Space, Avatar } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = ({ isMobile, collapsed, toggleCollapsed, toggleDrawer, user, userMenuItems }) => {
  return (
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
      {/* Left Section: Menu + Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile ? (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{ marginRight: 16 }}
          />
        ) : (
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

      {/* Middle Section: Action Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to={"blog-form"}>
          <Button type="primary" >Write Blog</Button>
        </Link>
      
        <Button>Blogs</Button>
      </div>

      {/* Right Section: User Menu */}
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
        <Space style={{ cursor: 'pointer' }}>
          <Avatar
            style={{ backgroundColor: '#1890ff' }}
            icon={<UserOutlined />}
          />
          <Text>{user ? user.username : 'User'}</Text>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
