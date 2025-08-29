// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Radio,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import { RightOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import img1 from "../../../../../assets/institute1.jpeg";
import img2 from "../../../../../assets/institute2.jpeg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

interface Step1Props {
  step1Data: {
    module: string;
    course: string;
    subject: string;
    classSubjectValue: string;
    paperType: string;
    paperFormat: string;
    pdfHeader: string;
    pdfFooter: string;
    testPaperName: string;
    timeAllowed: string;
    generalInstructions: string;
  };
  setStep1Data: React.Dispatch<
    React.SetStateAction<{
      module: string;
      course: string;
      subject: string;
      classSubjectValue: string;
      paperType: string;
      paperFormat: string;
      pdfHeader: string;
      pdfFooter: string;
      testPaperName: string;
      timeAllowed: string;
      generalInstructions: string;
    }>
  >;
}

const Step1 = ({ step1Data, setStep1Data }: Step1Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  const modules = ["CBSE", "ICSE & ISC", "UP Board"];
  const courses = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const subjects = [
    "Common English",
    "Malayalam",
    "Biology",
    "Chemistry",
    "Maths",
    "Arabic",
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChange = (field: keyof typeof step1Data, value: string) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
  };

  const handleOk = () => {
    if (selectedModule && selectedCourse && selectedSubject) {
      const classSubjectValue = `${selectedModule} > ${selectedCourse} > ${selectedSubject}`;
      setStep1Data((prev) => ({
        ...prev,
        module: selectedModule,
        course: selectedCourse,
        subject: selectedSubject,
        classSubjectValue,
      }));
      setIsModalVisible(false);
      setSelectedModule("");
      setSelectedCourse("");
      setSelectedSubject("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedModule("");
    setSelectedCourse("");
    setSelectedSubject("");
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedCourse("");
    setSelectedSubject("");
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setSelectedSubject("");
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handlePaperTypeChange = (e: any) => {
    handleChange("paperType", e.target.value);
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("pdfHeader", e.target.value);
  };

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("pdfFooter", e.target.value);
  };

  const handleTestPaperNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange("testPaperName", e.target.value);
  };

  const handleTimeAllowedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    handleChange("timeAllowed", value);
  };

  const handleGeneralInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChange("generalInstructions", e.target.value);
  };

  useEffect(() => {
    if (isModalVisible && step1Data.module) {
      setSelectedModule(step1Data.module);
      if (step1Data.course) {
        setSelectedCourse(step1Data.course);
        if (step1Data.subject) {
          setSelectedSubject(step1Data.subject);
        }
      }
    }
  }, [isModalVisible, step1Data.module, step1Data.course, step1Data.subject]);

  return (
    <div className="space-y-6 font-local2">
      {/* Class & Subject Card */}
      <Card className="rounded-lg shadow-sm border border-gray-200">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12} xl={8}>
            <Title level={5} className="text-gray-700 mb-3">
              Class & Subject
            </Title>
            <div className="flex flex-col sm:flex-row gap-2 lg:h-[40px] lg:w-[400px] xl:w-[700px]">
              <Input
                placeholder="Select Class & Subject"
                value={step1Data.classSubjectValue}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={showModal}
                type="primary"
                style={{ backgroundColor: "#007575", borderColor: "#007575" }}
                className="lg:h-[40px]"
              >
                Select
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="rounded-lg shadow-sm border border-gray-200">
        <Row gutter={[17, 17]}>
          <Col xs={24} lg={12} xl={8}>
            <Title level={5} className="text-gray-700 mb-3">
              Source (what is this){" "}
            </Title>
            <Radio.Group disabled className="space-y-3">
              <Radio value="question-paper" className="block text-[16px]">
                All Question - Premium{" "}
                <span
                  className="text-blue-500 underline font-local2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent radio click
                    navigate("/pricing"); // 👈 change to your route
                  }}
                >
                  BUY
                </span>
              </Radio>
            </Radio.Group>
          </Col>
          <Col xs={24}>
            <Title level={5} className="text-gray-700 mb-3">
              Test Paper Type{" "}
              <span className="text-blue-500">
                (<span className="underline">What is this?</span>)
              </span>
            </Title>
            <Radio.Group
              onChange={handlePaperTypeChange}
              value={step1Data.paperType}
              className="space-y-3"
            >
              <Radio
                value="question-paper"
                className="block text-[16px] text-gray-600"
              >
                Question Paper (PDF/Word)
              </Radio>
              <Radio
                value="worksheet"
                className="block text-[16px] text-gray-600"
              >
                Worksheet (PDF/Word)
              </Radio>
            </Radio.Group>
          </Col>
          <Col xs={24}>
            <Title level={5} className="text-gray-700 mb-3">
              Blueprint Mode{" "}
              <span className="text-blue-500">
                (<span className="underline">What is this?</span>)
              </span>
            </Title>
            <Radio.Group className="space-y-3">
              <Radio
                value="question-paper"
                className="block text-[16px] text-gray-600"
              >
                Textbook
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
      </Card>

      {/* PDF Header & Footer Card */}
      <Card className="rounded-lg shadow-sm border border-gray-200">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12} xl={8}>
            <div className="space-y-4">
              <div>
                <Title level={5} className="text-gray-700 mb-3">
                  PDF Header & Footer
                    <span className="text-blue-500 cursor-pointer">
                (<span className="underline"
                onClick={() => navigate("/header")}
                >View/Edit</span>)
              </span>
                </Title>

                <Radio.Group className="space-y-3 block">
                  {/* First Option */}
                  <Radio
                    value="institution1"
                    className="flex items-start gap-3"
                  >
                    <img
                      src={img1}
                      alt="dummy"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <div className="text-[16px] text-gray-700 font-medium">
                        Green Valley Institute
                      </div>
                      <div className="text-sm text-gray-500">
                        123 Main Street, City
                      </div>
                    </div>
                  </Radio>

                  {/* Second Option */}
                  <Radio
                    value="institution2"
                    className="flex items-start gap-3"
                  >
                    <img
                      src={img2}
                      alt="dummy"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <div className="text-[16px] text-gray-700 font-medium font-local2">
                        Sunrise Academy
                      </div>
                      <div className="text-sm text-gray-500">
                        45 Market Road, Town
                      </div>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>

              {/* Test Paper Name Input */}
              <div className="mt-2 h-min">
                <Title level={5} className="text-gray-700 mb-3 mt-2">
                  Test Paper Name
                </Title>
                <Input
                  placeholder="Enter test paper name"
                  value={step1Data.testPaperName}
                  onChange={handleTestPaperNameChange}
                  required
                  className=" lg:w-[500px]  lg:h-[40px]"
                />
              </div>

              {/* Time Allowed Input */}
              <div>
                <Title level={5} className="text-gray-700 mb-3 mt-2">
                  Time Allowed (minutes)
                </Title>
                <Input
                  type="number"
                  placeholder="Enter time in minutes"
                  value={step1Data.timeAllowed}
                  onChange={handleTimeAllowedChange}
                  min="1"
                  max="999"
                  required
                  className=" lg:w-[500px]  lg:h-[40px]"
                />
              </div>
               <div>
          <Checkbox
            checked={step1Data.addWatermark}
            onChange={(e) =>
              setStep1Data({
                ...step1Data,
                addWatermark: e.target.checked,
              })
            }
          >
            Add Watermark in PDF{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              title="This will place a faint text or logo in the background of every page in your PDF."
            >
              (what is this?)
            </span>
          </Checkbox>
        </div>
        {step1Data.addWatermark && (
          <div className="mt-2">
            <Title level={5} className="text-gray-700 mb-2">
              Watermark Text
            </Title>
            <Input
              placeholder="Enter watermark text"
              value={step1Data.watermarkText}
              onChange={(e) =>
                setStep1Data({
                  ...step1Data,
                  watermarkText: e.target.value,
                })
              }
              className="lg:w-[500px] lg:h-[40px]"
            />
          </div>
        )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* General Instructions Card */}
      {/* <Card className="rounded-lg shadow-sm border border-gray-200">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12} xl={8}>
            <Title level={5} className="text-gray-700 mb-3">
              General Instructions
            </Title>
            <div className="space-y-4">
              <div>
                <TextArea
                  placeholder="Enter general instructions"
                  value={step1Data.generalInstructions}
                  onChange={handleGeneralInstructionsChange}
                  rows={6}
                />
              </div>

            </div>
          </Col>
        </Row>
      </Card> */}
      <Card className="rounded-lg shadow-sm border border-gray-200">
  <Row gutter={[16, 16]}>
    <Col xs={24} lg={12} xl={8}>
      <Title level={5} className="text-gray-700 mb-3">
        General Instructions
      </Title>

      {/* Rich Text Editor */}
      <ReactQuill
        theme="snow"
        value={step1Data.generalInstructions}
        onChange={(value) =>
          setStep1Data((prev) => ({ ...prev, generalInstructions: value }))
        }
        placeholder="Enter general instructions..."
        modules={{
          toolbar: [
            ["bold", "italic", "underline"], // text styles
            [{ list: "ordered" }, { list: "bullet" }],
            ["formula"], // math input
            ["clean"],
          ],
        }}
        className="bg-white rounded-md h-[250px]"
      />

      {/* Terms of Use Checkbox */}
     
    </Col>
    <Col xs={24} lg={12} xl={24} className="mt-8">
     <div className="mt-4">
        <Checkbox
          checked={step1Data.termsAgreed}
          onChange={(e) =>
            setStep1Data((prev) => ({
              ...prev,
              termsAgreed: e.target.checked,
            }))
          }
        >
          I have read and agree to the{" "}
          <span className="text-blue-600 underline cursor-pointer font-local2">
            Terms of Use
          </span>{" "}
          of this test generator.
        </Checkbox>
      </div>
    </Col>
  </Row>
</Card>

      {/* Modal for Class & Subject Selection */}
      <Modal
        title="Select Class & Subject"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!selectedModule || !selectedCourse || !selectedSubject}
            style={{ backgroundColor: "#007575", borderColor: "#007575" }}
          >
            OK
          </Button>,
        ]}
        className="max-w-md"
      >
        <div className="space-y-4">
          {/* Module Selection */}
          <div>
            <Text className="block text-gray-700 mb-2">Select Module</Text>
            <Select
              value={selectedModule}
              onChange={handleModuleChange}
              placeholder="Choose Module"
              className="w-full"
              suffixIcon={<DownOutlined />}
            >
              {modules.map((module) => (
                <Option key={module} value={module}>
                  {module}
                </Option>
              ))}
            </Select>
          </div>

          {/* Course Selection - Only show if module is selected */}
          {selectedModule && (
            <div>
              <Text className="block text-gray-700 mb-2">Select Course</Text>
              <Select
                value={selectedCourse}
                onChange={handleCourseChange}
                placeholder="Choose Course"
                className="w-full"
                suffixIcon={<DownOutlined />}
              >
                {courses.map((course) => (
                  <Option key={course} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {/* Subject Selection - Only show if course is selected */}
          {selectedCourse && (
            <div>
              <Text className="block text-gray-700 mb-2">Select Subject</Text>
              <Select
                value={selectedSubject}
                onChange={handleSubjectChange}
                placeholder="Choose Subject"
                className="w-full"
                suffixIcon={<DownOutlined />}
              >
                {subjects.map((subject) => (
                  <Option key={subject} value={subject}>
                    {subject}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {/* Selection Preview */}
          {(selectedModule || selectedCourse || selectedSubject) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <Text strong className="text-gray-600">
                Current Selection:
              </Text>
              <div className="mt-1">
                {selectedModule && (
                  <div className="flex items-center">
                    <Text className="text-blue-600">{selectedModule}</Text>
                    {selectedCourse && (
                      <RightOutlined className="mx-2 text-gray-400" />
                    )}
                  </div>
                )}
                {selectedCourse && (
                  <div className="flex items-center">
                    <Text className="text-green-600">{selectedCourse}</Text>
                    {selectedSubject && (
                      <RightOutlined className="mx-2 text-gray-400" />
                    )}
                  </div>
                )}
                {selectedSubject && (
                  <div>
                    <Text className="text-purple-600">{selectedSubject}</Text>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Step1;
