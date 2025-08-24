
// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import {MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    { key: "1", id: 1, rate: "249", type: "SuperPlus", papers: 150, validity: "1 Year", status: "Active", offerRate: "199", attempts: 15 },
    { key: "2", id: 2, rate: "199", type: "Super", papers: 100, validity: "6 Months", status: "Active", offerRate: "149", attempts: 10 },
    { key: "3", id: 3, rate: "900", type: "Pro", papers: 50, validity: "3 Months", status: "Inactive", offerRate: "750", attempts: 5 },
    { key: "4", id: 4, rate: "500", type: "Mini", papers: 500, validity: "2 Years", status: "Active", offerRate: "400", attempts: 25 },
    { key: "5", id: 5, rate: "150", type: "Basic", papers: 75, validity: "4 Months", status: "Active", offerRate: "120", attempts: 8 },
    { key: "6", id: 6, rate: "39", type: "Pro", papers: 300, validity: "1 Year", status: "Inactive", offerRate: "29", attempts: 20 },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Type</span>,
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => {
        const typeColors: Record<string, string> = {
          Mini: "gold",
          Basic: "red",
          Super: "green",
          Pro: "green",
          SuperPlus: "purple",
          Premium: "red",
          Standard: "blue",
        };
      
        const color = typeColors[type] || "default"; // fallback
      
        return <Tag color={color} className="font-local2">{type}</Tag>;
      }
    },
    { 
      title: <span className="font-semi">Rate</span>, 
      dataIndex: "rate", 
      key: "rate", 
      width: 100,
      render: (text: any) => <span className="font-local2">₹{text}</span>
    },
   
    { 
      title: <span className="font-semi">Papers (Count)</span>, 
      dataIndex: "papers", 
      key: "papers", 
      width: 130,
      render: (text: any) => <span className="font-local2">{text}</span>
    },
    { 
      title: <span className="font-semi">Validity</span>, 
      dataIndex: "validity", 
      key: "validity", 
      width: 120,
      render: (text: any) => <span className="font-local2">{text}</span>
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
        } else if (status === "Expired") {
          color = "orange";
          bgColor = "bg-orange-100";
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
            title="Are you sure you want to delete this subscription?"
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
        scroll={{ x: 900 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;

