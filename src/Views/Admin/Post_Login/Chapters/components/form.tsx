// // @ts-nocheck
// import React from "react";
// import { Form, Input, Select, Button, Card, Row, Col, Space, Divider } from "antd";
// import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

// const { TextArea } = Input;
// const { Option } = Select;

// interface SubjectFormProps {
//   onSave: (values: any) => void;
//   onCancel: () => void;
//   initialValues?: any;
//   isEdit?: boolean;
// }

// const SubjectForm: React.FC<SubjectFormProps> = ({ 
//   onSave, 
//   onCancel, 
//   initialValues, 
//   isEdit = false 
// }) => {
//   const [form] = Form.useForm();

//   const handleFinish = (values: any) => {
//     onSave(values);
//   };

//   const handleReset = () => {
//     form.resetFields();
//     onCancel();
//   };

//   // Set initial values if editing
//   React.useEffect(() => {
//     if (isEdit && initialValues) {
//       form.setFieldsValue(initialValues);
//     }
//   }, [form, isEdit, initialValues]);

//   return (
//     <Card 
//       title={
//         <span className="font-semi text-xl">
//           {isEdit ? "Edit Subject" : "Create New Subject"}
//         </span>
//       }
//       className="w-full"
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleFinish}
//         initialValues={initialValues}
//         className="font-local2"
//       >
//         {/* Basic Information */}
//         <Row gutter={24}>
//           <Col span={12}>
//             <Form.Item
//               name="subjectName"
//               label="Subject Name"
//               rules={[{ required: true, message: 'Please enter subject name!' }]}
//             >
//               <Input 
//                 placeholder="Enter subject name" 
//                 size="large"
//               />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="course"
//               label="Course"
//               rules={[{ required: true, message: 'Please select a course!' }]}
//             >
//               <Select 
//                 placeholder="Select course" 
//                 size="large"
//               >
//                 <Option value="mathematics">Mathematics</Option>
//                 <Option value="computer-science">Computer Science</Option>
//                 <Option value="english-literature">English Literature</Option>
//                 <Option value="banking-finance">Banking & Finance</Option>
//                 <Option value="upsc-preparation">UPSC Preparation</Option>
//                 <Option value="digital-marketing">Digital Marketing</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={24}>
//           <Col span={12}>
//             <Form.Item
//               name="visibility"
//               label="Visibility"
//               rules={[{ required: true, message: 'Please select visibility!' }]}
//             >
//               <Select 
//                 placeholder="Select visibility" 
//                 size="large"
//               >
//                 <Option value="public">Public</Option>
//                 <Option value="private">Private</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={24}>
//           <Col span={24}>
//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[{ required: true, message: 'Please enter description!' }]}
//             >
//               <TextArea
//                 rows={4}
//                 placeholder="Enter subject description"
//                 size="large"
//               />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Divider orientation="left">Chapters</Divider>

//         {/* Dynamic Chapters */}
//         <Form.List name="chapters">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, ...restField }) => (
//                 <Card 
//                   key={key} 
//                   size="small" 
//                   className="mb-4 bg-gray-50"
//                   title={`Chapter ${name + 1}`}
//                   extra={
//                     <Button
//                       type="text"
//                       icon={<MinusCircleOutlined />}
//                       onClick={() => remove(name)}
//                       danger
//                     />
//                   }
//                 >
//                   <Row gutter={16}>
//                     <Col span={24}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'chapterName']}
//                         label="Chapter Name"
//                         rules={[{ required: true, message: 'Please enter chapter name!' }]}
//                       >
//                         <Input placeholder="Enter chapter name" />
//                       </Form.Item>
//                     </Col>
//                   </Row>

//                   <Divider orientation="left" plain>Topics</Divider>
                  
//                   {/* Dynamic Topics for each chapter */}
//                   <Form.List name={[name, 'topics']}>
//                     {(topicFields, { add: addTopic, remove: removeTopic }) => (
//                       <>
//                         {topicFields.map(({ key: topicKey, name: topicName, ...restTopicField }) => (
//                           <Row key={topicKey} gutter={16} align="middle">
//                             <Col span={20}>
//                               <Form.Item
//                                 {...restTopicField}
//                                 name={[topicName, 'topicName']}
//                                 rules={[{ required: true, message: 'Please enter topic name!' }]}
//                               >
//                                 <Input placeholder="Enter topic name" />
//                               </Form.Item>
//                             </Col>
//                             <Col span={4}>
//                               <Button
//                                 type="text"
//                                 icon={<MinusCircleOutlined />}
//                                 onClick={() => removeTopic(topicName)}
//                                 danger
//                               />
//                             </Col>
//                           </Row>
//                         ))}
//                         <Form.Item>
//                           <Button
//                             type="dashed"
//                             onClick={() => addTopic()}
//                             icon={<PlusOutlined />}
//                             className="w-full"
//                           >
//                             Add Topic
//                           </Button>
//                         </Form.Item>
//                       </>
//                     )}
//                   </Form.List>
//                 </Card>
//               ))}
//               <Form.Item>
//                 <Button
//                   type="dashed"
//                   onClick={() => add()}
//                   icon={<PlusOutlined />}
//                   size="large"
//                   className="w-full h-12"
//                 >
//                   Add Chapter
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>

//         {/* Action Buttons */}
//         <Row justify="end" className="mt-6">
//           <Space size="middle">
//             <Button size="large" onClick={handleReset}>
//               Cancel
//             </Button>
//             <Button
//               type="primary"
//               htmlType="submit"
//               size="large"
//               style={{ 
//                 backgroundColor: "#007575", 
//                 borderColor: "#007575" 
//               }}
//             >
//               {isEdit ? "Update Subject" : "Create Subject"}
//             </Button>
//           </Space>
//         </Row>
//       </Form>
//     </Card>
//   );
// };

// export default SubjectForm;
// // @ts-nocheck
// import React from "react";
// import { Form, Input, Select, Button, Card, Row, Col, Space, Divider } from "antd";
// import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
// import { useParams, useNavigate } from "react-router-dom";
// import PageHeader from "@/Components/common/PageHeader";
// import { message } from "@/Components/common/message/message";

// const { TextArea } = Input;
// const { Option } = Select;

// const SubjectForm = () => {
//   const [form] = Form.useForm();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = id && id !== 'new';

//   // Dummy data for edit mode
//   const getDummyData = (id: string) => {
//     const subjects = {
//       '1': {
//         subjectName: "Advanced Mathematics",
//         course: "mathematics",
//         description: "Comprehensive study of advanced mathematical concepts including calculus and algebra",
//         visibility: "public",
//         chapters: [
//           {
//             chapterName: "Linear Equations",
//             topics: [
//               { topicName: "Single Variable Equations" },
//               { topicName: "Two Variable Systems" },
//               { topicName: "Matrix Solutions" }
//             ]
//           },
//           {
//             chapterName: "Quadratic Equations",
//             topics: [
//               { topicName: "Standard Form" },
//               { topicName: "Factoring Methods" }
//             ]
//           }
//         ]
//       },
//       '2': {
//         subjectName: "Python Programming Fundamentals",
//         course: "computer-science",
//         description: "Introduction to Python programming language with hands-on practice",
//         visibility: "public",
//         chapters: [
//           {
//             chapterName: "Variables and Data Types",
//             topics: [
//               { topicName: "Primitive Data Types" },
//               { topicName: "Type Conversion" },
//               { topicName: "Variable Scope" }
//             ]
//           }
//         ]
//       },
//        '31':{
    
//       subjectName: "Shakespeare Literature",
//       course: "English Literature",
//       description: "Analysis of Shakespeare's major works and their impact on literature",
//       visibility: "Private",
//       chapters: [
//         {
//           chapterName: "Hamlet Analysis",
//           topics: [
//             { topicName: "Character Analysis" },
//             { topicName: "Themes and Motifs" },
//             { topicName: "Plot Structure" }
//           ]
//         }
//       ],
//       status: "Active"
//     },
//     };

//     return subjects[id] || null;
//   };

//   const handleFinish = (values: any) => {
//     console.log("Form values:", values);
//     if (isEdit) {
//       message.success("Subject updated successfully!");
//     } else {
//       message.success("Subject created successfully!");
//     }
//     navigate('/subjects'); // Navigate back to subjects list
//   };

//   const handleCancel = () => {
//     navigate('/subjects'); // Navigate back to subjects list
//   };

//   // Set initial values if editing
//   React.useEffect(() => {
//     if (isEdit && id) {
//       const dummyData = getDummyData(id);
//       if (dummyData) {
//         form.setFieldsValue(dummyData);
//       }
//     }
//   }, [form, isEdit, id]);

//   return (
//     <>
//       <PageHeader title={isEdit ? "Edit Subject" : "Create Subject"} backButton={true} />
      
//       <Card 
//         className="w-full mt-4 shadow-md"
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFinish}
//           className="font-local2 "
//         >
//           {/* Basic Information */}
//           <Row gutter={24}>
//             <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item
//                 name="subjectName"
//                 label="Subject Name"
//                 rules={[{ required: true, message: 'Please enter subject name!' }]}
//               >
//                 <Input 
//                   placeholder="Enter subject name" 
//                   size="large"
//                 />
//               </Form.Item>
//             </Col>
//             <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item
//                 name="course"
//                 label="Course"
//                 rules={[{ required: true, message: 'Please select a course!' }]}
//               >
//                 <Select 
//                   placeholder="Select course" 
//                   size="large"
//                 >
//                   <Option value="mathematics">Mathematics</Option>
//                   <Option value="computer-science">Computer Science</Option>
//                   <Option value="english-literature">English Literature</Option>
//                   <Option value="banking-finance">Banking & Finance</Option>
//                   <Option value="upsc-preparation">UPSC Preparation</Option>
//                   <Option value="digital-marketing">Digital Marketing</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={24}>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item
//                 name="visibility"
//                 label="Visibility"
//                 rules={[{ required: true, message: 'Please select visibility!' }]}
//               >
//                 <Select 
//                   placeholder="Select visibility" 
//                   size="large"
//                 >
//                   <Option value="public">Public</Option>
//                   <Option value="private">Private</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={24}>
//             <Col span={24}>
//               <Form.Item
//                 name="description"
//                 label="Description"
//                 rules={[{ required: true, message: 'Please enter description!' }]}
//               >
//                 <TextArea
//                   rows={4}
//                   placeholder="Enter subject description"
//                   size="large"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider orientation="left">Chapters</Divider>

//           {/* Dynamic Chapters */}
//           <Form.List name="chapters">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Card 
//                     key={key} 
//                     size="small" 
//                     className="mb-4"
//                     style={{ backgroundColor: '#f8f9fa' }}
//                     title={`Chapter ${name + 1}`}
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
//                       <Col span={24}>
//                         <Form.Item
//                           {...restField}
//                           name={[name, 'chapterName']}
//                           label="Chapter Name"
//                           rules={[{ required: true, message: 'Please enter chapter name!' }]}
//                         >
//                           <Input 
//                             placeholder="Enter chapter name" 
//                             style={{ height: '40px' }}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Divider orientation="left" plain>Topics</Divider>
                    
//                     {/* Dynamic Topics for each chapter */}
//                     <Form.List name={[name, 'topics']}>
//                       {(topicFields, { add: addTopic, remove: removeTopic }) => (
//                         <>
//                           {topicFields.map(({ key: topicKey, name: topicName, ...restTopicField }) => (
//                             <Row key={topicKey} gutter={16} align="middle">
//                               <Col span={20}>
//                                 <Form.Item
//                                   {...restTopicField}
//                                   name={[topicName, 'topicName']}
//                                   rules={[{ required: true, message: 'Please enter topic name!' }]}
//                                 >
//                                   <Input 
//                                     placeholder="Enter topic name" 
//                                     style={{ height: '40px', maxWidth: '600px' }}
//                                   />
//                                 </Form.Item>
//                               </Col>
//                               <Col span={4}>
//                                 <Button
//                                   type="text"
//                                   icon={<MinusCircleOutlined />}
//                                   onClick={() => removeTopic(topicName)}
//                                   danger
//                                 />
//                               </Col>
//                             </Row>
//                           ))}
//                           <Form.Item>
//                             <Button
//                               type="dashed"
//                               onClick={() => addTopic()}
//                               icon={<PlusOutlined />}
//                               style={{ maxWidth: '600px' }}
//                               className="w-full"
//                             >
//                               Add Topic
//                             </Button>
//                           </Form.Item>
//                         </>
//                       )}
//                     </Form.List>
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
//                     Add Chapter
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
//                 {isEdit ? "Update Subject" : "Create Subject"}
//               </Button>
//             </Space>
//           </Row>
//         </Form>
//       </Card>
//     </>
//   );
// };

// export default SubjectForm;
// @ts-nocheck
import React from "react";
import { Form, Input, Select, Button, Card, Row, Col, Space, Divider, Switch } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";
import { message } from "@/Components/common/message/message";

const { TextArea } = Input;
const { Option } = Select;

const SubjectForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';

  // Updated dummy data with new structure
   const getDummyData = (id: string) => {
    const subjects = {
      '1': {
        subjectName: "Advanced Calculus",
        module: "Mathematics",
        course: "Advanced Algebra",
        type: "Public",
        description: "Comprehensive study of differential and integral calculus with real-world applications",
        textbooks: [
          { textbookName: "Calculus: Early Transcendentals" },
          { textbookName: "Advanced Mathematical Methods" },
          { textbookName: "Linear Algebra and Its Applications" }
        ],
        status: true
      },
      '2': {
        subjectName: "Data Structures & Algorithms",
        module: "Computer Science",
        course: "Python Programming",
        type: "Public",
        description: "Introduction to fundamental data structures and algorithm design patterns",
        textbooks: [
          { textbookName: "Introduction to Algorithms" },
          { textbookName: "Data Structures Using Python" }
        ],
        status: true
      },
      '3': {
        subjectName: "Shakespearean Literature",
        module: "English Literature",
        course: "Shakespeare Studies",
        type: "Private",
        description: "In-depth analysis of Shakespeare's major tragedies, comedies, and historical plays",
        textbooks: [
          { textbookName: "The Complete Works of William Shakespeare" },
          { textbookName: "Shakespeare: A Critical Study" }
        ],
        status: false
      },
      '4': {
        subjectName: "Corporate Finance",
        module: "Banking & Finance",
        course: "Financial Accounting",
        type: "Public",
        description: "Advanced concepts in corporate financial management and investment analysis",
        textbooks: [
          { textbookName: "Principles of Corporate Finance" },
          { textbookName: "Financial Management Theory & Practice" },
          { textbookName: "Investment Analysis and Portfolio Management" }
        ],
        status: true
      },
      '5': {
        subjectName: "Constitutional Law",
        module: "UPSC Preparation",
        course: "Indian Polity",
        type: "Public",
        description: "Comprehensive study of Indian Constitution, fundamental rights, and governance",
        textbooks: [
          { textbookName: "Indian Constitution by D.D. Basu" },
          { textbookName: "Introduction to the Constitution of India" }
        ],
        status: true
      },
      '6': {
        subjectName: "Social Media Strategy",
        module: "Digital Marketing",
        course: "Social Media Marketing",
        type: "Private",
        description: "Strategic approach to social media marketing and brand engagement",
        textbooks: [
          { textbookName: "Social Media Marketing Strategy Guide" },
          { textbookName: "Digital Marketing Excellence" }
        ],
        status: false
      }
    };

    return subjects[id] || null;
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

  const [selectedModule, setSelectedModule] = React.useState(null);

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    if (isEdit) {
      message.success("Subject updated successfully!");
    } else {
      message.success("Subject created successfully!");
    }
    navigate('/subjects');
  };

  const handleCancel = () => {
    navigate('/subjects');
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
        setSelectedModule(dummyData.module);
      }
    }
  }, [form, isEdit, id]);

  return (
    <>
      <PageHeader title={isEdit ? "Edit Subject" : "Create Subject"} backButton={true} />
      
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
                name="subjectName"
                label="Subject Name"
                rules={[{ required: true, message: 'Please enter subject name!' }]}
              >
                <Input 
                  placeholder="Enter subject name" 
                  size="large"
                />
              </Form.Item>
            </Col>
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
          </Row>

          <Row gutter={24}>
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
                  options={selectedModule ? courseOptions[selectedModule] : []}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please select type!' }]}
              >
                <Select 
                  placeholder="Select type" 
                  size="large"
                >
                  <Option value="Public">Public</Option>
                  <Option value="Private">Private</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter description!' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter subject description"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="status"
                label="Status"
                valuePropName="checked"
              >
               <Switch
      checkedChildren="Active"
      unCheckedChildren="Inactive"
      size="default"
      className="
        [&.ant-switch]:!bg-gray-300 
        [&.ant-switch.ant-switch-checked]:!bg-[#007575]
      "
    />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Textbooks</Divider>

          {/* Dynamic Textbooks */}
          <Form.List name="textbooks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} align="middle" className="mb-3">
                    <Col span={20}>
                      <Form.Item
                        {...restField}
                        name={[name, 'textbookName']}
                        rules={[{ required: true, message: 'Please enter textbook name!' }]}
                      >
                        <Input 
                          placeholder="Enter textbook name" 
                          size="large"
                          style={{ maxWidth: '600px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        danger
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    size="large"
                    className="w-full h-12"
                    style={{ maxWidth: '600px' }}
                  >
                    Add Textbook
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
                {isEdit ? "Update Subject" : "Create Subject"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default SubjectForm;