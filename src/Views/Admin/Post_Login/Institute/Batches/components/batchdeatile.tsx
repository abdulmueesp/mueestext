

// @ts-nocheck
import React, { useState } from "react";
import { Button, Card, Typography, Modal, Form, Input, message } from "antd";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import students from "../../../../../../assets/Students.png"
import teachers from "../../../../../../assets/Teachers.png"
import overall from "../../../../../../assets/Syllabus.png"
import mypapers from "../../../../../../assets/Dynamic Blueprints.png"
import videoss from "../../../../../../assets/mypapers.png"
import material from "../../../../../../assets/Blueprints.png"
const { Title, Text } = Typography;

const BatchDeatile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.userData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // Invite Students modal state
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  
  // Dummy data for the batch
  const [batchData] = useState({
    name: "Englis Batch 2025",
    batchCode: "PVRMYSN",
    students: 1,
    teachers: 0,
    videos: 0,
    pdfFiles: 0,
    links: 0
  });

  const performBoxes = [
   
    {
      title: "Overall",
      color: "bg-gradient-to-br from-blue-400/60 to-blue-500/60",
      image: overall,
      path: "/overall",
    },
]
const accountBoxes = [
    {
      title: "Videos",
      color: "bg-gradient-to-br from-purple-400/60 to-purple-500/60",
      image: videoss,
      path: "/uploads",
    },
    {
      title: "Study Material",
      color: "bg-gradient-to-br from-indigo-400/60 to-indigo-500/60",
      image: material,
      path: "/uploads",
    },
    {
      title: "My Papers",
      color: "bg-gradient-to-br from-pink-400/60 to-pink-500/60",
      image: mypapers,
      path: "/uploads",
    },
]

  const instituteBoxes = [
   
    {
      title: "Students",
      color: "bg-gradient-to-br from-blue-400/60 to-blue-500/60",
      image: students,
      path: "/students/1",
    },
    {
      title: "Teachers",
      color: "bg-gradient-to-br from-teal-600/60 to-teal-700/60",
      image: teachers,
      path: "/teachers",
    },
  ];

  const handleBoxClick = (path) => {
    navigate(path);
  };

  const handleEdit = () => {
    form.setFieldsValue({ batchName: batchData.name });
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleEditModalSave = async () => {
    try {
      const values = await form.validateFields();
      // Update batch name functionality here
      message.success(`Batch name updated to "${values.batchName}" successfully!`);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      // Form validation error
    }
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    // Delete batch functionality here
    message.success("Batch deleted successfully!");
    setIsDeleteModalVisible(false);
    navigate(-1);
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
    const text = `${userData?.name || 'Your teacher'} has invited you to join a batch:\n\nBatch Name: ${batchData.name}\nBatch Code: ${batchData.batchCode}\n\nJoin using this link: ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-6 h-min">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          shape="square"
          className="flex items-center justify-center"
        >
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          Batch - {batchData.name}
        </Title>
      </div>

      <Card
        title={
          <div className="flex items-center justify-between w-full pr-1">
            <span>Institute</span>
            <Button
              onClick={handleInviteStudents}
              size="small"
              className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 hover:scale-105"
              style={{
                height: "40px",
                borderRadius: "8px",
                minWidth: "90px",
              }}
            >
              Invite Students
            </Button>
          </div>
        }
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Institute Boxes Flex */}
         <div className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-[55px]">
           {instituteBoxes.map((institute, index) => (
             <div key={index} className="flex flex-col items-center mb-4 flex-shrink-0">
               <div
                 onClick={() => handleBoxClick(institute.path)}
                 className={`${institute.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={institute.image}
                    alt={institute.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {institute.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>
      <Card
        title={
          <div className="flex items-center justify-between w-full pr-1">
            <span>Student Performance</span>
            
          </div>
        }
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Institute Boxes Flex */}
         <div className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-[55px]">
           {performBoxes.map((institute, index) => (
             <div key={index} className="flex flex-col items-center mb-4 flex-shrink-0">
               <div
                 onClick={() => handleBoxClick(institute.path)}
                 className={`${institute.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={institute.image}
                    alt={institute.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {institute.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>

      <Card
        title={
          <div className="flex items-center justify-between w-full pr-1">
            <span>Resources</span>
            
          </div>
        }
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Institute Boxes Flex */}
         <div className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-[55px]">
           {accountBoxes.map((institute, index) => (
             <div key={index} className="flex flex-col items-center mb-4 flex-shrink-0">
               <div
                 onClick={() => handleBoxClick(institute.path)}
                 className={`${institute.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={institute.image}
                    alt={institute.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {institute.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>
      <Card
        title={
          <div className="flex items-center justify-between w-full pr-1">
            <span>Summary</span>
            
          </div>
        }
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
        {/* Summary Data */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="text-center">
            <Text className="text-gray-600 text-sm font-local2">Students</Text>
            <div className="text-2xl font-bold text-blue-600 font-local2">{batchData.students}</div>
          </div>
          <div className="text-center">
            <Text className="text-gray-600 text-sm font-local2">Teachers</Text>
            <div className="text-2xl font-bold text-teal-600 font-local2">{batchData.teachers}</div>
          </div>
          <div className="text-center">
            <Text className="text-gray-600 text-sm font-local2">Videos</Text>
            <div className="text-2xl font-bold text-purple-600 font-local2">{batchData.videos}</div>
          </div>
          <div className="text-center">
            <Text className="text-gray-600 text-sm font-local2">PDF Files</Text>
            <div className="text-2xl font-bold text-indigo-600 font-local2">{batchData.pdfFiles}</div>
          </div>
          <div className="text-center">
            <Text className="text-gray-600 text-sm font-local2">Links</Text>
            <div className="text-2xl font-bold text-pink-600 font-local2">{batchData.links}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleEdit}
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 font-local2"
            style={{
              height: '40px',
              borderRadius: '8px',
              minWidth: '100px'
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            danger
            className="font-local2"
            style={{
              height: '40px',
              borderRadius: '8px',
              minWidth: '100px'
            }}
          >
            Delete
          </Button>
        </div>
      </Card>

      {/* Edit Batch Modal */}
      <Modal
        title="Edit Batch Name"
        open={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Cancel
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={handleEditModalSave}
            className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
               hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200"
          >
            Save
          </Button>
        ]}
        centered
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

      {/* Delete Batch Modal */}
      <Modal
        title="Delete Batch"
        open={isDeleteModalVisible}
        onCancel={handleDeleteModalCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteModalCancel}>
            Close
          </Button>,
          <Button 
            key="delete" 
            danger 
            onClick={handleDeleteConfirm}
            className="font-local2"
          >
            Delete
          </Button>
        ]}
        centered
      >
        <div className="py-4">
          <Text className="text-gray-700 text-base font-local2">
            Are you sure you want to delete this batch?
          </Text>
        </div>
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
              <Text className="text-gray-800 font-local2">{batchData.name}</Text>
            </div>
            <div className="flex justify-between">
              <Text className="text-gray-700 font-medium font-local2">Batch Code:</Text>
              <Text className="text-gray-800 font-local2">{batchData.batchCode}</Text>
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
              icon={<Copy size={16} />}
              className="flex-1 font-local2"
              size="large"
              style={{ height: '40px', borderRadius: '8px' }}
            >
              Copy
            </Button>
            <Button
              onClick={handleWhatsAppShare}
              icon={<Share2 size={16} />}
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

export default BatchDeatile;
