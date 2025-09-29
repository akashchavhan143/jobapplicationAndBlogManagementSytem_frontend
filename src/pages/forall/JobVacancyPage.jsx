import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Spin } from "antd";
import { getAllJobVacancies } from "../../services/jobVacancyService";

const { Title, Paragraph } = Typography;

const JobVacancyPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add responsive styles
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginBottom: "24px"
  };

  // Check if screen is small
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await getAllJobVacancies();
        setVacancies(response || []);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const openModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedVacancy(null);
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ 
     
     
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        {/* Creative Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "32px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "60px",
            height: "60px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "40px",
            height: "40px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%"
          }}></div>
          <Title level={2} style={{ 
            color: "white", 
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            🚀 DISCOVER YOUR DREAM JOB
          </Title>
          <p style={{
            fontSize: "14px",
            margin: "8px 0 0 0",
            opacity: 0.9,
            fontWeight: "300"
          }}>
            Explore exciting career opportunities from top companies
          </p>
        </div>

        {/* Grid Layout for Vacancies */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "24px",
            marginBottom: "24px"
          }}
        >
          {vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              onClick={() => openModal(vacancy)}
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <div>
                <div style={{
                  background: "linear-gradient(45deg, #1890ff, #40a9ff)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "inline-block",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  💼 Job Opening
                </div>
                <Title level={4} style={{ 
                  marginBottom: "8px",
                  color: "#1890ff",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}>
                  {vacancy.title}
                </Title>
                <p style={{ 
                  marginBottom: "12px", 
                  fontWeight: "600",
                  color: "#52c41a",
                  fontSize: "16px"
                }}>
                  🏢 {vacancy.company}
                </p>
              </div>
              
              <div style={{ flex: 1 }}>
                <Paragraph 
                  ellipsis={{ rows: 3 }}
                  style={{ 
                    color: "#595959",
                    lineHeight: "1.5",
                    marginBottom: "12px"
                  }}
                >
                  {vacancy.description}
                </Paragraph>
              </div>
              
              <div style={{
                borderTop: "1px solid #f0f0f0",
                paddingTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <p style={{ 
                  color: "#8c8c8c", 
                  fontSize: "14px",
                  margin: 0,
                  fontStyle: "italic"
                }}>
                  ⏰ Expires: {vacancy.expiryDate ? new Date(vacancy.expiryDate).toLocaleDateString() : 'No expiry'}
                </p>
                <div style={{
                  background: "#f0f0f0",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#666"
                }}>
                  Click to view
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vacancy Details Modal */}
      <Modal
        open={isModalVisible}
        title={<span style={{ color: "#1890ff", fontSize: "20px" }}>{selectedVacancy?.title}</span>}
        onCancel={closeModal}
        footer={[
          <Button key="close" type="primary" onClick={closeModal}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedVacancy && (
          <div style={{ padding: "16px 0" }}>
            <div style={{ marginBottom: "16px" }}>
              <strong style={{ color: "#262626" }}>Company:</strong>
              <p style={{ margin: "4px 0 0 0", color: "#52c41a", fontSize: "16px", fontWeight: "600" }}>
                {selectedVacancy.company}
              </p>
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <strong style={{ color: "#262626" }}>Description:</strong>
              <div style={{ 
                margin: "8px 0", 
                padding: "12px", 
                background: "#f5f5f5", 
                borderRadius: "8px",
                lineHeight: "1.6",
                color: "#595959"
              }}>
                {selectedVacancy.description}
              </div>
            </div>
            
            {selectedVacancy.applyLink && (
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#262626" }}>Apply Link:</strong>
                <div style={{ margin: "4px 0 0 0" }}>
                  <a 
                    href={selectedVacancy.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#1890ff", textDecoration: "underline" }}
                  >
                    {selectedVacancy.applyLink}
                  </a>
                </div>
              </div>
            )}
            
            <div>
              <strong style={{ color: "#262626" }}>Expiry Date:</strong>
              <p style={{ margin: "4px 0 0 0", color: "#8c8c8c", fontStyle: "italic" }}>
                {selectedVacancy.expiryDate ? new Date(selectedVacancy.expiryDate).toLocaleDateString() : 'No expiry date'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobVacancyPage;
