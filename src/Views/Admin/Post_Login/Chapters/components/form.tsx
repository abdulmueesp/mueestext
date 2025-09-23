
// @ts-nocheck
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch, message, Modal } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import { API, GET } from "@/Components/common/api";


const { TextArea } = Input;
const { Option } = Select;

// Select options
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

const CLASS_OPTIONS = ["0", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8"];

const TITLE_OPTIONS = [
  "Numbers Workbook",
  "Alphabets Fun",
  "My First GK",
  "Basics of Computing",
  "Environment Around Us",
];

const Chaptersform = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';

  const [selectedClass, setSelectedClass] = React.useState<string | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = React.useState<string | undefined>(undefined);
  const [booksOptions, setBooksOptions] = React.useState<Array<{ value: string; label: string }>>([]);
  const [booksLoading, setBooksLoading] = React.useState<boolean>(false);

  // Dummy data aligned to Title/Subject/Class/Chapters
  const getDummyData = (id: string) => {
    const books: any = {
      '1': {
        title: "Numbers Workbook",
        subject: "Maths",
        class: "1",
        chapters: [
          { chapterName: "Counting" },
          { chapterName: "Addition" },
          { chapterName: "Subtraction" }
        ]
      },
      '2': {
        title: "Alphabets Fun",
        subject: "English",
        class: "LKG",
        chapters: [
          { chapterName: "A to E" },
          { chapterName: "F to J" },
          { chapterName: "K to O" }
        ]
      },
      '3': {
        title: "My First GK",
        subject: "GK",
        class: "UKG",
        chapters: [
          { chapterName: "Animals" },
          { chapterName: "Fruits" },
          { chapterName: "Vehicles" }
        ]
      },
      '4': {
        title: "Basics of Computing",
        subject: "Computer",
        class: "3",
        chapters: [
          { chapterName: "What is a Computer?" },
          { chapterName: "Input/Output Devices" }
        ]
      }
    };

    return books[id] || null;
  };



  const courseOptions = {
    "Mathematics": [
      { value: "Advanced Algebra", label: "Advanced Algebra" },
      { value: "Calculus", label: "Calculus" },
      { value: "Statistics", label: "Statistics" }
    ],
    "Computer Science": [
      { value: "Python Programming", label: "Python Programming" },
      { value: "Data Science", label: "Data Science" },
      { value: "Web Development", label: "Web Development" }
    ],
    "English Literature": [
      { value: "Shakespeare Studies", label: "Shakespeare Studies" },
      { value: "Modern Literature", label: "Modern Literature" },
      { value: "Poetry Analysis", label: "Poetry Analysis" }
    ],
    "Banking & Finance": [
      { value: "Financial Accounting", label: "Financial Accounting" },
      { value: "Investment Banking", label: "Investment Banking" },
      { value: "Corporate Finance", label: "Corporate Finance" }
    ],
    "UPSC Preparation": [
      { value: "Indian Polity", label: "Indian Polity" },
      { value: "Geography", label: "Geography" },
      { value: "History", label: "History" }
    ],
    "Digital Marketing": [
      { value: "Social Media Marketing", label: "Social Media Marketing" },
      { value: "SEO Optimization", label: "SEO Optimization" },
      { value: "Content Marketing", label: "Content Marketing" }
    ]
  };

  // No module/course now

  const fetchBooks = async (cls?: string, subj?: string) => {
    if (!cls || !subj) return;
    try {
      setBooksLoading(true);
      setBooksOptions([]);
      const data = await GET(API.BOOKS, { class: cls, subject: subj });
      // Expected shape: { count: number, books: string[] }
      const list = Array.isArray(data?.books)
        ? data.books
        : Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
      const options = list
        .map((item: any) => {
          // If API gives strings (book names)
          if (typeof item === 'string') {
            return { value: item, label: item };
          }
          // Else try object mapping fallback
          const label = item?.book || item?.title || item?.name || "";
          const value = item?._id || item?.id || item?.code || label;
          return label ? { value: String(value), label: String(label) } : null;
        })
        .filter(Boolean) as Array<{ value: string; label: string }>;
      setBooksOptions(options);
    } catch (e) {
      // fallback: empty options
      setBooksOptions([]);
    } finally {
      setBooksLoading(false);
    }
  };

  const onChangeClass = (value: string) => {
    setSelectedClass(value);
    // reset book when dependency changes
    form.setFieldValue('book', undefined);
    setBooksOptions([]);
    if (value && selectedSubject) {
      fetchBooks(value, selectedSubject);
    }
  };

  const onChangeSubject = (value: string) => {
    setSelectedSubject(value);
    // reset book when dependency changes
    form.setFieldValue('book', undefined);
    setBooksOptions([]);
    if (selectedClass && value) {
      fetchBooks(selectedClass, value);
    }
  };

  const handleFinish = (values: any) => {
    // Build clean payload for submission/preview
    const payload = {
      class: values?.class,
      subject: values?.subject,
      book: values?.book,
      chapters: Array.isArray(values?.chapters)
        ? values.chapters.map((c: any) => ({ chapterName: c?.chapterName }))
        : [],
      status: values?.status ?? true,
      type: values?.type ?? "Public",
    };

    // Preview JSON payload to the user
    Modal.info({
      title: isEdit ? "Update Chapter - Payload" : "Create Chapter - Payload",
      width: 720,
      content: (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: 12 }}>
{JSON.stringify(payload, null, 2)}
        </pre>
      ),
      onOk: () => {
        if (isEdit) {
          message.success("Chapter updated successfully!");
        } else {
          message.success("Chapter created successfully!");
        }
        navigate('/chapters');
      }
    });
  };

  const handleCancel = () => {
    navigate('/chapters');
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    form.setFieldValue('course', undefined); // Reset course when module changes
  };

  // Set initial values if editing
  React.useEffect(() => {
    if (isEdit && id) {
      const dummyData = getDummyData(id);
      if (dummyData) {
        form.setFieldsValue(dummyData);
      }
    }
  }, [form, isEdit, id]);

  return (
    <>
      <PageHeader title={isEdit ? "Edit Chapter" : "Create Chapter"} backButton={true} />
      
      <Card 
        className="w-full mt-4 shadow-md"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="font-local2"
          initialValues={{
            status: true,
            type: "Public"
          }}
        >
          {/* Basic Information */}
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
            required={false}
                name="class"
                label="Class"
                rules={[{ required: true, message: 'Please select class!' }]}
              >
                <Select placeholder="Select class" size="large" onChange={onChangeClass} allowClear>
                  {CLASS_OPTIONS.map((cls) => (
                    <Option key={cls} value={cls}>{cls}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
              required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please select subject!' }]}
              >
                <Select placeholder="Select subject" size="large" onChange={onChangeSubject} allowClear>
                  {SUBJECT_OPTIONS.map((subj) => (
                    <Option key={subj} value={subj}>{subj}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
              required={false}
                name="book"
                label="Book"
                rules={[{ required: true, message: 'Please select book!' }]}
              >
                <Select
                  placeholder="Select book"
                  size="large"
                  allowClear
                  loading={booksLoading}
                  disabled={!selectedClass || !selectedSubject}
                  options={booksOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Chapters</Divider>

          {/* Dynamic Chapters */}
          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    className="mb-4"
                    style={{ backgroundColor: '#f8f9fa' }}
                    title={`Chapter ${name + 1}`}
                    extra={
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        danger
                      />
                    }
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          required={false}
                          name={[name, 'chapterName']}
                          label="Chapter Name"
                          rules={[{ required: true, message: 'Please enter chapter name!' }]}
                        >
                          <Input 
                            placeholder="Enter chapter name" 
                            style={{ height: '40px' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    size="large"
                    className="w-full h-12"
                    style={{ maxWidth: '800px' }}
                  >
                    Add Chapter
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Removed Textbooks section as requested */}

          {/* Action Buttons */}
          <Row justify="end" className="mt-6">
            <Space size="middle">
              <Button size="middle" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                style={{ 
                  backgroundColor: "#007575", 
                  borderColor: "#007575" 
                }}
              >
                {isEdit ? "Update" : "Submit"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default Chaptersform;