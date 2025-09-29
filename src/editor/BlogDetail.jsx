import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css";
import { getBlogById } from "../services/blogService";
import { Avatar, Button, Drawer, Input, List, Space, Tag, Typography } from "antd";
import {
  BookOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  ShareAltOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import BlogList from "./BlogListPage";

const { Text } = Typography;
const { TextArea } = Input;
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await getBlogById(id);
      console.log("blog-response of Id:", id, response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Blog not found");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!blog || !blog.content) return null;

    try {
      const parsedContent = JSON.parse(blog.content);

      if (!parsedContent.blocks || !Array.isArray(parsedContent.blocks)) {
        return <p className="content-error">Invalid content format</p>;
      }

      return parsedContent.blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return React.createElement(`h${block.data.level}`, {
              key: index,
              className: `blog-header h${block.data.level}`,
              dangerouslySetInnerHTML: { __html: block.data.text },
            });

          case "paragraph":
            return (
              <p
                key={index}
                className="blog-paragraph"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "image":
            return (
              <div key={index} className="blog-image-block">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || "Blog image"}
                  className="blog-content-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {block.data.caption && (
                  <p className="image-caption">{block.data.caption}</p>
                )}
              </div>
            );

          case "quote":
            return (
              <blockquote key={index} className="blog-quote">
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && <footer>— {block.data.caption}</footer>}
              </blockquote>
            );

          case "list":
            return (
              <ul key={index} className="blog-list">
                {block.data.items.map((item, itemIndex) => {
                  let itemText = item;

                  if (typeof item === "object" && item !== null) {
                    if (item.text) {
                      itemText = item.text;
                    } else if (item.content) {
                      itemText = item.content;
                    } else {
                      const firstValue = Object.values(item)[0];
                      itemText =
                        typeof firstValue === "string" ? firstValue : "•";
                    }
                  }

                  return (
                    <li
                      key={itemIndex}
                      dangerouslySetInnerHTML={{ __html: itemText }}
                    />
                  );
                })}
              </ul>
            );

          case "embed":
            return (
              <div key={index} className="blog-embed">
                <iframe
                  src={block.data.embed}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  title={`Embed ${index}`}
                />
              </div>
            );

          case "warning":
            return (
              <div key={index} className="blog-warning">
                <strong>{block.data.title}</strong>
                <p>{block.data.message}</p>
              </div>
            );

          case "delimiter":
            return <hr key={index} className="blog-delimiter" />;

          default:
            console.warn("Unhandled block type:", block.type);
            return null;
        }
      });
    } catch (error) {
      console.error("Error parsing content:", error);
      return <p className="content-error">Error loading content</p>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-container">
        <div className="loading">Loading blog post...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-container">
        <div className="error">
          <h2>Blog not found</h2>
          <p>The blog you're looking for doesn't exist.</p>
          <Link to="/blogs" className="back-to-blogs">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }
  // Open comments drawer
  const openComments = () => {
   
    setDrawerVisible(true);
  };
  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <Link to="/blogs" className="back-button">
          ← Back to all blogs
        </Link>
      </div>

      <article className="blog-article">
        {/* Author Section */}
        <div className="blogpage-author-head">
          <Avatar src={""} size={48} />
          <div className="author-info">
            <strong>Written by </strong>
            <p>{blog.followers ?? 0} followers · following</p>
          </div>
          <Button shape="round" type="default" className="follow-btn">
            Follow
          </Button>
        </div>
        <header className="blog-article-header">
          {blog.featuredImageUrl && (
            <div className="featured-image">
              <img
                src={blog.featuredImageUrl}
                alt={blog.title}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="article-meta">
            <span className="category-badge">
              {blog.category || "Uncategorized"}
            </span>
            <span className="publish-date">
              Published on {formatDate(blog.createdAt)}
            </span>
            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
              <span className="update-date">
                Updated on {formatDate(blog.updatedAt)}
              </span>
            )}
          </div>

          <h1 className="article-title">{blog.title}</h1>

          {blog.subtitle && (
            <h2 className="article-subtitle">{blog.subtitle}</h2>
          )}

          {blog.tags && blog.tags.length > 0 && (
            <div className="article-tags">
              {blog.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="article-content">{renderContent()}</div>
<div className="blog-tags">
    {blog.tags && blog.tags.map((tag, index) => {
      // Pick colors from a palette
      const colors = ["blue", "green", "volcano", "purple", "magenta", "orange", "geekblue"];
      const color = colors[index % colors.length];

      return (
        <Tag key={index} color={color}>
          {tag.trim()}
        </Tag>
      );
    })}
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

            <span onClick={() => openComments()} className="action-item">
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
      </article>

      <div className="related-blogs">
        <h2>You might also like</h2>
        <div className="related-list">
       <BlogList/>
        </div>
      </div>
      {/* Comments Drawer */}
      <Drawer
        title={`Responses (${blog.comments.length || 0})`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={360}
      >
      
          <>
            {/* Comment Input */}
            <div
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "12px 0",
              }}
            >
              <Space align="start">
                <Avatar style={{ background: "#069549ff" }}>A</Avatar>
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
                  // value={newComment}
                  // onChange={(e) => setNewComment(e.target.value)}
                />
                <div style={{ textAlign: "right" }}>
                  <b style={{ marginRight: "20px" }}>B</b>
                  <i style={{ marginRight: "20px" }}>i</i>
                  <Button
                  size="small"
                    type="default"
                    icon={<WarningOutlined />}
                    // onClick={addComment}
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                  size="small"
                    type="primary"
                    icon={<SendOutlined />}
                    // onClick={addComment}
                  >
                    Respond
                  </Button>
                </div>
              </Space>
            </div>
            {/* Comments List */}
            <List
              dataSource={blog.comments}
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
      
      </Drawer>
    </div>
  );
};

export default BlogDetail;
