

// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Popconfirm, Card } from "antd";
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
    setIsModalOpen(true);
  };

  // Close Form Modal
  const handleCancel = () => {
    setIsModalOpen(false);
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
      form.resetFields();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue({
      type: record.type,
      rate: record.rate,
      paperCount: record.papers,
      validity: record.validity,
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
          style={{ backgroundColor: "#06014f", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Subscription" : "Create Subscription"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
        okButtonProps={{
          style: {
            backgroundColor: "#06014f",
            borderColor: "#06014f",
          },
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input placeholder="Enter subscription type" />
          </Form.Item>
          <Form.Item name="rate" label="Rate" rules={[{ required: true }]}>
            <InputNumber placeholder="Enter rate" style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="offerRate" label="Offer Rate">
            <InputNumber placeholder="Enter offer rate" style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="paperCount" label="Paper Count" rules={[{ required: true }]}>
            <InputNumber placeholder="Enter paper count" style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item name="validity" label="Validity (e.g. 1 Year)">
            <Input placeholder="Enter validity duration" />
          </Form.Item>
          <Form.Item name="attempts" label="Online Test Attempts">
            <InputNumber placeholder="Enter number of attempts" style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal with Card */}
      <Modal
        title="Subscription Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
      >
        {viewRecord && (
          <Card bordered className="shadow-md">
            <p><strong>Type:</strong> {viewRecord.type}</p>
            <p><strong>Rate:</strong> ₹{viewRecord.rate}</p>
            <p><strong>Papers:</strong> {viewRecord.papers}</p>
            <p><strong>Validity:</strong> {viewRecord.validity}</p>
            <p><strong>Status:</strong> {viewRecord.status}</p>
          </Card>
        )}
      </Modal>
    </>
  );
};

export default Subscription;



