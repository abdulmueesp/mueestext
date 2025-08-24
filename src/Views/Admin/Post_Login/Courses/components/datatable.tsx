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
      name: "Advanced Algebra", 
      moduleId: 1,
      moduleName: "Mathematics",
      description: "Comprehensive study of algebraic concepts including polynomials, equations, and functions", 
      accessType: "premium",
      price: 299,
      duration: 25,
      chapterCount: 8,
      status: "Active",
      questionCount: 450
    },
    { 
      key: "2", 
      id: 2, 
      name: "Python Programming", 
      moduleId: 2,
      moduleName: "Computer Science",
      description: "Learn Python programming from basics to advanced concepts", 
      accessType: "free",
      price: 0,
      duration: 30,
      chapterCount: 12,
      status: "Active",
      questionCount: 600
    },
    { 
      key: "3", 
      id: 3, 
      name: "Shakespeare Studies", 
      moduleId: 3,
      moduleName: "English Literature",
      description: "In-depth analysis of Shakespeare's major works and themes", 
      accessType: "subscription",
      price: 199,
      duration: 20,
      chapterCount: 6,
      status: "Active",
      questionCount: 300
    },
    { 
      key: "4", 
      id: 4, 
      name: "Financial Accounting", 
      moduleId: 4,
      moduleName: "Banking & Finance",
      description: "Principles and practices of financial accounting", 
      accessType: "premium",
      price: 399,
      duration: 35,
      chapterCount: 10,
      status: "Inactive",
      questionCount: 500
    },
    { 
      key: "5", 
      id: 5, 
      name: "Indian Polity", 
      moduleId: 5,
      moduleName: "UPSC Preparation",
      description: "Complete coverage of Indian political system and constitution", 
      accessType: "subscription",
      price: 149,
      duration: 40,
      chapterCount: 15,
      status: "Active",
      questionCount: 800
    },
    { 
      key: "6", 
      id: 6, 
      name: "Social Media Marketing", 
      moduleId: 6,
      moduleName: "Digital Marketing",
      description: "Strategies for effective social media marketing campaigns", 
      accessType: "premium",
      price: 249,
      duration: 18,
      chapterCount: 7,
      status: "Active",
      questionCount: 350
    },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Course Name</span>,
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
    },
    {
      title: <span className="font-semi">Module</span>,
      dataIndex: "moduleName",
      key: "moduleName",
      width: 140,
      render: (moduleName: string) => <span className="font-local2 text-blue-600">{moduleName}</span>
    },
    {
      title: <span className="font-semi">Access Type</span>,
      dataIndex: "accessType",
      key: "accessType",
      width: 120,
      render: (accessType: string) => {
        const typeColors: Record<string, string> = {
          free: "green",
          premium: "purple",
          subscription: "blue",
        };
      
        const color = typeColors[accessType] || "default";
      
        return <Tag color={color} className="font-local2 capitalize">{accessType}</Tag>;
      }
    },
    { 
      title: <span className="font-semi">Price (₹)</span>, 
      dataIndex: "price", 
      key: "price", 
      width: 100,
      render: (price: number, record: any) => (
        <span className={`font-local2 font-semibold ${
          record.accessType === 'free' ? 'text-green-600' : 'text-purple-600'
        }`}>
          {record.accessType === 'free' ? 'Free' : `₹${price}`}
        </span>
      )
    },
    { 
      title: <span className="font-semi">Duration</span>, 
      dataIndex: "duration", 
      key: "duration", 
      width: 100,
      render: (duration: number) => <span className="font-local2">{duration}h</span>
    },
    { 
      title: <span className="font-semi">Chapters</span>, 
      dataIndex: "chapterCount", 
      key: "chapterCount", 
      width: 100,
      render: (count: number) => <span className="font-local2 font-semibold text-blue-600">{count}</span>
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
            title="Are you sure you want to delete this course?"
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
