// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import {MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    { 
      key: "1", 
      id: 1, 
      name: "Linear Equations", 
      courseId: 1,
      courseName: "Advanced Algebra",
      moduleName: "Mathematics",
      description: "Solving linear equations with one and two variables", 
      order: 1,
      estimatedTime: 2.5,
      questionCount: 45,
      status: "Active"
    },
    { 
      key: "2", 
      id: 2, 
      name: "Variables and Data Types", 
      courseId: 2,
      courseName: "Python Programming",
      moduleName: "Computer Science",
      description: "Understanding Python variables, data types, and basic operations", 
      order: 1,
      estimatedTime: 3.0,
      questionCount: 60,
      status: "Active"
    },
    { 
      key: "3", 
      id: 3, 
      name: "Hamlet Analysis", 
      courseId: 3,
      courseName: "Shakespeare Studies",
      moduleName: "English Literature",
      description: "Deep dive into Shakespeare's Hamlet: themes, characters, and plot", 
      order: 2,
      estimatedTime: 4.0,
      questionCount: 35,
      status: "Active"
    },
    { 
      key: "4", 
      id: 4, 
      name: "Double Entry System", 
      courseId: 4,
      courseName: "Financial Accounting",
      moduleName: "Banking & Finance",
      description: "Principles of double entry bookkeeping and ledger accounts", 
      order: 1,
      estimatedTime: 2.0,
      questionCount: 40,
      status: "Inactive"
    },
    { 
      key: "5", 
      id: 5, 
      name: "Constitutional Framework", 
      courseId: 5,
      courseName: "Indian Polity",
      moduleName: "UPSC Preparation",
      description: "Indian Constitution: Preamble, Fundamental Rights, and Directive Principles", 
      order: 1,
      estimatedTime: 5.0,
      questionCount: 80,
      status: "Active"
    },
    { 
      key: "6", 
      id: 6, 
      name: "Content Strategy", 
      courseId: 6,
      courseName: "Social Media Marketing",
      moduleName: "Digital Marketing",
      description: "Creating engaging content strategies for social media platforms", 
      order: 3,
      estimatedTime: 2.5,
      questionCount: 50,
      status: "Active"
    },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Chapter Name</span>,
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
    },
    {
      title: <span className="font-semi">Course</span>,
      dataIndex: "courseName",
      key: "courseName",
      width: 160,
      render: (courseName: string) => <span className="font-local2 text-blue-600">{courseName}</span>
    },
    {
      title: <span className="font-semi">Module</span>,
      dataIndex: "moduleName",
      key: "moduleName",
      width: 140,
      render: (moduleName: string) => <span className="font-local2 text-purple-600">{moduleName}</span>
    },
    { 
      title: <span className="font-semi">Order</span>, 
      dataIndex: "order", 
      key: "order", 
      width: 80,
      render: (order: number) => (
        <span className="font-local2 font-bold text-lg bg-gray-100 px-2 py-1 rounded-full">
          {order}
        </span>
      )
    },
    { 
      title: <span className="font-semi">Time (Hrs)</span>, 
      dataIndex: "estimatedTime", 
      key: "estimatedTime", 
      width: 100,
      render: (time: number) => <span className="font-local2 font-semibold text-orange-600">{time}h</span>
    },
    { 
      title: <span className="font-semi">Questions</span>, 
      dataIndex: "questionCount", 
      key: "questionCount", 
      width: 100,
      render: (count: number) => <span className="font-local2 font-semibold text-green-600">{count}</span>
    },
    {
      title: <span className="font-semi">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        let color = "default";
        let bgColor = "";
        
        if (status === "Active") {
          color = "green";
          bgColor = "bg-green-100";
        } else if (status === "Inactive") {
          color = "red";
          bgColor = "bg-red-100";
        }
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: <span className="font-semi">Actions</span>,
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
        scroll={{ x: 1400 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;
