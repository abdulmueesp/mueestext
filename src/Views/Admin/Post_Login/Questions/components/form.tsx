
// @ts-nocheck
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch, InputNumber, Radio, Checkbox, Upload } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import { message } from "@/Components/common/message/message";

const { Option } = Select;
const { TextArea } = Input;

const QuestionForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';

  // Complete dummy data for all question types
  const getDummyData = (id: string) => {
    const questions = {
      '1': {
        module: "Mathematics",
        course: "Advanced Algebra",
        subject: "Advanced Calculus",
        textbook: "Calculus: Early Transcendentals",
        chapter: "Linear Equations",
        questions: [
          {
            exercise: "Basic Linear Equations Practice",
            questionType: "mcq",
            question: "What is the solution to the equation 2x + 5 = 13?",
            marks: 2,
            options: [
              { text: "x = 4" },
              { text: "x = 3" },
              { text: "x = 5" },
              { text: "x = 6" }
            ],
            correctAnswer: [0],
            image: null
          },
          {
            exercise: "Word Problems in Linear Equations",
            questionType: "fillblank",
            question: "If 3x - 7 = 14, then x = ____",
            marks: 3,
            correctAnswer: "7",
            image: null
          }
        ],
        status: true
      },
      '2': {
        module: "Computer Science",
        course: "Python Programming",
        subject: "Data Structures & Algorithms",
        textbook: "Introduction to Algorithms",
        chapter: "Variables and Data Types",
        questions: [
          {
            exercise: "Type Casting Practice",
            questionType: "mcq",
            question: "Which of the following is a valid Python variable name?",
            marks: 1,
            options: [
              { text: "2variable" },
              { text: "_variable" },
              { text: "variable-name" },
              { text: "class" }
            ],
            correctAnswer: [1],
            image: null
          },
          {
            exercise: "String Manipulation",
            questionType: "truefalse",
            question: "Python strings are mutable (can be changed after creation).",
            marks: 1,
            correctAnswer: "false",
            image: null
          }
        ],
        status: true
      },
      '3': {
        module: "English Literature",
        course: "Shakespeare Studies",
        subject: "Shakespearean Literature",
        textbook: "The Complete Works of William Shakespeare",
        chapter: "Hamlet Analysis",
        questions: [
          {
            exercise: "Theme Analysis Essay",
            questionType: "essay",
            question: "Analyze the theme of revenge in Hamlet and its impact on the main characters.",
            marks: 15,
            correctAnswer: "The theme of revenge drives the plot through Hamlet's quest to avenge his father, Laertes seeking revenge for Polonius, and Fortinbras's quest for his father's honor. Each character represents different approaches to revenge with varying consequences.",
            image: null
          }
        ],
        status: false
      },
      '4': {
        module: "Banking & Finance",
        course: "Financial Accounting",
        subject: "Corporate Finance",
        textbook: "Principles of Corporate Finance",
        chapter: "Financial Statements",
        questions: [
          {
            exercise: "Balance Sheet Analysis",
            questionType: "mcq",
            question: "Which of the following is NOT a current asset?",
            marks: 2,
            options: [
              { text: "Cash and Cash Equivalents" },
              { text: "Accounts Receivable" },
              { text: "Property, Plant & Equipment" },
              { text: "Inventory" }
            ],
            correctAnswer: [2],
            image: null
          },
          {
            exercise: "Financial Ratios",
            questionType: "fillblank",
            question: "The current ratio is calculated as Current Assets divided by ____",
            marks: 2,
            correctAnswer: "Current Liabilities",
            image: null
          },
          {
            exercise: "Cash Flow Analysis",
            questionType: "shortanswer",
            question: "Explain the difference between operating cash flow and free cash flow.",
            marks: 5,
            correctAnswer: "Operating cash flow is cash generated from core business operations, while free cash flow is operating cash flow minus capital expenditures.",
            image: null
          }
        ],
        status: true
      },
      '5': {
        module: "UPSC Preparation",
        course: "Indian Polity",
        subject: "Constitutional Law",
        textbook: "Indian Constitution by D.D. Basu",
        chapter: "Fundamental Rights",
        questions: [
          {
            exercise: "Article 19 Analysis",
            questionType: "mcq",
            question: "Which of the following is NOT guaranteed under Article 19?",
            marks: 2,
            options: [
              { text: "Freedom of Speech and Expression" },
              { text: "Right to Form Associations" },
              { text: "Right to Practice Religion" },
              { text: "Right to Move Freely" }
            ],
            correctAnswer: [2],
            image: null
          },
          {
            exercise: "Constitutional Amendments",
            questionType: "truefalse",
            question: "Fundamental Rights can be amended by simple majority in Parliament.",
            marks: 1,
            correctAnswer: "false",
            image: null
          },
          {
            exercise: "Case Studies",
            questionType: "essay",
            question: "Discuss the significance of the Kesavananda Bharati case in Indian constitutional law.",
            marks: 10,
            correctAnswer: "The Kesavananda Bharati case established the basic structure doctrine, limiting Parliament's power to amend the Constitution and ensuring core constitutional principles remain intact.",
            image: null
          }
        ],
        status: true
      },
      '6': {
        module: "Digital Marketing",
        course: "Social Media Marketing",
        subject: "Social Media Strategy",
        textbook: "Social Media Marketing Strategy Guide",
        chapter: "Content Strategy",
        questions: [
          {
            exercise: "Content Planning",
            questionType: "shortanswer",
            question: "What are the key elements of a successful content marketing strategy?",
            marks: 4,
            correctAnswer: "Target audience identification, content goals, content calendar, performance metrics, and consistent brand voice.",
            image: null
          },
          {
            exercise: "Engagement Metrics",
            questionType: "fillblank",
            question: "The engagement rate is calculated by dividing total engagements by ____ and multiplying by 100.",
            marks: 2,
            correctAnswer: "total reach",
            image: null
          }
        ],
        status: false
      }
    };

    return questions[id] || null;
  };

  // Selector options adapted to Class/Subject/Title/Chapter
  const classOptions = [
    { value: "0", label: "0" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
  ];

  // Independent options (no cascading)
  const subjectOptions = [
    { value: "Malayalam", label: "Malayalam" },
    { value: "English", label: "English" },
    { value: "Maths", label: "Maths" },
    { value: "GK", label: "GK" },
    { value: "Computer", label: "Computer" },
    { value: "EVS", label: "EVS" },
    { value: "Social Science", label: "Social Science" },
    { value: "Science", label: "Science" }
  ];

  const titleOptions = [
    { value: "Algebra Basics", label: "Algebra Basics" },
    { value: "Calculus", label: "Calculus" },
    { value: "Mechanics", label: "Mechanics" },
    { value: "Optics", label: "Optics" },
    { value: "Organic Chemistry", label: "Organic Chemistry" },
    { value: "Physical Chemistry", label: "Physical Chemistry" },
    { value: "Human Anatomy", label: "Human Anatomy" },
    { value: "Data Structures", label: "Data Structures" },
    { value: "Algorithms", label: "Algorithms" }
  ];

  const chapterOptions = [
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
    { value: "Chapter 5", label: "Chapter 5" },
    { value: "Chapter 6", label: "Chapter 6" }
  ];

  // Exam Type options
  const examTypeOptions = [
    { value: "Unit Test", label: "Unit Test" },
    { value: "1 Midterm", label: "1 Midterm" },
    { value: "1 Term", label: "1 Term" },
    { value: "2 Midterm", label: "2 Midterm" },
    { value: "2 Term", label: "2 Term" },
  ];

  // remove exercise feature – not needed anymore

  // No dependent selection state needed

  // Force re-render state for question type changes
  const [questionTypeChangeKey, setQuestionTypeChangeKey] = React.useState(0);

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    if (isEdit) {
      message.success("Questions updated successfully!");
    } else {
      message.success("Questions created successfully!");
    }
    navigate('/questions');
  };

  const handleCancel = () => {
    navigate('/questions');
  };

  // Removed dependency handlers; selectors are independent now

  

  

  

  // Handle question type change to force re-render
  const handleQuestionTypeChange = (questionIndex: number, questionType: string) => {
    // Clear existing answer data when question type changes
    const questions = form.getFieldValue('questions') || [];
    questions[questionIndex] = {
      ...questions[questionIndex],
      questionType,
      options: questionType === 'mcq' ? [{ text: '' }, { text: '' }] : undefined,
      correctAnswer: undefined
    };
    form.setFieldValue('questions', questions);
    
    // Force re-render
    setQuestionTypeChangeKey(prev => prev + 1);
  };

  // Set initial values if editing (mapping to new fields)
  React.useEffect(() => {
    if (isEdit && id) {
      const dummyData = getDummyData(id);
      if (dummyData) {
        form.setFieldsValue(dummyData);
        // selectors are independent; no need to set selection state
      }
    }
  }, [form, isEdit, id]);

  // Render question type specific fields
  const renderQuestionTypeFields = (questionType: string, questionIndex: number) => {
    if (!questionType) return null;

    switch (questionType) {
      case 'mcq':
        return (
          <div key={`mcq-${questionIndex}-${questionTypeChangeKey}`}>
            <Form.List name={[questionIndex, 'options']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} align="middle">
                      <Col span={20}>
                        <Form.Item
                          {...restField}
                          name={[name, 'text']}
                          rules={[{ required: true, message: 'Please enter option text!' }]}
                        >
                          <Input placeholder={`Option ${name + 1}`} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                          danger
                          disabled={fields.length <= 2}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      disabled={fields.length >= 6}
                      className="w-full"
                    >
                      Add Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item 
              name={[questionIndex, 'correctAnswer']} 
              label="Correct Answer(s)"
              rules={[{ required: true, message: 'Please select correct answer!' }]}
            >
              <Checkbox.Group>
                <Row>
                  {(form.getFieldValue(['questions', questionIndex, 'options']) || []).map((option: any, index: number) => (
                    <Col span={12} key={index}>
                      <Checkbox value={index}>
                        Option {index + 1} {option?.text ? `(${option.text.slice(0, 20)}...)` : ''}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        );

      // remove true/false type

      case 'fillblank':
        return (
          <Form.Item 
            key={`fillblank-${questionIndex}-${questionTypeChangeKey}`}
            name={[questionIndex, 'correctAnswer']} 
            label="Correct Answer"
            rules={[{ required: true, message: 'Please enter correct answer!' }]}
          >
            <Input placeholder="Enter the correct answer" />
          </Form.Item>
        );

      case 'shortanswer':
        return (
          <Form.Item 
            key={`shortanswer-${questionIndex}-${questionTypeChangeKey}`}
            name={[questionIndex, 'correctAnswer']} 
            label="Sample Answer / Key Points"
            rules={[{ required: true, message: 'Please enter sample answer!' }]}
          >
            <TextArea 
              rows={3}
              placeholder="Enter sample answer or key points for evaluation" 
            />
          </Form.Item>
        );

      case 'essay':
        return (
          <Form.Item 
            key={`essay-${questionIndex}-${questionTypeChangeKey}`}
            name={[questionIndex, 'correctAnswer']} 
            label="Sample Answer / Key Points"
            rules={[{ required: true, message: 'Please enter sample answer!' }]}
          >
            <TextArea 
              rows={4}
              placeholder="Enter sample answer or key points for evaluation" 
            />
          </Form.Item>
        );

      case 'matching':
        return (
          <div key={`matching-${questionIndex}-${questionTypeChangeKey}`}>
            <Form.Item 
              name={[questionIndex, 'image']}
              label="Upload Matching Image"
              rules={[{ required: true, message: 'Please upload image for matching!' }]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader title={isEdit ? "Edit Questions" : "Create Questions"} backButton={true} />
      
      <Card className="w-full mt-4 shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="font-local2"
          initialValues={{
            status: true
          }}
        >
          {/* Basic Information */}
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="className"
                label="Class"
                rules={[{ required: true, message: 'Please select a class!' }]}
              >
                <Select 
                  placeholder="Select class" 
                  size="large"
                  options={classOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
              required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please select a subject!' }]}
              >
                <Select 
                  placeholder="Select subject" 
                  size="large"
                  options={subjectOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
              required={false}
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please select a title!' }]}
              >
                <Select 
                  placeholder="Select title" 
                  size="large"
                  options={titleOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
              required={false}
                name="chapter"
                label="Chapter"
                rules={[{ required: true, message: 'Please select a chapter!' }]}
              >
                <Select 
                  placeholder="Select chapter" 
                  size="large"
                  options={chapterOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
              required={false}
                name="examType"
                label="Exam Type"
                rules={[{ required: true, message: 'Please select an exam type!' }]}
              >
                <Select 
                  placeholder="Select exam type" 
                  size="large"
                  options={examTypeOptions}
                />
              </Form.Item>
            </Col>
           
          </Row>

          <Divider orientation="left">Questions</Divider>

          {/* Dynamic Questions */}
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    className="mb-4"
                    style={{ backgroundColor: '#f8f9fa' }}
                    title={`Question ${name + 1}`}
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
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
                         required={false}
                          {...restField}
                          name={[name, 'questionType']}
                          label="Question Type"
                          rules={[{ required: true, message: 'Please select question type!' }]}
                        >
                          <Select 
                            placeholder="Select type"
                            onChange={(value) => handleQuestionTypeChange(name, value)}
                          >
                            <Option value="mcq">Multiple Choice (MCQ)</Option>
                            <Option value="fillblank">Fill in the Blank</Option>
                            <Option value="shortanswer">Short Answer</Option>
                            <Option value="essay">Essay</Option>
                            <Option value="matching">Matching</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
                        required={false}
                          {...restField}
                          name={[name, 'marks']}
                          label="Marks"
                          rules={[{ required: true, message: 'Please enter marks!' }]}
                        >
                          <InputNumber 
                            placeholder="Enter marks" 
                            style={{ width: "100%" }} 
                            min={1}
                            max={100}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                        required={false}
                          {...restField}
                          name={[name, 'question']}
                          label="Question (English)"
                          rules={[{ required: true, message: 'Please enter question!' }]}
                        >
                          <TextArea 
                            rows={3}
                            placeholder="Enter your question in English" 
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Image upload is rendered only for Matching type inside type-specific renderer */}

                    <Divider plain>Answer Options</Divider>
                    
                    {/* Render question type specific fields */}
                    {renderQuestionTypeFields(
                      form.getFieldValue(['questions', name, 'questionType']),
                      name
                    )}
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
                    Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Action Buttons */}
          <Row justify="end" className="mt-6">
            <Space size="middle">
              <Button size="large" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ 
                  backgroundColor: "#007575", 
                  borderColor: "#007575" 
                }}
              >
                {isEdit ? "Update Questions" : "Create Questions"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default QuestionForm;