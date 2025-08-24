// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";

const { TextArea } = Input;

const Modules = () => {
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
        message.success("Module updated successfully!");
      } else {
        message.success("Module created successfully!");
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
      description: record.description,
      category: record.category,
      status: record.status === "Active",
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Module ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  return (
    <>
      <PageHeader title="Modules" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create Module
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Module" : "Create Module"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
        width={700}
        okButtonProps={{
          style: {
            backgroundColor: "#007575",
            borderColor: "#007575",
          },
        }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="name" 
                label="Module Name" 
                rules={[{ required: true, message: 'Please enter module name!' }]}
              >
                <Input placeholder="Enter module name" />
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
                  rows={4}
                  placeholder="Enter module description" 
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
        title="Module Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
        width={600}
      >
        {viewRecord && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.name}</span>
              </div>
              
            
              
              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Description:</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.description}</span>
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

export default Modules;
