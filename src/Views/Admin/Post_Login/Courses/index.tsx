// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select, InputNumber, Radio } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";

const { TextArea } = Input;

const Courses = () => {
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
        message.success("Course updated successfully!");
      } else {
        message.success("Course created successfully!");
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
      moduleId: record.moduleId,
      description: record.description,
      price: record.price,
      accessType: record.accessType,
      duration: record.duration,
      chapterCount: record.chapterCount,
      status: record.status === "Active",
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Course ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  return (
    <>
      <PageHeader title="Courses" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create Course
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Course" : "Create Course"}
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
                label="Course Name" 
                rules={[{ required: true, message: 'Please enter course name!' }]}
              >
                <Input placeholder="Enter course name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="moduleId" 
                label="Module"
                rules={[{ required: true, message: 'Please select module!' }]}
              >
                <Select placeholder="Select module">
                  <Select.Option value={1}>Mathematics</Select.Option>
                  <Select.Option value={2}>Computer Science</Select.Option>
                  <Select.Option value={3}>English Literature</Select.Option>
                  <Select.Option value={4}>Banking & Finance</Select.Option>
                  <Select.Option value={5}>UPSC Preparation</Select.Option>
                  <Select.Option value={6}>Digital Marketing</Select.Option>
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
                  placeholder="Enter course description" 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="accessType" 
                label="Access Type"
                rules={[{ required: true, message: 'Please select access type!' }]}
              >
                <Radio.Group>
                  <Radio value="free">Free</Radio>
                  <Radio value="premium">Premium</Radio>
                  <Radio value="subscription">Subscription Required</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="price" 
                label="Price (₹)"
                rules={[
                  { 
                    required: true, 
                    message: 'Please enter price!' 
                  },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject('Price cannot be negative!');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber 
                  placeholder="Enter price" 
                  style={{ width: "100%" }} 
                  min={0}
                  disabled={form.getFieldValue('accessType') === 'free'}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="duration" 
                label="Duration (Hours)"
                rules={[{ required: true, message: 'Please enter duration!' }]}
              >
                <InputNumber 
                  placeholder="Enter duration" 
                  style={{ width: "100%" }} 
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="chapterCount" 
                label="Number of Chapters"
                rules={[{ required: true, message: 'Please enter chapter count!' }]}
              >
                <InputNumber 
                  placeholder="Enter chapter count" 
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
        title="Course Details"
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
                <span className="font-semibold text-gray-700">Module:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.moduleName}</span>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Description:</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.description}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Access Type:</span>
                <span className={`font-local2 text-lg ${
                  viewRecord.accessType === 'free' ? 'text-green-600' : 
                  viewRecord.accessType === 'premium' ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  {viewRecord.accessType.charAt(0).toUpperCase() + viewRecord.accessType.slice(1)}
                </span>
              </div>

              {viewRecord.accessType !== 'free' && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Price:</span>
                  <span className="font-local2 text-lg text-gray-900">₹{viewRecord.price}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Duration:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.duration} hours</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Chapters:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.chapterCount}</span>
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

export default Courses;
