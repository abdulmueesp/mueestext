
// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    { key: "1", id: 1, rate: "249", type: "Premium", papers: 150, validity: "1 Year", status: "Active" },
    { key: "2", id: 2, rate: "199", type: "Standard", papers: 100, validity: "6 Months", status: "Active" },
    { key: "3", id: 3, rate: "900", type: "Basic", papers: 50, validity: "3 Months", status: "Inactive" },
    { key: "4", id: 4, rate: "500", type: "Enterprise", papers: 500, validity: "2 Years", status: "Active" },
    { key: "5", id: 5, rate: "150", type: "Student", papers: 75, validity: "4 Months", status: "Active" },
    { key: "6", id: 6, rate: "39", type: "Professional", papers: 300, validity: "1 Year", status: "Expired" },
  ];

  const columns: any[] = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Rate", dataIndex: "rate", key: "rate", width: 100 },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: any) => {
        let color = "blue";
        if (type === "Premium" || type === "Ultimate" || type === "Enterprise") color = "gold";
        else if (type === "Basic" || type === "Trial") color = "green";
        else if (type === "Student") color = "purple";
        return <Tag color={color}>{type}</Tag>;
      },
    },
    { title: "Papers (Count)", dataIndex: "papers", key: "papers", width: 130 },
    { title: "Validity", dataIndex: "validity", key: "validity", width: 120 },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EyeOutlined className="text-black text-lg" />}
            size="small"
            onClick={() => onView(record)}
          />
          <Button
            type="link"
            icon={<EditOutlined className="text-black text-lg" />}
            size="small"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this subscription?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined className="text-red-500 text-lg" />}
              size="small"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
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
        scroll={{ x: 800 }}
        size="middle"
        // bordered
      />
    </div>
  );
};

export default Datatable;
