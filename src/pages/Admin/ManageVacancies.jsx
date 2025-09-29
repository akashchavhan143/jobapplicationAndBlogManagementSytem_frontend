import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, message, Popconfirm, Tag, Modal, Form, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, BankOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllJobVacancies, deleteJobVacancy, createJobVacancy } from '../../services/jobVacancyService';

const { Title } = Typography;

const ManageVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await getAllJobVacancies();
      setVacancies(response);
    } catch (error) {
      message.error('Failed to fetch vacancies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vacancyId) => {
    try {
      await deleteJobVacancy(vacancyId);
      message.success('Vacancy deleted successfully');
      fetchVacancies();
    } catch (error) {
      message.error('Failed to delete vacancy');
    }
  };

  const handleAddVacancy = () => {
    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
  
      await createJobVacancy(values);
      message.success('Vacancy created successfully');
      setModalVisible(false);
      form.resetFields();
      fetchVacancies();
    } catch (error) {
      message.error('Failed to create vacancy');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Space>
          <BankOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <div style={{ maxWidth: 200 }}>
          {text?.length > 100 ? `${text.substring(0, 100)}...` : text}
        </div>
      ),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align:"center",
      render: (status) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {status || 'ACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align:"center",
      render: (_, record) => (
        <Space>
          
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
       
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Vacancy"
            description="Are you sure you want to delete this vacancy?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
 
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
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
        <Title level={4} style={{ color: '#262626', margin: 0, fontSize: '18px' }}>Manage Job Vacancies</Title>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddVacancy}
          >
            New Vacancy
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={vacancies}
          rowKey="id"
          loading={loading}
          bordered
          scroll={{x:"max-content"}}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} vacancies`,
          }}
        />
      </div>

      <Modal
        title="Add New Job Vacancy"
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter job title' }]}
          >
            <Input placeholder="Enter job title" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please enter company name' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter job description' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter job description (max 1000 characters)"
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="applyLink"
            label="Apply Link"
          >
            <Input placeholder="Enter application link (optional)" />
          </Form.Item>

          <Form.Item
            name="expiryDate"
            label="Expiry Date"
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder="Select expiry date (optional)"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create Vacancy
              </Button>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageVacancies;