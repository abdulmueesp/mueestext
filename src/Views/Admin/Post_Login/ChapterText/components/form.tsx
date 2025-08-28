// // @ts-nocheck
// import React from "react";
// import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch } from "antd";
// import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
// import { useParams, useNavigate } from "react-router-dom";
// import PageHeader from "@/Components/common/PageHeader";
// import { message } from "@/Components/common/message/message";

// const { Option } = Select;

// const ChapterForm = () => {
//   const [form] = Form.useForm();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = id && id !== 'new';

//   // Updated dummy data for chapters
//   const getDummyData = (id: string) => {
//     const chapters = {
//       '1': {
//         chapterName: "Linear Equations",
//         module: "Mathematics",
//         course: "Advanced Algebra",
//         subject: "Advanced Calculus",
//         textbook: "Calculus: Early Transcendentals",
//         topics: [
//           { topicName: "Single Variable Equations" },
//           { topicName: "Two Variable Systems" },
//           { topicName: "Matrix Solutions" }
//         ],
//         exercises: [
//           { exerciseName: "Basic Linear Equations Practice" },
//           { exerciseName: "Word Problems in Linear Equations" },
//           { exerciseName: "Graphical Representation" },
//           { exerciseName: "Matrix Method Solutions" }
//         ],
//         status: true
//       },
//       '2': {
//         chapterName: "Variables and Data Types",
//         module: "Computer Science",
//         course: "Python Programming",
//         subject: "Data Structures & Algorithms",
//         textbook: "Introduction to Algorithms",
//         topics: [
//           { topicName: "Primitive Data Types" },
//           { topicName: "Type Conversion" },
//           { topicName: "Variable Scope" }
//         ],
//         exercises: [
//           { exerciseName: "Integer Operations" },
//           { exerciseName: "String Manipulation" },
//           { exerciseName: "Boolean Logic" },
//           { exerciseName: "Type Casting Practice" }
//         ],
//         status: true
//       },
//       '3': {
//         chapterName: "Hamlet Analysis",
//         module: "English Literature",
//         course: "Shakespeare Studies",
//         subject: "Shakespearean Literature",
//         textbook: "The Complete Works of William Shakespeare",
//         topics: [
//           { topicName: "Character Analysis" },
//           { topicName: "Themes and Motifs" },
//           { topicName: "Plot Structure" }
//         ],
//         exercises: [
//           { exerciseName: "Hamlet Character Study" },
//           { exerciseName: "Supporting Characters Analysis" },
//           { exerciseName: "Theme Analysis Essay" },
//           { exerciseName: "Plot Summary Writing" }
//         ],
//         status: false
//       },
//       '4': {
//         chapterName: "Financial Statements",
//         module: "Banking & Finance",
//         course: "Financial Accounting",
//         subject: "Corporate Finance",
//         textbook: "Principles of Corporate Finance",
//         topics: [
//           { topicName: "Balance Sheet Analysis" },
//           { topicName: "Income Statement" },
//           { topicName: "Cash Flow Statement" }
//         ],
//         exercises: [
//           { exerciseName: "Balance Sheet Preparation" },
//           { exerciseName: "Financial Ratio Analysis" },
//           { exerciseName: "Income Statement Creation" },
//           { exerciseName: "Cash Flow Calculation" }
//         ],
//         status: true
//       },
//       '5': {
//         chapterName: "Fundamental Rights",
//         module: "UPSC Preparation",
//         course: "Indian Polity",
//         subject: "Constitutional Law",
//         textbook: "Indian Constitution by D.D. Basu",
//         topics: [
//           { topicName: "Right to Equality" },
//           { topicName: "Right to Freedom" },
//           { topicName: "Right against Exploitation" }
//         ],
//         exercises: [
//           { exerciseName: "Article 14-18 Analysis" },
//           { exerciseName: "Case Studies on Equality" },
//           { exerciseName: "Freedom of Speech Cases" },
//           { exerciseName: "Constitutional Rights Quiz" }
//         ],
//         status: true
//       },
//       '6': {
//         chapterName: "Content Strategy",
//         module: "Digital Marketing",
//         course: "Social Media Marketing",
//         subject: "Social Media Strategy",
//         textbook: "Social Media Marketing Strategy Guide",
//         topics: [
//           { topicName: "Content Planning" },
//           { topicName: "Content Creation" },
//           { topicName: "Audience Engagement" }
//         ],
//         exercises: [
//           { exerciseName: "Content Calendar Creation" },
//           { exerciseName: "Engagement Strategy Development" },
//           { exerciseName: "Visual Content Design" },
//           { exerciseName: "Performance Analytics" }
//         ],
//         status: false
//       }
//     };

//     return chapters[id] || null;
//   };

//   // Module and Course options
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

//   const [selectedModule, setSelectedModule] = React.useState(null);
//   const [selectedCourse, setSelectedCourse] = React.useState(null);
//   const [selectedSubject, setSelectedSubject] = React.useState(null);

//   const handleFinish = (values: any) => {
//     console.log("Form values:", values);
//     if (isEdit) {
//       message.success("Chapter updated successfully!");
//     } else {
//       message.success("Chapter created successfully!");
//     }
//     navigate('/chapters');
//   };

//   const handleCancel = () => {
//     navigate('/chapters');
//   };

//   const handleModuleChange = (value: string) => {
//     setSelectedModule(value);
//     setSelectedCourse(null);
//     setSelectedSubject(null);
//     form.setFieldsValue({ course: undefined, subject: undefined, textbook: undefined });
//   };

//   const handleCourseChange = (value: string) => {
//     setSelectedCourse(value);
//     setSelectedSubject(null);
//     form.setFieldsValue({ subject: undefined, textbook: undefined });
//   };

//   const handleSubjectChange = (value: string) => {
//     setSelectedSubject(value);
//     form.setFieldsValue({ textbook: undefined });
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
//       }
//     }
//   }, [form, isEdit, id]);

//   return (
//     <>
//       <PageHeader title={isEdit ? "Edit Chapter" : "Create Chapter"} backButton={true} />
      
//       <Card 
//         className="w-full mt-4 shadow-md"
//       >
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
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item
//                 name="chapterName"
//                 label="Chapter Name"
//                 rules={[{ required: true, message: 'Please enter chapter name!' }]}
//               >
//                 <Input 
//                   placeholder="Enter chapter name" 
//                   size="large"
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
//           </Row>

//           <Row gutter={24}>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
//             <Col xs={24} sm={24} md={20} lg={20} xl={20}>
//               <Form.Item
//                 name="textbook"
//                 label="Textbook"
//                 rules={[{ required: true, message: 'Please select a textbook!' }]}
//               >
//                 <Select 
//                   placeholder="Select textbook" 
//                   size="large"
//                   disabled={!selectedSubject}
//                   options={selectedSubject ? textbookOptions[selectedSubject] : []}
//                 />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={24} md={4} lg={4} xl={4}>
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

//           <Divider orientation="left">Topics</Divider>

//           {/* Dynamic Topics */}
//           <Form.List name="topics">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Row key={key} gutter={16} align="middle" className="mb-3">
//                     <Col span={20}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'topicName']}
//                         rules={[{ required: true, message: 'Please enter topic name!' }]}
//                       >
//                         <Input 
//                           placeholder="Enter topic name" 
//                           size="large"
//                           style={{ maxWidth: '600px' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={4}>
//                       <Button
//                         type="text"
//                         icon={<MinusCircleOutlined />}
//                         onClick={() => remove(name)}
//                         danger
//                       />
//                     </Col>
//                   </Row>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     icon={<PlusOutlined />}
//                     size="large"
//                     className="w-full h-12"
//                     style={{ maxWidth: '600px' }}
//                   >
//                     Add Topic
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List>

//           <Divider orientation="left">Exercises</Divider>

//           {/* Dynamic Exercises */}
//           <Form.List name="exercises">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Row key={key} gutter={16} align="middle" className="mb-3">
//                     <Col span={20}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'exerciseName']}
//                         rules={[{ required: true, message: 'Please enter exercise name!' }]}
//                       >
//                         <Input 
//                           placeholder="Enter exercise name" 
//                           size="large"
//                           style={{ maxWidth: '600px' }}
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={4}>
//                       <Button
//                         type="text"
//                         icon={<MinusCircleOutlined />}
//                         onClick={() => remove(name)}
//                         danger
//                       />
//                     </Col>
//                   </Row>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     icon={<PlusOutlined />}
//                     size="large"
//                     className="w-full h-12"
//                     style={{ maxWidth: '600px' }}
//                   >
//                     Add Exercise
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
//                 {isEdit ? "Update Chapter" : "Create Chapter"}
//               </Button>
//             </Space>
//           </Row>
//         </Form>
//       </Card>
//     </>
//   );
// };

// export default ChapterForm;
// @ts-nocheck
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import { message } from "@/Components/common/message/message";

const { Option } = Select;

const ChapterForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';

  // Updated dummy data for chapters
  const getDummyData = (id: string) => {
    const chapters = {
      '1': {
        chapterName: "Linear Equations",
        module: "Mathematics",
        course: "Advanced Algebra",
        subject: "Advanced Calculus",
        textbook: "Calculus: Early Transcendentals",
        chapters: [
          {
            chapterName: "Linear Equations",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
           {
            chapterName: "Hamlet Analysis",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          }
        ],
        status: true
      },
      '2': {
        chapterName: "Variables and Data Types",
        module: "Computer Science",
        course: "Python Programming",
        subject: "Data Structures & Algorithms",
        textbook: "Introduction to Algorithms",
         chapters: [
          {
            chapterName: "Variables and Data Types",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
        ],
        status: true
      },
      '3': {
        chapterName: "Hamlet Analysis",
        module: "English Literature",
        course: "Shakespeare Studies",
        subject: "Shakespearean Literature",
        textbook: "The Complete Works of William Shakespeare",
        chapters: [
          {
            chapterName: "Hamlet Analysis",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
           {
            chapterName: "Variables and Data Types",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
        ],
        status: false
      },
      '4': {
        chapterName: "Financial Statements",
        module: "Banking & Finance",
        course: "Financial Accounting",
        subject: "Corporate Finance",
        textbook: "Principles of Corporate Finance",
       chapters: [
          {
            chapterName: "Financial Statements",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
        ],
        status: true
      },
      '5': {
        chapterName: "Fundamental Rights",
        module: "UPSC Preparation",
        course: "Indian Polity",
        subject: "Constitutional Law",
        textbook: "Indian Constitution by D.D. Basu",
        chapters: [
          {
            chapterName: "Fundamental Rights",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
        ],
        status: true
      },
      '6': {
        chapterName: "Content Strategy",
        module: "Digital Marketing",
        course: "Social Media Marketing",
        subject: "Social Media Strategy",
        textbook: "Social Media Marketing Strategy Guide",
         chapters: [
          {
            chapterName: "Content Strategy",
            topics: [
              { topicName: "Single Variable Equations" },
              { topicName: "Two Variable Systems" },
              { topicName: "Matrix Solutions" }
            ],
            exercises: [
              { exerciseName: "Basic Linear Equations Practice" },
              { exerciseName: "Word Problems in Linear Equations" },
              { exerciseName: "Graphical Representation" },
              { exerciseName: "Matrix Method Solutions" }
            ]
          },
        ],
        status: false
      }
    };

    return chapters[id] || null;
  };

  // Module and Course options
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

  const [selectedModule, setSelectedModule] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [selectedSubject, setSelectedSubject] = React.useState(null);

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    if (isEdit) {
      message.success("Chapter updated successfully!");
    } else {
      message.success("Chapter created successfully!");
    }
    navigate('/chapters');
  };

  const handleCancel = () => {
    navigate('/chapters');
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedCourse(null);
    setSelectedSubject(null);
    form.setFieldsValue({ course: undefined, subject: undefined, textbook: undefined });
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setSelectedSubject(null);
    form.setFieldsValue({ subject: undefined, textbook: undefined });
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    form.setFieldsValue({ textbook: undefined });
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
            status: true
          }}
        >
          {/* Basic Information */}
          <Row gutter={24}>
          
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
          </Row>

          <Row gutter={24}>
           <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="textbook"
                label="Textbook"
                rules={[{ required: true, message: 'Please select a textbook!' }]}
              >
                <Select 
                  placeholder="Select textbook" 
                  size="large"
                  disabled={!selectedSubject}
                  options={selectedSubject ? textbookOptions[selectedSubject] : []}
                />
              </Form.Item>
            </Col>
            
          </Row>

          <Row gutter={24}>
           
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
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

                    <Divider orientation="left" plain>Topics</Divider>
                    
                    {/* Dynamic Topics for each chapter */}
                    <Form.List name={[name, 'topics']}>
                      {(topicFields, { add: addTopic, remove: removeTopic }) => (
                        <>
                          {topicFields.map(({ key: topicKey, name: topicName, ...restTopicField }) => (
                            <Row key={topicKey} gutter={16} align="middle">
                              <Col span={20}>
                                <Form.Item
                                  {...restTopicField}
                                  name={[topicName, 'topicName']}
                                  rules={[{ required: true, message: 'Please enter topic name!' }]}
                                >
                                  <Input 
                                    placeholder="Enter topic name" 
                                    style={{ height: '40px', maxWidth: '600px' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <Button
                                  type="text"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => removeTopic(topicName)}
                                  danger
                                />
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addTopic()}
                              icon={<PlusOutlined />}
                              style={{ maxWidth: '600px' }}
                              className="w-full"
                            >
                              Add Topic
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Divider orientation="left" plain>Exercises</Divider>
                    
                    {/* Dynamic Exercises for each chapter */}
                    <Form.List name={[name, 'exercises']}>
                      {(exerciseFields, { add: addExercise, remove: removeExercise }) => (
                        <>
                          {exerciseFields.map(({ key: exerciseKey, name: exerciseName, ...restExerciseField }) => (
                            <Row key={exerciseKey} gutter={16} align="middle">
                              <Col span={20}>
                                <Form.Item
                                  {...restExerciseField}
                                  name={[exerciseName, 'exerciseName']}
                                  rules={[{ required: true, message: 'Please enter exercise name!' }]}
                                >
                                  <Input 
                                    placeholder="Enter exercise name" 
                                    style={{ height: '40px', maxWidth: '600px' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <Button
                                  type="text"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => removeExercise(exerciseName)}
                                  danger
                                />
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addExercise()}
                              icon={<PlusOutlined />}
                              style={{ maxWidth: '600px' }}
                              className="w-full"
                            >
                              Add Exercise
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
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
                {isEdit ? "Update Chapter" : "Create Chapter"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default ChapterForm;