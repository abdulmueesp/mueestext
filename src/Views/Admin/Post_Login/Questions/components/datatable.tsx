// // @ts-nocheck
// import React from "react";
// import { Table, Tag, Button, Popconfirm, Tooltip } from "antd";
// import { FaEdit, FaRegEye } from "react-icons/fa";
// import {MdDeleteOutline } from "react-icons/md";

// const Datatable = ({ onEdit, onDelete, onView }) => {
//   const data: any[] = [
//     { 
//       key: "1", 
//       id: 1, 
//       question: "What is the solution to the equation 2x + 5 = 13?", 
//       questionMalayalam: "2x + 5 = 13 എന്ന സമവാക്യത്തിന്റെ പരിഹാരം എന്താണ്?",
//       chapterId: 1,
//       chapterName: "Linear Equations",
//       courseName: "Advanced Algebra",
//       moduleName: "Mathematics",
//       type: "mcq",
//       marks: 2,
//       difficulty: "easy",
//       options: [
//         { text: "x = 4" },
//         { text: "x = 3" },
//         { text: "x = 5" },
//         { text: "x = 6" }
//       ],
//       correctAnswer: [0],
//       explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
//       status: "Active"
//     },
//     { 
//       key: "2", 
//       id: 2, 
//       question: "Which of the following is a valid Python variable name?", 
//       questionMalayalam: "ഇനിപ്പറയുന്നവയിൽ ഏതാണ് സാധുവായ Python വേരിയബിൾ നാമം?",
//       chapterId: 2,
//       chapterName: "Variables and Data Types",
//       courseName: "Python Programming",
//       moduleName: "Computer Science",
//       type: "mcq",
//       marks: 1,
//       difficulty: "easy",
//       options: [
//         { text: "2variable" },
//         { text: "_variable" },
//         { text: "variable-name" },
//         { text: "class" }
//       ],
//       correctAnswer: [1],
//       explanation: "Python variable names can start with underscore but not with numbers",
//       status: "Active"
//     },
//     { 
//       key: "3", 
//       id: 3, 
//       question: "Hamlet is considered one of Shakespeare's greatest tragedies.", 
//       questionMalayalam: "ഹാംലെറ്റ് ഷേക്സ്പിയറിന്റെ ഏറ്റവും മികച്ച ദുരന്തങ്ങളിൽ ഒന്നായി കണക്കാക്കപ്പെടുന്നു.",
//       chapterId: 3,
//       chapterName: "Hamlet Analysis",
//       courseName: "Shakespeare Studies",
//       moduleName: "English Literature",
//       type: "truefalse",
//       marks: 1,
//       difficulty: "medium",
//       correctAnswer: "true",
//       explanation: "Hamlet is widely regarded as one of Shakespeare's masterpieces",
//       status: "Active"
//     },
//     { 
//       key: "4", 
//       id: 4, 
//       question: "The double entry system ensures that every transaction affects at least _____ accounts.", 
//       questionMalayalam: "ഡബിൾ എൻട്രി സിസ്റ്റം എല്ലാ ഇടപാടും കുറഞ്ഞത് _____ അക്കൗണ്ടുകളെ ബാധിക്കുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.",
//       chapterId: 4,
//       chapterName: "Double Entry System",
//       courseName: "Financial Accounting",
//       moduleName: "Banking & Finance",
//       type: "fillblank",
//       marks: 1,
//       difficulty: "easy",
//       correctAnswer: "two",
//       explanation: "Double entry means every transaction has equal debit and credit effects",
//       status: "Inactive"
//     },
//     { 
//       key: "5", 
//       id: 5, 
//       question: "Explain the significance of Fundamental Rights in the Indian Constitution.", 
//       questionMalayalam: "ഭാരത ഭരണഘടനയിലെ അടിസ്ഥാനാവകാശങ്ങളുടെ പ്രാധാന്യം വിശദീകരിക്കുക.",
//       chapterId: 5,
//       chapterName: "Constitutional Framework",
//       courseName: "Indian Polity",
//       moduleName: "UPSC Preparation",
//       type: "essay",
//       marks: 10,
//       difficulty: "hard",
//       correctAnswer: "Fundamental Rights protect individual liberties, ensure equality, and provide legal remedies. They are justiciable and form the cornerstone of Indian democracy.",
//       explanation: "Key points include protection of individual freedoms, equality before law, and right to constitutional remedies",
//       status: "Active"
//     },
//     { 
//       key: "6", 
//       id: 6, 
//       question: "What are the key elements of a successful social media content strategy?", 
//       questionMalayalam: "വിജയകരമായ സോഷ്യൽ മീഡിയ ഉള്ളടക്ക തന്ത്രത്തിന്റെ പ്രധാന ഘടകങ്ങൾ എന്തൊക്കെയാണ്?",
//       chapterId: 6,
//       chapterName: "Content Strategy",
//       courseName: "Social Media Marketing",
//       moduleName: "Digital Marketing",
//       type: "shortanswer",
//       marks: 5,
//       difficulty: "medium",
//       correctAnswer: "Target audience analysis, content calendar, consistent posting, engagement metrics, and brand voice consistency",
//       explanation: "Focus on audience understanding, planning, consistency, and measurement",
//       status: "Active"
//     },
//   ];

//   const columns: any[] = [
//     {
//       title: <span className="font-semi">Question</span>,
//       dataIndex: "question",
//       key: "question",
//       width: 250,
//       render: (question: string, record: any) => (
//         <Tooltip title={question} placement="topLeft">
//           <div className="max-w-xs">
//             <div className="font-local2 text-sm text-gray-900 mb-1">
//               {question.length > 60 ? `${question.substring(0, 60)}...` : question}
//             </div>
//             <div className="font-local2 text-xs text-gray-600">
//               {record.questionMalayalam.length > 40 ? `${record.questionMalayalam.substring(0, 40)}...` : record.questionMalayalam}
//             </div>
//           </div>
//         </Tooltip>
//       )
//     },
//     {
//       title: <span className="font-semi">Chapter</span>,
//       dataIndex: "chapterName",
//       key: "chapterName",
//       width: 140,
//       render: (chapterName: string, record: any) => (
//         <div>
//           <div className="font-local2 text-blue-600">{chapterName}</div>
//           <div className="font-local2 text-xs text-gray-600">{record.courseName}</div>
//         </div>
//       )
//     },
//     {
//       title: <span className="font-semi">Type</span>,
//       dataIndex: "type",
//       key: "type",
//       width: 100,
//       render: (type: string) => {
//         const typeColors: Record<string, string> = {
//           mcq: "blue",
//           truefalse: "green",
//           fillblank: "orange",
//           shortanswer: "purple",
//           essay: "red",
//         };
      
//         const typeLabels: Record<string, string> = {
//           mcq: "MCQ",
//           truefalse: "T/F",
//           fillblank: "Fill",
//           shortanswer: "Short",
//           essay: "Essay",
//         };
      
//         const color = typeColors[type] || "default";
      
//         return <Tag color={color} className="font-local2">{typeLabels[type]}</Tag>;
//       }
//     },
//     { 
//       title: <span className="font-semi">Marks</span>, 
//       dataIndex: "marks", 
//       key: "marks", 
//       width: 80,
//       render: (marks: number) => (
//         <span className="font-local2 font-bold text-lg bg-green-100 px-2 py-1 rounded-full text-green-700">
//           {marks}
//         </span>
//       )
//     },
//     {
//       title: <span className="font-semi">Difficulty</span>,
//       dataIndex: "difficulty",
//       key: "difficulty",
//       width: 100,
//       render: (difficulty: string) => {
//         const difficultyColors: Record<string, string> = {
//           easy: "green",
//           medium: "orange",
//           hard: "red",
//         };
      
//         const color = difficultyColors[difficulty] || "default";
      
//         return <Tag color={color} className="font-local2 capitalize">{difficulty}</Tag>;
//       }
//     },
//     {
//       title: <span className="font-semi">Status</span>,
//       dataIndex: "status",
//       key: "status",
//       width: 100,
//       render: (status: string) => {
//         let color = "default";
//         let bgColor = "";
        
//         if (status === "Active") {
//           color = "green";
//           bgColor = "bg-green-100";
//         } else if (status === "Inactive") {
//           color = "red";
//           bgColor = "bg-red-100";
//         }
        
//         return (
//           <Tag color={color} className={`font-local2 ${bgColor}`}>
//             {status}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: <span className="font-semi">Actions</span>,
//       key: "actions",
//       width: 150,
//       render: (_: any, record: any) => (
//         <div className="flex gap-2">
//           <Button
//             type="link"
//             icon={<FaRegEye color="black" size={18} />}
//             size="small"
//             onClick={() => onView(record)}
//             title="View"
//           />
//           <Button
//             type="link"
//             icon={<FaEdit color="orange" size={18}/>}
//             size="small"
//             onClick={() => onEdit(record)}
//             title="Edit"
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this question?"
//             onConfirm={() => onDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button
//               type="link"
//               icon={<MdDeleteOutline size={18} color="red" />}
//               size="small"
//               title="Delete"
//             />
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-4">
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{
//           current: 1,
//           pageSize: 10,
//           total: data.length,
//           showSizeChanger: true,
//           showQuickJumper: true,
//           showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
//           pageSizeOptions: ["5", "10", "20", "50"],
//         }}
//         scroll={{ x: 1200 }}
//         size="middle"
//         className="font-local2"
//         rowKey="id"
//       />
//     </div>
//   );
// };

// export default Datatable;
// // @ts-nocheck
// import React from "react";
// import { Table, Tag, Button, Popconfirm } from "antd";
// import { FaEdit, FaRegEye } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";

// const Datatable = ({ onEdit, onDelete, onView }) => {
//   const data: any[] = [
//     {
//       key: "1",
//       id: 1,
//       module: "Mathematics",
//       course: "Advanced Algebra",
//       subject: "Advanced Calculus",
//       textbook: "Calculus: Early Transcendentals",
//       chapter: "Linear Equations",
//       totalQuestions: 5,
//       questionTypes: ["MCQ", "Fill Blank", "Short Answer"],
//       status: "Active"
//     },
//     {
//       key: "2",
//       id: 2,
//       module: "Computer Science",
//       course: "Python Programming", 
//       subject: "Data Structures & Algorithms",
//       textbook: "Introduction to Algorithms",
//       chapter: "Variables and Data Types",
//       totalQuestions: 8,
//       questionTypes: ["MCQ", "True/False", "Essay"],
//       status: "Active"
//     },
//     {
//       key: "3",
//       id: 3,
//       module: "English Literature",
//       course: "Shakespeare Studies",
//       subject: "Shakespearean Literature",
//       textbook: "The Complete Works of William Shakespeare",
//       chapter: "Hamlet Analysis",
//       totalQuestions: 3,
//       questionTypes: ["Essay", "Short Answer"],
//       status: "Inactive"
//     },
//     {
//       key: "4",
//       id: 4,
//       module: "Banking & Finance",
//       course: "Financial Accounting",
//       subject: "Corporate Finance",
//       textbook: "Principles of Corporate Finance",
//       chapter: "Financial Statements",
//       totalQuestions: 6,
//       questionTypes: ["MCQ", "Fill Blank"],
//       status: "Active"
//     },
//     {
//       key: "5",
//       id: 5,
//       module: "UPSC Preparation",
//       course: "Indian Polity",
//       subject: "Constitutional Law",
//       textbook: "Indian Constitution by D.D. Basu",
//       chapter: "Fundamental Rights",
//       totalQuestions: 12,
//       questionTypes: ["MCQ", "Essay", "Short Answer"],
//       status: "Active"
//     },
//     {
//       key: "6",
//       id: 6,
//       module: "Digital Marketing",
//       course: "Social Media Marketing",
//       subject: "Social Media Strategy",
//       textbook: "Social Media Marketing Strategy Guide",
//       chapter: "Content Strategy",
//       totalQuestions: 4,
//       questionTypes: ["MCQ", "Short Answer"],
//       status: "Inactive"
//     }
//   ];

//   const columns: any[] = [
//     {
//       title: <span className="font-semibold">Module</span>,
//       dataIndex: "module",
//       key: "module",
//       width: 150,
//       render: (module: string) => <span className="font-local2 text-orange-600 font-semibold">{module}</span>
//     },
//     {
//       title: <span className="font-semibold">Course</span>,
//       dataIndex: "course",
//       key: "course",
//       width: 160,
//       render: (course: string) => <span className="font-local2 text-blue-600">{course}</span>
//     },
//     {
//       title: <span className="font-semibold">Subject</span>,
//       dataIndex: "subject",
//       key: "subject",
//       width: 200,
//       render: (subject: string) => <span className="font-local2 text-green-600">{subject}</span>
//     },
//     {
//       title: <span className="font-semibold">Textbook</span>,
//       dataIndex: "textbook",
//       key: "textbook",
//       width: 250,
//       render: (textbook: string) => <span className="font-local2 text-purple-600">{textbook}</span>
//     },
//     {
//       title: <span className="font-semibold">Chapter</span>,
//       dataIndex: "chapter",
//       key: "chapter",
//       width: 160,
//       render: (chapter: string) => <span className="font-local2 text-indigo-600 font-semibold">{chapter}</span>
//     },
//     {
//       title: <span className="font-semibold">Total Questions</span>,
//       dataIndex: "totalQuestions",
//       key: "totalQuestions",
//       width: 120,
//       align: 'center',
//       render: (count: number) => (
//         <span className="font-local2 font-bold text-lg bg-blue-100 px-3 py-1 rounded-full text-blue-700">
//           {count}
//         </span>
//       )
//     },
//     {
//       title: <span className="font-semibold">Question Types</span>,
//       dataIndex: "questionTypes",
//       key: "questionTypes",
//       width: 200,
//       render: (types: string[]) => (
//         <div className="flex flex-wrap gap-1">
//           {types.map((type, index) => {
//             const typeColors: Record<string, string> = {
//               "MCQ": "blue",
//               "True/False": "green",
//               "Fill Blank": "orange",
//               "Short Answer": "purple",
//               "Essay": "red",
//             };
//             return (
//               <Tag key={index} color={typeColors[type]} className="font-local2 text-xs">
//                 {type}
//               </Tag>
//             );
//           })}
//         </div>
//       )
//     },
//     {
//       title: <span className="font-semibold">Status</span>,
//       dataIndex: "status",
//       key: "status",
//       width: 100,
//       render: (status: string) => {
//         const color = status === "Active" ? "green" : "red";
//         const bgColor = status === "Active" ? "bg-green-100" : "bg-red-100";
        
//         return (
//           <Tag color={color} className={`font-local2 ${bgColor}`}>
//             {status}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: <span className="font-semibold">Actions</span>,
//       key: "actions",
//       width: 150,
//       render: (_: any, record: any) => (
//         <div className="flex gap-2">
//           <Button
//             type="link"
//             icon={<FaRegEye color="black" size={18} />}
//             size="small"
//             onClick={() => onView(record)}
//             title="View"
//           />
//           <Button
//             type="link"
//             icon={<FaEdit color="orange" size={18}/>}
//             size="small"
//             onClick={() => onEdit(record)}
//             title="Edit"
//           />
//           <Popconfirm
//             title="Are you sure you want to delete all questions in this set?"
//             onConfirm={() => onDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button
//               type="link"
//               icon={<MdDeleteOutline size={18} color="red" />}
//               size="small"
//               title="Delete"
//             />
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-4">
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{
//           current: 1,
//           pageSize: 10,
//           total: data.length,
//           showSizeChanger: true,
//           showQuickJumper: true,
//           showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
//           pageSizeOptions: ["5", "10", "20", "50"],
//         }}
//         scroll={{ x: 1800 }}
//         size="middle"
//         className="font-local2"
//         rowKey="id"
//       />
//     </div>
//   );
// };

// export default Datatable;
// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    {
      key: "1",
      id: 1,
      module: "Mathematics",
      course: "Advanced Algebra",
      subject: "Advanced Calculus",
      textbook: "Calculus: Early Transcendentals",
      chapter: "Linear Equations",
      totalQuestions: 3,
      questionTypes: ["MCQ", "Fill Blank", "Short Answer"],
      status: "Active"
    },
    {
      key: "2",
      id: 2,
      module: "Computer Science",
      course: "Python Programming", 
      subject: "Data Structures & Algorithms",
      textbook: "Introduction to Algorithms",
      chapter: "Variables and Data Types",
      totalQuestions: 2,
      questionTypes: ["MCQ", "True/False"],
      status: "Active"
    },
    {
      key: "3",
      id: 3,
      module: "English Literature",
      course: "Shakespeare Studies",
      subject: "Shakespearean Literature",
      textbook: "The Complete Works of William Shakespeare",
      chapter: "Hamlet Analysis",
      totalQuestions: 1,
      questionTypes: ["Essay"],
      status: "Inactive"
    },
    {
      key: "4",
      id: 4,
      module: "Banking & Finance",
      course: "Financial Accounting",
      subject: "Corporate Finance",
      textbook: "Principles of Corporate Finance",
      chapter: "Financial Statements",
      totalQuestions: 3,
      questionTypes: ["MCQ", "Fill Blank", "Short Answer"],
      status: "Active"
    },
    {
      key: "5",
      id: 5,
      module: "UPSC Preparation",
      course: "Indian Polity",
      subject: "Constitutional Law",
      textbook: "Indian Constitution by D.D. Basu",
      chapter: "Fundamental Rights",
      totalQuestions: 4,
      questionTypes: ["MCQ", "True/False", "Essay", "Fill Blank"],
      status: "Active"
    },
    {
      key: "6",
      id: 6,
      module: "Digital Marketing",
      course: "Social Media Marketing",
      subject: "Social Media Strategy",
      textbook: "Social Media Marketing Strategy Guide",
      chapter: "Content Strategy",
      totalQuestions: 4,
      questionTypes: ["Short Answer", "Fill Blank", "True/False", "MCQ"],
      status: "Inactive"
    }
  ];

  const columns: any[] = [
    {
      title: <span className="font-semibold">Chapter</span>,
      dataIndex: "chapter",
      key: "chapter",
      width: 160,
      render: (chapter: string) => <span className="font-local2 text-indigo-600 font-semibold">{chapter}</span>
    },
     {
      title: <span className="font-semibold">Textbook</span>,
      dataIndex: "textbook",
      key: "textbook",
      width: 250,
      render: (textbook: string) => <span className="font-local2 text-purple-600">{textbook}</span>
    },
     {
      title: <span className="font-semibold">Subject</span>,
      dataIndex: "subject",
      key: "subject",
      width: 200,
      render: (subject: string) => <span className="font-local2 text-green-600">{subject}</span>
    },
      {
      title: <span className="font-semibold">Course</span>,
      dataIndex: "course",
      key: "course",
      width: 160,
      render: (course: string) => <span className="font-local2 text-blue-600">{course}</span>
    },
    {
      title: <span className="font-semibold">Module</span>,
      dataIndex: "module",
      key: "module",
      width: 150,
      render: (module: string) => <span className="font-local2 text-orange-600 font-semibold">{module}</span>
    },
   
    {
      title: <span className="font-semibold">Total Questions</span>,
      dataIndex: "totalQuestions",
      key: "totalQuestions",
      width: 120,
      align: 'center',
      render: (count: number) => (
        <span className="font-local2 font-bold text-lg bg-blue-100 px-3 py-1 rounded-full text-blue-700">
          {count}
        </span>
      )
    },
    {
      title: <span className="font-semibold">Question Types</span>,
      dataIndex: "questionTypes",
      key: "questionTypes",
      width: 200,
      render: (types: string[]) => (
        <div className="flex flex-wrap gap-1">
          {types.map((type, index) => {
            const typeColors: Record<string, string> = {
              "MCQ": "blue",
              "True/False": "green",
              "Fill Blank": "orange",
              "Short Answer": "purple",
              "Essay": "red",
            };
            return (
              <Tag key={index} color={typeColors[type]} className="font-local2 text-xs">
                {type}
              </Tag>
            );
          })}
        </div>
      )
    },
    {
      title: <span className="font-semibold">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        const color = status === "Active" ? "green" : "red";
        const bgColor = status === "Active" ? "bg-green-100" : "bg-red-100";
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: <span className="font-semibold">Actions</span>,
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<FaRegEye color="black" size={18} />}
            size="small"
            onClick={() => onView(record)}
            title="View"
          />
          <Button
            type="link"
            icon={<FaEdit color="orange" size={18}/>}
            size="small"
            onClick={() => onEdit(record)}
            title="Edit"
          />
          <Popconfirm
            title="Are you sure you want to delete all questions in this set?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<MdDeleteOutline size={18} color="red" />}
              size="small"
              title="Delete"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 10,
          total: data.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        scroll={{ x: 1800 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;