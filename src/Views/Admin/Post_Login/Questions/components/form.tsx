
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, InputNumber, Upload, message, Modal, Spin } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import axios from "axios";
import { API, GET, BASE_URL } from "@/Components/common/api";
// Cropping functionality removed

const { Option } = Select;
const { TextArea } = Input;

const QuestionForm = () => {
  const [form] = Form.useForm();
  const { id: quizId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEdit = quizId && quizId !== 'new';
  const [submitting, setSubmitting] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<string | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = React.useState<string | undefined>(undefined);
  const [booksOptions, setBooksOptions] = React.useState<Array<{ value: string; label: string }>>([]);
  const [subjectsOptions, setSubjectsOptions] = React.useState<Array<{ value: string; label: string }>>([]);
  const [subjectsLoading, setSubjectsLoading] = React.useState<boolean>(false);
  const [booksLoading, setBooksLoading] = React.useState<boolean>(false);
  const [selectedBook, setSelectedBook] = React.useState<string | undefined>(undefined);
  const [selectedBookName, setSelectedBookName] = React.useState<string | undefined>(undefined);
  const [selectedChapter, setSelectedChapter] = React.useState<string | undefined>(undefined);
  const [chaptersOptions, setChaptersOptions] = React.useState<Array<{ value: string; label: string }>>([]);
  const [chaptersLoading, setChaptersLoading] = React.useState<boolean>(false);
  const [uploadingImages, setUploadingImages] = React.useState<Record<number, boolean>>({});
  const [loadingQuestionData, setLoadingQuestionData] = React.useState<boolean>(false);
  
  // Image upload modal states
  const [imageModalVisible, setImageModalVisible] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imgSrc, setImgSrc] = React.useState<string>('');

  // Simple image preview utility
  const onImageLoad = (img: HTMLImageElement) => {
    console.log('Image loaded for preview:', img);
  };

  // Fetch question data for editing
  const fetchQuestionData = async (quizId: string) => {
    try {
      setLoadingQuestionData(true);
      const response = await GET(`${API.QUIZ_ITEMS}/${quizId}`);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Failed to fetch question data:', error);
      message.error('Failed to load question data');
    } finally {
      setLoadingQuestionData(false);
    }
    return null;
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

  // Fetch subjects similar to Chapters form
  const fetchSubjects = async () => {
    try {
      setSubjectsLoading(true);
      const data = await GET(API.ALL_SUBJECTS);
      const list = Array.isArray(data?.results)
        ? data.results.map((s: any) => ({ value: s.subject, label: s.subject }))
        : Array.isArray(data?.subjects)
          ? data.subjects.map((s: any) => ({ value: s.name ?? s.subject, label: s.name ?? s.subject }))
          : [];
      setSubjectsOptions(list);
    } catch (e) {
      setSubjectsOptions([]);
    } finally {
      setSubjectsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubjects();
  }, []);




  // Force re-render state for question type changes
  const [questionTypeChangeKey, setQuestionTypeChangeKey] = React.useState(0);

  const handleFinish = async (values: any) => {
    try {
      setSubmitting(true);
  
      // Validate image questions have images
      const questions = values?.questions || [];
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (q?.questionType === 'image') {
          const hasImage = q?.imageFileList?.[0]?.url || 
                          q?.imageFileList?.[0]?.thumbUrl || 
                          q?.imageUrl;
          if (!hasImage) {
            message.error(`Please upload an image for question ${i + 1}`);
            setSubmitting(false);
            return;
          }
        }
      }
  
      // Normalize questions
      const normalizedQuestions = questions.map((q: any) => {
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
  
        if (q?.questionType === 'image') {
          const fileUrl =
            q?.imageFileList?.[0]?.url ||
            q?.imageFileList?.[0]?.thumbUrl ||
            q?.image ||
            null;
          normalized.imageUrl = fileUrl;
        } else {
          normalized.imageUrl = null;
        }
  
        return normalized;
      });
  
      // Resolve book name (send name, not id)
      const resolvedBookName = selectedBookName || (booksOptions.find(b => b.value === values?.book)?.label) || values?.book;

      // Build payload (no examType here, backend doesn't use it)
      const payload = {
        className: isEdit ? selectedClass : values?.className,
        subject: isEdit ? selectedSubject : values?.subject,
        title: isEdit ? selectedBookName : resolvedBookName,
        book: isEdit ? selectedBookName : resolvedBookName,
        chapter: isEdit ? selectedChapter : values?.chapter,
        status: values?.status ?? true,
        questions: normalizedQuestions,
      };
  
      console.log("REQ BODY >>>", payload);
  
      if (!isEdit) {
        await axios.post(`${BASE_URL}${API.QUIZ_ITEMS}`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        message.success("Questions created successfully!");
      } else {
        await axios.put(`${BASE_URL}${API.QUIZ_ITEMS}/${quizId}`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
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

  

  

  const fetchBooks = async (cls?: string, subj?: string) => {
    if (!cls || !subj) return;
    try {
      setBooksLoading(true);
      setBooksOptions([]);
      const data = await GET(API.BOOKS, { class: cls, subject: subj });
      const list = Array.isArray(data?.books)
        ? data.books
        : Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
      const options = list
        .map((item: any) => {
          if (typeof item === 'string') {
            return { value: item, label: item };
          }
          const label = item?.book || item?.title || item?.name || "";
          const value = item?._id || item?.id || item?.code || label;
          return label ? { value: String(value), label: String(label) } : null;
        })
        .filter(Boolean) as Array<{ value: string; label: string }>;
      setBooksOptions(options);
    } catch (e) {
      setBooksOptions([]);
    } finally {
      setBooksLoading(false);
    }
  };

  const onChangeClass = (value: string) => {
    setSelectedClass(value);
    form.setFieldValue('book', undefined);
    setBooksOptions([]);
    if (value && selectedSubject) {
      fetchBooks(value, selectedSubject);
    }
  };

  const onChangeSubject = (value: string) => {
    setSelectedSubject(value);
    form.setFieldValue('book', undefined);
    setBooksOptions([]);
    if (selectedClass && value) {
      fetchBooks(selectedClass, value);
    }
    // reset chapter when dependency changes
    form.setFieldValue('chapter', undefined);
    setChaptersOptions([]);
  };

  const fetchChapters = async (cls?: string, subj?: string, bookId?: string) => {
    if (!cls || !subj || !bookId) return;
    try {
      setChaptersLoading(true);
      setChaptersOptions([]);
      // Using GET helper with direct path
      const data = await GET('/chaptersr', { class: cls, subject: subj, book: bookId });
      // Expected shape (per sample): { results: [{ chapters: [{ chapterName, _id }, ...] }] }
      const chaptersArray = Array.isArray(data?.results) && data.results.length > 0
        ? data.results[0]?.chapters || []
        : Array.isArray(data?.chapters)
          ? data.chapters
          : Array.isArray(data)
            ? data
            : [];
      const options = (chaptersArray as any[])
        .map((ch: any) => {
          const chapterName = typeof ch === 'string' ? ch : (ch?.chapterName || ch?.name || ch?.title || '');
          return chapterName ? { value: String(chapterName), label: String(chapterName) } : null;
        })
        .filter(Boolean) as Array<{ value: string; label: string }>;
      setChaptersOptions(options);
    } catch (e) {
      setChaptersOptions([]);
    } finally {
      setChaptersLoading(false);
    }
  };

  const onChangeBook = (value: string, option: any) => {
    setSelectedBook(value);
    const bookName = option?.label ?? value;
    setSelectedBookName(bookName);
    // reset chapter when book changes
    form.setFieldValue('chapter', undefined);
    setChaptersOptions([]);
    if (selectedClass && selectedSubject && value) {
      fetchChapters(selectedClass, selectedSubject, value);
    }
  };

  // Chapters are fetched only when book changes

  

  // Handle image selection - open modal for cropping
  const handleImageSelect = (file: File, questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
    setSelectedFile(file);
    
    // Create image URL for preview
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result as string);
      setImageModalVisible(true);
    });
    reader.readAsDataURL(file);
    
    return false; // Prevent default upload
  };

  // Handle modal cancel - clear image selection
  const handleModalCancel = () => {
    setImageModalVisible(false);
    setCurrentQuestionIndex(null);
    setSelectedFile(null);
    setImgSrc('');
    
    // Clear the image from form if modal was cancelled
    if (currentQuestionIndex !== null) {
      const questions = form.getFieldValue('questions') || [];
      if (questions[currentQuestionIndex]) {
        questions[currentQuestionIndex] = {
          ...questions[currentQuestionIndex],
          imageUrl: null,
          imageFileList: []
        };
        form.setFieldValue('questions', questions);
      }
    }
  };

  // Handle final image upload
  const handleImageUpload = async () => {
    if (!selectedFile || currentQuestionIndex === null) {
      message.error('Please select an image');
      return;
    }

    try {
      setUploadingImages(prev => ({ ...prev, [currentQuestionIndex]: true }));
      
      // Create form data with original image
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await axios.post(`${BASE_URL}${API.UPLOAD}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data && response.data.url) {
        // Update the form with the uploaded image URL
        const questions = form.getFieldValue('questions') || [];
        if (questions[currentQuestionIndex]) {
          questions[currentQuestionIndex] = {
            ...questions[currentQuestionIndex],
            imageUrl: response.data.url,
            imageFileList: [{
              uid: selectedFile.name,
              name: selectedFile.name,
              status: 'done',
              url: response.data.url,
            }]
          };
          form.setFieldValue('questions', questions);
        }
        message.success('Image uploaded successfully!');
        
        // Close modal and reset state
        setImageModalVisible(false);
        setCurrentQuestionIndex(null);
        setSelectedFile(null);
        setImgSrc('');
      }
    } catch (error: any) {
      console.error('Image upload failed:', error);
      message.error('Failed to upload image. Please try again.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [currentQuestionIndex]: false }));
    }
  };

  // Handle image removal
  const handleImageRemove = (questionIndex: number) => {
    const questions = form.getFieldValue('questions') || [];
    if (questions[questionIndex]) {
      questions[questionIndex] = {
        ...questions[questionIndex],
        imageUrl: null,
        imageFileList: []
      };
      form.setFieldValue('questions', questions);
    }
  };
  

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

  // Set initial values if editing
  React.useEffect(() => {
    const loadQuestionData = async () => {
    if (isEdit && quizId) {
        try {
          const questionData = await fetchQuestionData(quizId);
          if (questionData) {
            // Set form values with real API data
            const formData = {
              className: questionData.className,
              subject: questionData.subject,
              book: questionData.book || questionData.title,
              chapter: questionData.chapter,
              status: questionData.status ?? true,
              questions: (questionData.questions || []).map((q: any) => {
                const mappedQuestion: any = {
                  questionType: q.questionType,
                  question: q.question,
                  marks: q.marks,
                };

                // Handle MCQ options
                if (q.questionType === 'mcq' && q.options) {
                  mappedQuestion.options = q.options;
                  mappedQuestion.correctAnswer = q.correctAnswer;
                }

                // Handle text-based answers
                if (['fillblank', 'shortanswer', 'essay'].includes(q.questionType)) {
                  mappedQuestion.correctAnswer = q.correctAnswer;
                }

                // Handle image questions
                if (q.questionType === 'image' && q.imageUrl) {
                  mappedQuestion.imageUrl = q.imageUrl;
                  mappedQuestion.imageFileList = [{
                    uid: '-1',
                    name: 'question-image',
                    status: 'done',
                    url: q.imageUrl,
                  }];
                }

                return mappedQuestion;
          }),
        };

            form.setFieldsValue(formData);
            
            // Set dependent dropdowns
            if (questionData.className) {
              setSelectedClass(questionData.className);
            }
            if (questionData.subject) {
              setSelectedSubject(questionData.subject);
            }
            if (questionData.book || questionData.title) {
              setSelectedBook(questionData.book || questionData.title);
              setSelectedBookName(questionData.book || questionData.title);
            }
            if (questionData.chapter) {
              setSelectedChapter(questionData.chapter);
            }
          }
        } catch (error) {
          console.error('Failed to load question data:', error);
          message.error('Failed to load question data');
        }
      }
    };

    loadQuestionData();
  }, [form, isEdit, quizId]);

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

      case 'fillblank':
        return null;

      case 'shortanswer':
        return null;

      case 'essay':
        return null;

      case 'image':
        return null;

      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader title={isEdit ? "Edit Question" : "Add Question"} backButton={true} />
      
      <Card className="w-full mt-4 shadow-md">
        <Spin spinning={loadingQuestionData} tip="Loading question data...">
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
          {/* Basic Information - Only show when creating new question */}
          {!isEdit && (
            <>
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
                      onChange={onChangeClass}
                      allowClear
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
                      options={subjectsOptions}
                      loading={subjectsLoading}
                      onChange={onChangeSubject}
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Form.Item
                  required={false}
                    name="book"
                    label="Book"
                    rules={[{ required: true, message: 'Please select a title!' }]}
                  >
                    <Select 
                      placeholder="Select Book" 
                      size="large"
                      allowClear
                      loading={booksLoading}
                      disabled={!selectedClass || !selectedSubject}
                      options={booksOptions}
                      onChange={onChangeBook}
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
                      allowClear
                      loading={chaptersLoading}
                      disabled={!selectedClass || !selectedSubject || !selectedBook}
                      options={chaptersOptions}
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
            </>
          )}

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
                          size="large"
                            placeholder="Select type"
                            onChange={(value) => handleQuestionTypeChange(name, value)}
                          >
                            <Option value="mcq">Multiple Choice (MCQ)</Option>
                            <Option value="fillblank">Fill in the Blank</Option>
                            <Option value="shortanswer">Short Answer</Option>
                            <Option value="essay">Essay</Option>
                            <Option value="image">Image</Option>
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
                          size="large"
                            placeholder="Enter marks" 
                            style={{ width: "100%" }} 
                            min={1}
                            max={100}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {form.getFieldValue(['questions', name, 'questionType']) && (
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

                    {/* Image upload is shown when type is Image */}
                    {form.getFieldValue(['questions', name, 'questionType']) === 'image' && (
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item 
                            {...restField}
                            name={[name, 'imageFileList']}
                            label="Upload Image"
                            rules={[{ required: true, message: 'Please upload image!' }]}
                          >
                            <Upload
                              listType="picture-card"
                              maxCount={1}
                              beforeUpload={(file) => {
                                handleImageSelect(file, name);
                                return false; // Prevent default upload
                              }}
                              defaultFileList={form.getFieldValue(['questions', name, 'imageFileList'])}
                              onChange={({ fileList }) => {
                                // This will be handled by the beforeUpload function
                              }}
                              onRemove={() => {
                                handleImageRemove(name);
                                return true;
                              }}
                              showUploadList={{
                                showUploadList: true,
                                showRemoveIcon: true,
                                showPreviewIcon: false,
                              }}
                            >
                              <div>
                                {uploadingImages[name] ? (
                                  <div>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                    <div style={{ marginTop: 8 }}>Uploading...</div>
                                  </div>
                                ) : (
                              <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                                  </div>
                                )}
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
        </Spin>
      </Card>

      {/* Image Upload Modal */}
      <Modal
        title="Upload Image"
        open={imageModalVisible}
        onCancel={handleModalCancel}
        width={600}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleModalCancel}
          >
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            loading={currentQuestionIndex !== null && uploadingImages[currentQuestionIndex]}
            onClick={handleImageUpload}
            disabled={!selectedFile}
            style={{ 
              backgroundColor: "#007575", 
              borderColor: "#007575" 
            }}
          >
            Upload Image
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          {imgSrc && (
            <img
              alt="Preview"
              src={imgSrc}
              style={{ maxHeight: '400px', maxWidth: '100%', marginBottom: '16px' }}
              onLoad={onImageLoad}
            />
          )}
          <div style={{ color: '#666' }}>
            <p>Preview your selected image. Click "Upload Image" to proceed.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuestionForm;