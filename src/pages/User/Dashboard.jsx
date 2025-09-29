import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Statistic, Button, Typography, Space, Spin, Avatar } from 'antd';
import { FileTextOutlined, BookOutlined, TeamOutlined, PlusOutlined, EditOutlined, SearchOutlined, UserOutlined, BellOutlined, TrophyOutlined } from '@ant-design/icons';
import { getJobApplicationsByUser } from '../../services/jobApplicationService';
import { getAllBlogs } from '../../services/blogService';
import { getAllJobVacancies } from '../../services/jobVacancyService';



const { Title, Text } = Typography;

const Dashboard = () => {

    const navigate = useNavigate();
    const [stats, setStats] = useState({
        jobApplications: 0,
        blogs: 0,
        jobVacancies: 0
    });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [jobApps, blogs, vacancies] = await Promise.all([
                    getJobApplicationsByUser(user.id),
                    getAllBlogs(),
                    getAllJobVacancies()
                ]);

                setStats({
                    jobApplications: jobApps.data.length,
                    blogs: blogs.data.length,
                    jobVacancies: vacancies.data.length
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #f0f4f8 0%, #e8f2ff 100%)',
            minHeight: '100vh',
            padding: '24px'
        }}>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ 
                    marginBottom: 24,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 4px 20px rgba(79, 70, 229, 0.15)'
                }}>
                
                    <Title level={3} style={{ color: 'white', margin: 0, fontSize: '20px' }}>Welcome back, {user?.username}!</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Here's an overview of your activity</Text>
                </div>

                <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                    <Col xs={24} sm={12} md={6}>
                        <Card style={{ 
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} hoverable>
                            <Statistic
                                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Job Applications</span>}
                                value={stats.jobApplications}
                                prefix={<FileTextOutlined style={{ color: 'white', fontSize: '20px' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px', fontWeight: '600' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card style={{ 
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} hoverable>
                            <Statistic
                                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Blogs</span>}
                                value={stats.blogs}
                                prefix={<BookOutlined style={{ color: 'white', fontSize: '20px' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px', fontWeight: '600' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card style={{ 
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(168, 85, 247, 0.15)',
                            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} hoverable>
                            <Statistic
                                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Job Vacancies</span>}
                                value={stats.jobVacancies}
                                prefix={<TeamOutlined style={{ color: 'white', fontSize: '20px' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px', fontWeight: '600' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card style={{ 
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} hoverable>
                            <Statistic
                                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Profile Score</span>}
                                value={85}
                                suffix="%"
                                prefix={<TrophyOutlined style={{ color: 'white', fontSize: '20px' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px', fontWeight: '600' }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Card 
                    title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f1f1f' }}>Quick Actions</span>} 
                    style={{ 
                        marginBottom: 32,
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                    }}
                >
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={8}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                            
                                block
                                onClick={() => navigate('/job-applications')}
                                style={{
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#3b82f6',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                                }}
                            >
                                Add Job Application
                            </Button>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                              
                                block
                                onClick={() => navigate('/blogs')}
                                style={{
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#22c55e',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)'
                                }}
                            >
                                Create Blog Post
                            </Button>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                            
                                block
                                onClick={() => navigate('/job-vacancies')}
                                style={{
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#a855f7',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 8px rgba(168, 85, 247, 0.2)'
                                }}
                            >
                                Browse Vacancies
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                        <Card 
                            title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f1f1f' }}>Recent Activity</span>} 
                            style={{ 
                                height: 320,
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                height: '200px',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                borderRadius: '12px',
                                padding: '24px'
                            }}>
                                <FileTextOutlined style={{ fontSize: '48px', color: '#3b82f6', marginBottom: '16px' }} />
                                <Text type="secondary" style={{ fontSize: '16px', textAlign: 'center' }}>No recent activity to show</Text>
                                <Text type="secondary" style={{ fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>Your recent job applications and updates will appear here</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card 
                            title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f1f1f' }}>Notifications</span>} 
                            style={{ 
                                height: 320,
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                height: '200px',
                                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                borderRadius: '12px',
                                padding: '24px'
                            }}>
                                <BellOutlined style={{ fontSize: '48px', color: '#f59e0b', marginBottom: '16px' }} />
                                <Text type="secondary" style={{ fontSize: '16px', textAlign: 'center' }}>No new notifications</Text>
                                <Text type="secondary" style={{ fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>Important updates and reminders will appear here</Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
