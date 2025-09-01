// @ts-nocheck
import React, { useState } from 'react';
import { Button, Card, Typography, message, Modal, Form, Input } from 'antd';
import { ArrowLeftOutlined, CopyOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const Batches = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.userData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // Invite Students modal state
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Dummy data for batches
  const [batches] = useState([
    {
      id: 1,
      name: 'Englis Batch 2025',
      createdBy: userData?.name || 'Abdul Muees',
      batchCode: 'PVRMYSN',
      studentsCount: 1
    },
   
  ]);

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      message.success('Batch code copied!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      message.success('Batch code copied!');
    }
  };

  const handleAddBatch = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalSave = async () => {
    try {
      const values = await form.validateFields();
      // Add batch functionality here
      message.success(`Batch "${values.batchName}" added successfully!`);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      // Form validation error
    }
  };

  const handleManage = (batchId) => {
    // Navigate to manage batch
    message.info(`Navigate to manage batch ${batchId}`);
  };

  const handleInviteStudents = (batch) => {
    setSelectedBatch(batch);
    setInviteModalVisible(true);
  };

  const handleInviteModalCancel = () => {
    setInviteModalVisible(false);
    setSelectedBatch(null);
  };

  const handleCopyInviteLink = async () => {
    if (selectedBatch) {
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
    }
  };

  const handleWhatsAppShare = () => {
    if (selectedBatch) {
      const inviteLink = `https://mueestext-lhld-git-main-muees-projects-14c95d13.vercel.app/`;
      const text = `${userData?.name || 'Your teacher'} has invited you to join a batch:\n\nBatch Name: ${selectedBatch.name}\nBatch Code: ${selectedBatch.batchCode}\n\nJoin using this link: ${inviteLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="p-4 h-min">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            shape="square" 
            className="flex items-center justify-center"
            icon={<ArrowLeftOutlined />}
          />
          <Title level={4} className="!mb-0 text-gray-700 font-local2">
            Batches
          </Title>
        </div>
        
        {/* Add Batch Button */}
        <Button
          type="primary"
          onClick={handleAddBatch}
          className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200"
          size="large"
          style={{
            height: '40px',
            borderRadius: '8px'
          }}
        >
          Add Batch
        </Button>
      </div>

      {/* Batches Card */}
      <Card 
        title="Batches"
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="w-full bg-white shadow-lg"
        bodyStyle={{ padding: '1.5rem' }}
      >
        {/* Batches List */}
        <div className="space-y-6">
          {batches.map((batch, index) => (
            <div key={batch.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              {/* Batch Number and Name */}
              <div className="flex items-start gap-3 mb-3">
                <Text className="text-gray-700 font-medium text-base font-local2">
                  {index + 1}.
                </Text>
                <div className="flex-1">
                  <Title level={5} className="!mb-1 text-gray-800 font-local2">
                    {batch.name}
                  </Title>
                </div>
              </div>

              {/* Created By */}
              <div className="ml-6 mb-2">
                <Text className="text-gray-600 text-sm font-local2">
                  <span className="font-medium text-gray-700">Created by:</span> {batch.createdBy}
                </Text>
              </div>

              {/* Batch Code */}
              <div className="ml-6 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Text className="text-gray-700 font-medium text-sm font-local2">
                    Batch Code:
                  </Text>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 px-3 py-1 rounded-md text-gray-800 font-mono text-sm">
                      {batch.batchCode}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyCode(batch.batchCode)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 font-local2"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Student Count */}
              <div className="ml-6 mb-4">
                <Text className="text-gray-600 text-sm font-local2">
                  {batch.studentsCount} student{batch.studentsCount !== 1 ? 's' : ''} in this batch.
                </Text>
              </div>

              {/* Action Buttons */}
              <div className="ml-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                     onClick={() => navigate("/batchdeatile")}
                    className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 font-local2"
                    style={{
                      height: '36px',
                      borderRadius: '6px'
                    }}
                  >
                    Manage
                  </Button>
                  <Button
                    onClick={() => handleInviteStudents(batch)}
                    className="bg-green-600 border-green-600 text-white hover:!bg-green-600 hover:!text-white hover:!border-white font-local2 hover:!bg-opacity-80"
                    style={{
                      height: '36px',
                      borderRadius: '6px'
                    }}
                  >
                    Invite Students
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add/Edit Batch Modal */}
      <Modal
        title="Add/Edit Batch Name"
        open={isModalVisible}
        onCancel={handleModalCancel}
                 footer={[
           <Button key="cancel" onClick={handleModalCancel}>
             Cancel
           </Button>,
           <Button 
             key="save" 
             type="primary" 
             onClick={handleModalSave}
             className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
                hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200"
           >
             Save
           </Button>
         ]}
        centered
        // style={{ top: 20 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="batchName"
            label="Enter Batch Name:"
            rules={[
              {
                required: true,
                message: 'Please enter batch name!'
              }
            ]}
          >
            <Input placeholder="Enter batch name" />
          </Form.Item>
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
              <Text className="text-gray-800 font-local2">{selectedBatch?.name}</Text>
            </div>
            <div className="flex justify-between">
              <Text className="text-gray-700 font-medium font-local2">Batch Code:</Text>
              <Text className="text-gray-800 font-local2">{selectedBatch?.batchCode}</Text>
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

export default Batches;