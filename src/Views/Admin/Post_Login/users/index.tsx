// @ts-nocheck
import { useState } from "react";
import { Button, Table, Tag, Avatar, Input, Modal, Select } from "antd";
import { FaRegEye, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaUserCircle, FaEdit } from "react-icons/fa";
import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../Components/common/PageHeader";
import { message } from "../../../../Components/common/message/message";

const UsersTable = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");

  // Dummy data for users with and without subscription details
  const data: any[] = [
    {
      key: "1",
      id: 1,
      username: "John Smith",
      type: "Student",
      email: "john.smith@email.com",
      phoneNumber: "+91 98765 43210",
      status: "Active",
      subscription: {
        type: "Premium",
        rate: "249",
        papers: 150,
        validity: "1 Year",
        status: "Active",
        offerRate: "199",
        attempts: 15
      },
      joinDate: "2024-01-15",
      lastLogin: "2024-03-20"
    },
    {
      key: "2",
      id: 2,
      username: "Sarah Johnson",
      type: "Teacher",
      email: "sarah.johnson@email.com",
      phoneNumber: "+91 87654 32109",
      status: "Active",
      subscription: null, // No subscription
      joinDate: "2023-08-20",
      lastLogin: "2024-03-19"
    },
    {
      key: "3",
      id: 3,
      username: "Mike Wilson",
      type: "Parent",
      email: "mike.wilson@email.com",
      phoneNumber: "+91 76543 21098",
      status: "Active",
      subscription: {
        type: "Basic",
        rate: "150",
        papers: 75,
        validity: "4 Months",
        status: "Active",
        offerRate: "120",
        attempts: 8
      },
      joinDate: "2024-02-10",
      lastLogin: "2024-03-18"
    },
    {
      key: "4",
      id: 4,
      username: "Emily Davis",
      type: "Student",
      email: "emily.davis@email.com",
      phoneNumber: "+91 65432 10987",
      status: "Inactive",
      subscription: null, // No subscription
      joinDate: "2023-12-05",
      lastLogin: "2024-02-15"
    },
    {
      key: "5",
      id: 5,
      username: "David Brown",
      type: "Teacher",
      email: "david.brown@email.com",
      phoneNumber: "+91 54321 09876",
      status: "Active",
      subscription: {
        type: "Pro",
        rate: "900",
        papers: 50,
        validity: "3 Months",
        status: "Active",
        offerRate: "750",
        attempts: 5
      },
      joinDate: "2023-06-12",
      lastLogin: "2024-03-20"
    },
    {
      key: "6",
      id: 6,
      username: "Lisa Anderson",
      type: "Student",
      email: "lisa.anderson@email.com",
      phoneNumber: "+91 43210 98765",
      status: "Active",
      subscription: null, // No subscription
      joinDate: "2024-03-01",
      lastLogin: "2024-03-20"
    }
  ];

  // Handle View Click - Navigate to detail page
  const handleView = (record: any) => {
    navigate(`/detail/${record.id}`);
  };

  // Handle Edit Click - Open modal
  const handleEdit = (record: any) => {
    setSelectedUser(record);
    setNewStatus(record.status);
    setIsEditModalOpen(true);
  };

  // Handle status update
  const handleStatusUpdate = () => {
    // Update the user status in the data
    const updatedData = data.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: newStatus }
        : user
    ) 
    // Show success message
    message.success(`status updated successfully!`);
    
    // Close modal and reset state
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setNewStatus("");
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Add search logic here
  };

  // Handle refresh
  const handleRefresh = () => {
    setSearchValue("");
    // Add refresh logic here
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "Student":
        return "blue";
      case "Teacher":
        return "green";
      case "Parent":
        return "purple";
      default:
        return "default";
    }
  };

  const columns: any[] = [
    {
      title: <span className="font-semi">User</span>,
      key: "user",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center gap-3">
          <FaUserCircle size={30} color="gray" />
          <div>
            <div className="font-local2 font-semibold text-gray-900">{record.username}</div>
            <div className="text-xs text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="font-semi">Type</span>,
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <div className="flex items-center gap-2">
        
          <Tag color={getUserTypeColor(type)} className="font-local2">
            {type}
          </Tag>
        </div>
      ),
    },
    {
      title: <span className="font-semi">Contact</span>,
      key: "contact",
      width: 250,
      render: (_, record: any) => (
        <div className="space-y-1">
          <div className="font-local2 text-gray-900">{record.email}</div>
          <div className="text-sm text-gray-600">{record.phoneNumber}</div>
        </div>
      ),
    },
    {
      title: <span className="font-semi">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag 
          color={status === "Active" ? "green" : "red"} 
          className="font-local2"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: <span className="font-semi">Actions</span>,
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            icon={<FaRegEye color="black" size={18} />}
            size="small"
            onClick={() => handleView(record)}
            title="View Details"
          />
          <Button
            type="link"
            icon={<FaEdit color="orange" size={18} />}
            size="small"
            onClick={() => handleEdit(record)}
            title="Edit Status"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Users" backButton={true}>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 max-w-xs sm:max-w-md">
            <Input
              placeholder="Search by name"
              prefix={<IoIosSearch className="text-gray-400" />}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none focus:shadow-none"
              style={{
                backgroundColor: '#f9fafb',
                color: '#374151',
                border: '1px solid #d1d5db'
              }}
            />
          </div>
          <div className="hidden sm:block">
            <Button
              type="text"
              icon={<IoMdRefresh color="white"/>}
              onClick={handleRefresh}
              className="flex items-center bg-primary justify-center w-10 h-8 border border-gray-300 rounded-lg  "
              title="Refresh"
            />
          </div>
        </div>
      </PageHeader>

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
            showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} users`,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          scroll={{ x: 800 }}
          size="middle"
          className="font-local2"
          rowKey="id"
        />
      </div>

      {/* Edit Status Modal */}
      <Modal
        title="Update User Status"
        open={isEditModalOpen}
        onOk={handleStatusUpdate}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
          setNewStatus("");
        }}
        okText="Update"
        cancelText="Cancel"
        centered
        okButtonProps={{
          style: {
            backgroundColor: "#06014f",
            borderColor: "#06014f",
          },
        }}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUserCircle size={40} color="gray" />
              <div>
                <h3 className="font-local2 font-semibold text-gray-900">{selectedUser.username}</h3>
                <p className="text-sm text-gray-600">ID: {selectedUser.id}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-local2 font-medium text-gray-700">Current Status:</label>
              <Tag 
                color={selectedUser.status === "Active" ? "green" : "red"} 
                className="font-local2"
              >
                {selectedUser.status}
              </Tag>
            </div>

            <div className="space-y-2">
              <label className="font-local2 font-medium text-gray-700">New Status:</label>
              <Select
                value={newStatus}
                onChange={setNewStatus}
                className="w-full"
                placeholder="Select new status"
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              
              </Select>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Changing user status will affect their access to the platform.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UsersTable;