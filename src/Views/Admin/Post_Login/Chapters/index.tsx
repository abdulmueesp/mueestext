// // @ts-nocheck
// import { useState } from "react";
// import { Button, Modal, Card, Divider } from "antd";
// import { useNavigate } from "react-router-dom";
// import PageHeader from "../../../../Components/common/PageHeader";
// import SubjectDatatable from "./components/datatable";
// import { message } from "@/Components/common/message/message";
// import { Select } from "antd";
// import { Input } from "antd";
// import { IoIosSearch } from "react-icons/io";

// const Subjects = () => {
//   const [isViewOpen, setIsViewOpen] = useState(false);
//   const [viewRecord, setViewRecord] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const navigate = useNavigate();

//   // Show Create Form
//   const showCreateForm = () => {
//     navigate("/subjectForm/new");
//   };

//   // Handle Edit Click
//   const handleEdit = (record: any) => {
//     navigate(`/subjectForm/${record.id}`);
//   };

//   // Handle Delete Confirm
//   const handleDelete = (id: number) => {
//     message.success(`Subject ${id} deleted successfully!`);
//   };

//   // Handle View Click
//   const handleView = (record: any) => {
//     setViewRecord(record);
//     setIsViewOpen(true);
//   };
//   const handleSearch = (value: string) => {
//     setSearchValue(value);
//     // Add search logic here
//   };

//   // If form is shown, display form instead of table
//   return (
//     <>
//       <PageHeader title="Subjects" backButton={true}>
//         <Select
//           placeholder="Filter by Module"
//           allowClear
//           style={{ width: 180, marginRight: 8 }}
//           onChange={(value) => console.log("Selected Module:", value)} // Replace with filter logic
//           className="font-local2"
//           options={[
//             { value: "Mathematics", label: "Mathematics" },
//             { value: "Computer Science", label: "Computer Science" },
//             { value: "English Literature", label: "English Literature" },
//             { value: "Banking & Finance", label: "Banking & Finance" },
//             { value: "UPSC Preparation", label: "UPSC Preparation" },
//             { value: "Digital Marketing", label: "Digital Marketing" },
//           ]}
//         />
//         <Select
//           placeholder="Filter by Course"
//           allowClear
//           style={{ width: 180, marginRight: 8 }}
//           onChange={(value) => console.log("Selected Module:", value)} // Replace with filter logic
//           className="font-local2"
//           options={[
//             { value: "Advanced Algebra", label: "Advanced Algebra" },
//             { value: "Python Programming", label: "Python Programming" },
//             { value: "Shakespeare Studies", label: "Shakespeare Studies" },
//             { value: "Financial Accounting", label: "Financial Accounting" },
//             { value: "Indian Polity", label: "Indian Polity" },
//             {
//               value: "Social Media Marketing",
//               label: "Social Media Marketing",
//             },
//           ]}
//         />
//         <Input
//           placeholder="Search by name"
//           prefix={<IoIosSearch className="text-gray-400" />}
//           value={searchValue}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none focus:shadow-none w-56"
//           style={{
//             backgroundColor: "#f9fafb",
//             color: "#374151",
//             border: "1px solid #d1d5db",
//           }}
//         />
//         <Button
//           type="primary"
//           style={{ backgroundColor: "#007575", color: "white" }}
//           className="font-local2"
//           onClick={showCreateForm}
//         >
//           Create Subject
//         </Button>
//       </PageHeader>

//       <SubjectDatatable
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onView={handleView}
//       />

//       {/* View Modal */}
//       <Modal
//         title="Subject Details"
//         open={isViewOpen}
//         footer={null}
//         onCancel={() => setIsViewOpen(false)}
//         centered
//         width={800}
//         className="subject-view-modal"
//         style={{ maxHeight: "80vh" }}
//         bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
//       >
//         {viewRecord && (
//           <div className="p-4">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-semibold text-gray-700">
//                   Subject Name:
//                 </span>
//                 <span className="font-local2 text-lg text-gray-900">
//                   {viewRecord.subjectName}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-semibold text-gray-700">Course:</span>
//                 <span className="font-local2 text-lg text-blue-600">
//                   {viewRecord.course}
//                 </span>
//               </div>

//               <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
//                 <span className="font-semibold text-gray-700">
//                   Description:
//                 </span>
//                 <span className="font-local2 text-lg text-gray-900 max-w-md text-right">
//                   {viewRecord.description}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-semibold text-gray-700">Type:</span>
//                 <span
//                   className={`font-local2 text-lg ${
//                     viewRecord.visibility === "Public"
//                       ? "text-green-600"
//                       : "text-orange-600"
//                   }`}
//                 >
//                   {viewRecord.visibility}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="font-semibold text-gray-700">Status:</span>
//                 <span
//                   className={`font-local2 text-lg ${
//                     viewRecord.status === "Active"
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {viewRecord.status}
//                 </span>
//               </div>

//               <Divider orientation="left">Text books</Divider>

//               <div className="space-y-4">
//                 {viewRecord.textbooks?.map((book: any, bookIndex: number) => (
//                   <Card
//                     key={bookIndex}
//                     size="small"
//                     title={
//                       <h3 className="font-local2 text-purple-600 font-semibold">
//                         {bookIndex + 1}: {book.textbookName}
//                       </h3>
//                     }
//                     className="bg-blue-50"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default Subjects;
// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../Components/common/PageHeader";
import SubjectDatatable from "./components/datatable";
import { message } from "@/Components/common/message/message";
import { Select } from "antd";
import { Input } from "antd";
import { IoIosSearch } from "react-icons/io";

const Subjects = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Show Create Form
  const showCreateForm = () => {
    navigate("/subjectForm/new");
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    navigate(`/subjectForm/${record.id}`);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Subject ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    setViewRecord(record);
    setIsViewOpen(true);
  };

  // Handle Status Change
  const handleStatusChange = (id: number, status: boolean) => {
    const statusText = status ? "activated" : "deactivated";
    message.success(`Subject ${id} ${statusText} successfully!`);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Add search logic here
  };

  return (
    <>
      <PageHeader title="Subjects" backButton={true}>
        <Select
          placeholder="Filter by Module"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => console.log("Selected Module:", value)}
          className="font-local2"
          options={[
            { value: "Mathematics", label: "Mathematics" },
            { value: "Computer Science", label: "Computer Science" },
            { value: "English Literature", label: "English Literature" },
            { value: "Banking & Finance", label: "Banking & Finance" },
            { value: "UPSC Preparation", label: "UPSC Preparation" },
            { value: "Digital Marketing", label: "Digital Marketing" },
          ]}
        />
        <Select
          placeholder="Filter by Course"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => console.log("Selected Course:", value)}
          className="font-local2"
          options={[
            { value: "Advanced Algebra", label: "Advanced Algebra" },
            { value: "Python Programming", label: "Python Programming" },
            { value: "Shakespeare Studies", label: "Shakespeare Studies" },
            { value: "Financial Accounting", label: "Financial Accounting" },
            { value: "Indian Polity", label: "Indian Polity" },
            { value: "Social Media Marketing", label: "Social Media Marketing" },
          ]}
        />
        <Input
          placeholder="Search by name"
          prefix={<IoIosSearch className="text-gray-400" />}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none focus:shadow-none w-56"
          style={{
            backgroundColor: "#f9fafb",
            color: "#374151",
            border: "1px solid #d1d5db",
          }}
        />
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showCreateForm}
        >
          Create Subject
        </Button>
      </PageHeader>

      <SubjectDatatable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onStatusChange={handleStatusChange}
      />

      {/* View Modal */}
      <Modal
        title="Subject Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
        width={800}
        className="subject-view-modal"
        style={{ maxHeight: "80vh" }}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {viewRecord && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">
                  Subject Name:
                </span>
                <span className="font-local2 text-lg text-gray-900">
                  {viewRecord.subjectName}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Module:</span>
                <span className="font-local2 text-lg text-purple-600">
                  {viewRecord.module}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Course:</span>
                <span className="font-local2 text-lg text-blue-600">
                  {viewRecord.course}
                </span>
              </div>

              <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">
                  Description:
                </span>
                <span className="font-local2 text-lg text-gray-900 max-w-md text-right">
                  {viewRecord.description}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Type:</span>
                <span
                  className={`font-local2 text-lg ${
                    viewRecord.type === "Public"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {viewRecord.type}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Status:</span>
                <span
                  className={`font-local2 text-lg ${
                    viewRecord.status === true
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {viewRecord.status ? "Active" : "Inactive"}
                </span>
              </div>

              <Divider orientation="left">Textbooks</Divider>

              <div className="space-y-4">
                {viewRecord.textbooks?.length > 0 ? (
                  viewRecord.textbooks.map((book: any, bookIndex: number) => (
                    <Card
                      key={bookIndex}
                      size="small"
                      title={
                        <h3 className="font-local2 text-purple-600 font-semibold">
                          {bookIndex + 1}. {book.textbookName}
                        </h3>
                      }
                      className="bg-blue-50"
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No textbooks added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Subjects;