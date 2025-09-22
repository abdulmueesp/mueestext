// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select,message } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { IoIosSearch, IoMdRefresh } from "react-icons/io";

const { TextArea } = Input;

const Books = () => {
  const SUBJECT_OPTIONS = [
    "Malayalam",
    "English",
    "Maths",
    "GK",
    "Computer",
    "EVS",
    "Social Science",
    "Science",
  ];

  const CLASS_OPTIONS = [
    "0",
    "LKG",
    "UKG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [searchValue, setSearchValue] = useState("");
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
  const handleRefresh = () => {
    setSearchValue("");
    // Add refresh logic here
  };

  // Save Form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        message.success("Book updated successfully!");
      } else {
        message.success("Book created successfully!");
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
      title: record.title,
      subject: record.subject,
      class: record.class,
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Book ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Add search logic here
  };

  return (
    <>
      <PageHeader title="Books" backButton={true}>
      <Input
              placeholder="Search by Title"
              prefix={<IoIosSearch className="text-gray-400" />}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none focus:shadow-none w-56"
              style={{
                backgroundColor: '#f9fafb',
                color: '#374151',
                border: '1px solid #d1d5db'
              }}
            />
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

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Book" : "Create Book"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
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
                name="title" 
                label="Title" 
                required={false}
                rules={[{ required: true, message: 'Please enter book title!' }]}
              >
                <Input placeholder="Enter book title" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
               required={false}
                name="subject" 
                label="Subject"
                rules={[{ required: true, message: 'Please select subject!' }]}
              >
                <Select placeholder="Select subject">
                  {SUBJECT_OPTIONS.map((subj) => (
                    <Select.Option key={subj} value={subj}>{subj}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
               required={false}
                name="class" 
                label="Class"
                rules={[{ required: true, message: 'Please select class!' }]}
              >
                <Select placeholder="Select class">
                  {CLASS_OPTIONS.map((cls) => (
                    <Select.Option key={cls} value={cls}>{cls}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Book Details"
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
                <span className="font-semibold text-gray-700">Title:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.title}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Subject:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.subject}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Class:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.class}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Books;
