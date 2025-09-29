import React from "react";
import { Typography, Card, Row, Col, Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import {
  FileTextOutlined,
  BookOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div>
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #e5e5e5",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FileTextOutlined style={{ fontSize: "28px", color: "#1890ff" }} />
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Job Tracker
            </Link>
          </div>
          <nav>
               <Link to="/blogs">
              <Button
                type="default"
                style={{ marginRight: 8, border: "1px solid #1890ff" }}
             
              >
                Blogs
              </Button>
            </Link>   
            <Link to="/login">
              <Button
                type="default"
                style={{ marginRight: 8, border: "1px solid #1890ff" }}
                icon={<EditOutlined/>}
              >
                Write
              </Button>
            </Link>
            <Link to="/login">
              <Button
                type="default"
                style={{ marginRight: 8, border: "1px solid #1890ff" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1890ff",
                  color: "#fff",
                  border: "none",
                }}
              >
                Register
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div
        style={{
           maxWidth: "1200px",
          background: "#f9f9f9",
          color: "#000",
          padding: "30px 20px",
          minHeight: "10vh",
          position: "relative",
          overflow: "hidden",
           margin: "0 auto",
        }}
      >
        <Row gutter={[32, 32]} align="middle" justify="center">
          <Col xs={24} md={12} style={{ textAlign: "left" }}>
            <Title level={1} style={{ color: "#000", marginBottom: 20 }}>
              Welcome to Job Tracker & Blog Platform
            </Title>
            <Paragraph
              style={{
                fontSize: "18px",
                color: "#666",
                marginBottom: 30,
                lineHeight: "1.6",
              }}
            >
              Streamline your job search, track applications effortlessly, share
              insights through blogs, and stay notified about the latest
              opportunities. Join our community of professionals and take
              control of your career journey.
            </Paragraph>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/register">
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="large"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#1890ff",
                    color: "#1890ff",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "30px",
                flexWrap: "wrap",
                marginTop: 30,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  1000+
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Active Users
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  5000+
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Jobs Tracked
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  200+
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Blog Posts
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  50+
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>Companies</div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <Carousel autoplay style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Job Search"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Career Tracking"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Blogging"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>

      <div style={{ padding: "40px 20px", backgroundColor: "#f5f5f5" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Key Features
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              style={{ textAlign: "center", height: "100%" }}
              cover={
                <FileTextOutlined
                  style={{ fontSize: "40px", color: "#1890ff", marginTop: 15 }}
                />
              }
            >
              <Card.Meta
                title="Job Application Tracking"
                description="Track applications and manage career progress."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              style={{ textAlign: "center", height: "100%" }}
              cover={
                <BookOutlined
                  style={{ fontSize: "40px", color: "#52c41a", marginTop: 15 }}
                />
              }
            >
              <Card.Meta
                title="Blogging Platform"
                description="Read and share insights with the community."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              style={{ textAlign: "center", height: "100%" }}
              cover={
                <BellOutlined
                  style={{ fontSize: "40px", color: "#faad14", marginTop: 15 }}
                />
              }
            >
              <Card.Meta
                title="Notifications"
                description="Real-time updates on job postings."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              style={{ textAlign: "center", height: "100%" }}
              cover={
                <UserOutlined
                  style={{ fontSize: "40px", color: "#722ed1", marginTop: 15 }}
                />
              }
            >
              <Card.Meta
                title="Account Management"
                description="Manage your profile and settings securely."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              style={{ textAlign: "center", height: "100%" }}
              cover={
                <SearchOutlined
                  style={{ fontSize: "40px", color: "#13c2c2", marginTop: 15 }}
                />
              }
            >
              <Card.Meta
                title="Job Vacancies"
                description="Browse and apply to latest job openings."
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
