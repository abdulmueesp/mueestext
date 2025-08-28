// // @ts-nocheck
// import React from "react";
// import { Card, Divider, Button, Tag } from "antd";
// import { useParams, useNavigate } from "react-router-dom";
// import PageHeader from "@/Components/common/PageHeader";

// const ViewChapter = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Get chapter data by ID
//   const getChapterData = (id: string) => {
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
//           { 
//             topicName: "Primitive Data Types",
//             exercises: [
//               { exerciseName: "Integer Operations" },
//               { exerciseName: "String Manipulation" },
//               { exerciseName: "Boolean Logic" }
//             ]
//           },
//           { 
//             topicName: "Type Conversion",
//             exercises: [
//               { exerciseName: "Implicit Type Conversion" },
//               { exerciseName: "Explicit Type Casting" }
//             ]
//           }
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
//           { 
//             topicName: "Character Analysis",
//             exercises: [
//               { exerciseName: "Hamlet Character Study" },
//               { exerciseName: "Supporting Characters Analysis" },
//               { exerciseName: "Character Development Arc" }
//             ]
//           },
//           { 
//             topicName: "Themes and Motifs",
//             exercises: [
//               { exerciseName: "Death and Mortality Theme" },
//               { exerciseName: "Revenge Motif Analysis" }
//             ]
//           }
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
//           { 
//             topicName: "Balance Sheet Analysis",
//             exercises: [
//               { exerciseName: "Balance Sheet Preparation" },
//               { exerciseName: "Financial Ratio Analysis" },
//               { exerciseName: "Working Capital Management" }
//             ]
//           },
//           { 
//             topicName: "Income Statement",
//             exercises: [
//               { exerciseName: "Revenue Recognition" },
//               { exerciseName: "Expense Classification" }
//             ]
//           }
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
//           { 
//             topicName: "Right to Equality",
//             exercises: [
//               { exerciseName: "Article 14-18 Analysis" },
//               { exerciseName: "Case Studies on Equality" },
//               { exerciseName: "Reservation Policies" }
//             ]
//           },
//           { 
//             topicName: "Right to Freedom",
//             exercises: [
//               { exerciseName: "Article 19-22 Study" },
//               { exerciseName: "Freedom of Speech Cases" }
//             ]
//           }
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
//           { 
//             topicName: "Content Planning",
//             exercises: [
//               { exerciseName: "Content Calendar Creation" },
//               { exerciseName: "Engagement Strategy Development" },
//               { exerciseName: "Audience Segmentation" }
//             ]
//           },
//           { 
//             topicName: "Content Creation",
//             exercises: [
//               { exerciseName: "Visual Content Design" },
//               { exerciseName: "Copywriting Techniques" }
//             ]
//           }
//         ],
//         status: false
//       }
//     };

//     return chapters[id] || null;
//   };

//   const chapterData = getChapterData(id);

//   const handleEdit = () => {
//     navigate(`/chaptersform/${id}`);
//   };

//   const handleBack = () => {
//     navigate('/chapters');
//   };

//   if (!chapterData) {
//     return (
//       <>
//         <PageHeader title="Chapter Not Found" backButton={true} />
//         <Card className="w-full mt-4">
//           <div className="text-center py-8">
//             <h3>Chapter not found</h3>
//             <Button onClick={handleBack}>Go Back</Button>
//           </div>
//         </Card>
//       </>
//     );
//   }

//   return (
//     <>
//       <PageHeader title="Chapter Details" backButton={true}>
//         <Button
//           type="primary"
//           style={{ backgroundColor: "#007575", color: "white" }}
//           className="font-local2"
//           onClick={handleEdit}
//         >
//           Edit Chapter
//         </Button>
//       </PageHeader>

//       <Card className="w-full mt-4 shadow-md">
//         <div className="p-4">
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Chapter Name:</span>
//               <span className="font-local2 text-xl text-gray-900 font-bold">
//                 {chapterData.chapterName}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Module:</span>
//               <span className="font-local2 text-lg text-orange-600">
//                 {chapterData.module}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Course:</span>
//               <span className="font-local2 text-lg text-blue-600">
//                 {chapterData.course}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Subject:</span>
//               <span className="font-local2 text-lg text-green-600">
//                 {chapterData.subject}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Textbook:</span>
//               <span className="font-local2 text-lg text-purple-600">
//                 {chapterData.textbook}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Status:</span>
//               <Tag
//                 color={chapterData.status ? "green" : "red"}
//                 className={`font-local2 text-lg ${
//                   chapterData.status ? "bg-green-100" : "bg-red-100"
//                 }`}
//               >
//                 {chapterData.status ? "Active" : "Inactive"}
//               </Tag>
//             </div>

//             <Divider orientation="left">Topics</Divider>

//             <div className="space-y-3">
//               {chapterData.topics?.length > 0 ? (
//                 chapterData.topics.map((topic: any, topicIndex: number) => (
//                   <Card
//                     key={topicIndex}
//                     size="small"
//                     className="bg-blue-50"
//                   >
//                     <span className="font-local2 text-blue-600 font-semibold">
//                       {topicIndex + 1}. {topic.topicName}
//                     </span>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-gray-500 text-center py-4">
//                   No topics added yet
//                 </div>
//               )}
//             </div>

//             <Divider orientation="left">Exercises</Divider>

//             <div className="space-y-3">
//               {chapterData.exercises?.length > 0 ? (
//                 chapterData.exercises.map((exercise: any, exerciseIndex: number) => (
//                   <Card
//                     key={exerciseIndex}
//                     size="small"
//                     className="bg-green-50"
//                   >
//                     <span className="font-local2 text-green-600 font-semibold">
//                       {exerciseIndex + 1}. {exercise.exerciseName}
//                     </span>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-gray-500 text-center py-4">
//                   No exercises added yet
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Card>
//     </>
//   );
// };

// export default ViewChapter;
// // @ts-nocheck
// import React from "react";
// import { Card, Divider, Button, Tag } from "antd";
// import { useParams, useNavigate } from "react-router-dom";
// import PageHeader from "@/Components/common/PageHeader";

// const ViewChapter = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Get chapter data by ID
//   const getChapterData = (id: string) => {
//     const chapters = {
//       '1': {
//         chapterName: "Linear Equations",
//         module: "Mathematics",
//         course: "Advanced Algebra",
//         subject: "Advanced Calculus",
//         textbook: "Calculus: Early Transcendentals",
//         chapters: [
//           {
//             chapterName: "Linear Equations", 
//             topics: [
//               { topicName: "Single Variable Equations" },
//               { topicName: "Two Variable Systems" },
//               { topicName: "Matrix Solutions" }
//             ],
//             exercises: [
//               { exerciseName: "Basic Linear Equations Practice" },
//               { exerciseName: "Word Problems in Linear Equations" },
//               { exerciseName: "Graphical Representation" },
//               { exerciseName: "Matrix Method Solutions" }
//             ]
//           }
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
//           { 
//             topicName: "Primitive Data Types",
//             exercises: [
//               { exerciseName: "Integer Operations" },
//               { exerciseName: "String Manipulation" },
//               { exerciseName: "Boolean Logic" }
//             ]
//           },
//           { 
//             topicName: "Type Conversion",
//             exercises: [
//               { exerciseName: "Implicit Type Conversion" },
//               { exerciseName: "Explicit Type Casting" }
//             ]
//           }
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
//           { 
//             topicName: "Character Analysis",
//             exercises: [
//               { exerciseName: "Hamlet Character Study" },
//               { exerciseName: "Supporting Characters Analysis" },
//               { exerciseName: "Character Development Arc" }
//             ]
//           },
//           { 
//             topicName: "Themes and Motifs",
//             exercises: [
//               { exerciseName: "Death and Mortality Theme" },
//               { exerciseName: "Revenge Motif Analysis" }
//             ]
//           }
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
//           { 
//             topicName: "Balance Sheet Analysis",
//             exercises: [
//               { exerciseName: "Balance Sheet Preparation" },
//               { exerciseName: "Financial Ratio Analysis" },
//               { exerciseName: "Working Capital Management" }
//             ]
//           },
//           { 
//             topicName: "Income Statement",
//             exercises: [
//               { exerciseName: "Revenue Recognition" },
//               { exerciseName: "Expense Classification" }
//             ]
//           }
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
//           { 
//             topicName: "Right to Equality",
//             exercises: [
//               { exerciseName: "Article 14-18 Analysis" },
//               { exerciseName: "Case Studies on Equality" },
//               { exerciseName: "Reservation Policies" }
//             ]
//           },
//           { 
//             topicName: "Right to Freedom",
//             exercises: [
//               { exerciseName: "Article 19-22 Study" },
//               { exerciseName: "Freedom of Speech Cases" }
//             ]
//           }
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
//           { 
//             topicName: "Content Planning",
//             exercises: [
//               { exerciseName: "Content Calendar Creation" },
//               { exerciseName: "Engagement Strategy Development" },
//               { exerciseName: "Audience Segmentation" }
//             ]
//           },
//           { 
//             topicName: "Content Creation",
//             exercises: [
//               { exerciseName: "Visual Content Design" },
//               { exerciseName: "Copywriting Techniques" }
//             ]
//           }
//         ],
//         status: false
//       }
//     };

//     return chapters[id] || null;
//   };

//   const chapterData = getChapterData(id);

//   const handleEdit = () => {
//     navigate(`/chaptersform/${id}`);
//   };

//   const handleBack = () => {
//     navigate('/chapters');
//   };

//   if (!chapterData) {
//     return (
//       <>
//         <PageHeader title="Chapter Not Found" backButton={true} />
//         <Card className="w-full mt-4">
//           <div className="text-center py-8">
//             <h3>Chapter not found</h3>
//             <Button onClick={handleBack}>Go Back</Button>
//           </div>
//         </Card>
//       </>
//     );
//   }

//   return (
//     <>
//       <PageHeader title="Chapter Details" backButton={true}>
//         <Button
//           type="primary"
//           style={{ backgroundColor: "#007575", color: "white" }}
//           className="font-local2"
//           onClick={handleEdit}
//         >
//           Edit Chapter
//         </Button>
//       </PageHeader>

//       <Card className="w-full mt-4 shadow-md">
//         <div className="p-4">
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Chapter Name:</span>
//               <span className="font-local2 text-xl text-gray-900 font-bold">
//                 {chapterData.chapterName}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Module:</span>
//               <span className="font-local2 text-lg text-orange-600">
//                 {chapterData.module}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Course:</span>
//               <span className="font-local2 text-lg text-blue-600">
//                 {chapterData.course}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Subject:</span>
//               <span className="font-local2 text-lg text-green-600">
//                 {chapterData.subject}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Textbook:</span>
//               <span className="font-local2 text-lg text-purple-600">
//                 {chapterData.textbook}
//               </span>
//             </div>

//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="font-semibold text-gray-700">Status:</span>
//               <Tag
//                 color={chapterData.status ? "green" : "red"}
//                 className={`font-local2 text-lg ${
//                   chapterData.status ? "bg-green-100" : "bg-red-100"
//                 }`}
//               >
//                 {chapterData.status ? "Active" : "Inactive"}
//               </Tag>
//             </div>

//             <Divider orientation="left">Topics</Divider>

//             <div className="space-y-3">
//               {chapterData.topics?.length > 0 ? (
//                 chapterData.topics.map((topic: any, topicIndex: number) => (
//                   <Card
//                     key={topicIndex}
//                     size="small"
//                     className="bg-blue-50"
//                   >
//                     <span className="font-local2 text-blue-600 font-semibold">
//                       {topicIndex + 1}. {topic.topicName}
//                     </span>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-gray-500 text-center py-4">
//                   No topics added yet
//                 </div>
//               )}
//             </div>

//             <Divider orientation="left">Exercises</Divider>

//             <div className="space-y-3">
//               {chapterData.exercises?.length > 0 ? (
//                 chapterData.exercises.map((exercise: any, exerciseIndex: number) => (
//                   <Card
//                     key={exerciseIndex}
//                     size="small"
//                     className="bg-green-50"
//                   >
//                     <span className="font-local2 text-green-600 font-semibold">
//                       {exerciseIndex + 1}. {exercise.exerciseName}
//                     </span>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-gray-500 text-center py-4">
//                   No exercises added yet
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Card>
//     </>
//   );
// };

// export default ViewChapter;
// @ts-nocheck
import React from "react";
import { Card, Divider, Button, Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/Components/common/PageHeader";

const ViewChapter = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get chapter data by ID - corrected structure to match form data
  const getChapterData = (id: string) => {
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
              { topicName: "Primitive Data Types" },
              { topicName: "Type Conversion" },
              { topicName: "Variable Scope" }
            ],
            exercises: [
              { exerciseName: "Integer Operations" },
              { exerciseName: "String Manipulation" },
              { exerciseName: "Boolean Logic" },
              { exerciseName: "Type Casting Practice" }
            ]
          }
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
              { topicName: "Character Analysis" },
              { topicName: "Themes and Motifs" },
              { topicName: "Plot Structure" }
            ],
            exercises: [
              { exerciseName: "Hamlet Character Study" },
              { exerciseName: "Supporting Characters Analysis" },
              { exerciseName: "Theme Analysis Essay" },
              { exerciseName: "Plot Summary Writing" }
            ]
          },
          {
            chapterName: "Variables and Data Types",
            topics: [
              { topicName: "Character Analysis" },
              { topicName: "Themes and Motifs" },
              { topicName: "Plot Structure" }
            ],
            exercises: [
              { exerciseName: "Hamlet Character Study" },
              { exerciseName: "Supporting Characters Analysis" },
              { exerciseName: "Theme Analysis Essay" },
              { exerciseName: "Plot Summary Writing" }
            ]
          }
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
              { topicName: "Balance Sheet Analysis" },
              { topicName: "Income Statement" },
              { topicName: "Cash Flow Statement" }
            ],
            exercises: [
              { exerciseName: "Balance Sheet Preparation" },
              { exerciseName: "Financial Ratio Analysis" },
              { exerciseName: "Income Statement Creation" },
              { exerciseName: "Cash Flow Calculation" }
            ]
          }
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
              { topicName: "Right to Equality" },
              { topicName: "Right to Freedom" },
              { topicName: "Right against Exploitation" }
            ],
            exercises: [
              { exerciseName: "Article 14-18 Analysis" },
              { exerciseName: "Case Studies on Equality" },
              { exerciseName: "Freedom of Speech Cases" },
              { exerciseName: "Constitutional Rights Quiz" }
            ]
          }
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
              { topicName: "Content Planning" },
              { topicName: "Content Creation" },
              { topicName: "Audience Engagement" }
            ],
            exercises: [
              { exerciseName: "Content Calendar Creation" },
              { exerciseName: "Engagement Strategy Development" },
              { exerciseName: "Visual Content Design" },
              { exerciseName: "Performance Analytics" }
            ]
          }
        ],
        status: false
      }
    };

    return chapters[id] || null;
  };

  const chapterData = getChapterData(id);

  const handleEdit = () => {
    navigate(`/chaptersform/${id}`);
  };

  const handleBack = () => {
    navigate('/chapters');
  };

  if (!chapterData) {
    return (
      <>
        <PageHeader title="Chapter Not Found" backButton={true} />
        <Card className="w-full mt-4">
          <div className="text-center py-8">
            <h3>Chapter not found</h3>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </Card>
      </>
    );
  }

  // Get the first chapter from the chapters array (since form structure has nested chapters)
  const firstChapter = chapterData.chapters && chapterData.chapters.length > 0 ? chapterData.chapters[0] : null;

  return (
    <>
      <PageHeader title="Chapter Details" backButton={true}>
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={handleEdit}
        >
          Edit Chapter
        </Button>
      </PageHeader>

      <Card className="w-full mt-4 shadow-md">
        <div className="p-4">
          <div className="space-y-4">
           
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Module:</span>
              <span className="font-local2 text-lg text-orange-600">
                {chapterData.module}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Course:</span>
              <span className="font-local2 text-lg text-blue-600">
                {chapterData.course}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Subject:</span>
              <span className="font-local2 text-lg text-green-600">
                {chapterData.subject}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Textbook:</span>
              <span className="font-local2 text-lg text-purple-600">
                {chapterData.textbook}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Status:</span>
              <Tag
                color={chapterData.status ? "green" : "red"}
                className={`font-local2 text-lg ${
                  chapterData.status ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {chapterData.status ? "Active" : "Inactive"}
              </Tag>
            </div>

            {/* Display dynamic chapters with their topics and exercises */}
            <Divider orientation="left">Chapters</Divider>
            
            {chapterData.chapters && chapterData.chapters.length > 0 ? (
              chapterData.chapters.map((chapter: any, chapterIndex: number) => (
                <Card
                  key={chapterIndex}
                  className="mb-4"
                  style={{ backgroundColor: '#f8f9fa' }}
                  title={
                    <span className="font-local2 text-lg font-bold">
                      Chapter {chapterIndex + 1}: {chapter.chapterName}
                    </span>
                  }
                >
                  {/* Topics Section */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-600 mb-2">Topics:</h4>
                    {chapter.topics && chapter.topics.length > 0 ? (
                      <div className="space-y-2">
                        {chapter.topics.map((topic: any, topicIndex: number) => (
                          <Card
                            key={topicIndex}
                            size="small"
                            className="bg-blue-50 ml-4"
                          >
                            <span className="font-local2 text-blue-600">
                              {topicIndex + 1}. {topic.topicName}
                            </span>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm ml-4">
                        No topics added yet
                      </div>
                    )}
                  </div>

                  {/* Exercises Section */}
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Exercises:</h4>
                    {chapter.exercises && chapter.exercises.length > 0 ? (
                      <div className="space-y-2">
                        {chapter.exercises.map((exercise: any, exerciseIndex: number) => (
                          <Card
                            key={exerciseIndex}
                            size="small"
                            className="bg-green-50 ml-4"
                          >
                            <span className="font-local2 text-green-600">
                              {exerciseIndex + 1}. {exercise.exerciseName}
                            </span>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm ml-4">
                        No exercises added yet
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No chapters added yet
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default ViewChapter;