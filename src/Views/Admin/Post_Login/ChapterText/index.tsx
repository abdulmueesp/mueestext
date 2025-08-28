// @ts-nocheck
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../Components/common/PageHeader";
import ChaptersTable from "./components/datatable";
import { message } from "@/Components/common/message/message";
import { Select } from "antd";
import { Input } from "antd";
import { IoIosSearch } from "react-icons/io";

const ChaptersT = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Show Create Form
  const showCreateForm = () => {
    navigate("/chaptersform/new");
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    navigate(`/chaptersform/${record.id}`);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Chapter ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    navigate(`/chaptersview/${record.id}`);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Add search logic here
  };

  return (
    <>
      <PageHeader title="Chapters" backButton={true}>
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
         <Select
          placeholder="Filter by Subject"
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
          placeholder="Search by Textbook"
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
          Create Chapter
        </Button>
      </PageHeader>

      <ChaptersTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </>
  );
};

export default ChaptersT;