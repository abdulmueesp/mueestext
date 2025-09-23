/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Row, Col, Button, Table, Tag, Space, message } from "antd";
import { FaEdit, FaPaperPlane } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";

type QuestionListItem = {
  id: string;
  className: string;
  subject: string;
  title: string;
  chapter: string;
  question: string;
  variant: string;
};

const DUMMY_ITEMS: QuestionListItem[] = [
  { id: "1A", className: "Class 10", subject: "Mathematics", title: "Algebra Basics", chapter: "Chapter 1", variant: "A", question: "What is the solution to the equation 2x + 5 = 13?" },
  { id: "1B", className: "Class 10", subject: "Mathematics", title: "Algebra Basics", chapter: "Chapter 1", variant: "B", question: "Solve: 3x - 7 = 14" },
  { id: "2A", className: "Class 11", subject: "Physics", title: "Mechanics", chapter: "Chapter 2", variant: "A", question: "Which of the following is a valid Python variable name?" },
  { id: "3A", className: "Class 12", subject: "Chemistry", title: "Organic Chemistry", chapter: "Chapter 3", variant: "A", question: "Analyze the theme of revenge in Hamlet and its impact on the main characters." },
  { id: "4A", className: "Class 10", subject: "Biology", title: "Human Anatomy", chapter: "Chapter 4", variant: "A", question: "Which of the following is NOT a current asset?" },
  { id: "5A", className: "Class 11", subject: "Computer Science", title: "Data Structures", chapter: "Chapter 5", variant: "A", question: "Which of the following is NOT guaranteed under Article 19?" },
];

const Questions: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState<string>(searchParams.get('q') || "");

  React.useEffect(() => {
    const q = searchParams.get('q') || "";
    setSearchQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return DUMMY_ITEMS.filter((item) =>
      [item.className, item.subject, item.title, item.chapter, item.question]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const columns: any[] = [
    { title: "Question", dataIndex: "question", key: "question" },
    { 
      title: "Class", 
      dataIndex: "className", 
      key: "className", 
      width: 120,
      render: (value: string) => <Tag color="geekblue">{value}</Tag>
    },
    { 
      title: "Subject", 
      dataIndex: "subject", 
      key: "subject", 
      width: 140,
      render: (value: string) => <Tag color="magenta">{value}</Tag>
    },
    { 
      title: "Book", 
      dataIndex: "title", 
      key: "title", 
      width: 180,
      render: (value: string) => <Tag color="cyan">{value}</Tag>
    },
    { title: "Chapter", dataIndex: "chapter", key: "chapter", width: 160 },
   
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: QuestionListItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<FaEdit color="orange" size={16} />}
            size="small"
            onClick={() => navigate(`/questionform/${record.id}${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`)}
            title="Edit"
          />
        
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Questions" backButton={true}>
        <Button
          type="primary"
          size="medium"
          style={{ backgroundColor: "#007575", borderColor: "#007575" }}
          onClick={() => navigate(`/questionform/new${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`)}
        >
          Create New
        </Button>
      </PageHeader>

      <Card className="w-full mt-4 shadow-md">
        <div style={{padding: 12, borderRadius: 8 }}>
          <Row gutter={16} align="middle" justify="start">
            <Col xs={24} sm={18} md={16} lg={14} xl={12}>
              <Search
                placeholder="Search by class, subject, title or chapter"
                allowClear
                enterButton
                size="large"
                onSearch={(val: string) => {
                  setSearchQuery(val);
                  setSearchParams(val ? { q: val } : {});
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setSearchParams(val ? { q: val } : {});
                }}
                value={searchQuery}
              />
            </Col>
          </Row>
        </div>

        {/* Show table only when searching; otherwise show an empty state */}
      {searchQuery.trim() ? (
          <Table
            className="mt-4"
            rowKey={(row: QuestionListItem) => row.id}
            columns={columns as any}
            dataSource={filtered}
            pagination={{ pageSize: 5, showSizeChanger: false }}
          />
        ) : (
          <div style={{ marginTop: 24, padding: 24, textAlign: 'center', color: '#888' }}>
            Start typing to search questions
          </div>
        )}
      </Card>
    </>
  );
};

export default Questions;


