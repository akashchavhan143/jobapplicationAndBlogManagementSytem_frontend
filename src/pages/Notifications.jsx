import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getNotificationsByUser } from '../services/notificationService';
import { List, Typography, Spin, Empty } from 'antd';

const { Title, Text } = Typography;

const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const data = await getNotificationsByUser(user.username);
            setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '48px 24px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '32px' }}>
                    <Title level={2} style={{ textAlign: 'center', color: '#333' }}>
                        Notifications
                    </Title>
                    <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
                        Stay updated with the latest job postings and system notifications
                    </Text>
                </div>

                {notifications.length === 0 ? (
                    <Empty description="No notifications yet" />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={notifications}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Text strong>{item.title}</Text>}
                                    description={
                                        <div>
                                            <Text>{item.message}</Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {new Date(item.createdAt).toLocaleString()}
                                            </Text>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default Notifications;
