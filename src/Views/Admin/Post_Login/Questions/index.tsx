/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Button, Table, Tag, Space, Select, Input } from "antd";
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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

  const [filterClass, setFilterClass] = React.useState<string | undefined>(undefined);
  const [filterSubject, setFilterSubject] = React.useState<string | undefined>(undefined);
  const [filterBook, setFilterBook] = React.useState<string | undefined>(undefined);
  const [filterChapter, setFilterChapter] = React.useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const classOptions = React.useMemo(
    () => Array.from(new Set(DUMMY_ITEMS.map((i) => i.className))).map((v) => ({ value: v, label: v })),
    []
  );
  const subjectOptions = React.useMemo(
    () => Array.from(new Set(DUMMY_ITEMS.map((i) => i.subject))).map((v) => ({ value: v, label: v })),
    []
  );
  const bookOptions = React.useMemo(
    () => Array.from(new Set(DUMMY_ITEMS.map((i) => i.title))).map((v) => ({ value: v, label: v })),
    []
  );
  const chapterOptions = React.useMemo(
    () => Array.from(new Set(DUMMY_ITEMS.map((i) => i.chapter))).map((v) => ({ value: v, label: v })),
    []
  );

  const filtered = React.useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return DUMMY_ITEMS.filter((item) => {
      const matchClass = !filterClass || item.className === filterClass;
      const matchSubject = !filterSubject || item.subject === filterSubject;
      const matchBook = !filterBook || item.title === filterBook;
      const matchChapter = !filterChapter || item.chapter === filterChapter;
      const matchSearch = !query || [item.className, item.subject, item.title, item.chapter, item.question]
        .join(" ")
        .toLowerCase()
        .includes(query);
      return matchClass && matchSubject && matchBook && matchChapter && matchSearch;
    });
  }, [filterClass, filterSubject, filterBook, filterChapter, searchValue]);

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
            onClick={() => navigate(`/questionform/${record.id}`)}
            title="Edit"
          />
        
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Questions" backButton={true}>
        <Select
          placeholder="Filter by Class"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => setFilterClass(value)}
          className="font-local2"
          options={classOptions}
          value={filterClass}
        />
        <Select
          placeholder="Filter by Subject"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => setFilterSubject(value)}
          className="font-local2"
          options={subjectOptions}
          value={filterSubject}
        />
        <Select
          placeholder="Filter by Book"
          allowClear
          style={{ width: 200, marginRight: 8 }}
          onChange={(value) => setFilterBook(value)}
          className="font-local2"
          options={bookOptions}
          value={filterBook}
        />
        <Select
          placeholder="Filter by Chapter"
          allowClear
          style={{ width: 200, marginRight: 8 }}
          onChange={(value) => setFilterChapter(value)}
          className="font-local2"
          options={chapterOptions}
          value={filterChapter}
        />
        <Input
          placeholder="Search by name"
          prefix={<IoIosSearch className="text-gray-400" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none focus:shadow-none w-56"
          style={{
            backgroundColor: "#f9fafb",
            color: "#374151",
            border: "1px solid #d1d5db",
            marginRight: 8,
          }}
        />
        <Button
          type="primary"
          size="medium"
          style={{ backgroundColor: "#007575", borderColor: "#007575" }}
          onClick={() => navigate(`/questionform/new`)}
        >
          Create New
        </Button>
      </PageHeader>

        <Table
          className="mt-4"
          rowKey={(row: QuestionListItem) => row.id}
          columns={columns as any}
          dataSource={filtered}
          pagination={{ pageSize: 5, showSizeChanger: false }}
        />
    
    </>
  );
};

export default Questions;


