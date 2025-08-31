// @ts-nocheck
import React, { useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Collapse,
  List,
} from "antd";
import { RightOutlined, CloseOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const { Option } = Select;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const Syllabus = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    "Accounting",
  ];

  // Syllabus data structure
  const syllabusData = {
    "Accounting": {
      "Class 10": {
        "CBSE": [
          {
            title: "Accounting Application of Electronic Spreadsheet",
            topics: [
              "Concept & Features of electronic spreadsheet",
              "Application in generating accounting information in ES",
              "Data representation- graphs, charts and diagrams"
            ]
          },
          {
            title: "Accounting Ratios",
            topics: [
              "Meaning of Accounting Ratios",
              "Objectives of Ratio Analysis",
              "Limitations of Ratio Analysis",
              "Types of Ratios",
              "Liquidity Ratios",
              "Solvency Ratios",
              "Activity (or Turnover) Ratios",
              "Profitability Ratios",
              "Advantages of Ratio Analysis"
            ]
          },
          {
            title: "Accounting for share Capital",
            topics: [
              "Features of a Company",
              "Kinds of Companies",
              "Share Capital of a Company",
              "Nature and Classes of Shares",
              "Issue of Shares at Par, at Premium, consideration other than cash",
              "Forfeiture of Shares",
              "Reissue of Shares",
              "Oversubscription",
              "Undersubscription"
            ]
          }
        ],
        "ICSE & ISC": [
          {
            title: "Financial Accounting",
            topics: [
              "Introduction to Financial Accounting",
              "Basic Accounting Concepts",
              "Double Entry System",
              "Journal and Ledger",
              "Trial Balance"
            ]
          }
        ],
        "UP Board": [
          {
            title: "लेखाशास्त्र के मूल सिद्धांत",
            topics: [
              "लेखाशास्त्र का परिचय",
              "लेखांकन के सिद्धांत",
              "दोहरा लेखा प्रणाली",
              "जर्नल और खाता बही"
            ]
          }
        ]
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedModule("");
    setSelectedCourse("");
    setSelectedSubject("");
    setShowSyllabus(false);
    setSearchTerm("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedModule("");
    setSelectedCourse("");
    setSelectedSubject("");
    setShowSyllabus(false);
    setSearchTerm("");
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedCourse("");
    setSelectedSubject("");
    setShowSyllabus(false);
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setSelectedSubject("");
    setShowSyllabus(false);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setShowSyllabus(false);
  };

  const handleSearchSyllabus = () => {
    setShowSyllabus(true); // Always show syllabus when search is clicked
  };

  // Get syllabus data based on selection
  const getSyllabusData = () => {
    // Always return dummy data when search is clicked, regardless of selection
    return syllabusData["Accounting"]["Class 10"]["CBSE"] || [];
  };

  const filteredSyllabusData = getSyllabusData().filter(item =>
    searchTerm === "" || 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 h-min font-local2">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          shape="square"
          className="flex items-center justify-center"
        >
         <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          My Syllabus
        </Title>
      </div>

      {/* Syllabus Selection Card */}
      <div className="w-full mb-5">
        <Card className="shadow-sm bg-white w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <Title level={5} className="text-gray-700 mb-3">
                Select Class & Subject
              </Title>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                 <Select
                   value={selectedModule}
                   onChange={handleModuleChange}
                   placeholder="Choose Module"
                   className="w-full"
                   suffixIcon={<DownOutlined />}
                   style={{ height: "40px" }}
                 >
                  {modules.map((module) => (
                    <Option key={module} value={module}>
                      {module}
                    </Option>
                  ))}
                </Select>
                
                                 <Select
                   value={selectedCourse}
                   onChange={handleCourseChange}
                   placeholder="Choose Course"
                   className="w-full"
                   suffixIcon={<DownOutlined />}
                   disabled={!selectedModule}
                   style={{ height: "40px" }}
                 >
                  {courses.map((course) => (
                    <Option key={course} value={course}>
                      {course}
                    </Option>
                  ))}
                </Select>
                
                                 <Select
                   value={selectedSubject}
                   onChange={handleSubjectChange}
                   placeholder="Choose Subject"
                   className="w-full"
                   suffixIcon={<DownOutlined />}
                   disabled={!selectedCourse}
                   style={{ height: "40px" }}
                 >
                  {subjects.map((subject) => (
                    <Option key={subject} value={subject}>
                      {subject}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            
           
          </div>
          <Button
               type="primary"
               icon={<SearchOutlined />}
               onClick={handleSearchSyllabus}
               className=" mt-2 bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 hover:scale-105"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px", // fixed typo (was 9a0px)
            }}
             >
              Search Syllabus
            </Button>
        </Card>
      </div>

      {/* Syllabus Display */}
      {showSyllabus && (
        <div className="w-full">
          <Card className="shadow-lg bg-white w-full">
            {/* Syllabus Header */}

            {/* Syllabus Content */}
            <div className="space-y-4">
              {filteredSyllabusData.length > 0 ? (
                <div className="space-y-6">
                  {filteredSyllabusData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {index + 1}. {item.title}
                      </h3>
                      <div className="space-y-2">
                        {item.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <Text className="text-gray-600">
                              {String.fromCharCode(97 + topicIndex)}. {topic}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <Text className="text-gray-500">
                    {searchTerm ? "No syllabus items found matching your search." : "No syllabus data available for the selected combination."}
                  </Text>
                </Card>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!showSyllabus && (
        <div className="w-full">
          <Card className="shadow-lg bg-white w-full">
          <h4 className="font-local2 text-lg mb-2 text-gray-600 ">
          Select Class & Subject to View Syllabus
            </h4>
          
          </Card>
        </div>
      )}
    </div>
  );
};

export default Syllabus;