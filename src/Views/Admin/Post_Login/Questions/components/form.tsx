
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, InputNumber, Upload, message } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import img from "../../../../../assets/matching.png"
import img2 from "../../../../../assets/match2.jpeg"
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const QuestionForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';
  const [submitting, setSubmitting] = React.useState(false);

  // Complete dummy data for all question types - matching view.tsx structure
  const getDummyData = (id: string) => {
    const questions = {
      '1': {
        className: "Class 10",
        subject: "Mathematics",
        title: "Algebra Basics",
        chapter: "Chapter 1",
        examType: "Unit Test",
        questions: [
          {
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
            questionType: "fillblank",
            question: "If 3x - 7 = 14, then x = ____",
            marks: 3,
            correctAnswer: "7",
            image: null
          },
          {
            questionType: "shortanswer",
            question: "Explain how to graph the equation y = 2x + 3",
            marks: 5,
            correctAnswer: "Start at y-intercept (0,3), use slope 2 (rise 2, run 1) to plot points",
            image: null
          }
        ],
        status: true
      },
      '2': {
        className: "Class 11",
        subject: "Physics",
        title: "Mechanics",
        chapter: "Chapter 2",
        examType: "1 Midterm",
        questions: [
          {
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
            questionType: "matching",
            question: "Match the following diagram parts",
            marks: 2,
            image: img,
            correctAnswer: "Students should match labels to parts on the image"
          }
        ],
        status: true
      },
      '3': {
        className: "Class 12",
        subject: "Chemistry",
        title: "Organic Chemistry",
        chapter: "Chapter 3",
        examType: "1 Term",
        questions: [
          {
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
        className: "Class 10",
        subject: "Biology",
        title: "Human Anatomy",
        chapter: "Chapter 4",
        examType: "2 Midterm",
        questions: [
          {
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
            questionType: "fillblank",
            question: "The current ratio is calculated as Current Assets divided by ____",
            marks: 2,
            correctAnswer: "Current Liabilities",
            image: null
          },
          {
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
        className: "Class 11",
        subject: "Computer Science",
        title: "Data Structures",
        chapter: "Chapter 5",
        examType: "2 Term",
        questions: [
          {
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
            questionType: "essay",
            question: "Discuss the significance of the Kesavananda Bharati case in Indian constitutional law.",
            marks: 10,
            correctAnswer: "The Kesavananda Bharati case established the basic structure doctrine, limiting Parliament's power to amend the Constitution and ensuring core constitutional principles remain intact.",
            image: null
          },
          {
            questionType: "fillblank",
            question: "Article 32 is known as the ____ of the Constitution.",
            marks: 2,
            correctAnswer: "Heart and Soul",
            image: null
          },
          {
            questionType: "matching",
            question: "Match the data structures with their time complexity",
            marks: 3,
            image: img2,
            correctAnswer: "Students should match data structures with their Big O notation"
          }
        ],
        status: true
      },
      '6': {
        className: "Class 12",
        subject: "Mathematics",
        title: "Calculus",
        chapter: "Chapter 6",
        examType: "Unit Test",
        questions: [
          {
            questionType: "shortanswer",
            question: "What are the key elements of a successful content marketing strategy?",
            marks: 4,
            correctAnswer: "Target audience identification, content goals, content calendar, performance metrics, and consistent brand voice.",
            image: null
          },
          {
            questionType: "fillblank",
            question: "The engagement rate is calculated by dividing total engagements by ____ and multiplying by 100.",
            marks: 2,
            correctAnswer: "total reach",
            image: null
          },
          {
            questionType: "mcq",
            question: "Which content type typically generates the highest engagement on Instagram?",
            marks: 2,
            options: [
              { text: "Static images with text overlay" },
              { text: "Carousel posts with multiple images" },
              { text: "Video content and Reels" },
              { text: "Long-form captions only" }
            ],
            correctAnswer: [2],
            image: null
          },
          {
            questionType: "matching",
            question: "Match the following mathematical functions with their derivatives",
            marks: 3,
            image: img,
            correctAnswer: "Students should match functions with their derivative formulas"
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

  // Exam Type options (removed; currently unused)

  // remove exercise feature – not needed anymore

  // No dependent selection state needed

  // Force re-render state for question type changes
  const [questionTypeChangeKey, setQuestionTypeChangeKey] = React.useState(0);

  const handleFinish = async (values: any) => {
    try {
      setSubmitting(true);
  
      // Normalize questions
      const normalizedQuestions = (values?.questions || []).map((q: any) => {
        const normalized: any = {
          questionType: q?.questionType,
          question: q?.question,
          marks: q?.marks,
        };
  
        if (q?.questionType === 'mcq') {
          normalized.options = (q?.options || []).map((opt: any) => ({ text: opt?.text || '' }));
          normalized.correctAnswer = q?.correctAnswer;
        }
  
        if (
          q?.questionType === 'fillblank' ||
          q?.questionType === 'shortanswer' ||
          q?.questionType === 'essay'
        ) {
          normalized.correctAnswer = q?.correctAnswer;
        }
  
        if (q?.questionType === 'matching' || q?.questionType === 'image') {
          const fileUrl =
            q?.imageFileList?.[0]?.url ||
            q?.imageFileList?.[0]?.thumbUrl ||
            q?.image ||
            null;
          normalized.image = fileUrl;
        } else {
          normalized.image = null;
        }
  
        return normalized;
      });
  
      // Build payload (no examType here, backend doesn’t use it)
      const payload = {
        className: values?.className,
        subject: values?.subject,
        title: values?.title,
        chapter: values?.chapter,
        status: values?.status ?? true,
        questions: normalizedQuestions,
      };
  
      console.log("REQ BODY >>>", payload);
  
      if (!isEdit) {
        await axios.post(`https://childcraft-server.onrender.com/quizItems`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        message.success("Questions created successfully!");
      } else {
        // TODO: when PUT API ready
        message.success("Questions updated successfully!");
      }
  
      const q = searchParams.get('q');
      navigate(`/questions${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    } catch (error: any) {
      console.error("Failed to submit questions", error);
      const description =
        error?.response?.data?.message || error?.message || "Something went wrong";
      message.error(`Failed to submit questions: ${description}`);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleCancel = () => {
    const q = searchParams.get('q');
    navigate(`/questions${q ? `?q=${encodeURIComponent(q)}` : ''}`);
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
      // Try to map from Questions list dummy IDs (e.g., 1A, 1B)
      const listDummy: Record<string, { className: string; subject: string; title: string; chapter: string; question: string; }> = {
        '1A': { className: 'Class 10', subject: 'Mathematics', title: 'Algebra Basics', chapter: 'Chapter 1', question: 'What is the solution to the equation 2x + 5 = 13?' },
        '1B': { className: 'Class 10', subject: 'Mathematics', title: 'Algebra Basics', chapter: 'Chapter 1', question: 'Solve: 3x - 7 = 14' },
        '2A': { className: 'Class 11', subject: 'Physics', title: 'Mechanics', chapter: 'Chapter 2', question: 'Which of the following is a valid Python variable name?' },
        '3A': { className: 'Class 12', subject: 'Chemistry', title: 'Organic Chemistry', chapter: 'Chapter 3', question: 'Analyze the theme of revenge in Hamlet and its impact on the main characters.' },
        '4A': { className: 'Class 10', subject: 'Biology', title: 'Human Anatomy', chapter: 'Chapter 4', question: 'Which of the following is NOT a current asset?' },
        '5A': { className: 'Class 11', subject: 'Computer Science', title: 'Data Structures', chapter: 'Chapter 5', question: 'Which of the following is NOT guaranteed under Article 19?' },
      };

      const listItem = listDummy[id];
      if (listItem) {
        form.setFieldsValue({
          className: listItem.className,
          subject: listItem.subject,
          title: listItem.title,
          chapter: listItem.chapter,
          status: true,
          questions: [
            {
              questionType: 'shortanswer',
              question: listItem.question,
              marks: 1,
            },
          ],
        });
        return;
      }

      // Fallback to legacy dummy mapping
      const dummyData = getDummyData(id);
      if (dummyData) {
        const mapped = {
          ...dummyData,
          questions: (dummyData.questions || []).map((q: any) => {
            if (q?.questionType === 'matching' && q?.image) {
              return {
                ...q,
                imageFileList: [
                  {
                    uid: '-1',
                    name: 'matching-image',
                    status: 'done',
                    url: typeof q.image === 'string' ? q.image : (q.image?.src || ''),
                  },
                ],
              };
            }
            return q;
          }),
        };
        form.setFieldsValue(mapped);
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
                          <Input 
                            placeholder={`Option ${name + 1}`}
                            onChange={() => {
                              // Force re-render of correct answer checkboxes
                              setQuestionTypeChangeKey(prev => prev + 1);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => {
                            remove(name);
                            // Clear correct answer if it references removed option
                            const currentAnswers = form.getFieldValue(['questions', questionIndex, 'correctAnswer']) || [];
                            const filteredAnswers = currentAnswers.filter((answer: number) => answer !== name);
                            form.setFieldValue(['questions', questionIndex, 'correctAnswer'], filteredAnswers);
                            // Force re-render
                            setQuestionTypeChangeKey(prev => prev + 1);
                          }}
                          danger
                          disabled={fields.length <= 2}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                        // Force re-render after adding option
                        setTimeout(() => {
                          setQuestionTypeChangeKey(prev => prev + 1);
                        }, 100);
                      }}
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

          </div>
        );

      // remove true/false type

      case 'fillblank':
        return null;

      case 'shortanswer':
        return null;

      case 'essay':
        return null;

      case 'matching':
        return null;

      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader title={isEdit ? "Edit Question" : "Add Question"} backButton={true} />
      
      <Card className="w-full mt-4 shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="font-local2"
          initialValues={{
            status: true,
            questions: [{}]
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
            {/* <Col xs={24} sm={12} md={8} lg={8} xl={8}>
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
            </Col> */}
           
          </Row>

          <Divider orientation="left">Questions</Divider>

          {/* Dynamic Questions */}
          <Form.List name="questions">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    className="mb-4"
                    style={{ backgroundColor: '#f8f9fa' }}
                    
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
                            <Option value="image">Image</Option>
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

                    {form.getFieldValue(['questions', name, 'questionType']) !== 'image' && (
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                          required={false}
                            {...restField}
                            name={[name, 'question']}
                            label="Question"
                            rules={[{ required: true, message: 'Please enter question!' }]}
                          >
                            <TextArea 
                              rows={3}
                              placeholder="Enter your question" 
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    )}

                    {/* Image upload is shown when type is Matching or Image */}
                    {(form.getFieldValue(['questions', name, 'questionType']) === 'matching' ||
                      form.getFieldValue(['questions', name, 'questionType']) === 'image') && (
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item 
                            {...restField}
                            name={[name, 'imageFileList']}
                            label={form.getFieldValue(['questions', name, 'questionType']) === 'matching' ? 'Upload Matching Image' : 'Upload Image'}
                            rules={[{ required: true, message: 'Please upload image for matching!' }]}
                          >
                            <Upload
                              listType="picture-card"
                              maxCount={1}
                              beforeUpload={() => false}
                              defaultFileList={form.getFieldValue(['questions', name, 'imageFileList'])}
                              onChange={({ fileList }) => {
                                const questions = form.getFieldValue('questions') || [];
                                if (!questions[name]) return;
                                questions[name] = {
                                  ...questions[name],
                                  imageFileList: fileList,
                                  image: fileList?.[0]?.url || fileList?.[0]?.thumbUrl || null,
                                };
                                form.setFieldValue('questions', questions);
                              }}
                            >
                              <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            </Upload>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}

                    {/* Render question type specific fields */}
                    {renderQuestionTypeFields(
                      form.getFieldValue(['questions', name, 'questionType']),
                      name
                    )}
                  </Card>
                ))}
                
              </>
            )}
          </Form.List>

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
                loading={submitting}
                disabled={submitting}
              >
                {isEdit ? "Update Question" : "Submit"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default QuestionForm;