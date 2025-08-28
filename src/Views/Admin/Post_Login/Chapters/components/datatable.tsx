// // @ts-nocheck
// import React from "react";
// import { Table, Tag, Button, Popconfirm } from "antd";
// import { FaEdit, FaRegEye } from "react-icons/fa";
// import {MdDeleteOutline } from "react-icons/md";

// const Datatable = ({ onEdit, onDelete, onView }) => {
//   const data: any[] = [
//     { 
//       key: "1", 
//       id: 1, 
//       name: "Linear Equations", 
//       courseId: 1,
//       courseName: "Advanced Algebra",
//       moduleName: "Mathematics",
//       description: "Solving linear equations with one and two variables", 
//       order: 1,
//       estimatedTime: 2.5,
//       questionCount: 45,
//       status: "Active"
//     },
//     { 
//       key: "2", 
//       id: 2, 
//       name: "Variables and Data Types", 
//       courseId: 2,
//       courseName: "Python Programming",
//       moduleName: "Computer Science",
//       description: "Understanding Python variables, data types, and basic operations", 
//       order: 1,
//       estimatedTime: 3.0,
//       questionCount: 60,
//       status: "Active"
//     },
//     { 
//       key: "3", 
//       id: 3, 
//       name: "Hamlet Analysis", 
//       courseId: 3,
//       courseName: "Shakespeare Studies",
//       moduleName: "English Literature",
//       description: "Deep dive into Shakespeare's Hamlet: themes, characters, and plot", 
//       order: 2,
//       estimatedTime: 4.0,
//       questionCount: 35,
//       status: "Active"
//     },
//     { 
//       key: "4", 
//       id: 4, 
//       name: "Double Entry System", 
//       courseId: 4,
//       courseName: "Financial Accounting",
//       moduleName: "Banking & Finance",
//       description: "Principles of double entry bookkeeping and ledger accounts", 
//       order: 1,
//       estimatedTime: 2.0,
//       questionCount: 40,
//       status: "Inactive"
//     },
//     { 
//       key: "5", 
//       id: 5, 
//       name: "Constitutional Framework", 
//       courseId: 5,
//       courseName: "Indian Polity",
//       moduleName: "UPSC Preparation",
//       description: "Indian Constitution: Preamble, Fundamental Rights, and Directive Principles", 
//       order: 1,
//       estimatedTime: 5.0,
//       questionCount: 80,
//       status: "Active"
//     },
//     { 
//       key: "6", 
//       id: 6, 
//       name: "Content Strategy", 
//       courseId: 6,
//       courseName: "Social Media Marketing",
//       moduleName: "Digital Marketing",
//       description: "Creating engaging content strategies for social media platforms", 
//       order: 3,
//       estimatedTime: 2.5,
//       questionCount: 50,
//       status: "Active"
//     },
//   ];

//   const columns: any[] = [
//     {
//       title: <span className="font-semi">Chapter Name</span>,
//       dataIndex: "name",
//       key: "name",
//       width: 180,
//       render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
//     },
//     {
//       title: <span className="font-semi">Course</span>,
//       dataIndex: "courseName",
//       key: "courseName",
//       width: 160,
//       render: (courseName: string) => <span className="font-local2 text-blue-600">{courseName}</span>
//     },
//     {
//       title: <span className="font-semi">Module</span>,
//       dataIndex: "moduleName",
//       key: "moduleName",
//       width: 140,
//       render: (moduleName: string) => <span className="font-local2 text-purple-600">{moduleName}</span>
//     },
//     { 
//       title: <span className="font-semi">Order</span>, 
//       dataIndex: "order", 
//       key: "order", 
//       width: 80,
//       render: (order: number) => (
//         <span className="font-local2 font-bold text-lg bg-gray-100 px-2 py-1 rounded-full">
//           {order}
//         </span>
//       )
//     },
//     { 
//       title: <span className="font-semi">Time (Hrs)</span>, 
//       dataIndex: "estimatedTime", 
//       key: "estimatedTime", 
//       width: 100,
//       render: (time: number) => <span className="font-local2 font-semibold text-orange-600">{time}h</span>
//     },
//     { 
//       title: <span className="font-semi">Questions</span>, 
//       dataIndex: "questionCount", 
//       key: "questionCount", 
//       width: 100,
//       render: (count: number) => <span className="font-local2 font-semibold text-green-600">{count}</span>
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
//             title="Are you sure you want to delete this chapter?"
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
//         scroll={{ x: 1400 }}
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

// const SubjectDatatable = ({ onEdit, onDelete, onView }) => {
//   const data: any[] = [
//     {
//       key: "1",
//       id: 1,
//       subjectName: "Advanced Mathematics",
//       course: "Mathematics",
//       description: "Comprehensive study of advanced mathematical concepts including calculus and algebra",
//       visibility: "Public",
//       textbooks: [
//         {
//           textbookName: "Linear Equations",
//         },
//         {
//           textbookName: "Quadratic Equations",
//         }
//       ],
//       status: "Active"
//     },
//     {
//       key: "2",
//       id: 2,
//       subjectName: "Python Programming Fundamentals",
//       course: "Computer Science",
//       description: "Introduction to Python programming language with hands-on practice",
//       visibility: "Public",
//       textbooks: [
//         {
//           textbookName: "Variables and Data Types",
//         },
//         {
//           textbookName: "Control Structures",
//         }
//       ],
//       status: "Active"
//     },
//     {
//       key: "3",
//       id: 3,
//       subjectName: "Shakespeare Literature",
//       course: "English Literature",
//       description: "Analysis of Shakespeare's major works and their impact on literature",
//       visibility: "Private",
//       textbooks: [
//         {
//           textbookName: "Hamlet Analysis",
//         }
//       ],
//       status: "Active"
//     },
//     {
//       key: "4",
//       id: 4,
//       subjectName: "Financial Accounting Basics",
//       course: "Banking & Finance",
//       description: "Fundamentals of accounting principles and practices",
//       visibility: "Public",
//       textbooks: [
//         {
//           textbookName: "Double Entry System",
//         }
//       ],
//       status: "Inactive"
//     },
//     {
//       key: "5",
//       id: 5,
//       subjectName: "Indian Constitution",
//       course: "UPSC Preparation",
//       description: "Comprehensive study of Indian constitutional framework",
//       visibility: "Public",
//       textbooks: [
//         {
//           textbookName: "Constitutional Framework"
//         }
//       ],
//       status: "Active"
//     }
//   ];

//   const columns: any[] = [
//     {
//       title: <span className="font-semi">Subject Name</span>,
//       dataIndex: "subjectName",
//       key: "subjectName",
//       width: 200,
//       render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
//     },
//     {
//       title: <span className="font-semi">Course</span>,
//       dataIndex: "course",
//       key: "course",
//       width: 160,
//       render: (course: string) => <span className="font-local2 text-blue-600">{course}</span>
//     },
//     {
//       title: <span className="font-semi">Description</span>,
//       dataIndex: "description",
//       key: "description",
//       width: 250,
//       render: (description: string) => (
//         <span className="font-local2 text-gray-600">
//           {description.length > 50 ? `${description.substring(0, 50)}...` : description}
//         </span>
//       )
//     },
//     {
//       title: <span className="font-semi">Type</span>,
//       dataIndex: "visibility",
//       key: "visibility",
//       width: 100,
//       render: (visibility: string) => {
//         const color = visibility === "Public" ? "green" : "orange";
//         const bgColor = visibility === "Public" ? "bg-green-100" : "bg-orange-100";
        
//         return (
//           <Tag color={color} className={`font-local2 ${bgColor}`}>
//             {visibility}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: <span className="font-semi">Textbooks</span>,
//       dataIndex: "textbooks",
//       key: "textbooks",
//       width: 100,
//       render: (textbooks: any[]) => (
//         <span className="font-local2 font-semibold text-purple-600">
//           {textbooks?.length || 0}
//         </span>
//       )
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
//             title="Are you sure you want to delete this subject?"
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
//         scroll={{ x: 1400 }}
//         size="middle"
//         className="font-local2"
//         rowKey="id"
//       />
//     </div>
//   );
// };

// export default SubjectDatatable;
// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm, Switch } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const SubjectDatatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    {
      key: "1",
      id: 1,
      subjectName: "Advanced Calculus",
      module: "Mathematics",
      course: "Advanced Algebra",
      description: "Comprehensive study of differential and integral calculus with real-world applications",
      type: "Public",
      textbooks: [
        { textbookName: "Calculus: Early Transcendentals" },
        { textbookName: "Advanced Mathematical Methods" },
        { textbookName: "Linear Algebra and Its Applications" }
      ],
      status: true
    },
    {
      key: "2",
      id: 2,
      subjectName: "Data Structures & Algorithms",
      module: "Computer Science",
      course: "Python Programming",
      description: "Introduction to fundamental data structures and algorithm design patterns",
      type: "Public",
      textbooks: [
        { textbookName: "Introduction to Algorithms" },
        { textbookName: "Data Structures Using Python" }
      ],
      status: true
    },
    {
      key: "3",
      id: 3,
      subjectName: "Shakespearean Literature",
      module: "English Literature",
      course: "Shakespeare Studies",
      description: "In-depth analysis of Shakespeare's major tragedies, comedies, and historical plays",
      type: "Private",
      textbooks: [
        { textbookName: "The Complete Works of William Shakespeare" },
        { textbookName: "Shakespeare: A Critical Study" }
      ],
      status: false
    },
    {
      key: "4",
      id: 4,
      subjectName: "Corporate Finance",
      module: "Banking & Finance",
      course: "Financial Accounting",
      description: "Advanced concepts in corporate financial management and investment analysis",
      type: "Public",
      textbooks: [
        { textbookName: "Principles of Corporate Finance" },
        { textbookName: "Financial Management Theory & Practice" },
        { textbookName: "Investment Analysis and Portfolio Management" }
      ],
      status: true
    },
    {
      key: "5",
      id: 5,
      subjectName: "Constitutional Law",
      module: "UPSC Preparation",
      course: "Indian Polity",
      description: "Comprehensive study of Indian Constitution, fundamental rights, and governance",
      type: "Public",
      textbooks: [
        { textbookName: "Indian Constitution by D.D. Basu" },
        { textbookName: "Introduction to the Constitution of India" }
      ],
      status: true
    },
    {
      key: "6",
      id: 6,
      subjectName: "Social Media Strategy",
      module: "Digital Marketing",
      course: "Social Media Marketing",
      description: "Strategic approach to social media marketing and brand engagement",
      type: "Private",
      textbooks: [
        { textbookName: "Social Media Marketing Strategy Guide" },
        { textbookName: "Digital Marketing Excellence" }
      ],
      status: false
    }
  ];

  const columns: any[] = [
    {
      title: <span className="font-semibold">Subject Name</span>,
      dataIndex: "subjectName",
      key: "subjectName",
      width: 200,
      render: (name: string) => <span className="font-local2 font-semibold">{name}</span>
    },
    {
      title: <span className="font-semibold">Module</span>,
      dataIndex: "module",
      key: "module",
      width: 150,
      render: (module: string) => <span className="font-local2 text-purple-600">{module}</span>
    },
    {
      title: <span className="font-semibold">Course</span>,
      dataIndex: "course",
      key: "course",
      width: 160,
      render: (course: string) => <span className="font-local2 text-blue-600">{course}</span>
    },
    {
      title: <span className="font-semibold">Description</span>,
      dataIndex: "description",
      key: "description",
      width: 250,
      render: (description: string) => (
        <span className="font-local2 text-gray-600">
          {description.length > 50 ? `${description.substring(0, 50)}...` : description}
        </span>
      )
    },
    {
      title: <span className="font-semibold">Type</span>,
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => {
        const color = type === "Public" ? "green" : "orange";
        const bgColor = type === "Public" ? "bg-green-100" : "bg-orange-100";
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: <span className="font-semibold">Textbooks</span>,
      dataIndex: "textbooks",
      key: "textbooks",
      width: 100,
      render: (textbooks: any[]) => (
        <span className="font-local2 font-semibold text-purple-600">
          {textbooks?.length || 0}
        </span>
      )
    },
    {
      title: <span className="font-semibold">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: boolean) => {
        const color = status ? "green" : "red";
        const bgColor = status ? "bg-green-100" : "bg-red-100";
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {status ? "Active" : "Inactive"}
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
            title="Are you sure you want to delete this subject?"
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
        scroll={{ x: 1500 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default SubjectDatatable;