
// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    {
      key: "1",
      id: 1,
      className: "Class 10",
      subject: "Mathematics",
      title: "Algebra Basics",
      chapter: "Chapter 1",
      examType: "Unit Test",
      totalQuestions: 3,
      questionTypes: ["MCQ", "Fill Blank", "Short Answer"],
      status: "Active"
    },
    {
      key: "2",
      id: 2,
      className: "Class 11",
      subject: "Physics", 
      title: "Mechanics",
      chapter: "Chapter 2",
      examType: "1 Midterm",
      totalQuestions: 2,
      questionTypes: ["MCQ", "Short Answer"],
      status: "Active"
    },
    {
      key: "3",
      id: 3,
      className: "Class 12",
      subject: "Chemistry",
      title: "Organic Chemistry",
      chapter: "Chapter 3",
      examType: "1 Term",
      totalQuestions: 1,
      questionTypes: ["Essay"],
      status: "Inactive"
    },
    {
      key: "4",
      id: 4,
      className: "Class 10",
      subject: "Biology",
      title: "Human Anatomy",
      chapter: "Chapter 4",
      examType: "2 Midterm",
      totalQuestions: 3,
      questionTypes: ["MCQ", "Fill Blank", "Short Answer"],
      status: "Active"
    },
    {
      key: "5",
      id: 5,
      className: "Class 11",
      subject: "Computer Science",
      title: "Data Structures",
      chapter: "Chapter 5",
      examType: "2 Term",
      totalQuestions: 4,
      questionTypes: ["MCQ", "Essay", "Fill Blank", "Matching"],
      status: "Active"
    },
    {
      key: "6",
      id: 6,
      className: "Class 12",
      subject: "Mathematics",
      title: "Calculus",
      chapter: "Chapter 6",
      examType: "Unit Test",
      totalQuestions: 4,
      questionTypes: ["Short Answer", "Fill Blank", "MCQ", "Matching"],
      status: "Inactive"
    }
  ];

  const columns: any[] = [
    {
      title: <span className="font-semibold">Class</span>,
      dataIndex: "className",
      key: "className",
      width: 140,
      render: (value: string) => <span className="font-local2 text-orange-600 font-semibold">{value}</span>
    },
    {
      title: <span className="font-semibold">Subject</span>,
      dataIndex: "subject",
      key: "subject",
      width: 160,
      render: (value: string) => <span className="font-local2 text-green-600">{value}</span>
    },
    {
      title: <span className="font-semibold">Title</span>,
      dataIndex: "title",
      key: "title",
      width: 220,
      render: (value: string) => <span className="font-local2 text-purple-600">{value}</span>
    },
    {
      title: <span className="font-semibold">Chapter</span>,
      dataIndex: "chapter",
      key: "chapter",
      width: 140,
      render: (value: string) => <span className="font-local2 text-indigo-600 font-semibold">{value}</span>
    },
    // {
    //   title: <span className="font-semibold">Exam Type</span>,
    //   dataIndex: "examType",
    //   key: "examType",
    //   width: 140,
    //   render: (value: string) => <span className="font-local2 text-blue-600">{value}</span>
    // },
   
    {
      title: <span className="font-semibold">Total Questions</span>,
      dataIndex: "totalQuestions",
      key: "totalQuestions",
      width: 120,
      align: 'center',
      render: (count: number) => (
        <span className="font-local2 font-bold text-lg bg-blue-100 px-3 py-1 rounded-full text-blue-700">
          {count}
        </span>
      )
    },
    {
      title: <span className="font-semibold">Question Types</span>,
      dataIndex: "questionTypes",
      key: "questionTypes",
      width: 200,
      render: (types: string[]) => (
        <div className="flex flex-wrap gap-1">
          {types.map((type, index) => {
            const typeColors: Record<string, string> = {
              "MCQ": "blue",
              "True/False": "green",
              "Fill Blank": "orange",
              "Short Answer": "purple",
              "Essay": "red",
              "Matching": "cyan",
            };
            return (
              <Tag key={index} color={typeColors[type]} className="font-local2 text-xs">
                {type}
              </Tag>
            );
          })}
        </div>
      )
    },
   
    {
      title: <span className="font-semibold">Actions</span>,
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<FaRegEye color="black" size={18} />}
            size="small"
            onClick={() => onView(record)}
            title="View"
          />
          <Button
            type="link"
            icon={<FaEdit color="orange" size={18}/>}
            size="small"
            onClick={() => onEdit(record)}
            title="Edit"
          />
          <Popconfirm
            title="Are you sure you want to delete all questions in this set?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<MdDeleteOutline size={18} color="red" />}
              size="small"
              title="Delete"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 10,
          total: data.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        scroll={{ x: 1800 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;