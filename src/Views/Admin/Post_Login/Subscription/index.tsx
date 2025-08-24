
// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Popconfirm, Card, Row, Col, Switch } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";

const Subscription = () => {
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
        message.success("Subscription updated successfully!");
      } else {
        message.success("Subscription created successfully!");
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
      type: record.type,
      rate: record.rate,
      paperCount: record.papers,
      validity: record.validity,
      status: record.status === "Active",
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Subscription ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  return (
    <>
      <PageHeader title="Subscription" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal with Mixed Layout */}
      <Modal
        title={editingRecord ? "Edit Subscription" : "Create Subscription"}
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
            <Col span={12}>
              <Form.Item name="type" label="Type" >
                <Input placeholder="Enter subscription type" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="rate" label="Rate" >
                <InputNumber 
                  placeholder="Enter rate" 
                  style={{ width: "100%" }} 
                  min={0} 
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="offerRate" label="Offer Rate">
                <InputNumber 
                  placeholder="Enter offer rate" 
                  style={{ width: "100%" }} 
                  min={0} 
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="paperCount" label="Paper Count" >
                <InputNumber 
                  placeholder="Enter paper count" 
                  style={{ width: "100%" }} 
                  min={1} 
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="validity" label="Validity (e.g. 1 Year)">
                <Input placeholder="Enter validity duration" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="attempts" label="Online Test Attempts">
                <InputNumber 
                  placeholder="Enter number of attempts" 
                  style={{ width: "100%" }} 
                  min={0} 
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

      {/* View Modal - Separate Styled Display */}
      <Modal
        title="Subscription Details"
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
                <span className="font-semibold text-gray-700">Type:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.type}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Rate:</span>
                <span className="font-local2 text-lg text-gray-900">₹{viewRecord.rate}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Offer Rate:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.offerRate || '-'}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Papers:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.papers}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Validity:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.validity}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Online Test Attempts:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.attempts || 12}</span>
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

export default Subscription;



