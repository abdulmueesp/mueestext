
// @ts-nocheck
import { useState } from "react";
import { Button, Modal, Card, Divider,message } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../Components/common/PageHeader";
import SubjectDatatable from "./components/datatable";

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
    setViewRecord(record);
    setIsViewOpen(true);
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
          Create
        </Button>
      </PageHeader>

      <SubjectDatatable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* View Modal */}
      <Modal
        title="Chapter Details"
        open={isViewOpen}
        footer={null}
        onCancel={() => setIsViewOpen(false)}
        centered
        width={800}
        className="subject-view-modal"
        style={{ maxHeight: "80vh" }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto", padding: 16 }}
        destroyOnClose
        afterOpenChange={(open) => {
          if (open) {
            const body = document.querySelector('.subject-view-modal .ant-modal-body') as HTMLElement | null;
            if (body) body.scrollTo({ top: 0 });
          }
        }}
      >
        {viewRecord && (
          <div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Title:</span>
                <span className="font-local2 text-lg text-gray-900">{viewRecord.title}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Subject:</span>
                <span className="font-local2 text-lg text-blue-600">{viewRecord.subject}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Class:</span>
                <span className="font-local2 text-lg text-purple-600">{viewRecord.class}</span>
              </div>

              <Divider orientation="left">Chapters</Divider>

              <div className="space-y-4">
                {viewRecord.chapters?.length > 0 ? (
                  viewRecord.chapters.map((chapter: any, idx: number) => (
                    <Card
                      key={idx}
                      size="small"
                      title={
                        <h3 className="font-local2 text-purple-600 font-semibold">
                          {idx + 1}. {typeof chapter === 'string' ? chapter : chapter?.chapterName}
                        </h3>
                      }
                      className="bg-blue-50"
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No chapters added yet</div>
                )}
              </div>

              {/* Removed textbooks section as requested */}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Subjects;