// @ts-nocheck
import React from "react";
import { Card, Row, Col, Statistic, Button, Progress, Table, Tag, Space } from "antd";
import { 
  BookOutlined, 
  ReadOutlined, 
  FileTextOutlined, 
  QuestionCircleOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined
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

  // Sample recent questions data
  const recentQuestions = [
    {
      key: "1",
      question: "What is the solution to the equation 2x + 5 = 13?",
      type: "MCQ",
      chapter: "Linear Equations",
      course: "Advanced Algebra",
      difficulty: "Easy",
      marks: 2,
      status: "Active"
    },
    {
      key: "2",
      question: "Which of the following is a valid Python variable name?",
      type: "MCQ",
      chapter: "Variables and Data Types",
      course: "Python Programming",
      difficulty: "Easy",
      marks: 1,
      status: "Active"
    },
    {
      key: "3",
      question: "Hamlet is considered one of Shakespeare's greatest tragedies.",
      type: "T/F",
      chapter: "Hamlet Analysis",
      course: "Shakespeare Studies",
      difficulty: "Medium",
      marks: 1,
      status: "Active"
    },
    {
      key: "4",
      question: "Explain the significance of Fundamental Rights in the Indian Constitution.",
      type: "Essay",
      chapter: "Constitutional Framework",
      course: "Indian Polity",
      difficulty: "Hard",
      marks: 10,
      status: "Active"
    }
  ];

  const questionColumns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string) => (
        <div className="max-w-xs">
          <div className="font-local2 text-sm text-gray-900">
            {text.length > 60 ? `${text.substring(0, 60)}...` : text}
          </div>
        </div>
      )
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 80,
      render: (type: string) => {
        const colors: Record<string, string> = {
          "MCQ": "blue",
          "T/F": "green",
          "Essay": "red",
          "Short": "purple",
          "Fill": "orange"
        };
        return <Tag color={colors[type] || "default"}>{type}</Tag>;
      }
    },
    {
      title: "Chapter",
      dataIndex: "chapter",
      key: "chapter",
      width: 120,
      render: (text: string) => <span className="font-local2 text-blue-600">{text}</span>
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 100,
      render: (difficulty: string) => {
        const colors: Record<string, string> = {
          "Easy": "green",
          "Medium": "orange",
          "Hard": "red"
        };
        return <Tag color={colors[difficulty] || "default"}>{difficulty}</Tag>;
      }
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      width: 80,
      render: (marks: number) => (
        <span className="font-local2 font-bold text-green-600">{marks}</span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: () => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" />
          <Button type="link" icon={<EditOutlined />} size="small" />
        </Space>
      )
    }
  ];

  const quickActions = [
    {
      title: "Create Module",
      icon: <BookOutlined />,
      color: "#1890ff",
      action: () => navigate("/modules")
    },
    {
      title: "Create Course",
      icon: <ReadOutlined />,
      color: "#52c41a",
      action: () => navigate("/admin/courses")
    },
    {
      title: "Create Chapter",
      icon: <FileTextOutlined />,
      color: "#faad14",
      action: () => navigate("/admin/chapters")
    },
    {
      title: "Create Question",
      icon: <QuestionCircleOutlined />,
      color: "#f5222d",
      action: () => navigate("/admin/questions")
    }
  ];

  return (
    <>
      <PageHeader title="Exam Paper Generator" backButton={true}>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#007575", borderColor: "#007575" }}
            onClick={() => navigate("/admin/modules")}
          >
            Quick Start
          </Button>
        </Space>
      </PageHeader>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Modules</span>}
              value={stats.totalModules}
              prefix={<BookOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontSize: '24px' }}
            />
            <Progress 
              percent={Math.round((stats.activeModules / stats.totalModules) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#1890ff"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeModules} Active / {stats.totalModules} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Courses</span>}
              value={stats.totalCourses}
              prefix={<ReadOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontSize: '24px' }}
            />
            <Progress 
              percent={Math.round((stats.activeCourses / stats.totalCourses) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#52c41a"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeCourses} Active / {stats.totalCourses} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Chapters</span>}
              value={stats.totalChapters}
              prefix={<FileTextOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14', fontSize: '24px' }}
            />
            <Progress 
              percent={Math.round((stats.activeChapters / stats.totalChapters) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#faad14"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeChapters} Active / {stats.totalChapters} Total
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span className="font-local2 text-gray-600">Total Questions</span>}
              value={stats.totalQuestions}
              prefix={<QuestionCircleOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d', fontSize: '24px' }}
            />
            <Progress 
              percent={Math.round((stats.activeQuestions / stats.totalQuestions) * 100)} 
              size="small" 
              className="mt-2"
              strokeColor="#f5222d"
            />
            <div className="text-xs text-gray-500 mt-1">
              {stats.activeQuestions} Active / {stats.totalQuestions} Total
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card title={<span className="font-local2 text-lg">Quick Actions</span>}>
            <Row gutter={[16, 16]}>
              {quickActions.map((action, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card
                    hoverable
                    className="text-center cursor-pointer"
                    onClick={action.action}
                    style={{ borderColor: action.color }}
                  >
                    <div style={{ color: action.color, fontSize: '32px', marginBottom: '8px' }}>
                      {action.icon}
                    </div>
                    <div className="font-local2 font-semibold" style={{ color: action.color }}>
                      {action.title}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Recent Questions */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card 
            title={<span className="font-local2 text-lg">Recent Questions</span>}
            extra={
              <Button 
                type="link" 
                onClick={() => navigate("/admin/questions")}
                style={{ color: '#007575' }}
              >
                View All
              </Button>
            }
          >
            <Table
              columns={questionColumns}
              dataSource={recentQuestions}
              pagination={false}
              size="small"
              className="font-local2"
            />
          </Card>
        </Col>
      </Row>

      {/* System Overview */}
      <Row gutter={[16, 16]} className="mt-6 mb-6">
        <Col xs={24} lg={12}>
          <Card title={<span className="font-local2 text-lg">System Overview</span>}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-local2 text-gray-600">Content Structure</span>
                <span className="font-local2 font-semibold">Hierarchical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-local2 text-gray-600">Language Support</span>
                <span className="font-local2 font-semibold">English + Malayalam</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-local2 text-gray-600">Question Types</span>
                <span className="font-local2 font-semibold">MCQ, T/F, Fill, Short, Essay</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-local2 text-gray-600">Access Control</span>
                <span className="font-local2 font-semibold">Free, Premium, Subscription</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-local2 text-gray-600">Difficulty Levels</span>
                <span className="font-local2 font-semibold">Easy, Medium, Hard</span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<span className="font-local2 text-lg">Getting Started</span>}>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-local2 font-semibold">Create Modules</div>
                  <div className="text-sm text-gray-600">Start by creating main subject categories</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-local2 font-semibold">Add Courses</div>
                  <div className="text-sm text-gray-600">Create courses under each module with access control</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 text-yellow-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-local2 font-semibold">Organize Chapters</div>
                  <div className="text-sm text-gray-600">Structure content into logical chapters</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  4
                </div>
                <div>
                  <div className="font-local2 font-semibold">Create Questions</div>
                  <div className="text-sm text-gray-600">Add questions with Malayalam support and marks</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ExamGenerator;
