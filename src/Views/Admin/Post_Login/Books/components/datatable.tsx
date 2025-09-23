// @ts-nocheck
import React, { useState } from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import {MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onDelete, onView, data: remoteData, onChangePageParams, currentPage, pageSize, total }) => {

  const columns: any[] = [
    {
      title: <span className="font-semi">Code</span>,
      dataIndex: "bookCode",
      key: "bookCode",
      width: 60,
      render: (code: string) => <Tag className="font-local2 bg-gray-100" color="default">{code}</Tag>,
    },
    {
      title: <span className="font-semi">Book</span>,
      dataIndex: "book",
      key: "book",
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
      width: 80,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
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

  const handleTableChange = (pag: any) => {
    if (typeof onChangePageParams === 'function') {
      onChangePageParams({ page: pag.current, pageSize: pag.pageSize });
    }
  };

  return (
    <div className="mt-4">
      <Table
        columns={columns}
        dataSource={Array.isArray(remoteData) ? remoteData : []}
        pagination={{
          current: currentPage || 1,
          pageSize: pageSize || 10,
          total: total || 0,
          showSizeChanger: true,
          showQuickJumper: false,
          showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["5", "10", "20", "50"],
          itemRender: (_: any, type: any) => {
            if (type === 'page' || type === 'prev' || type === 'next' || type === 'jump-prev' || type === 'jump-next') {
              return null;
            }
            return null;
          },
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;
