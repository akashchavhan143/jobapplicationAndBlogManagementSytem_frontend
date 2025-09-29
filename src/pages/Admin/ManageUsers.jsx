import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, message, Popconfirm, Tag } from 'antd';
import { StopOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { getAllUsers, updateUser } from '../../services/userService';

const { Title } = Typography;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await updateUser(userId, { enabled: false });
      message.success('User blocked successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to block user');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await updateUser(userId, { enabled: true });
      message.success('User unblocked successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to unblock user');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'ADMIN' ? 'red' : 'blue'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (
        <Tag color={enabled ? 'green' : 'red'}>
          {enabled ? 'Active' : 'Blocked'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.enabled ? (
            <Popconfirm
              title="Block User"
              description="Are you sure you want to block this user?"
              onConfirm={() => handleBlockUser(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<StopOutlined />}
                size="small"
              >
                Block
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Unblock User"
              description="Are you sure you want to unblock this user?"
              onConfirm={() => handleUnblockUser(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
              >
                Unblock
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      background: '#ffffff',
      minHeight: '100vh',
     
    }}>
      <div style={{ 
        marginBottom: 24,
        textAlign: 'center',
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e9ecef'
      }}>
        <Title level={4} style={{ color: '#262626', margin: 0, fontSize: '18px' }}>Manage Users</Title>
      </div>

      <div
        style={{
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: 'none',
          background: '#f8f9fa',
          padding:"5px"
        }}
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          bordered
          scroll={{x:"max-content"}}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;