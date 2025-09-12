// @ts-nocheck
import { useState } from "react";
import { Button, Table, Tag, Input, Modal, Select, Form, Input as AntInput, Popconfirm, message } from "antd";
import { FaUserCircle, FaEdit, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import PageHeader from "../../../../Components/common/PageHeader";

const UsersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [form] = Form.useForm();
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Dummy data for users
  const [data, setData] = useState<any[]>([
    {
      key: "1",
      id: 1,
      username: "admin1",
      password: "admin123",
      type: "Admin",
      status: "Active"
    },
    {
      key: "2",
      id: 2,
      username: "user1",
      password: "user123",
      type: "User",
      status: "Active"
    },
    {
      key: "3",
      id: 3,
      username: "user2",
      password: "user456",
      type: "User",
      status: "Active"
    },
    {
      key: "4",
      id: 4,
      username: "user4",
      password: "user456",
      type: "User",
      status: "Inactive"
    },
    {
      key: "5",
      id: 5,
      username: "user5",
      password: "user789",
      type: "User",
      status: "Active"
    }
  ]);

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
    );
    setData(updatedData);
    
    // Show success message
    message.success(`Status updated successfully!`);
    
    // Close modal and reset state
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setNewStatus("");
  };

  // Handle create user
  const handleCreateUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        key: (data.length + 1).toString(),
        id: data.length + 1,
        username: values.username,
        password: values.password,
        type: "Admin",
        status: "Active"
      };
      
      setData([...data, newUser]);
      message.success("User created successfully!");
      setIsCreateModalOpen(false);
      form.resetFields();
    });
  };

  // Handle delete user
  const handleDelete = (userId: number) => {
    const updatedData = data.filter(user => user.id !== userId);
    setData(updatedData);
    message.success("User deleted successfully!");
  };

  // Toggle password visibility
  const togglePasswordVisibility = (userId: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
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
      case "Admin":
        return "red";
      case "User":
        return "blue";
      default:
        return "default";
    }
  };

  const columns: any[] = [
    {
      title: <span className="font-semi">Username</span>,
      dataIndex: "username",
      key: "username",
      width: 150,
      render: (username: string) => (
        <div className="font-local2 text-gray-500">{username}</div>
      ),
    },
   
    {
      title: <span className="font-semi">Type</span>,
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <Tag color={getUserTypeColor(type)} className="font-local2">
          {type}
        </Tag>
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
      width: 100,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            icon={<FaEdit color="orange" size={18} />}
            size="small"
            onClick={() => handleEdit(record)}
            title="Edit Status"
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<MdDeleteOutline size={18} color="red" />}
              size="small"
              title="Delete User"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Users" backButton={true}>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 max-w-sm sm:max-w-lg">
            <Input
              placeholder="Search by username"
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
          <Button
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2 hover:!bg-gradient-to-br hover:!from-[#007575] hover:!to-[#339999]"
          >
            Create
          </Button>
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
            backgroundColor: "#007575",
            borderColor: "#007575",
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
              <label className="font-local2 font-medium text-gray-700 mr-1">Current Status:</label>
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

      {/* Create User Modal */}
      <Modal
        title="Create New User"
        open={isCreateModalOpen}
        onOk={handleCreateUser}
        onCancel={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        okText="Create"
        cancelText="Cancel"
        centered
        okButtonProps={{
          style: {
            backgroundColor: "#007575",
            borderColor: "#007575",
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          className="font-local2"
        >
          <Form.Item
          required={false}
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <AntInput placeholder="Enter username" />
          </Form.Item>

          <Form.Item
          required={false}
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <AntInput.Password placeholder="Enter password" />
          </Form.Item>


          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> New users will be created as "Admin" with "Active" status by default.
            </p>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UsersTable;