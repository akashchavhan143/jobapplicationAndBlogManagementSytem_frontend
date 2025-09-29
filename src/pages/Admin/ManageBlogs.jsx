import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, message, Popconfirm, Tag, Modal, Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined, BookOutlined, EyeOutlined, CheckOutlined, CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { getAllBlogs, deleteBlog, updateBlog } from '../../services/blogService';

const { Title } = Typography;

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      message.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const handleApprove = async (blogId) => {
    try {
      await updateBlog(blogId, { status: 'APPROVED' });
      message.success('Blog approved successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Failed to approve blog');
    }
  };

  const handleReject = async (blogId) => {
    try {
      await updateBlog(blogId, { status: 'REJECTED' });
      message.success('Blog rejected successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Failed to reject blog');
    }
  };

  const showFullContent = (blog) => {
    setSelectedBlog(blog);
    setModalVisible(true);
  };

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const parseEditorContent = (content) => {
    try {
      const data = JSON.parse(content);
      if (data.blocks) {
        return data.blocks.map((block, index) => {
          switch (block.type) {
            case 'header':
              const HeaderTag = `h${block.data.level}`;
              const headerText = decodeHtmlEntities(block.data.text);
              return React.createElement(HeaderTag, { 
                key: index,
                dangerouslySetInnerHTML: { __html: headerText }
              });
            case 'paragraph':
              const paragraphText = decodeHtmlEntities(block.data.text);
              return <p key={index} dangerouslySetInnerHTML={{ __html: paragraphText }} />;
            case 'list':
              const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={index}>
                  {block.data.items.map((item, i) => {
                    const itemText = decodeHtmlEntities(item.content);
                    return <li key={i} dangerouslySetInnerHTML={{ __html: itemText }} />;
                  })}
                </ListTag>
              );
            case 'image':
              return (
                <div key={index} style={{ margin: '16px 0', textAlign: 'center' }}>
                  <img 
                    src={block.data.file?.url || block.data.url} 
                    alt={block.data.caption || 'Blog image'}
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  {block.data.caption && (
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#666', 
                      fontStyle: 'italic',
                      marginTop: '8px'
                    }}>
                      {block.data.caption}
                    </p>
                  )}
                </div>
              );
            default:
              const defaultText = decodeHtmlEntities(block.data.text || '');
              return <p key={index} dangerouslySetInnerHTML={{ __html: defaultText }} />;
          }
        });
      }
    } catch (e) {
      // If it's not JSON, treat as HTML and decode entities
      const decodedContent = decodeHtmlEntities(content);
      return <div dangerouslySetInnerHTML={{ __html: decodedContent }} />;
    }
    return content;
  };

  const getContentPreview = (content) => {
    try {
      const data = JSON.parse(content);
      if (data.blocks && data.blocks.length > 0) {
        const firstBlock = data.blocks[0];
        let text = firstBlock.data.text || '';
        // Decode HTML entities and remove HTML tags for preview
        text = decodeHtmlEntities(text).replace(/<[^>]*>/g, '');
        const words = text.split(' ');
        return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : text;
      }
    } catch (e) {
      // If not JSON, decode entities and remove HTML tags
      let text = decodeHtmlEntities(content || '').replace(/<[^>]*>/g, '');
      const words = text.split(' ');
      return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : text;
    }
    return content;
  };

  const columns = [
    {
      title: 'Sr No.',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        const preview = getContentPreview(text);
        return (
          <div style={{ maxWidth: 250 }}>
            {preview}
            {preview.endsWith('...') && (
              <Button 
                type="link" 
                size="small" 
                onClick={() => showFullContent(record)}
                style={{ padding: 0, marginLeft: 4 }}
              >
                Read More
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'orange';
        if (status === 'APPROVED') color = 'green';
        if (status === 'REJECTED') color = 'red';
        return (
          <Tag color={color}>
            {status || 'PENDING'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align:"center",
      render: (_, record) => {
        const menuItems = [
          {
            key: 'approve',
            label: 'Approve',
            icon: <CheckOutlined />,
            onClick: () => handleApprove(record.id)
          },
          {
            key: 'reject',
            label: 'Reject',
            icon: <CloseOutlined />,
            onClick: () => handleReject(record.id)
          }
        ];
        
        return (
          <Space>
            <Button
              type="primary"
              icon={<EyeOutlined />}
             
              onClick={() => showFullContent(record)}
              style={{ background: '#1890ff', borderColor: '#1890ff' }}
            >
              
            </Button>
            <Dropdown
              menu={{ items: menuItems }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />}>
                Actions
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ 
      background: '#ffffff',
      minHeight: '100vh',
   
    }}>
      <div style={{ 
        marginBottom: 24,
        textAlign: 'center',
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e9ecef'
      }}>
        <Title level={4} style={{ color: '#262626', margin: 0, fontSize: '18px' }}>Manage Blogs</Title>
      </div>

      <div
        style={{
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: 'none',
          background: '#f8f9fa',
          padding:"5px"
        }}
      >
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} blogs`,
          }}
          bordered
          scroll={{x:"max-content"}}
        />
      </div>

      <Modal
        title={selectedBlog?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        <div>
          <p><strong>Author:</strong> {selectedBlog?.author}</p>
          <p><strong>Status:</strong> 
            <Tag color={selectedBlog?.status === 'APPROVED' ? 'green' : selectedBlog?.status === 'REJECTED' ? 'red' : 'orange'} style={{ marginLeft: 8 }}>
              {selectedBlog?.status || 'PENDING'}
            </Tag>
          </p>
          <div style={{ marginTop: 16 }}>
            <strong>Content:</strong>
            <div style={{ 
              marginTop: 8, 
              padding: 16, 
              background: '#f5f5f5', 
              borderRadius: 4, 
              lineHeight: 1.6,
              maxHeight: '500px',
              overflowY: 'auto'
            }}>
              {selectedBlog?.content && parseEditorContent(selectedBlog.content)}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBlogs;