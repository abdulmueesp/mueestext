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
      name: "Mathematics", 
      description: "Advanced mathematics including algebra, calculus, and geometry", 
      status: "Active",
    },
    { 
      key: "2", 
      id: 2, 
      name: "Computer Science", 
      description: "Programming, algorithms, and software development", 
      status: "Active",
    },
    { 
      key: "3", 
      id: 3, 
      name: "English Literature", 
      description: "Classic and modern English literature studies", 
      status: "Active",
    },
    { 
      key: "4", 
      id: 4, 
      name: "Banking & Finance", 
      description: "Financial management and banking operations", 
      status: "Inactive",
    },
    { 
      key: "5", 
      id: 5, 
      name: "UPSC Preparation", 
      description: "Civil services examination preparation", 
      status: "Active",
     
    },
    { 
      key: "6", 
      id: 6, 
      name: "Digital Marketing", 
      description: "Modern digital marketing strategies and tools", 
      status: "Active",
    
    },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Module Name</span>,
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
    },
   
    { 
      title: <span className="font-semi">Description</span>, 
      dataIndex: "description", 
      key: "description", 
      width: 250,
      render: (text: any) => (
        <span className="font-local2 text-sm text-gray-600">
          {text.length > 60 ? `${text.substring(0, 60)}...` : text}
        </span>
      )
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
            title="Are you sure you want to delete this module?"
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
        scroll={{ x: 1200 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;
