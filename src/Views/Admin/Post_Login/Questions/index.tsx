// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Form, Input, Popconfirm, Card, Row, Col, Switch, Select, InputNumber, Radio, Checkbox, Divider } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";

const { TextArea } = Input;

const Questions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [questionType, setQuestionType] = useState('mcq');

  // Open Modal for Create
  const showModal = () => {
    setEditingRecord(null);
    setViewRecord(null);
    setQuestionType('mcq');
    setIsModalOpen(true);
    form.resetFields();
  };

  // Close Form Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    setViewRecord(null);
    setQuestionType('mcq');
    form.resetFields();
  };

  // Save Form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        message.success("Question updated successfully!");
      } else {
        message.success("Question created successfully!");
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      setViewRecord(null);
      setQuestionType('mcq');
      form.resetFields();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setViewRecord(null);
    setQuestionType(record.type);
    form.setFieldsValue({
      question: record.question,
      questionMalayalam: record.questionMalayalam,
      chapterId: record.chapterId,
      type: record.type,
      marks: record.marks,
      difficulty: record.difficulty,
      options: record.options,
      correctAnswer: record.correctAnswer,
      explanation: record.explanation,
      status: record.status === "Active",
    });
    setIsModalOpen(true);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Question ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  // Handle question type change
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value);
    form.setFieldsValue({ options: [], correctAnswer: [] });
  };

  return (
    <>
      <PageHeader title="Questions" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showModal}
        >
          Create Question
        </Button>
      </PageHeader>

      <Datatable onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      {/* Create / Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Question" : "Create Question"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
        width={900}
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
                name="chapterId" 
                label="Chapter"
                rules={[{ required: true, message: 'Please select chapter!' }]}
              >
                <Select placeholder="Select chapter">
                  <Select.Option value={1}>Linear Equations - Advanced Algebra</Select.Option>
                  <Select.Option value={2}>Variables and Data Types - Python Programming</Select.Option>
                  <Select.Option value={3}>Hamlet Analysis - Shakespeare Studies</Select.Option>
                  <Select.Option value={4}>Double Entry System - Financial Accounting</Select.Option>
                  <Select.Option value={5}>Constitutional Framework - Indian Polity</Select.Option>
                  <Select.Option value={6}>Content Strategy - Social Media Marketing</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="type" 
                label="Question Type"
                rules={[{ required: true, message: 'Please select question type!' }]}
              >
                <Select 
                  placeholder="Select question type"
                  onChange={handleQuestionTypeChange}
                >
                  <Select.Option value="mcq">Multiple Choice (MCQ)</Select.Option>
                  <Select.Option value="truefalse">True/False</Select.Option>
                  <Select.Option value="fillblank">Fill in the Blank</Select.Option>
                  <Select.Option value="shortanswer">Short Answer</Select.Option>
                  <Select.Option value="essay">Essay</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="marks" 
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
            <Col span={12}>
              <Form.Item 
                name="difficulty" 
                label="Difficulty Level"
                rules={[{ required: true, message: 'Please select difficulty!' }]}
              >
                <Select placeholder="Select difficulty">
                  <Select.Option value="easy">Easy</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="hard">Hard</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Question Content</Divider>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="question" 
                label="Question (English)"
                rules={[{ required: true, message: 'Please enter question!' }]}
              >
                <TextArea 
                  rows={4}
                  placeholder="Enter your question in English" 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="questionMalayalam" 
                label="Question (Malayalam)"
                rules={[{ required: true, message: 'Please enter question in Malayalam!' }]}
              >
                <TextArea 
                  rows={4}
                  placeholder="ചോദ്യം മലയാളത്തിൽ നൽകുക (Enter your question in Malayalam)" 
                />
              </Form.Item>
            </Col>
          </Row>

          {/* MCQ Options */}
          {questionType === 'mcq' && (
            <>
              <Divider orientation="left">Multiple Choice Options</Divider>
              <Form.List name="options">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row gutter={16} key={key} className="mb-2">
                        <Col span={20}>
                          <Form.Item
                            {...restField}
                            name={[name, 'text']}
                            rules={[{ required: true, message: 'Please enter option text!' }]}
                          >
                            <Input placeholder={`Option ${key + 1}`} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button 
                            type="text" 
                            danger 
                            onClick={() => remove(name)}
                            disabled={fields.length <= 2}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={() => add()} 
                        block
                        disabled={fields.length >= 6}
                      >
                        + Add Option
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item 
                name="correctAnswer" 
                label="Correct Answer(s)"
                rules={[{ required: true, message: 'Please select correct answer!' }]}
              >
                <Checkbox.Group>
                  {form.getFieldValue('options')?.map((option: any, index: number) => (
                    <Checkbox key={index} value={index}>
                      Option {index + 1}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </>
          )}

          {/* True/False Options */}
          {questionType === 'truefalse' && (
            <>
              <Divider orientation="left">True/False Options</Divider>
              <Form.Item 
                name="correctAnswer" 
                label="Correct Answer"
                rules={[{ required: true, message: 'Please select correct answer!' }]}
              >
                <Radio.Group>
                  <Radio value="true">True</Radio>
                  <Radio value="false">False</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          {/* Fill in the Blank */}
          {questionType === 'fillblank' && (
            <>
              <Divider orientation="left">Fill in the Blank</Divider>
              <Form.Item 
                name="correctAnswer" 
                label="Correct Answer"
                rules={[{ required: true, message: 'Please enter correct answer!' }]}
              >
                <Input placeholder="Enter the correct answer" />
              </Form.Item>
            </>
          )}

          {/* Short Answer & Essay */}
          {(questionType === 'shortanswer' || questionType === 'essay') && (
            <>
              <Divider orientation="left">Answer Guidelines</Divider>
              <Form.Item 
                name="correctAnswer" 
                label="Sample Answer / Key Points"
                rules={[{ required: true, message: 'Please enter sample answer!' }]}
              >
                <TextArea 
                  rows={4}
                  placeholder="Enter sample answer or key points for evaluation" 
                />
              </Form.Item>
            </>
          )}

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
                name="explanation" 
                label="Explanation (Optional)"
              >
                <TextArea 
                  rows={3}
                  placeholder="Provide explanation for the correct answer" 
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
        title="Question Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
        width={800}
      >
        {viewRecord && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Question (English):</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.question}</span>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Question (Malayalam):</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.questionMalayalam}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Chapter:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.chapterName}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Type:</span>
                <span className="font-local2 text-lg text-gray-900 capitalize">{viewRecord.type}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Marks:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.marks}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Difficulty:</span>
                <span className="font-local2 text-lg text-gray-900 capitalize">{viewRecord.difficulty}</span>
              </div>

              {viewRecord.type === 'mcq' && viewRecord.options && (
                <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Options:</span>
                  <div className="max-w-xs text-right">
                    {viewRecord.options.map((option: any, index: number) => (
                      <div key={index} className="font-local2 text-sm text-gray-900 mb-1">
                        {index + 1}. {option.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Correct Answer:</span>
                <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.correctAnswer}</span>
              </div>

              {viewRecord.explanation && (
                <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Explanation:</span>
                  <span className="font-local2 text-lg text-gray-900 max-w-xs text-right">{viewRecord.explanation}</span>
                </div>
              )}
              
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

export default Questions;
