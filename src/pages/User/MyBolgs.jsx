import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getBlogsByUser,
  deleteBlog,
} from "../../services/blogService";
import {
  Button,
  Table,
  Modal,
  Form,
  message,
  Space,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  // state for modal
  const [viewingContent, setViewingContent] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogsByUser(user.id);
      setBlogs(response.data);
    } catch (error) {
      message.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      message.error("Failed to delete blog");
    }
  };

  // --- PREVIEW RENDER ---
  const renderEditorJsPreview = (value) => {
    if (!value) return "";

    let parsed;
    try {
      parsed = typeof value === "string" ? JSON.parse(value) : value;
    } catch {
      return value;
    }

    if (!parsed.blocks) return "";

    const fullText = parsed.blocks
      .map((block) => {
        if (block.data?.text) {
          return block.data.text.replace(/<[^>]+>/g, "");
        }
        if (block.type === "list" && Array.isArray(block.data?.items)) {
          return block.data.items
            .map((item) =>
              typeof item === "string"
                ? item
                : item.content || JSON.stringify(item)
            )
            .join(" ");
        }
        return "";
      })
      .join(" ");

    const words = fullText.split(/\s+/);
    const preview = words.slice(0, 10).join(" ");

    return (
      <span>
        {preview}
        {words.length > 10 && (
          <Button
            type="link"
            size="small"
            style={{ padding: 0 }}
            onClick={() => setViewingContent(value)}
          >
            Read more
          </Button>
        )}
      </span>
    );
  };

  // --- FULL RENDER ---
  const renderEditorJsFull = (value) => {
    if (!value) return null;

    let parsed;
    try {
      parsed = typeof value === "string" ? JSON.parse(value) : value;
    } catch {
      return value;
    }

    if (!parsed.blocks) return null;

    return (
      <div>
        {parsed.blocks.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                  style={{ marginBottom: "8px" }}
                />
              );
            case "header":
              return (
                <h3
                  key={i}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                  style={{ margin: "8px 0" }}
                />
              );
            case "list":
              return (
                <ul key={i} style={{ marginLeft: "20px" }}>
                  {block.data.items.map((item, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof item === "string"
                            ? item
                            : item.content || JSON.stringify(item),
                      }}
                    />
                  ))}
                </ul>
              );
            default:
              return (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: block.data?.text || "",
                  }}
                />
              );
          }
        })}
      </div>
    );
  };

  const columns = [
     {
    title: "S.No.",
    key: "index",
    align:"center",
  
    render: (_, __, index) => index + 1,
    width: 70,
  },
    {
  title: "Title",
  dataIndex: "title",
  key: "title",
  onCell: () => ({
    style: { paddingLeft: 20 },
  }),
},

    { title: "Sub-Title", dataIndex: "subtitle", key: "subTitle" },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width:300,
      render: (value) => renderEditorJsPreview(value),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.username,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "APPROVED"
              ? "green"
              : status === "PENDING"
              ? "orange"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      render: (value) => Number(value) || 0,
    },
    {
      title: "Comments",
      key: "comments",
      align: "center",
      render: (_, record) => (
        <Button
          size="small"
          icon={<CommentOutlined />}
          onClick={() => navigate("/blog-comments")}
        >
          Comments
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => setEditingBlog(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div></div>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate("/blog-form")}
          >
            Write a Blog
          </Button>
        </div>

        <Table
          size="small"
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{x:"max-content"}}
        />

        {/* Modal for full blog content */}
        <Modal
          open={!!viewingContent}
          onCancel={() => setViewingContent(null)}
          footer={null}
          width={800}
        >
          {renderEditorJsFull(viewingContent)}
        </Modal>
      </div>
    </div>
  );
};

export default MyBlogs;
