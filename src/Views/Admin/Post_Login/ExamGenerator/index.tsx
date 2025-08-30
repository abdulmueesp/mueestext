
// @ts-nocheck
import React from "react";
import { Card, Row, Col, Statistic, Button, Progress, Space } from "antd";
import { 
  BookOutlined, 
  ReadOutlined, 
  FileTextOutlined, 
  QuestionCircleOutlined,
  PlusOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import PageHeader from "../../../../Components/common/PageHeader";
import { useNavigate } from "react-router-dom";

const ExamGenerator = () => {
  const navigate = useNavigate();

  // Sample statistics data
  const stats = {
    totalModules: 6,
    totalCourses: 24,
    totalChapters: 156,
    totalQuestions: 3240,
    activeModules: 5,
    activeCourses: 22,
    activeChapters: 142,
    activeQuestions: 2980
  };

  const quickActions = [
    {
      title: "Create Module",
      icon: <BookOutlined />,
      color: "#007575",
      action: () => navigate("/modules")
    },
    {
      title: "Create Course",
      icon: <ReadOutlined />,
      color: "#007575",
      action: () => navigate("/courses")
    },
    {
      title: "Create Subject",
      icon: <AppstoreOutlined />,
      color: "#007575",
      action: () => navigate("/subjects")
    },
    {
      title: "Create Chapter",
      icon: <FileTextOutlined />,
      color: "#007575",
      action: () => navigate("/Chapters")
    },
    {
      title: "Create Question",
      icon: <QuestionCircleOutlined />,
      color: "#007575",
      action: () => navigate("/questions")
    }
  ];

  return (
    <>
      <PageHeader title="Exam Paper Generator" backButton={true}>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            style={{ 
              backgroundColor: "#007575", 
              borderColor: "#007575",
              boxShadow: "0 2px 8px rgba(0, 117, 117, 0.3)"
            }}
            onClick={() => navigate("/modules")}
          >
            Quick Start
          </Button>
        </Space>
      </PageHeader>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Modules</span>}
              value={stats.totalModules}
              prefix={<BookOutlined style={{ color: '#007575' }} />}
              valueStyle={{ color: '#007575', fontSize: '24px', fontWeight: '600' }}
            />
            <Progress 
              percent={Math.round((stats.activeModules / stats.totalModules) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#007575"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeModules} Active / {stats.totalModules} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Courses</span>}
              value={stats.totalCourses}
              prefix={<ReadOutlined style={{ color: '#007575' }} />}
              valueStyle={{ color: '#007575', fontSize: '24px', fontWeight: '600' }}
            />
            <Progress 
              percent={Math.round((stats.activeCourses / stats.totalCourses) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#007575"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeCourses} Active / {stats.totalCourses} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Chapters</span>}
              value={stats.totalChapters}
              prefix={<FileTextOutlined style={{ color: '#007575' }} />}
              valueStyle={{ color: '#007575', fontSize: '24px', fontWeight: '600' }}
            />
            <Progress 
              percent={Math.round((stats.activeChapters / stats.totalChapters) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#007575"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeChapters} Active / {stats.totalChapters} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Questions</span>}
              value={stats.totalQuestions}
              prefix={<QuestionCircleOutlined style={{ color: '#007575' }} />}
              valueStyle={{ color: '#007575', fontSize: '24px', fontWeight: '600' }}
            />
            <Progress 
              percent={Math.round((stats.activeQuestions / stats.totalQuestions) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#007575"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeQuestions} Active / {stats.totalQuestions} Total
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions - Single Row */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card 
            title={<span className="font-local2 text-lg" style={{ color: "#007575" }}>Quick Actions</span>}
            style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Row gutter={[12, 12]}>
              {quickActions.map((action, index) => (
                <Col xs={24} sm={12} md={8} lg={24/5} xl={24/5} key={index}>
                  <Card
                    size="small"
                    hoverable
                    className="text-center cursor-pointer transition-all duration-200"
                    onClick={action.action}
                    style={{ 
                      borderColor: action.color,
                      boxShadow: "0 2px 4px rgba(0, 117, 117, 0.2)",
                      minHeight: "80px"
                    }}
                    bodyStyle={{ padding: "12px 8px" }}
                  >
                    <div style={{ color: action.color, fontSize: '20px', marginBottom: '4px' }}>
                      {action.icon}
                    </div>
                    <div 
                      className="font-local2 font-medium text-xs" 
                      style={{ color: action.color, lineHeight: "1.2" }}
                    >
                      {action.title}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Getting Started Section */}
      <Row gutter={[16, 16]} className="mt-6 mb-6">
        <Col span={24}>
          <Card 
            title={<span className="font-local2 text-lg" style={{ color: "#007575" }}>Getting Started</span>}
            style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(0, 117, 117, 0.1)", color: "#007575" }}>
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-local2 font-semibold text-gray-800">Create Modules</div>
                      <div className="text-sm text-gray-600 mt-1">Start by creating main subject categories to organize your educational content</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(0, 117, 117, 0.1)", color: "#007575" }}>
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-local2 font-semibold text-gray-800">Create Courses</div>
                      <div className="text-sm text-gray-600 mt-1">Add courses under each module with proper access control and permissions</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(0, 117, 117, 0.1)", color: "#007575" }}>
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-local2 font-semibold text-gray-800">Create Subjects</div>
                      <div className="text-sm text-gray-600 mt-1">Add subjects and textbooks under each course to structure your curriculum</div>
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} lg={12}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(0, 117, 117, 0.1)", color: "#007575" }}>
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-local2 font-semibold text-gray-800">Create Chapters</div>
                      <div className="text-sm text-gray-600 mt-1">Organize chapters and chapter topics under each textbook for detailed content structure</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(0, 117, 117, 0.1)", color: "#007575" }}>
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-local2 font-semibold text-gray-800">Create Questions</div>
                      <div className="text-sm text-gray-600 mt-1">Add questions under chapters with different question types, proper marks allocation</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ExamGenerator;