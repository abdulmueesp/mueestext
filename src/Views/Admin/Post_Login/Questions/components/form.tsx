// // @ts-nocheck
// import React from "react";
// import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch, InputNumber, Radio, Checkbox, Upload } from "antd";
// import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
// import { useParams, useNavigate } from "react-router-dom";
// import PageHeader from "@/Components/common/PageHeader";
// import { message } from "@/Components/common/message/message";

// const { Option } = Select;
// const { TextArea } = Input;

// const QuestionForm = () => {
//   const [form] = Form.useForm();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = id && id !== 'new';

//   // Updated dummy data for questions
//   const getDummyData = (id: string) => {
//     const questions = {
//       '1': {
//         module: "Mathematics",
//         course: "Advanced Algebra",
//         subject: "Advanced Calculus",
//         textbook: "Calculus: Early Transcendentals",
//         chapter: "Linear Equations",
//         questions: [
//           {
//             exercise: "Basic Linear Equations Practice",
//             questionType: "mcq",
//             question: "What is the solution to the equation 2x + 5 = 13?",
//             marks: 2,
//             options: [
//               { text: "x = 4" },
//               { text: "x = 3" },
//               { text: "x = 5" },
//               { text: "x = 6" }
//             ],
//             correctAnswer: [0],
//             image: null
//           },
//           {
//             exercise: "Word Problems in Linear Equations",
//             questionType: "fillblank",
//             question: "If 3x - 7 = 14, then x = ____",
//             marks: 3,
//             correctAnswer: "7",
//             image: null
//           }
//         ],
//         status: true
//       },
//       '2': {
//         module: "Computer Science",
//         course: "Python Programming",
//         subject: "Data Structures & Algorithms",
//         textbook: "Introduction to Algorithms",
//         chapter: "Variables and Data Types",
//         questions: [
//           {
//             exercise: "Type Casting Practice",
//             questionType: "mcq",
//             question: "Which of the following is a valid Python variable name?",
//             marks: 1,
//             options: [
//               { text: "2variable" },
//               { text: "_variable" },
//               { text: "variable-name" },
//               { text: "class" }
//             ],
//             correctAnswer: [1],
//             image: null
//           }
//         ],
//         status: true
//       }
//     };

//     return questions[id] || null;
//   };

//   // Selector options
//   const moduleOptions = [
//     { value: "Mathematics", label: "Mathematics" },
//     { value: "Computer Science", label: "Computer Science" },
//     { value: "English Literature", label: "English Literature" },
//     { value: "Banking & Finance", label: "Banking & Finance" },
//     { value: "UPSC Preparation", label: "UPSC Preparation" },
//     { value: "Digital Marketing", label: "Digital Marketing" },
//   ];

//   const courseOptions = {
//     "Mathematics": [
//       { value: "Advanced Algebra", label: "Advanced Algebra" },
//       { value: "Calculus", label: "Calculus" },
//       { value: "Statistics", label: "Statistics" }
//     ],
//     "Computer Science": [
//       { value: "Python Programming", label: "Python Programming" },
//       { value: "Data Science", label: "Data Science" },
//       { value: "Web Development", label: "Web Development" }
//     ],
//     "English Literature": [
//       { value: "Shakespeare Studies", label: "Shakespeare Studies" },
//       { value: "Modern Literature", label: "Modern Literature" },
//       { value: "Poetry Analysis", label: "Poetry Analysis" }
//     ],
//     "Banking & Finance": [
//       { value: "Financial Accounting", label: "Financial Accounting" },
//       { value: "Investment Banking", label: "Investment Banking" },
//       { value: "Corporate Finance", label: "Corporate Finance" }
//     ],
//     "UPSC Preparation": [
//       { value: "Indian Polity", label: "Indian Polity" },
//       { value: "Geography", label: "Geography" },
//       { value: "History", label: "History" }
//     ],
//     "Digital Marketing": [
//       { value: "Social Media Marketing", label: "Social Media Marketing" },
//       { value: "SEO Optimization", label: "SEO Optimization" },
//       { value: "Content Marketing", label: "Content Marketing" }
//     ]
//   };

//   const subjectOptions = {
//     "Advanced Algebra": [
//       { value: "Advanced Calculus", label: "Advanced Calculus" },
//       { value: "Linear Algebra", label: "Linear Algebra" }
//     ],
//     "Python Programming": [
//       { value: "Data Structures & Algorithms", label: "Data Structures & Algorithms" },
//       { value: "Web Development with Python", label: "Web Development with Python" }
//     ],
//     "Shakespeare Studies": [
//       { value: "Shakespearean Literature", label: "Shakespearean Literature" },
//       { value: "Elizabethan Drama", label: "Elizabethan Drama" }
//     ],
//     "Financial Accounting": [
//       { value: "Corporate Finance", label: "Corporate Finance" },
//       { value: "Financial Management", label: "Financial Management" }
//     ],
//     "Indian Polity": [
//       { value: "Constitutional Law", label: "Constitutional Law" },
//       { value: "Governance and Administration", label: "Governance and Administration" }
//     ],
//     "Social Media Marketing": [
//       { value: "Social Media Strategy", label: "Social Media Strategy" },
//       { value: "Digital Brand Management", label: "Digital Brand Management" }
//     ]
//   };

//   const textbookOptions = {
//     "Advanced Calculus": [
//       { value: "Calculus: Early Transcendentals", label: "Calculus: Early Transcendentals" },
//       { value: "Advanced Mathematical Methods", label: "Advanced Mathematical Methods" }
//     ],
//     "Data Structures & Algorithms": [
//       { value: "Introduction to Algorithms", label: "Introduction to Algorithms" },
//       { value: "Data Structures Using Python", label: "Data Structures Using Python" }
//     ],
//     "Shakespearean Literature": [
//       { value: "The Complete Works of William Shakespeare", label: "The Complete Works of William Shakespeare" },
//       { value: "Shakespeare: A Critical Study", label: "Shakespeare: A Critical Study" }
//     ],
//     "Corporate Finance": [
//       { value: "Principles of Corporate Finance", label: "Principles of Corporate Finance" },
//       { value: "Financial Management Theory & Practice", label: "Financial Management Theory & Practice" }
//     ],
//     "Constitutional Law": [
//       { value: "Indian Constitution by D.D. Basu", label: "Indian Constitution by D.D. Basu" },
//       { value: "Introduction to the Constitution of India", label: "Introduction to the Constitution of India" }
//     ],
//     "Social Media Strategy": [
//       { value: "Social Media Marketing Strategy Guide", label: "Social Media Marketing Strategy Guide" },
//       { value: "Digital Marketing Excellence", label: "Digital Marketing Excellence" }
//     ]
//   };

//   const chapterOptions = {
//     "Calculus: Early Transcendentals": [
//       { value: "Linear Equations", label: "Linear Equations" },
//       { value: "Differentiation", label: "Differentiation" }
//     ],
//     "Introduction to Algorithms": [
//       { value: "Variables and Data Types", label: "Variables and Data Types" },
//       { value: "Arrays and Lists", label: "Arrays and Lists" }
//     ],
//     "The Complete Works of William Shakespeare": [
//       { value: "Hamlet Analysis", label: "Hamlet Analysis" },
//       { value: "Macbeth Study", label: "Macbeth Study" }
//     ]
//   };

//   const exerciseOptions = {
//     "Linear Equations": [
//       { value: "Basic Linear Equations Practice", label: "Basic Linear Equations Practice" },
//       { value: "Word Problems in Linear Equations", label: "Word Problems in Linear Equations" },
//       { value: "Graphical Representation", label: "Graphical Representation" }
//     ],
//     "Variables and Data Types": [
//       { value: "Integer Operations", label: "Integer Operations" },
//       { value: "String Manipulation", label: "String Manipulation" },
//       { value: "Type Casting Practice", label: "Type Casting Practice" }
//     ],
//     "Hamlet Analysis": [
//       { value: "Hamlet Character Study", label: "Hamlet Character Study" },
//       { value: "Theme Analysis Essay", label: "Theme Analysis Essay" }
//     ]
//   };

//   const [selectedModule, setSelectedModule] = React.useState(null);
//   const [selectedCourse, setSelectedCourse] = React.useState(null);
//   const [selectedSubject, setSelectedSubject] = React.useState(null);
//   const [selectedTextbook, setSelectedTextbook] = React.useState(null);
//   const [selectedChapter, setSelectedChapter] = React.useState(null);

//   const handleFinish = (values: any) => {
//     console.log("Form values:", values);
//     if (isEdit) {
//       message.success("Questions updated successfully!");
//     } else {
//       message.success("Questions created successfully!");
//     }
//     navigate('/questions');
//   };

//   const handleCancel = () => {
//     navigate('/questions');
//   };

//   const handleModuleChange = (value: string) => {
//     setSelectedModule(value);
//     setSelectedCourse(null);
//     setSelectedSubject(null);
//     setSelectedTextbook(null);
//     setSelectedChapter(null);
//     form.setFieldsValue({ course: undefined, subject: undefined, textbook: undefined, chapter: undefined });
//   };

//   const handleCourseChange = (value: string) => {
//     setSelectedCourse(value);
//     setSelectedSubject(null);
//     setSelectedTextbook(null);
//     setSelectedChapter(null);
//     form.setFieldsValue({ subject: undefined, textbook: undefined, chapter: undefined });
//   };

//   const handleSubjectChange = (value: string) => {
//     setSelectedSubject(value);
//     setSelectedTextbook(null);
//     setSelectedChapter(null);
//     form.setFieldsValue({ textbook: undefined, chapter: undefined });
//   };

//   const handleTextbookChange = (value: string) => {
//     setSelectedTextbook(value);
//     setSelectedChapter(null);
//     form.setFieldsValue({ chapter: undefined });
//   };

//   const handleChapterChange = (value: string) => {
//     setSelectedChapter(value);
//   };

//   // Set initial values if editing
//   React.useEffect(() => {
//     if (isEdit && id) {
//       const dummyData = getDummyData(id);
//       if (dummyData) {
//         form.setFieldsValue(dummyData);
//         setSelectedModule(dummyData.module);
//         setSelectedCourse(dummyData.course);
//         setSelectedSubject(dummyData.subject);
//         setSelectedTextbook(dummyData.textbook);
//         setSelectedChapter(dummyData.chapter);
//       }
//     }
//   }, [form, isEdit, id]);

//   // Render question type specific fields
//   const renderQuestionTypeFields = (questionType: string, questionIndex: number) => {
//     switch (questionType) {
//       case 'mcq':
//         return (
//           <>
//             <Form.List name={[questionIndex, 'options']}>
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, ...restField }) => (
//                     <Row key={key} gutter={16} align="middle">
//                       <Col span={20}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'text']}
//                           rules={[{ required: true, message: 'Please enter option text!' }]}
//                         >
//                           <Input placeholder={`Option ${name + 1}`} />
//                         </Form.Item>
//                       </Col>
//                       <Col span={4}>
//                         <Button
//                           type="text"
//                           icon={<MinusCircleOutlined />}
//                           onClick={() => remove(name)}
//                           danger
//                           disabled={fields.length <= 2}
//                         />
//                       </Col>
//                     </Row>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       icon={<PlusOutlined />}
//                       disabled={fields.length >= 6}
//                       className="w-full"
//                     >
//                       Add Option
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>

//             <Form.Item 
//               name={[questionIndex, 'correctAnswer']} 
//               label="Correct Answer(s)"
//               rules={[{ required: true, message: 'Please select correct answer!' }]}
//             >
//               <Checkbox.Group>
//                 {form.getFieldValue(['questions', questionIndex, 'options'])?.map((option: any, index: number) => (
//                   <Checkbox key={index} value={index}>
//                     Option {index + 1}
//                   </Checkbox>
//                 ))}
//               </Checkbox.Group>
//             </Form.Item>
//           </>
//         );

//       case 'truefalse':
//         return (
//           <Form.Item 
//             name={[questionIndex, 'correctAnswer']} 
//             label="Correct Answer"
//             rules={[{ required: true, message: 'Please select correct answer!' }]}
//           >
//             <Radio.Group>
//               <Radio value="true">True</Radio>
//               <Radio value="false">False</Radio>
//             </Radio.Group>
//           </Form.Item>
//         );

//       case 'fillblank':
//         return (
//           <Form.Item 
//             name={[questionIndex, 'correctAnswer']} 
//             label="Correct Answer"
//             rules={[{ required: true, message: 'Please enter correct answer!' }]}
//           >
//             <Input placeholder="Enter the correct answer" />
//           </Form.Item>
//         );

//       case 'shortanswer':
//       case 'essay':
//         return (
//           <Form.Item 
//             name={[questionIndex, 'correctAnswer']} 
//             label="Sample Answer / Key Points"
//             rules={[{ required: true, message: 'Please enter sample answer!' }]}
//           >
//             <TextArea 
//               rows={4}
//               placeholder="Enter sample answer or key points for evaluation" 
//             />
//           </Form.Item>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <PageHeader title={isEdit ? "Edit Questions" : "Create Questions"} backButton={true} />
      
//       <Card className="w-full mt-4 shadow-md">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFinish}
//           className="font-local2"
//           initialValues={{
//             status: true
//           }}
//         >
//           {/* Basic Information */}
//           <Row gutter={24}>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="module"
//                 label="Module"
//                 rules={[{ required: true, message: 'Please select a module!' }]}
//               >
//                 <Select 
//                   placeholder="Select module" 
//                   size="large"
//                   onChange={handleModuleChange}
//                   options={moduleOptions}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="course"
//                 label="Course"
//                 rules={[{ required: true, message: 'Please select a course!' }]}
//               >
//                 <Select 
//                   placeholder="Select course" 
//                   size="large"
//                   disabled={!selectedModule}
//                   onChange={handleCourseChange}
//                   options={selectedModule ? courseOptions[selectedModule] : []}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="subject"
//                 label="Subject"
//                 rules={[{ required: true, message: 'Please select a subject!' }]}
//               >
//                 <Select 
//                   placeholder="Select subject" 
//                   size="large"
//                   disabled={!selectedCourse}
//                   onChange={handleSubjectChange}
//                   options={selectedCourse ? subjectOptions[selectedCourse] : []}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={24}>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="textbook"
//                 label="Textbook"
//                 rules={[{ required: true, message: 'Please select a textbook!' }]}
//               >
//                 <Select 
//                   placeholder="Select textbook" 
//                   size="large"
//                   disabled={!selectedSubject}
//                   onChange={handleTextbookChange}
//                   options={selectedSubject ? textbookOptions[selectedSubject] : []}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="chapter"
//                 label="Chapter"
//                 rules={[{ required: true, message: 'Please select a chapter!' }]}
//               >
//                 <Select 
//                   placeholder="Select chapter" 
//                   size="large"
//                   disabled={!selectedTextbook}
//                   onChange={handleChapterChange}
//                   options={selectedTextbook ? chapterOptions[selectedTextbook] : []}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//               <Form.Item
//                 name="status"
//                 label="Status"
//                 valuePropName="checked"
//               >
//                 <Switch
//                   checkedChildren="Active"
//                   unCheckedChildren="Inactive"
//                   size="default"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider orientation="left">Questions</Divider>

//           {/* Dynamic Questions */}
//           <Form.List name="questions">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Card 
//                     key={key} 
//                     size="small" 
//                     className="mb-4"
//                     style={{ backgroundColor: '#f8f9fa' }}
//                     title={`Question ${name + 1}`}
//                     extra={
//                       <Button
//                         type="text"
//                         icon={<MinusCircleOutlined />}
//                         onClick={() => remove(name)}
//                         danger
//                       />
//                     }
//                   >
//                     <Row gutter={16}>
//                       <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'exercise']}
//                           label="Exercise"
//                           rules={[{ required: true, message: 'Please select exercise!' }]}
//                         >
//                           <Select 
//                             placeholder="Select exercise"
//                             disabled={!selectedChapter}
//                             options={selectedChapter ? exerciseOptions[selectedChapter] : []}
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'questionType']}
//                           label="Question Type"
//                           rules={[{ required: true, message: 'Please select question type!' }]}
//                         >
//                           <Select placeholder="Select type">
//                             <Option value="mcq">Multiple Choice (MCQ)</Option>
//                             <Option value="truefalse">True/False</Option>
//                             <Option value="fillblank">Fill in the Blank</Option>
//                             <Option value="shortanswer">Short Answer</Option>
//                             <Option value="essay">Essay</Option>
//                           </Select>
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12} md={8} lg={8} xl={8}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'marks']}
//                           label="Marks"
//                           rules={[{ required: true, message: 'Please enter marks!' }]}
//                         >
//                           <InputNumber 
//                             placeholder="Enter marks" 
//                             style={{ width: "100%" }} 
//                             min={1}
//                             max={100}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={16}>
//                       <Col span={24}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'question']}
//                           label="Question (English)"
//                           rules={[{ required: true, message: 'Please enter question!' }]}
//                         >
//                           <TextArea 
//                             rows={3}
//                             placeholder="Enter your question in English" 
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={16}>
//                       <Col span={20}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'image']}
//                           label="Question Image (Optional)"
//                         >
//                           <Upload
//                             listType="picture-card"
//                             maxCount={1}
//                             beforeUpload={() => false}
//                           >
//                             <div>
//                               <UploadOutlined />
//                               <div style={{ marginTop: 8 }}>Upload</div>
//                             </div>
//                           </Upload>
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Divider plain>Answer Options</Divider>
                    
//                     {/* Render question type specific fields */}
//                     {renderQuestionTypeFields(
//                       form.getFieldValue(['questions', name, 'questionType']),
//                       name
//                     )}
//                   </Card>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     icon={<PlusOutlined />}
//                     size="large"
//                     className="w-full h-12"
//                     style={{ maxWidth: '800px' }}
//                   >
//                     Add Question
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List>

//           {/* Action Buttons */}
//           <Row justify="end" className="mt-6">
//             <Space size="middle">
//               <Button size="large" onClick={handleCancel}>
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 size="large"
//                 style={{ 
//                   backgroundColor: "#007575", 
//                   borderColor: "#007575" 
//                 }}
//               >
//                 {isEdit ? "Update Questions" : "Create Questions"}
//               </Button>
//             </Space>
//           </Row>
//         </Form>
//       </Card>
//     </>
//   );
// };

// export default QuestionForm;
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

  // Selector options (keeping existing structure)
  const moduleOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "English Literature", label: "English Literature" },
    { value: "Banking & Finance", label: "Banking & Finance" },
    { value: "UPSC Preparation", label: "UPSC Preparation" },
    { value: "Digital Marketing", label: "Digital Marketing" },
  ];

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

  const subjectOptions = {
    "Advanced Algebra": [
      { value: "Advanced Calculus", label: "Advanced Calculus" },
      { value: "Linear Algebra", label: "Linear Algebra" }
    ],
    "Python Programming": [
      { value: "Data Structures & Algorithms", label: "Data Structures & Algorithms" },
      { value: "Web Development with Python", label: "Web Development with Python" }
    ],
    "Shakespeare Studies": [
      { value: "Shakespearean Literature", label: "Shakespearean Literature" },
      { value: "Elizabethan Drama", label: "Elizabethan Drama" }
    ],
    "Financial Accounting": [
      { value: "Corporate Finance", label: "Corporate Finance" },
      { value: "Financial Management", label: "Financial Management" }
    ],
    "Indian Polity": [
      { value: "Constitutional Law", label: "Constitutional Law" },
      { value: "Governance and Administration", label: "Governance and Administration" }
    ],
    "Social Media Marketing": [
      { value: "Social Media Strategy", label: "Social Media Strategy" },
      { value: "Digital Brand Management", label: "Digital Brand Management" }
    ]
  };

  const textbookOptions = {
    "Advanced Calculus": [
      { value: "Calculus: Early Transcendentals", label: "Calculus: Early Transcendentals" },
      { value: "Advanced Mathematical Methods", label: "Advanced Mathematical Methods" }
    ],
    "Data Structures & Algorithms": [
      { value: "Introduction to Algorithms", label: "Introduction to Algorithms" },
      { value: "Data Structures Using Python", label: "Data Structures Using Python" }
    ],
    "Shakespearean Literature": [
      { value: "The Complete Works of William Shakespeare", label: "The Complete Works of William Shakespeare" },
      { value: "Shakespeare: A Critical Study", label: "Shakespeare: A Critical Study" }
    ],
    "Corporate Finance": [
      { value: "Principles of Corporate Finance", label: "Principles of Corporate Finance" },
      { value: "Financial Management Theory & Practice", label: "Financial Management Theory & Practice" }
    ],
    "Constitutional Law": [
      { value: "Indian Constitution by D.D. Basu", label: "Indian Constitution by D.D. Basu" },
      { value: "Introduction to the Constitution of India", label: "Introduction to the Constitution of India" }
    ],
    "Social Media Strategy": [
      { value: "Social Media Marketing Strategy Guide", label: "Social Media Marketing Strategy Guide" },
      { value: "Digital Marketing Excellence", label: "Digital Marketing Excellence" }
    ]
  };

  const chapterOptions = {
    "Calculus: Early Transcendentals": [
      { value: "Linear Equations", label: "Linear Equations" },
      { value: "Differentiation", label: "Differentiation" }
    ],
    "Introduction to Algorithms": [
      { value: "Variables and Data Types", label: "Variables and Data Types" },
      { value: "Arrays and Lists", label: "Arrays and Lists" }
    ],
    "The Complete Works of William Shakespeare": [
      { value: "Hamlet Analysis", label: "Hamlet Analysis" },
      { value: "Macbeth Study", label: "Macbeth Study" }
    ],
    "Principles of Corporate Finance": [
      { value: "Financial Statements", label: "Financial Statements" },
      { value: "Capital Budgeting", label: "Capital Budgeting" }
    ],
    "Indian Constitution by D.D. Basu": [
      { value: "Fundamental Rights", label: "Fundamental Rights" },
      { value: "Directive Principles", label: "Directive Principles" }
    ],
    "Social Media Marketing Strategy Guide": [
      { value: "Content Strategy", label: "Content Strategy" },
      { value: "Analytics and Metrics", label: "Analytics and Metrics" }
    ]
  };

  const exerciseOptions = {
    "Linear Equations": [
      { value: "Basic Linear Equations Practice", label: "Basic Linear Equations Practice" },
      { value: "Word Problems in Linear Equations", label: "Word Problems in Linear Equations" },
      { value: "Graphical Representation", label: "Graphical Representation" }
    ],
    "Variables and Data Types": [
      { value: "Integer Operations", label: "Integer Operations" },
      { value: "String Manipulation", label: "String Manipulation" },
      { value: "Type Casting Practice", label: "Type Casting Practice" }
    ],
    "Hamlet Analysis": [
      { value: "Hamlet Character Study", label: "Hamlet Character Study" },
      { value: "Theme Analysis Essay", label: "Theme Analysis Essay" }
    ],
    "Financial Statements": [
      { value: "Balance Sheet Analysis", label: "Balance Sheet Analysis" },
      { value: "Income Statement Review", label: "Income Statement Review" },
      { value: "Financial Ratios", label: "Financial Ratios" },
      { value: "Cash Flow Analysis", label: "Cash Flow Analysis" }
    ],
    "Fundamental Rights": [
      { value: "Article 19 Analysis", label: "Article 19 Analysis" },
      { value: "Constitutional Amendments", label: "Constitutional Amendments" },
      { value: "Case Studies", label: "Case Studies" }
    ],
    "Content Strategy": [
      { value: "Content Planning", label: "Content Planning" },
      { value: "Engagement Metrics", label: "Engagement Metrics" }
    ]
  };

  const [selectedModule, setSelectedModule] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [selectedTextbook, setSelectedTextbook] = React.useState(null);
  const [selectedChapter, setSelectedChapter] = React.useState(null);

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

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedCourse(null);
    setSelectedSubject(null);
    setSelectedTextbook(null);
    setSelectedChapter(null);
    form.setFieldsValue({ course: undefined, subject: undefined, textbook: undefined, chapter: undefined });
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setSelectedSubject(null);
    setSelectedTextbook(null);
    setSelectedChapter(null);
    form.setFieldsValue({ subject: undefined, textbook: undefined, chapter: undefined });
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedTextbook(null);
    setSelectedChapter(null);
    form.setFieldsValue({ textbook: undefined, chapter: undefined });
  };

  const handleTextbookChange = (value: string) => {
    setSelectedTextbook(value);
    setSelectedChapter(null);
    form.setFieldsValue({ chapter: undefined });
  };

  const handleChapterChange = (value: string) => {
    setSelectedChapter(value);
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
    if (isEdit && id) {
      const dummyData = getDummyData(id);
      if (dummyData) {
        form.setFieldsValue(dummyData);
        setSelectedModule(dummyData.module);
        setSelectedCourse(dummyData.course);
        setSelectedSubject(dummyData.subject);
        setSelectedTextbook(dummyData.textbook);
        setSelectedChapter(dummyData.chapter);
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

      case 'truefalse':
        return (
          <Form.Item 
            key={`truefalse-${questionIndex}-${questionTypeChangeKey}`}
            name={[questionIndex, 'correctAnswer']} 
            label="Correct Answer"
            rules={[{ required: true, message: 'Please select correct answer!' }]}
          >
            <Radio.Group>
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </Radio.Group>
          </Form.Item>
        );

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
                name="module"
                label="Module"
                rules={[{ required: true, message: 'Please select a module!' }]}
              >
                <Select 
                  placeholder="Select module" 
                  size="large"
                  onChange={handleModuleChange}
                  options={moduleOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                name="course"
                label="Course"
                rules={[{ required: true, message: 'Please select a course!' }]}
              >
                <Select 
                  placeholder="Select course" 
                  size="large"
                  disabled={!selectedModule}
                  onChange={handleCourseChange}
                  options={selectedModule ? courseOptions[selectedModule] : []}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please select a subject!' }]}
              >
                <Select 
                  placeholder="Select subject" 
                  size="large"
                  disabled={!selectedCourse}
                  onChange={handleSubjectChange}
                  options={selectedCourse ? subjectOptions[selectedCourse] : []}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                name="textbook"
                label="Textbook"
                rules={[{ required: true, message: 'Please select a textbook!' }]}
              >
                <Select 
                  placeholder="Select textbook" 
                  size="large"
                  disabled={!selectedSubject}
                  onChange={handleTextbookChange}
                  options={selectedSubject ? textbookOptions[selectedSubject] : []}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                name="chapter"
                label="Chapter"
                rules={[{ required: true, message: 'Please select a chapter!' }]}
              >
                <Select 
                  placeholder="Select chapter" 
                  size="large"
                  disabled={!selectedTextbook}
                  onChange={handleChapterChange}
                  options={selectedTextbook ? chapterOptions[selectedTextbook] : []}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                name="status"
                label="Status"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  size="default"
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
                          {...restField}
                          name={[name, 'exercise']}
                          label="Exercise"
                          rules={[{ required: true, message: 'Please select exercise!' }]}
                        >
                          <Select 
                            placeholder="Select exercise"
                            disabled={!selectedChapter}
                            options={selectedChapter ? exerciseOptions[selectedChapter] : []}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
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
                            <Option value="truefalse">True/False</Option>
                            <Option value="fillblank">Fill in the Blank</Option>
                            <Option value="shortanswer">Short Answer</Option>
                            <Option value="essay">Essay</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
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

                    <Row gutter={16}>
                      <Col span={20}>
                        <Form.Item
                          {...restField}
                          name={[name, 'image']}
                          label="Question Image (Optional)"
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
                      </Col>
                    </Row>

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