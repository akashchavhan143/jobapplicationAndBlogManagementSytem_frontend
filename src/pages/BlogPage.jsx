import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Modal,
  List,
  Avatar,
  Space,
  Drawer,
  Tag,
  Typography,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  BookOutlined,
  ShareAltOutlined,
  SendOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import "./BlogPage.css";

const { Text } = Typography;
const { TextArea } = Input;

const initialBlogs = [
  {
    id: 1,
    title: "How to Build a Scalable Microservices Architecture",
    author: "Tech Guru",
    avatar: "https://i.pravatar.cc/50?img=3",
    tags: ["React", "Nodejs", "MySQL", "Programming", "JavaScript"],
    content:
      "In this guide, we explore how to design and deploy scalable microservices using Kubernetes and Spring Boot...",
    likes: 144,
    liked: false,
    comments: [
      { user: "Alice", text: "The blog page CSS has been redesigned for a much more modern, visually appealing look: better card elevation, spacing, gradients, rounded corners, and improved typography", likes: 10 },
      { user: "Bob", text: "Very helpful", likes: 5 },
    ],
    followers: 83,
    following: 4,
  },
  
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
    tags: [],
  });
  const [newComment, setNewComment] = useState("");
  const [activeBlog, setActiveBlog] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Toggle like/unlike
  const toggleLike = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              liked: !blog.liked,
              likes: blog.liked ? blog.likes - 1 : blog.likes + 1,
            }
          : blog
      )
    );
  };

  // Open comments drawer
  const openComments = (blog) => {
    setActiveBlog(blog);
    setDrawerVisible(true);
  };

  // Add comment
  const addComment = () => {
    if (!newComment.trim()) return;
    setBlogs(
      blogs.map((blog) =>
        blog.id === activeBlog.id
          ? {
              ...blog,
              comments: [
                ...blog.comments,
                { user: "You", text: newComment, likes: 0 },
              ],
            }
          : blog
      )
    );
    setNewComment("");
  };

  return (
    <div className="blogpage-root">
      <div className="blogpage-header">
        <h1>Tech Insights & Career Stories</h1>
        <p className="blogpage-subtitle">Discover the latest in technology, programming tips, and career advice from industry professionals</p>
       
      </div>

      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="blogpage-card"
        
        >
             {/* Author Section */}
          <div className="blogpage-author-head">
            <Avatar src={blog.avatar} size={48} />
            <div className="author-info">
              <strong>Written by {blog.author}</strong>
              <p>
                {blog.followers} followers · {blog.following} following
              </p>
             
            </div>
            <Button shape="round" type="default" className="follow-btn">
              Follow
            </Button>
          </div>
          <span className="blogpage-card-title">{blog.title}</span>
           <div style={{color:"gray",fontSize:20}}>Tis is substile</div>
          <p className="blogpage-card-content">{blog.content}</p>

          {/* Tags */}
          <div className="blogpage-tags">
            {blog.tags.map((tag, idx) => (
              <Tag key={idx} className="blogpage-tag" >
                {tag}
              </Tag>
            ))}
          </div>

          {/* Actions */}
          <div className="blogpage-actions">
            <Space size="large">
              <span onClick={() => toggleLike(blog.id)} className="action-item">
                {blog.liked ? (
                  <HeartFilled style={{ color: "#ff4d4f" }} />
                ) : (
                  <HeartOutlined />
                )}
                <span className="action-count">{blog.likes}</span>
              </span>

              <span onClick={() => openComments(blog)} className="action-item">
                <MessageOutlined />{" "}
                <span className="action-count">{blog.comments.length}</span>
              </span>

              <span className="action-item">
                <BookOutlined /> Save
              </span>
              <span className="action-item">
                <ShareAltOutlined /> Share
              </span>
            </Space>
          </div>

          {/* Author Section */}
          <div className="blogpage-author">
            <Avatar src={blog.avatar} size={48} />
            <div className="author-info">
              <strong>Written by {blog.author}</strong>
              <p>
                {blog.followers} followers · {blog.following} following
              </p>
            </div>
            <Button shape="round" type="default" className="follow-btn">
              Follow
            </Button>
          </div>
        </Card>
      ))}

      {/* Comments Drawer */}
      <Drawer
        title={`Responses (${activeBlog?.comments.length || 0})`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={450}
      >
        {activeBlog && (
          <>
            {/* Comment Input */}
            <div
             
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "12px 0",
              }}
            >
              <Space align="start">
                <Avatar style={{ background: "#069549ff" }}>
                  A
                </Avatar>
              Akash
              </Space>
            </div>

            <div
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                background: "#fafafa",
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <TextArea
                  rows={3}
                  placeholder="What are your thoughts?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div style={{ textAlign: "right" }}>
                  <b style={{ marginRight: "20px" }}>B</b>
                  <i style={{ marginRight: "20px" }}>i</i>
                  <Button
                    type="default"
                    icon={<SendOutlined />}
                    onClick={addComment}
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={addComment}
                  >
                    Respond
                  </Button>
                </div>
              </Space>
            </div>
{/* Comments List */}
<List
  dataSource={activeBlog.comments}
  locale={{ emptyText: "No comments yet" }}
  renderItem={(comment, idx) => (
    <List.Item key={idx}>
      <List.Item.Meta
        avatar={
          <Avatar style={{ background: "#1677ff" }}>
            {comment.user[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Space>
            <Text strong>{comment.user}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date().toLocaleDateString()}
            </Text>
          </Space>
        }
        description={
          <>
            <div>{comment.text}</div>
            <div style={{ marginTop: 6 }}>
              <Space>
                <LikeOutlined /> {comment.likes}
                <a>Reply</a>
              </Space>
            </div>
          </>
        }
      />
    </List.Item>
  )}
/>

          </>
        )}
      </Drawer>
    </div>
  );
};

export default BlogPage;
