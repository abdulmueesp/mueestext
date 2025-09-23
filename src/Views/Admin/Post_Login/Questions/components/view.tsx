
// @ts-nocheck
import React from "react";
import { Card, Divider, Button, Tag, Image } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import img from "../../../../../assets/matching.png"
import img2 from "../../../../../assets/match2.jpeg"
const QuestionView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Complete dummy data with all question types
  const getQuestionData = (id: string) => {
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
            explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
            image: null
          },
          {
            questionType: "fillblank",
            question: "If 3x - 7 = 14, then x = ____",
            marks: 3,
            correctAnswer: "7",
            explanation: "Add 7 to both sides: 3x = 21, then divide by 3: x = 7",
            image: null
          },
          {
            questionType: "shortanswer",
            question: "Explain how to graph the equation y = 2x + 3",
            marks: 5,
            correctAnswer: "Start at y-intercept (0,3), use slope 2 (rise 2, run 1) to plot points",
            explanation: "The equation is in slope-intercept form y = mx + b",
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
            explanation: "Python variable names can start with underscore but not with numbers",
            image: null
          },
          {
            questionType: "matching",
            question: "Match the following diagram parts",
            marks: 2,
            image: img,
            explanation: "Students should match labels to parts on the image"
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
            explanation: "Focus on multiple revenge plots and their interconnections",
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
            explanation: "Property, Plant & Equipment are non-current assets as they are held for long-term use",
            image: null
          },
          {
            exercise: "Financial Ratios",
            questionType: "fillblank",
            question: "The current ratio is calculated as Current Assets divided by ____",
            marks: 2,
            correctAnswer: "Current Liabilities",
            explanation: "Current ratio = Current Assets / Current Liabilities",
            image: null
          },
          {
            exercise: "Cash Flow Analysis",
            questionType: "shortanswer",
            question: "Explain the difference between operating cash flow and free cash flow.",
            marks: 5,
            correctAnswer: "Operating cash flow is cash generated from core business operations, while free cash flow is operating cash flow minus capital expenditures.",
            explanation: "Free cash flow shows the actual cash available to shareholders after necessary investments",
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
            explanation: "Right to practice religion is covered under Article 25, not Article 19",
            image: null
          },
          {
            exercise: "Constitutional Amendments",
            questionType: "truefalse",
            question: "Fundamental Rights can be amended by simple majority in Parliament.",
            marks: 1,
            correctAnswer: "false",
            explanation: "Fundamental Rights require special majority for amendment as per Article 368",
            image: null
          },
          {
            exercise: "Case Studies",
            questionType: "essay",
            question: "Discuss the significance of the Kesavananda Bharati case in Indian constitutional law.",
            marks: 10,
            correctAnswer: "The Kesavananda Bharati case established the basic structure doctrine, limiting Parliament's power to amend the Constitution and ensuring core constitutional principles remain intact.",
            explanation: "This case is landmark for establishing limits on constitutional amendments",
            image: null
          },
          {
            exercise: "Article 32 Rights",
            questionType: "fillblank",
            question: "Article 32 is known as the ____ of the Constitution.",
            marks: 2,
            correctAnswer: "Heart and Soul",
            explanation: "Dr. B.R. Ambedkar called Article 32 the 'Heart and Soul' of the Constitution",
            image: null
          },
          {
            questionType: "matching",
            question: "Match the data structures with their time complexity",
            marks: 3,
            image: img2,
            explanation: "Students should match data structures with their Big O notation"
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
            exercise: "Content Planning",
            questionType: "shortanswer",
            question: "What are the key elements of a successful content marketing strategy?",
            marks: 4,
            correctAnswer: "Target audience identification, content goals, content calendar, performance metrics, and consistent brand voice.",
            explanation: "These elements ensure strategic and measurable content creation",
            image: null
          },
          {
            exercise: "Engagement Metrics",
            questionType: "fillblank",
            question: "The engagement rate is calculated by dividing total engagements by ____ and multiplying by 100.",
            marks: 2,
            correctAnswer: "total reach",
            explanation: "Engagement Rate = (Total Engagements / Total Reach) × 100",
            image: null
          },
          {
            exercise: "Platform Strategy",
            questionType: "truefalse",
            question: "The same content strategy works equally well across all social media platforms.",
            marks: 1,
            correctAnswer: "false",
            explanation: "Each platform has unique audience behaviors and content formats that require tailored strategies",
            image: null
          },
          {
            exercise: "Content Types",
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
            explanation: "Video content, especially Reels, typically receives higher engagement due to Instagram's algorithm favoring video",
            image: null
          },
          {
            questionType: "matching",
            question: "Match the following mathematical functions with their derivatives",
            marks: 3,
            image: img,
            explanation: "Students should match functions with their derivative formulas"
          }
        ],
        status: false
      }
    };

    return questions[id] || null;
  };

  const questionData = getQuestionData(id);

  const handleEdit = () => {
    navigate(`/questionform/${id}`);
  };

  const handleBack = () => {
    navigate('/questions');
  };

  const getQuestionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      mcq: "Multiple Choice (MCQ)",
      fillblank: "Fill in the Blank",
      shortanswer: "Short Answer",
      essay: "Essay",
      matching: "Matching",
    };
    return typeLabels[type] || type;
  };

  const getQuestionTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      mcq: "blue",
      fillblank: "orange",
      shortanswer: "purple",
      essay: "red",
      matching: "cyan",
    };
    return typeColors[type] || "default";
  };


  if (!questionData) {
    return (
      <>
        <PageHeader title="Questions Not Found" backButton={true} />
        <Card className="w-full mt-4">
          <div className="text-center py-8">
            <h3>Questions not found</h3>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Question Set Details" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={handleEdit}
        >
          Edit Questions
        </Button>
      </PageHeader>

      <Card className="w-full mt-4 shadow-md">
        <div className="p-4">
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Class:</span>
                <span className="font-local2 text-lg text-orange-600 font-semibold">
                  {questionData.className || questionData.module || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Title:</span>
                <span className="font-local2 text-lg text-blue-600">
                  {questionData.title || questionData.course || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Subject:</span>
                <span className="font-local2 text-lg text-green-600">
                  {questionData.subject || "N/A"}
                </span>
              </div>

              {/* <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Exam Type:</span>
                <span className="font-local2 text-lg text-purple-600">
                  {questionData.examType || "N/A"}
                </span>
              </div> */}

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Chapter:</span>
                <span className="font-local2 text-lg text-indigo-600 font-semibold">
                  {questionData.chapter || questionData.textbook || "N/A"}
                </span>
              </div>

              {/* <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Status:</span>
                <Tag
                  color={questionData.status ? "green" : "red"}
                  className={`font-local2 text-lg ${
                    questionData.status ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {questionData.status ? "Active" : "Inactive"}
                </Tag>
              </div> */}
            </div>

            {/* Questions Display */}
            <Divider orientation="left">Questions ({questionData.questions.length})</Divider>
            
            {questionData.questions && questionData.questions.length > 0 ? (
              questionData.questions.map((question: any, questionIndex: number) => (
                <Card
                  key={questionIndex}
                  className="mb-4"
                  style={{ backgroundColor: '#f8f9fa' }}
                  title={
                    <div className="flex justify-between items-center">
                      <span className="font-local2 text-lg font-bold">
                        Question {questionIndex + 1}
                      </span>
                      <div className="flex gap-2">
                        <Tag color={getQuestionTypeColor(question.questionType)}>
                          {getQuestionTypeLabel(question.questionType)}
                        </Tag>
                        <Tag color="cyan" className="font-bold">
                          {question.marks} Mark{question.marks > 1 ? 's' : ''}
                        </Tag>
                      </div>
                    </div>
                  }
                >
                  {/* Exercise removed in new flow */}

                  {/* Question Text */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Question: </span>
                    <div className="font-local2 text-lg text-gray-900 mt-2">
                      {question.question}
                    </div>
                  </div>

                  {/* Question Image */}
                  {question.image && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700">Image: </span>
                      <div className="mt-2">
                        <Image
                          width={200}
                          src={question.image}
                          alt="Question Image"
                        />
                      </div>
                    </div>
                  )}

                  {/* Options for MCQ */}
                  {question.questionType === 'mcq' && question.options && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700">Options: </span>
                      <div className="mt-2 space-y-2">
                        {question.options.map((option: any, optionIndex: number) => (
                          <div 
                            key={optionIndex}
                            className="p-2 rounded-lg bg-gray-100"
                          >
                            <span className="font-local2">
                              {String.fromCharCode(65 + optionIndex)}. {option.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

               


                </Card>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No questions added yet
              </div>
            )}

            {/* Summary */}
            <Card className="bg-blue-50">
              <div className="text-center">
                <h3 className="font-local2 text-xl font-bold text-blue-700 mb-2">
                  Question Set Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-bold text-2xl text-blue-600">
                      {questionData.questions.length}
                    </div>
                    <div className="text-gray-600">Total Questions</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-green-600">
                      {questionData.questions.reduce((sum: number, q: any) => sum + q.marks, 0)}
                    </div>
                    <div className="text-gray-600">Total Marks</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-orange-600">
                      {[...new Set(questionData.questions.map((q: any) => q.questionType))].length}
                    </div>
                    <div className="text-gray-600">Question Types</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-purple-600">
                      {Math.round(questionData.questions.reduce((sum: number, q: any) => sum + q.marks, 0) / questionData.questions.length * 10) / 10}
                    </div>
                    <div className="text-gray-600">Avg Marks</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

export default QuestionView;