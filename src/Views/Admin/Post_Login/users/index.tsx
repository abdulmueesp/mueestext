<<<<<<< HEAD
// @ts-nocheck
import { useState } from "react";
import { Button, Table, Tag, Input, Modal, Select, Popconfirm, message } from "antd";
import { FaUserCircle, FaEdit, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import PageHeader from "../../../../Components/common/PageHeader";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState<any>(null);

  // Dummy data for users
  const [data, setData] = useState<any[]>([
  	{
  	  key: "1",
  	  id: 1,
  	  schoolName: "Greenwood School",
  	  schoolCode: "GW001",
  	  executive: "John Doe",
  	  phone1: "9876543210",
  	  phone2: "",
  	  principalName: "Priya Kumar",
  	  examIncharge: "Naveen R",
  	  email: "contact@greenwood.edu",
  	  address: "12, Lakeview Road, City",
  	  username: "greenwood_admin",
  	  password: "admin123",
  	  titles: [
  	    "Alphabets Fun",
  	    "My First GK"
  	  ],
  	  status: "Active"
  	},
  	{
  	  key: "2",
  	  id: 2,
  	  schoolName: "Sunrise Public School",
  	  schoolCode: "SR002",
  	  executive: "Anita Sharma",
  	  phone1: "9123456780",
  	  phone2: "9123456781",
  	  principalName: "Rakesh Patel",
  	  examIncharge: "Latha S",
  	  email: "info@sunrise.edu",
  	  address: "45, Sunrise Ave, City",
  	  username: "sunrise_admin",
  	  password: "sunrise@123",
  	  titles: [
  	    "Basics of Computing",
  	    "Environment Around Us"
  	  ],
  	  status: "Active"
  	},
  	{
  	  key: "3",
  	  id: 3,
  	  schoolName: "Hillside Academy",
  	  schoolCode: "HS003",
  	  executive: "Meera Iyer",
  	  phone1: "9000000003",
  	  phone2: "",
  	  principalName: "Vikram Rao",
  	  examIncharge: "Sana K",
  	  email: "hello@hillside.edu",
  	  address: "9, Hill Street, City",
  	  username: "hillside_admin",
  	  password: "hillside#321",
  	  titles: [
  	    "Malayalam Reader"
  	  ],
  	  status: "Active"
  	},
  	{
  	  key: "4",
  	  id: 4,
  	  schoolName: "Riverdale High",
  	  schoolCode: "RD004",
  	  executive: "Suresh N",
  	  phone1: "9000000004",
  	  phone2: "",
  	  principalName: "Neha S",
  	  examIncharge: "Vimal T",
  	  email: "admin@riverdale.edu",
  	  address: "22, Riverside Rd, City",
  	  username: "riverdale_admin",
  	  password: "river@456",
  	  titles: [
  	    "Numbers Workbook",
  	    "Basics of Computing"
  	  ],
  	  status: "Inactive"
  	},
  	{
  	  key: "5",
  	  id: 5,
  	  schoolName: "City Central School",
  	  schoolCode: "CC005",
  	  executive: "Arun Menon",
  	  phone1: "9000000005",
  	  phone2: "9000000006",
  	  principalName: "Kiran Das",
  	  examIncharge: "Harini V",
  	  email: "central@city.edu",
  	  address: "101, Central Blvd, City",
  	  username: "citycentral_admin",
  	  password: "central!789",
  	  titles: [
  	    "Alphabets Fun",
  	    "Environment Around Us",
  	    "Malayalam Reader"
  	  ],
  	  status: "Active"
  	}
  ]);

  // Handle Edit Click - Open modal
  const handleEdit = (record: any) => {
    navigate('/schools/new', { state: { record } });
  };

  // Handle view record
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewModalOpen(true);
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

  // Create user handled in dedicated form page

  // Toggle status instead of delete
  const handleToggleStatus = (userId: number) => {
    const updatedData = data.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );
    setData(updatedData);
    message.success("Status updated successfully!");
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

  const getTitleColor = (title: string) => {
  	switch (title) {
  	  case "Numbers Workbook":
  	    return "geekblue";
  	  case "Alphabets Fun":
  	    return "volcano";
  	  case "My First GK":
  	    return "green";
  	  case "Basics of Computing":
  	    return "purple";
  	  case "Environment Around Us":
  	    return "cyan";
  	  case "Malayalam Reader":
  	    return "magenta";
  	  default:
  	    return "default";
  	}
  };

  const columns: any[] = [
  	{
  	  title: <span className="font-semi">School Name</span>,
  	  dataIndex: "schoolName",
  	  key: "schoolName",
  	  width: 220,
  	  render: (schoolName: string) => (
  	    <div className="font-local2 text-gray-700">{schoolName}</div>
  	  ),
  	},
  	{
  	  title: <span className="font-semi">Titles</span>,
  	  dataIndex: "titles",
  	  key: "titles",
  	  width: 380,
  	  render: (titles: string[]) => (
  	    <div className="flex flex-wrap gap-1">
  	      {Array.isArray(titles) && titles.map((t) => (
  	        <Tag key={t} color={getTitleColor(t)} className="font-local2">
  	        	{t}
  	        </Tag>
  	      ))}
  	    </div>
  	  ),
  	},
  	{
  	  title: <span className="font-semi">Status</span>,
  	  dataIndex: "status",
  	  key: "status",
  	  width: 120,
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
               icon={<FaEye color="black" size={18} />}
               size="small"
               onClick={() => handleView(record)}
               title="View"
             />
  	      <Button
  	        type="link"
  	        icon={<FaEdit color="orange" size={18} />}
  	        size="small"
  	        onClick={() => handleEdit(record)}
  	        title="Edit"
  	      />
          <Popconfirm
            title={`Change status for ${record.schoolName}?`}
            onConfirm={() => handleToggleStatus(record.id)}
            okText="Yes"
            cancelText="No"
          >
  	        <Button
  	          type="link"
  	          icon={<MdDeleteOutline size={18} color="red" />}
  	          size="small"
              title="Toggle Status"
  	        />
  	      </Popconfirm>
  	    </div>
  	  ),
  	},
  ];

  return (
    <>
      <PageHeader title="Schools" backButton={true}>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 max-w-sm sm:max-w-lg">
            <Input
              placeholder="Search by school name"
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
            onClick={() => navigate('/schools/new')}
            className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2 hover:!bg-gradient-to-br hover:!from-[#007575] hover:!to-[#339999]"
          >
            Create School
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
            showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} records`,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          scroll={{ x: 'max-content' }}
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
      
      {/* View Details Modal */}
      <Modal
        title={viewRecord ? viewRecord.schoolName : 'Details'}
        open={isViewModalOpen}
        footer={null}
        onCancel={() => {
          setIsViewModalOpen(false);
          setViewRecord(null);
        }}
        centered
      >
        {viewRecord && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-gray-500">School Code</div>
                <div className="font-local2">{viewRecord.schoolCode || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Executive</div>
                <div className="font-local2">{viewRecord.executive || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone 1</div>
                <div className="font-local2">{viewRecord.phone1 || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone 2</div>
                <div className="font-local2">{viewRecord.phone2 || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Principal</div>
                <div className="font-local2">{viewRecord.principalName || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Exam Incharge</div>
                <div className="font-local2">{viewRecord.examIncharge || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-local2">{viewRecord.email || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-local2">
                  <Tag color={viewRecord.status === 'Active' ? 'green' : 'red'}>{viewRecord.status}</Tag>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Address</div>
              <div className="font-local2">{viewRecord.address || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Titles</div>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(viewRecord.titles) && viewRecord.titles.map((t: string) => (
                  <Tag key={t} color={getTitleColor(t)} className="font-local2">{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      
    </>
  );
};

=======
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
        okText="Submit"
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

>>>>>>> 9ddd1c8ebc36fbd3eeed5171cff964de8878a022
export default UsersTable;