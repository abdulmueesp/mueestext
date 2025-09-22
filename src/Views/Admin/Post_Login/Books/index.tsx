// @ts-nocheck
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select,message } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import { API, GET, POST } from "../../../../Components/common/api";

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
  const [viewRecord, setViewRecord] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  // Open Modal for Create
  const showModal = () => {
    setViewRecord(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  // Close Form Modal
  const handleCancel = () => {
    setIsModalOpen(false);
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
      await POST(API.BOOKS, values);
      message.success("Book created successfully!");
      setIsModalOpen(false);
      setViewRecord(null);
      form.resetFields();
      // Refresh table data after create
      fetchBooks();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
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
  };

  const fetchBooks = async (opts?: { pageSize?: number, q?: string }) => {
    try {
      const size = opts?.pageSize ?? pageSize ?? 10;
      const query: any = { pageSize: size };
      if (opts?.q) query.q = opts.q;
      const data = await GET(API.ALL_BOOKS, query);
      const rows = Array.isArray(data?.results)
        ? data.results.map((r: any) => ({
            id: r._id || r.id,
            key: r._id || r.id,
            book: r.book || r.title || "",
            bookCode: r.code || r.bookCode || "",
            subject: r.subject,
            class: String(r.class ?? ""),
          }))
        : [];
      setTableData(rows);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBooks({ pageSize: 10 });
  }, []);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [searchValue]);

  // Trigger search on debounce
  useEffect(() => {
    fetchBooks({ pageSize, q: debouncedSearch || undefined });
  }, [debouncedSearch, pageSize]);

  return (
    <>
      <PageHeader title="Books" backButton={true}>
      <Input
              placeholder="Search by Book"
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

      <Datatable
        onDelete={handleDelete}
        onView={handleView}
        data={tableData}
        onChangePageParams={({ pageSize: ps }) => {
          if (ps && ps !== pageSize) {
            setPageSize(ps);
            fetchBooks({ pageSize: ps });
          }
        }}
      />

      {/* Create Modal */}
      <Modal
        title={"Create Book"}
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
                name="book" 
                label="book" 
                required={false}
                rules={[{ required: true, message: 'Please enter book name' }]}
              >
                <Input placeholder="Enter book name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="code" 
                label="Book Code" 
                required={false}
                rules={[{ required: true, message: 'Please enter book code!' }]}
              >
                <Input placeholder="Enter book code" />
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
