// @ts-nocheck
import React, { useState } from 'react';
import { Button, Card, Typography, Checkbox, message, Modal, Input, Select, Form } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, CopyOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Option } = Select;

const StudentsBatch = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.userData);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'remove'
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [changeBatchModal, setChangeBatchModal] = useState(false);
  const [selectedStudentForBatch, setSelectedStudentForBatch] = useState(null);
  const [changeBatchForm] = Form.useForm();
  const [form] = Form.useForm();
  
  // Performance modal states
  const [performanceModal, setPerformanceModal] = useState(false);
  const [performanceForm] = Form.useForm();
  
  // Invite Students modal state
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  // Dummy student data
  const [students] = useState([
    {
      id: 1,
      name: 'Mubaris P',
      email: 'example@examin8.com',
      batch:'Englis Batch 2025'
    }
  ]);

  // Dummy data for selectors
  const classes = [
    { value: 'class1', label: 'Class 1' },
    { value: 'class2', label: 'Class 2' },
    { value: 'class3', label: 'Class 3' },
    { value: 'class4', label: 'Class 4' },
    { value: 'class5', label: 'Class 5' },
  ];

  const batches = [
    { value: 'batch1', label: 'Batch A' },
    { value: 'batch2', label: 'Batch B' },
    { value: 'batch3', label: 'Batch C' },
    { value: 'batch4', label: 'Batch D' },
  ];

  // Performance modal data
  const modules = [
    { value: 'module1', label: 'Module 1: Introduction' },
    { value: 'module2', label: 'Module 2: Basics' },
    { value: 'module3', label: 'Module 3: Advanced' },
    { value: 'module4', label: 'Module 4: Expert' },
  ];

  const courses = [
    { value: 'course1', label: 'Mathematics' },
    { value: 'course2', label: 'Science' },
    { value: 'course3', label: 'English' },
    { value: 'course4', label: 'History' },
  ];

  const subjects = [
    { value: 'subject1', label: 'Algebra' },
    { value: 'subject2', label: 'Geometry' },
    { value: 'subject3', label: 'Calculus' },
    { value: 'subject4', label: 'Statistics' },
  ];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStudents(students.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      setSelectAll(false);
    }
  };

  const handleAddStudent = () => {
    setIsModalVisible(true);
    setShowRegistrationForm(false);
    setSearchEmail('');
    form.resetFields();
  };

  const handleInviteStudents = () => {
    setInviteModalVisible(true);
  };

  const handleInviteModalCancel = () => {
    setInviteModalVisible(false);
  };

  const handleCopyInviteLink = async () => {
    const inviteLink = `https://mueestext-lhld-git-main-muees-projects-14c95d13.vercel.app/`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      message.success('Invite link copied!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      message.success('Invite link copied!');
    }
  };

  const handleWhatsAppShare = () => {
    const inviteLink = `https://mueestext-lhld-git-main-muees-projects-14c95d13.vercel.app/`;
    const text = `${userData?.name || 'Your teacher'} has invited you to join a batch:\n\nBatch Name: ${students[0]?.batch}\nBatch Code: PVRMYSN\n\nJoin using this link: ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadCSV = () => {
    // Convert students data to CSV format
    const csvContent = convertToCSV(students);
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'students_batch.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
    message.success('CSV download started');
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    // Define CSV headers
    const headers = ['ID', 'Name', 'Email', 'Batch'];
    
    // Convert data to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(student => [
        student.id,
        `"${student.name}"`, // Wrap in quotes to handle commas in names
        student.email,
        `"${student.batch}"` // Wrap in quotes to handle commas in batch names
      ].join(','))
    ];
    
    return csvRows.join('\n');
  };

  const handleStudentAction = (action, studentName) => {
    
    
    if (action === 'Change Batch') {
      const student = students.find(s => s.name === studentName);
      setSelectedStudentForBatch(student);
      setChangeBatchModal(true);
      changeBatchForm.resetFields();
      // Set the email value in the form
      changeBatchForm.setFieldsValue({
        email: student.email
      });
    } else if(action === "Disable"){
      message.success("disabled succesfully")
    } else if(action === "Remove"){
      message.success("deleted succesfully")
    } else if(action === "Report Card"){
      navigate("/reportcard")
    } else if(action === "Performance"){
      setPerformanceModal(true);
      performanceForm.resetFields();
    }
  };

  const getPendingCount = () => {
    // Set pending count to 0 as requested
    return 0;
  };

  const handleSearchStudent = () => {
    if (!searchEmail.trim()) {
      message.warning('Please enter an email address');
      return;
    }
    // Simulate searching for existing student
    message.info("Student not found. Creating a new student...");

    // Show registration form after search
    setShowRegistrationForm(true);
  };

  const handleCreateStudent = (values) => {
    console.log('Form values:', values);
    message.success('Student created successfully!');
    setIsModalVisible(false);
    setShowRegistrationForm(false);
    setSearchEmail('');
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setShowRegistrationForm(false);
    setSearchEmail('');
    form.resetFields();
  };

  const handleRemoveStudent = () => {
    if (selectedStudents.length === 0) {
      message.warning('Please select students to remove');
      return;
    }
    setDeleteConfirmModal(true);
  };

  const handleDeleteConfirm = () => {
    // Remove selected students
    message.success(`Removed ${selectedStudents.length} student(s) successfully`);
    setSelectedStudents([]);
    setSelectAll(false);
    setDeleteConfirmModal(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmModal(false);
  };

  const handleChangeBatch = (values) => {
    console.log('Change batch values:', values);
    message.success('Batch changed successfully!');
    setChangeBatchModal(false);
    setSelectedStudentForBatch(null);
    changeBatchForm.resetFields();
  };

  const handleChangeBatchCancel = () => {
    setChangeBatchModal(false);
    setSelectedStudentForBatch(null);
    changeBatchForm.resetFields();
  };

  // Check if remove button should be enabled
  const isRemoveButtonEnabled = selectedStudents.length > 0;

  return (
    <div className="p-4 md:p-6 h-min">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          shape="square" 
          className="flex items-center justify-center"
          icon={<ArrowLeftOutlined />}
        />
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          Students
        </Title>
      </div>

      {/* Info Text and Action Buttons */}
      <Card 
      bodyStyle={{ padding: '1.5rem' }}
      title="Students"
      headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
       className="shadow-lg bg-white w-full font-local2 mb-3"
      >
        <Text className="text-gray-600 text-base mb-4 block font-local2">
          To upload students in bulk, call/WhatsApp us at +91-1234567890.
        </Text>
        
        <div className="flex flex-wrap gap-3">
          <Button
            type="primary"
            onClick={handleAddStudent}
            className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
            size="large"
            style={{ height: '40px', borderRadius: '8px' }}
          >
            Add Student
          </Button>
          <Button
            onClick={handleInviteStudents}
            className="bg-green-500 hover:bg-green-600 border-0 text-white font-local2"
            size="large"
            style={{ height: '40px', borderRadius: '8px' }}
          >
            Invite Students
          </Button>
        </div>
      </Card>

      {/* Main Students Card */}
      <Card className="w-full bg-white shadow-lg" bodyStyle={{ padding: '1.5rem' }}>
        {/* Tab Buttons and Download */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              type={activeTab === 'all' ? 'primary' : 'default'}
              onClick={() => setActiveTab('all')}
              className={`font-local2 ${activeTab === 'all' ? 'bg-blue-500' : 'border-gray-300'}`}
              style={{ borderRadius: '6px' }}
            >
              All Students
            </Button>
            <Button
              type={activeTab === 'pending' ? 'primary' : 'default'}
              onClick={() => setActiveTab('pending')}
              className={`font-local2 ${activeTab === 'pending' ? 'bg-blue-500' : 'border-gray-300'}`}
              style={{ borderRadius: '6px' }}
            >
              Pending ({getPendingCount()})
            </Button>
            <Button
              type={activeTab === 'remove' ? 'primary' : 'default'}
              onClick={() => setActiveTab('remove')}
              className={`font-local2 ${activeTab === 'remove' ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}
              style={{ borderRadius: '6px' }}
              danger={activeTab === 'remove'}
            >
              Remove Student
            </Button>
          </div>
          
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownloadCSV}
            className="text-blue-500 border-blue-500 hover:bg-blue-50 font-local2"
            style={{ borderRadius: '6px' }}
          >
            Download CSV
          </Button>
        </div>

        {/* Select All Checkbox */}
        <div className="mb-4">
          <Checkbox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="font-local2"
          >
            <Text className="text-gray-700 font-medium text-base">
              Select All Students
            </Text>
          </Checkbox>
        </div>

        {/* Students List - Only show when not on pending tab */}
        {activeTab !== 'pending' && (
          <div className="space-y-4">
            {students.map((student, index) => (
              <div key={student.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start gap-3 mb-3">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                  />
                  <Text className="text-gray-700 font-medium text-base font-local2">
                    {index + 1}.
                  </Text>
                  <div className="flex-1">
                    <Title level={5} className="!mb-1 text-gray-800 font-local2">
                      {student.name}
                    </Title>
                    <Text className="text-gray-600 text-sm font-local2">
                      <span className="font-medium">Email:</span> {student.email}
                    </Text>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="ml-8">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="small"
                      onClick={() => handleStudentAction('Performance', student.name)}
                      className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-local2"
                      style={{ borderRadius: '4px' }}
                    >
                      Performance
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleStudentAction('Change Batch', student.name)}
                      className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-local2"
                      style={{ borderRadius: '4px' }}
                    >
                      Change Batch
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleStudentAction('Report Card', student.name)}
                      className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-local2"
                      style={{ borderRadius: '4px' }}
                    >
                      Report Card
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleStudentAction('Disable', student.name)}
                      className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-white font-local2"
                      style={{ borderRadius: '4px' }}
                    >
                      Disable
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleStudentAction('Remove', student.name)}
                      className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-local2"
                      style={{ borderRadius: '4px' }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Remove Student Button - Only show when remove tab is active and students are selected */}
        {activeTab === 'remove' && (
          <div className="mt-6">
            <Button
              type="primary"
              danger
              onClick={handleRemoveStudent}
              disabled={!isRemoveButtonEnabled}
              className="font-local2"
              size="large"
              style={{ borderRadius: '8px' }}
            >
              Remove Selected Students ({selectedStudents.length})
            </Button>
          </div>
        )}
      </Card>

      {/* Add Student Modal */}
      <Modal
        title={
          <Title level={4} className="!mb-0 text-gray-700 font-local2">
            {showRegistrationForm ? 'Register New Student' : 'Add Student to Batch'}
          </Title>
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        className="font-local2"
      >
        {!showRegistrationForm ? (
          // Search Form
          <div className="space-y-4">
            <div>
              <Text className="text-gray-600 text-base mb-2 block">
                Enter student email ID to search:
              </Text>
              <Input
                placeholder="Enter student email ID"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="primary"
                onClick={handleSearchStudent}
                className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
                size="large"
                style={{ height: '40px', borderRadius: '8px' }}
              >
                Search
              </Button>
            </div>
          </div>
        ) : (
          // Registration Form
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateStudent}
            className="space-y-4"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name!' }]}
            >
              <Input
                placeholder="Enter first name"
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email ID"
              rules={[
                { required: true, message: 'Please enter email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                placeholder="Enter email ID"
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              name="class"
              label="Select Class"
              rules={[{ required: true, message: 'Please select a class!' }]}
            >
              <Select
                placeholder="Select class"
                size="large"
                style={{ borderRadius: '6px' }}
              >
                {classes.map(cls => (
                  <Option key={cls.value} value={cls.value}>
                    {cls.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="batch"
              label="Select Batch"
              rules={[{ required: true, message: 'Please select a batch!' }]}
            >
              <Select
                placeholder="Select batch"
                size="large"
                style={{ borderRadius: '6px' }}
              >
                {batches.map(batch => (
                  <Option key={batch.value} value={batch.value}>
                    {batch.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms!')),
                },
              ]}
            >
              <Checkbox className="font-local2">
                <Text className="text-gray-600 text-sm">
                  By creating an account, I accept{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a>
                  ,{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
                  {' '}and Teacher is 13 years or above.
                </Text>
              </Checkbox>
            </Form.Item>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={handleModalCancel}
                size="large"
                style={{ height: '40px', borderRadius: '8px' }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
                size="large"
                style={{ height: '40px', borderRadius: '8px' }}
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <Title level={4} className="!mb-0 text-red-600 font-local2">
            Confirm Delete
          </Title>
        }
        open={deleteConfirmModal}
        onCancel={handleDeleteCancel}
        footer={null}
        width={400}
        className="font-local2"
      >
        <div className="space-y-4">
          <Text className="text-gray-700 text-base block">
            Are you sure you want to remove {selectedStudents.length} selected student(s)? This action cannot be undone.
          </Text>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handleDeleteCancel}
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeleteConfirm}
              className="font-local2"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Batch Modal */}
      <Modal
        title={
          <Title level={4} className="!mb-0 text-gray-700 font-local2">
            Add/Edit Student
          </Title>
        }
        open={changeBatchModal}
        onCancel={handleChangeBatchCancel}
        footer={null}
        width={500}
        className="font-local2"
      >
        <Form
          form={changeBatchForm}
          layout="vertical"
          onFinish={handleChangeBatch}
          className="space-y-4"
        >
                     <Form.Item
             name="email"
             label="Email ID"
           >
             <Input
               value="mueesp123@gmail.com"
               readOnly
               size="large"
               style={{ borderRadius: '6px' }}
             />
           </Form.Item>

          <Form.Item
            name="batch"
            label="Select Batch"
            rules={[{ required: true, message: 'Please select a batch!' }]}
          >
            <Select
              placeholder="Select batch"
              size="large"
              style={{ borderRadius: '6px' }}
            >
              {batches.map(batch => (
                <Option key={batch.value} value={batch.value}>
                  {batch.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handleChangeBatchCancel}
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Performance Modal */}
      <Modal
        title={
          <Title level={4} className="!mb-0 text-gray-700 font-local2">
            Student Performance
          </Title>
        }
        open={performanceModal}
        onCancel={() => setPerformanceModal(false)}
        footer={null}
        width={600}
        className="font-local2"
      >
        <Form
          form={performanceForm}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="module"
            label="Select Module"
            rules={[{ required: true, message: 'Please select a module!' }]}
          >
            <Select
              placeholder="Select module"
              size="large"
              style={{ borderRadius: '6px' }}
            >
              {modules.map(module => (
                <Option key={module.value} value={module.value}>
                  {module.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="course"
            label="Select Course"
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select
              placeholder="Select course"
              size="large"
              style={{ borderRadius: '6px' }}
            >
              {courses.map(course => (
                <Option key={course.value} value={course.value}>
                  {course.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subject"
            label="Select Subject"
            rules={[{ required: true, message: 'Please select a subject!' }]}
          >
            <Select
              placeholder="Select subject"
              size="large"
              style={{ borderRadius: '6px' }}
            >
              {subjects.map(subject => (
                <Option key={subject.value} value={subject.value}>
                  {subject.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setPerformanceModal(false)}
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                message.info('No data available for the selected criteria');
                setPerformanceModal(false);
              }}
              className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Search
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Invite Students Modal */}
      <Modal
        title="Invite Students"
        open={inviteModalVisible}
        onCancel={handleInviteModalCancel}
        footer={null}
        width={500}
        centered
        className="font-local2"
      >
        <div className="space-y-4">
          <div className="text-center">
            <Text className="text-gray-700 text-base font-local2">
              {userData?.name || 'Muees'} or your teacher has invited you to join a batch:
            </Text>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <Text className="text-gray-700 font-medium font-local2">Batch Name:</Text>
              <Text className="text-gray-800 font-local2">{students[0]?.batch}</Text>
            </div>
            <div className="flex justify-between">
              <Text className="text-gray-700 font-medium font-local2">Batch Code:</Text>
              <Text className="text-gray-800 font-local2">PVRMYSN</Text>
            </div>
            <div className="flex justify-between">
              <Text className="text-gray-700 font-medium font-local2">Link:</Text>
              <Text className="text-blue-600 font-local2 break-all">
                https://mueestext-lhld-git-main-muees-projects-14c95d13.vercel.app/
              </Text>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCopyInviteLink}
              icon={<CopyOutlined />}
              className="flex-1 font-local2"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Copy
            </Button>
            <Button
              onClick={handleWhatsAppShare}
              icon={<WhatsAppOutlined />}
              className="flex-1 font-local2 bg-green-600 border-green-600 text-white hover:!bg-green-600 hover:!text-white hover:!border-white"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsBatch;