import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { LogoutOutlined, FileTextOutlined } from '@ant-design/icons';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header style={{ background: 'white', borderBottom: '1px solid #e5e5e5', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileTextOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
                    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                        Job Tracker
                    </Link>
                </div>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Dashboard</Link>
                            <Link to="/job-applications" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Applications</Link>
                            <Link to="/job-vacancies" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Vacancies</Link>
                            <Link to="/blogs" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Blogs</Link>
                            <Link to="/admin" style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Admin</Link>
                            <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ backgroundColor: '#1890ff', color: '#fff', border: 'none' }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button type="default"  style={{ marginRight: 8, border: '1px solid #1890ff' }}>Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button type="primary"  style={{ backgroundColor: '#1890ff', color: '#fff', border: 'none' }}>Register</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
