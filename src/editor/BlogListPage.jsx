import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';
import { getAllBlogs } from '../services/blogService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

const truncateContent = (content, maxLength = 150) => {
  if (!content) return '';

  try {
    let text = '';

    // Parse JSON safely
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

    if (parsedContent.blocks && Array.isArray(parsedContent.blocks)) {
      parsedContent.blocks.forEach(block => {
        if (block.data) {
          if (block.type === 'paragraph' && block.data.text) {
            text += block.data.text + ' ';
          }
          if (block.type === 'header' && block.data.text) {
            text += block.data.text + ' ';
          }
        }
      });
    }

    // Strip any HTML tags
    text = text.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Truncate
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  } catch (error) {
    // If JSON parsing fails, strip HTML from raw string
    const cleanText = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;
  }
};

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
<div
  className="blog-header"
  style={{
    backgroundColor: "#c8d7f6ff", // soft, professional light color
    padding: "1.5rem 2rem",
    borderRadius: "8px",
    textAlign: "center",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "1.5rem",
    position: "relative",
    overflow: "hidden",
  }}
>
  <h1 style={{
      fontSize: "1.8rem",
      fontWeight: "700",
      margin: 0,
      letterSpacing: "0.5px",
         textTransform: "uppercase",
  }}>
    Explore All Stories
  </h1>
  <p style={{
      fontSize: "1rem",
      marginTop: "0.3rem",
      fontStyle: "italic",
      color: "#555"
  }}>
    Discover insights, adventures, and ideas from our collection of blogs
  </p>

  {/* Optional subtle decorative element */}
  <div style={{
      position: "absolute",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.03)",
      top: "10%",
      left: "5%"
  }} />
  <div style={{
      position: "absolute",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.02)",
      bottom: "10%",
      right: "10%"
  }} />
</div>



      <div className="blogs-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            {blog.featuredImageUrl && (
              <div className="blog-image">
                <img 
                  src={blog.featuredImageUrl} 
                  alt={blog.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-category">{blog.category}</span>
                <span className="blog-date">{formatDate(blog.createdAt)}</span>
              </div>
              
              <h2 className="blog-title">
                <Link to={`/blog-detail/${blog.id}`}>{blog.title}</Link>
              </h2>
              
              {blog.subtitle && (
                <p className="blog-subtitle">{blog.subtitle??"no"}</p>
              )}
              
              <p className="blog-excerpt">
                {truncateContent(blog.content)}
              </p>
              
              <div className="blog-footer">
                <div className="blog-tags">
                  {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">#{tag.trim()}</span>
                  ))}
                </div>
                
                <Link to={`/blog-detail/${blog.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="no-blogs">
          <h2>No blogs yet</h2>
          <p>Be the first to write a story!</p>
          <Link to="/create-blog" className="create-first-blog-btn">
            Create Your First Blog
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;