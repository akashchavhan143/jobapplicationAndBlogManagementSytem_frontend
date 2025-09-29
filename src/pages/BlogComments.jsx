import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getBlogCommentsByUser, createBlogComment, updateBlogComment, deleteBlogComment } from '../services/blogCommentService';
import { Button, Table, Modal, Form, Input, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BlogComments = () => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchComments();
    }, [user]);

    const fetchComments = async () => {
        try {
            const data = await getBlogCommentsByUser(user.username);
            setComments(data);
        } catch (error) {
            message.error('Failed to fetch blog comments');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingComment(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingComment(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBlogComment(id);
            message.success('Blog comment deleted successfully');
            fetchComments();
        } catch (error) {
            message.error('Failed to delete blog comment');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingComment) {
                await updateBlogComment(editingComment.id, values);
                message.success('Blog comment updated successfully');
            } else {
                await createBlogComment({ ...values, userId: user.id });
                message.success('Blog comment created successfully');
            }
            setIsModalVisible(false);
            fetchComments();
        } catch (error) {
            message.error('Failed to save blog comment');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Blog ID',
            dataIndex: 'blogId',
            key: 'blogId',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
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
                            Blog Comments
                        </h2>
                        <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                            Manage your blog comments
                        </p>
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add Comment
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={comments}
                    rowKey="id"
                    loading={loading}
                />

                <Modal
                    title={editingComment ? 'Edit Blog Comment' : 'Add Blog Comment'}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="blogId"
                            label="Blog ID"
                            rules={[{ required: true, message: 'Please enter the blog ID' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="comment"
                            label="Comment"
                            rules={[{ required: true, message: 'Please enter your comment' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default BlogComments;
