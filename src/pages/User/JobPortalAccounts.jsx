import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getJobPortalAccountsByUser, createJobPortalAccount, updateJobPortalAccount, deleteJobPortalAccount } from '../../services/jobPortalAccountService';
import { Button, Table, Modal, Form, Input, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const JobPortalAccounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [form] = Form.useForm();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        fetchAccounts();
    }, [user.id]);

    const fetchAccounts = async () => {
        try {
            const response = await getJobPortalAccountsByUser(user.id);
            setAccounts(response.data);
        } catch (error) {
            message.error('Failed to fetch job portal accounts');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingAccount(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingAccount(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteJobPortalAccount(id);
            message.success('Job portal account deleted successfully');
            fetchAccounts();
        } catch (error) {
            message.error('Failed to delete job portal account');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingAccount) {
                await updateJobPortalAccount(editingAccount.id, values);
                message.success('Job portal account updated successfully');
            } else {
                await createJobPortalAccount(values, user.id);
                message.success('Job portal account created successfully');
            }
            setIsModalVisible(false);
            fetchAccounts();
        } catch (error) {
            message.error('Failed to save job portal account');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
    {
  title: 'Portal Name',
  dataIndex: 'portalName',
  key: 'portalName',
  render: (text) => text ? text : "Not Available",
}
,
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
           {
            title: 'Password',
            dataIndex: 'encryptedPassword',
            key: 'encryptedPassword',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (link) => <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '48px 24px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '0' }}>
                            Job Portal Accounts
                        </h2>
                        <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                            Manage your job portal accounts
                        </p>
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add Account
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={accounts}
                    rowKey="id"
                    loading={loading}
                />

                <Modal
                    title={editingAccount ? 'Edit Job Portal Account' : 'Add Job Portal Account'}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="portalName"
                            label="Portal Name"
                            rules={[{ required: true, message: 'Please enter the portal name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter the username' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter the password' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="link"
                            label="Link"
                            rules={[{ required: true, message: 'Please enter the link' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default JobPortalAccounts;
