// @ts-nocheck
import React from "react";
import { Button, Card, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Uploadss = () => {
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
          Upload
        </Title>
      </div>

      {/* Subscription Card */}
     
       <div className="w-full">
        <Card className="shadow-lg bg-white w-full">
          <div>
            <h4 className="font-local2 text-lg mb-2 text-gray-600 ">
              Files!
            </h4>
           
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Uploadss;
