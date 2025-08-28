// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ChaptersTable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    {
      key: "1",
      id: 1,
      chapterName: "Linear Equations",
      module: "Mathematics",
      course: "Advanced Algebra",
      subjectName: "Advanced Calculus",
      textbookName: "Calculus: Early Transcendentals",
      status: true
    },
    {
      key: "2",
      id: 2,
      chapterName: "Variables and Data Types",
      module: "Computer Science",
      course: "Python Programming",
      subjectName: "Data Structures & Algorithms",
      textbookName: "Introduction to Algorithms",
      status: true
    },
    {
      key: "3",
      id: 3,
      chapterName: "Hamlet Analysis",
      module: "English Literature",
      course: "Shakespeare Studies",
      subjectName: "Shakespearean Literature",
      textbookName: "The Complete Works of William Shakespeare",
      status: false
    },
    {
      key: "4",
      id: 4,
      chapterName: "Financial Statements",
      module: "Banking & Finance",
      course: "Financial Accounting",
      subjectName: "Corporate Finance",
      textbookName: "Principles of Corporate Finance",
      status: true
    },
    {
      key: "5",
      id: 5,
      chapterName: "Fundamental Rights",
      module: "UPSC Preparation",
      course: "Indian Polity",
      subjectName: "Constitutional Law",
      textbookName: "Indian Constitution by D.D. Basu",
      status: true
    },
    {
      key: "6",
      id: 6,
      chapterName: "Content Strategy",
      module: "Digital Marketing",
      course: "Social Media Marketing",
      subjectName: "Social Media Strategy",
      textbookName: "Social Media Marketing Strategy Guide",
      status: false
    }
  ];

  const columns: any[] = [
    {
      title: <span className="font-semibold">Textbook Name</span>,
      dataIndex: "textbookName",
      key: "textbookName",
      width: 250,
      render: (name: string) => <span className="font-local2 text-purple-600">{name}</span>
    },
    {
      title: <span className="font-semibold">Subject Name</span>,
      dataIndex: "subjectName",
      key: "subjectName",
      width: 200,
      render: (name: string) => <span className="font-local2 text-green-600">{name}</span>
    },
    {
      title: <span className="font-semibold">Course</span>,
      dataIndex: "course",
      key: "course",
      width: 160,
      render: (course: string) => <span className="font-local2 text-blue-600">{course}</span>
    },
    {
      title: <span className="font-semibold">Module</span>,
      dataIndex: "module",
      key: "module",
      width: 150,
      render: (module: string) => <span className="font-local2 text-orange-600">{module}</span>
    },
    {
      title: <span className="font-semibold">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: boolean) => {
        const color = status ? "green" : "red";
        const bgColor = status ? "bg-green-100" : "bg-red-100";
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {status ? "Active" : "Inactive"}
          </Tag>
        );
      },
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
            title="Are you sure you want to delete this chapter?"
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
        scroll={{ x: 1600 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default ChaptersTable;