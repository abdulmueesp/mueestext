// @ts-nocheck
import React from "react";
import { Button, Card, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const UserPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 h-min">
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
          User Plan
        </Title>
      </div>

      {/* Subscription Card */}
      <div className="w-full">
        <Card
          className="shadow-lg bg-white w-full"
          bodyStyle={{ padding: "2rem" }}
        >
          <div className="mb-6">
            <Title level={3} className="!mb-2 text-gray-600 font-local2">
              No Subscription Purchased!
            </Title>
          </div>

          <Button className="bg-white border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white font-local2"
           onClick={() => navigate("/subscriptions")}
          >
            Buy Subscription
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default UserPlan;
