// @ts-nocheck
import React from "react";
import { Button, Card, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const DynamicBlue = () => {
  const navigate = useNavigate();

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
          Dynamic Blueprint
        </Title>
      </div>

      {/* Subscription Card */}
      <div className="w-full mb-5">
        <Card 
        title="Create New Dynamic Blueprint"
       headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="shadow-lg bg-white w-full font-local2">
          
            <Button className=" text-white bg-green-600 border-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white transition-all duration-200 font-local2">
              Create
            </Button>
          
        </Card>
      </div>
       <div className="w-full">
        <Card className="shadow-lg bg-white w-full">
          <div>
            <h4 className="font-local2 text-lg mb-2 text-gray-600 ">
              No custom template!
            </h4>
           
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DynamicBlue;
