
// @ts-nocheck
import React, { useState } from "react";
import { Button, Card, Typography, Modal, Checkbox, Space } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const MyQuestions = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Sample topics data
  const topics = [
    "CBSE",
    "ICSE", 
    "State Boards",
    "JEE Main",
    "NEET",
    "CAT",
    "GATE",
    "UPSC",
    "Banking",
    "SSC",
    "Railway",
    "Teaching",
    "Engineering",
    "Medical",
    "Law"
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedTopics([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTopics([]);
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    }
  };

  return (
    <div className="p-6 h-min">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          shape="square"
          className="flex items-center justify-center"
        >
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
        My Questions
        </Title>
      </div>

      <div className="w-full mb-5">
        <Card className="shadow-sm bg-white w-full">
        <Button 
            className="bg-white border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white hover:!border-white font-local2 hover:!bg-opacity-80"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px",
            }}
           onClick={showModal}
          >
            Filters
          </Button>
        </Card>
      </div>
     
       <div className="w-full">
        <Card className="shadow-lg bg-white w-full">
          <div>
            <h4 className="font-local2 text-lg mb-4  text-gray-600 ">
            Please Buy Subscription to Create New Question.
            </h4>
            <Button 
            className="bg-white border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white font-local2 hover:!bg-opacity-80"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px",
            }}
           onClick={() => navigate("/subscriptions")}
          >
            Buy Subscription
          </Button>
          </div>
        </Card>
      </div>

      {/* Search Questions Modal */}
      <Modal
        title={
          <div className="text-center">
            <Title level={4} className="!mb-0 text-gray-700 font-local2">
              Search Questions by Topic
            </Title>
          </div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="apply" 
            type="primary"
            className="bg-blue-600 border-blue-600 hover:!bg-blue-700 hover:!border-blue-700 font-local2"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "100px",
            }}
            onClick={handleOk}
          >
            Apply
          </Button>
        ]}
        width="90%"
        style={{ top: 20 }}
        className="max-w-2xl mx-auto"
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "24px"
        }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map((topic) => (
              <div 
                key={topic}
                className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
              >
                <Checkbox
                  checked={selectedTopics.includes(topic)}
                  onChange={(e) => handleTopicChange(topic, e.target.checked)}
                  className="font-local2 text-gray-700"
                >
                  {topic}
                </Checkbox>
              </div>
            ))}
          </div>
          
          {selectedTopics.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Text className="font-local2 text-blue-700">
                Selected Topics: {selectedTopics.join(", ")}
              </Text>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyQuestions;
