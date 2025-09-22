// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import {MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const SUBJECTS = [
    "Malayalam",
    "English",
    "Maths",
    "GK",
    "Computer",
    "EVS",
    "Social Science",
    "Science",
  ];

  const CLASSES = ["0", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8"];

  const data: any[] = [
    { key: "1", id: 1, title: "Numbers Workbook", subject: "Maths", class: "1" },
    { key: "2", id: 2, title: "Alphabets Fun", subject: "English", class: "LKG" },
    { key: "3", id: 3, title: "My First GK", subject: "GK", class: "UKG" },
    { key: "4", id: 4, title: "Basics of Computing", subject: "Computer", class: "3" },
    { key: "5", id: 5, title: "Environment Around Us", subject: "EVS", class: "2" },
    { key: "6", id: 6, title: "Malayalam Reader", subject: "Malayalam", class: "5" },
    { key: "7", id: 7, title: "General Science", subject: "Science", class: "6" },
    { key: "8", id: 8, title: "Our Society", subject: "Social Science", class: "7" },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Title</span>,
      dataIndex: "title",
      key: "title",
      width: 220,
      render: (title: string) => <span className="font-local2 font-semibold">{title}</span>,
    },
    {
      title: <span className="font-semi">Subject</span>,
      dataIndex: "subject",
      key: "subject",
      width: 140,
      render: (subject: string) => <Tag className="font-local2 bg-blue-100" color="blue">{subject}</Tag>,
    },
    {
      title: <span className="font-semi">Class</span>,
      dataIndex: "class",
      key: "class",
      width: 100,
      render: (cls: string) => <Tag className="font-local2 bg-gray-100" color="default">{cls}</Tag>,
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
            icon={<FaEdit color="orange" size={18} />}
            size="small"
            onClick={() => onEdit(record)}
            title="Edit"
          />
          <Popconfirm
            title="Are you sure you want to delete this book?"
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
