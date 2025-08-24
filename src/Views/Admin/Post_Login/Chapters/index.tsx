// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select, InputNumber } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";

const { TextArea } = Input;

const Chapters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);

  // Open Modal for Create
  const showModal = () => {
    setEditingRecord(null);
    setViewRecord(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  // Close Form Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    setViewRecord(null);
    form.resetFields();
  };

  // Save Form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        message.success("Chapter updated successfully!");
      } else {
        message.success("Chapter created successfully!");
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      setViewRecord(null);
      form.resetFields();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setViewRecord(null);
    form.setFieldsValue({
      name: record.name,
      courseId: record.courseId,
      description: record.description,
      order: record.order,
      estimatedTime: record.estimatedTime,
      questionCount: record.questionCount,
      status: record.status === "Active",
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Chapter ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  return (
    <>
      <PageHeader title="Chapters" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create Chapter
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Chapter" : "Create Chapter"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
        width={800}
        okButtonProps={{
          style: {
            backgroundColor: "#007575",
            borderColor: "#007575",
          },
        }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="name" 
                label="Chapter Name" 
                rules={[{ required: true, message: 'Please enter chapter name!' }]}
              >
                <Input placeholder="Enter chapter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="courseId" 
                label="Course"
                rules={[{ required: true, message: 'Please select course!' }]}
              >
                <Select placeholder="Select course">
                  <Select.Option value={1}>Advanced Algebra - Mathematics</Select.Option>
                  <Select.Option value={2}>Python Programming - Computer Science</Select.Option>
                  <Select.Option value={3}>Shakespeare Studies - English Literature</Select.Option>
                  <Select.Option value={4}>Financial Accounting - Banking & Finance</Select.Option>
                  <Select.Option value={5}>Indian Polity - UPSC Preparation</Select.Option>
                  <Select.Option value={6}>Social Media Marketing - Digital Marketing</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="description" 
                label="Description"
                rules={[{ required: true, message: 'Please enter description!' }]}
              >
                <TextArea 
                  rows={3}
                  placeholder="Enter chapter description" 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item 
                name="order" 
                label="Chapter Order"
                rules={[{ required: true, message: 'Please enter chapter order!' }]}
              >
                <InputNumber 
                  placeholder="Order" 
                  style={{ width: "100%" }} 
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="estimatedTime" 
                label="Estimated Time (Hours)"
                rules={[{ required: true, message: 'Please enter estimated time!' }]}
              >
                <InputNumber 
                  placeholder="Time in hours" 
                  style={{ width: "100%" }} 
                  min={0.5}
                  step={0.5}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="questionCount" 
                label="Question Count"
                rules={[{ required: true, message: 'Please enter question count!' }]}
              >
                <InputNumber 
                  placeholder="Number of questions" 
                  style={{ width: "100%" }} 
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status" valuePropName="checked">
                <Switch 
                  checkedChildren="Active" 
                  unCheckedChildren="Inactive"
                  defaultChecked={true}
                  style={{ backgroundColor: '#007575' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Chapter Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
        width={700}
      >
        {viewRecord && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.name}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Course:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.courseName}</span>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Description:</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.description}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Chapter Order:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.order}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Estimated Time:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.estimatedTime} hours</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Questions:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.questionCount}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className={`font-local2 text-lg ${viewRecord.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {viewRecord.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Chapters;
