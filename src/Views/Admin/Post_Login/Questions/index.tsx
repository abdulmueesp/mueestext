
// @ts-nocheck
import { useState } from "react";
import { Button, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../Components/common/PageHeader";
import Datatable from "./components/datatable";
import { message } from "@/Components/common/message/message";
import { IoIosSearch } from "react-icons/io";

const Questions = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Show Create Form
  const showCreateForm = () => {
    navigate("/questionform/new");
  };

  // Handle Edit Click
  const handleEdit = (record: any) => {
    navigate(`/questionform/${record.id}`);
  };

  // Handle Delete Confirm
  const handleDelete = (id: number) => {
    message.success(`Question set ${id} deleted successfully!`);
  };

  // Handle View Click
  const handleView = (record: any) => {
    navigate(`/Viewquestion/${record.id}`);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Add search logic here
  };

  return (
    <>
      <PageHeader title="Questions" backButton={true}>
      <Select
          placeholder="Filter by Class"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => console.log("Selected Class:", value)}
          className="font-local2"
          options={[
            { value: "0", label: "0" },
            { value: "LKG", label: "LKG" },
            { value: "UKG", label: "UKG" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
          ]}
        />
        <Select
          placeholder="Filter by Subject"
          allowClear
          style={{ width: 180, marginRight: 8 }}
          onChange={(value) => console.log("Selected Subject:", value)}
          className="font-local2"
          options={[
            { value: "Malayalam", label: "Malayalam" },
            { value: "English", label: "English" },
            { value: "Maths", label: "Maths" },
            { value: "GK", label: "GK" },
            { value: "Computer", label: "Computer" },
            { value: "EVS", label: "EVS" },
            { value: "Social Science", label: "Social Science" },
            { value: "Science", label: "Science" },
          ]}
        />
        <Select
          placeholder="Filter by Title"
          allowClear
          style={{ width: 200, marginRight: 8 }}
          onChange={(value) => console.log("Selected Title:", value)}
          className="font-local2"
          options={[
            { value: "Algebra Basics", label: "Algebra Basics" },
            { value: "Mechanics", label: "Mechanics" },
            { value: "Organic Chemistry", label: "Organic Chemistry" },
            { value: "Human Anatomy", label: "Human Anatomy" },
            { value: "Data Structures", label: "Data Structures" },
          ]}
        />
        <Select
          placeholder="Filter by Chapter"
          allowClear
          style={{ width: 200, marginRight: 8 }}
          onChange={(value) => console.log("Selected Chapter:", value)}
          className="font-local2"
          options={[
            { value: "Chapter 1", label: "Chapter 1" },
            { value: "Chapter 2", label: "Chapter 2" },
            { value: "Chapter 3", label: "Chapter 3" },
            { value: "Chapter 4", label: "Chapter 4" },
          ]}
        />
       
        
        <Button
          type="primary"
          style={{ backgroundColor: "#007575", color: "white" }}
          className="font-local2"
          onClick={showCreateForm}
        >
          Create Questions
        </Button>
      </PageHeader>

      <Datatable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </>
  );
};

export default Questions;