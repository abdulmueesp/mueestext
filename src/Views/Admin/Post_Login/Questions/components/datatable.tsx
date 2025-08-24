// @ts-nocheck
import React from "react";
import { Table, Tag, Button, Popconfirm, Tooltip } from "antd";
import { FaEdit, FaRegEye } from "react-icons/fa";
import {MdDeleteOutline } from "react-icons/md";

const Datatable = ({ onEdit, onDelete, onView }) => {
  const data: any[] = [
    { 
      key: "1", 
      id: 1, 
      question: "What is the solution to the equation 2x + 5 = 13?", 
      questionMalayalam: "2x + 5 = 13 എന്ന സമവാക്യത്തിന്റെ പരിഹാരം എന്താണ്?",
      chapterId: 1,
      chapterName: "Linear Equations",
      courseName: "Advanced Algebra",
      moduleName: "Mathematics",
      type: "mcq",
      marks: 2,
      difficulty: "easy",
      options: [
        { text: "x = 4" },
        { text: "x = 3" },
        { text: "x = 5" },
        { text: "x = 6" }
      ],
      correctAnswer: [0],
      explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
      status: "Active"
    },
    { 
      key: "2", 
      id: 2, 
      question: "Which of the following is a valid Python variable name?", 
      questionMalayalam: "ഇനിപ്പറയുന്നവയിൽ ഏതാണ് സാധുവായ Python വേരിയബിൾ നാമം?",
      chapterId: 2,
      chapterName: "Variables and Data Types",
      courseName: "Python Programming",
      moduleName: "Computer Science",
      type: "mcq",
      marks: 1,
      difficulty: "easy",
      options: [
        { text: "2variable" },
        { text: "_variable" },
        { text: "variable-name" },
        { text: "class" }
      ],
      correctAnswer: [1],
      explanation: "Python variable names can start with underscore but not with numbers",
      status: "Active"
    },
    { 
      key: "3", 
      id: 3, 
      question: "Hamlet is considered one of Shakespeare's greatest tragedies.", 
      questionMalayalam: "ഹാംലെറ്റ് ഷേക്സ്പിയറിന്റെ ഏറ്റവും മികച്ച ദുരന്തങ്ങളിൽ ഒന്നായി കണക്കാക്കപ്പെടുന്നു.",
      chapterId: 3,
      chapterName: "Hamlet Analysis",
      courseName: "Shakespeare Studies",
      moduleName: "English Literature",
      type: "truefalse",
      marks: 1,
      difficulty: "medium",
      correctAnswer: "true",
      explanation: "Hamlet is widely regarded as one of Shakespeare's masterpieces",
      status: "Active"
    },
    { 
      key: "4", 
      id: 4, 
      question: "The double entry system ensures that every transaction affects at least _____ accounts.", 
      questionMalayalam: "ഡബിൾ എൻട്രി സിസ്റ്റം എല്ലാ ഇടപാടും കുറഞ്ഞത് _____ അക്കൗണ്ടുകളെ ബാധിക്കുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.",
      chapterId: 4,
      chapterName: "Double Entry System",
      courseName: "Financial Accounting",
      moduleName: "Banking & Finance",
      type: "fillblank",
      marks: 1,
      difficulty: "easy",
      correctAnswer: "two",
      explanation: "Double entry means every transaction has equal debit and credit effects",
      status: "Inactive"
    },
    { 
      key: "5", 
      id: 5, 
      question: "Explain the significance of Fundamental Rights in the Indian Constitution.", 
      questionMalayalam: "ഭാരത ഭരണഘടനയിലെ അടിസ്ഥാനാവകാശങ്ങളുടെ പ്രാധാന്യം വിശദീകരിക്കുക.",
      chapterId: 5,
      chapterName: "Constitutional Framework",
      courseName: "Indian Polity",
      moduleName: "UPSC Preparation",
      type: "essay",
      marks: 10,
      difficulty: "hard",
      correctAnswer: "Fundamental Rights protect individual liberties, ensure equality, and provide legal remedies. They are justiciable and form the cornerstone of Indian democracy.",
      explanation: "Key points include protection of individual freedoms, equality before law, and right to constitutional remedies",
      status: "Active"
    },
    { 
      key: "6", 
      id: 6, 
      question: "What are the key elements of a successful social media content strategy?", 
      questionMalayalam: "വിജയകരമായ സോഷ്യൽ മീഡിയ ഉള്ളടക്ക തന്ത്രത്തിന്റെ പ്രധാന ഘടകങ്ങൾ എന്തൊക്കെയാണ്?",
      chapterId: 6,
      chapterName: "Content Strategy",
      courseName: "Social Media Marketing",
      moduleName: "Digital Marketing",
      type: "shortanswer",
      marks: 5,
      difficulty: "medium",
      correctAnswer: "Target audience analysis, content calendar, consistent posting, engagement metrics, and brand voice consistency",
      explanation: "Focus on audience understanding, planning, consistency, and measurement",
      status: "Active"
    },
  ];

  const columns: any[] = [
    {
      title: <span className="font-semi">Question</span>,
      dataIndex: "question",
      key: "question",
      width: 250,
      render: (question: string, record: any) => (
        <Tooltip title={question} placement="topLeft">
          <div className="max-w-xs">
            <div className="font-local2 text-sm text-gray-900 mb-1">
              {question.length > 60 ? `${question.substring(0, 60)}...` : question}
            </div>
            <div className="font-local2 text-xs text-gray-600">
              {record.questionMalayalam.length > 40 ? `${record.questionMalayalam.substring(0, 40)}...` : record.questionMalayalam}
            </div>
          </div>
        </Tooltip>
      )
    },
    {
      title: <span className="font-semi">Chapter</span>,
      dataIndex: "chapterName",
      key: "chapterName",
      width: 140,
      render: (chapterName: string, record: any) => (
        <div>
          <div className="font-local2 text-blue-600">{chapterName}</div>
          <div className="font-local2 text-xs text-gray-600">{record.courseName}</div>
        </div>
      )
    },
    {
      title: <span className="font-semi">Type</span>,
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => {
        const typeColors: Record<string, string> = {
          mcq: "blue",
          truefalse: "green",
          fillblank: "orange",
          shortanswer: "purple",
          essay: "red",
        };
      
        const typeLabels: Record<string, string> = {
          mcq: "MCQ",
          truefalse: "T/F",
          fillblank: "Fill",
          shortanswer: "Short",
          essay: "Essay",
        };
      
        const color = typeColors[type] || "default";
      
        return <Tag color={color} className="font-local2">{typeLabels[type]}</Tag>;
      }
    },
    { 
      title: <span className="font-semi">Marks</span>, 
      dataIndex: "marks", 
      key: "marks", 
      width: 80,
      render: (marks: number) => (
        <span className="font-local2 font-bold text-lg bg-green-100 px-2 py-1 rounded-full text-green-700">
          {marks}
        </span>
      )
    },
    {
      title: <span className="font-semi">Difficulty</span>,
      dataIndex: "difficulty",
      key: "difficulty",
      width: 100,
      render: (difficulty: string) => {
        const difficultyColors: Record<string, string> = {
          easy: "green",
          medium: "orange",
          hard: "red",
        };
      
        const color = difficultyColors[difficulty] || "default";
      
        return <Tag color={color} className="font-local2 capitalize">{difficulty}</Tag>;
      }
    },
    {
      title: <span className="font-semi">Status</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        let color = "default";
        let bgColor = "";
        
        if (status === "Active") {
          color = "green";
          bgColor = "bg-green-100";
        } else if (status === "Inactive") {
          color = "red";
          bgColor = "bg-red-100";
        }
        
        return (
          <Tag color={color} className={`font-local2 ${bgColor}`}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: <span className="font-semi">Actions</span>,
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
            title="Are you sure you want to delete this question?"
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
        scroll={{ x: 1200 }}
        size="middle"
        className="font-local2"
        rowKey="id"
      />
    </div>
  );
};

export default Datatable;
