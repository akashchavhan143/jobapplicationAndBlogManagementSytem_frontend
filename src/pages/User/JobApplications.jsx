import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getJobApplicationsByUser, createJobApplication, updateJobApplication, deleteJobApplication } from '../../services/jobApplicationService';
import { Button, Table, Modal, Form, Input, Select, message, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [form] = Form.useForm();
const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getJobApplicationsByUser(user.id);
            setApplications(response.data);
        } catch (error) {
            message.error('Failed to fetch job applications');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingApplication(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingApplication(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteJobApplication(id);
            message.success('Job application deleted successfully');
            fetchApplications();
        } catch (error) {
            message.error('Failed to delete job application');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingApplication) {
                await updateJobApplication(editingApplication.id, values);
                message.success('Job application updated successfully');
            } else {
                await createJobApplication(values, user.id );
                message.success('Job application created successfully');
            }
            setIsModalVisible(false);
            fetchApplications();
        } catch (error) {
            message.error('Failed to save job application');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
       
        {
            title: 'Applied Date',
            dataIndex: 'appliedAt',
            key: 'appliedAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
          {
            title: 'Portal',
            dataIndex: 'portal',
            key: 'portal',
        
        },
          {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            
        },
         {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'APPLIED' ? 'blue' : status === 'INTERVIEW' ? 'orange' : status === 'OFFER' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
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
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '0' }}>
                        Job Applications
                    </h2>
                    <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                        Manage your job applications
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add Application
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={applications}
                rowKey="id"
                loading={loading}
                bordered
                size="small"
            />

            <Modal
                title={editingApplication ? 'Edit Job Application' : 'Add Job Application'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[{ required: true, message: 'Please enter the company name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please enter the role' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select the status' }]}
                    >
                        <Select>
                            <Option value="APPLIED">Applied</Option>
                            <Option value="INTERVIEW">Interview</Option>
                            <Option value="OFFER">Offer</Option>
                            <Option value="REJECTED">Rejected</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="notes" label="Notes">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default JobApplications;
