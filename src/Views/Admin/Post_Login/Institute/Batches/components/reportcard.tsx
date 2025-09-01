
// @ts-nocheck
import React, { useState } from "react";
import { Button, Card, Typography, DatePicker, Space } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ReportCard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState(null);

  const handleDateChange = (dates) => {
    setDateRange(dates);
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
        Report Card
        </Title>
      </div>

      {/* Subscription Card */}
      <div className="w-full mb-5">
        <Card 
        title="Batch : Englis Batch 2025"
       headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="shadow-lg bg-white w-full font-local2">
          <div className="p-4">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Text className="font-local2 text-gray-600 mb-2 block">Filter by Date</Text>
                <RangePicker
                  onChange={handleDateChange}
                  value={dateRange}
                  className="sm:w-[300px]"
                  placeholder={['Start Date', 'End Date']}
                  format="YYYY-MM-DD"
                />
              </div>
              
            </Space>
          </div>
        </Card>
      </div>
       <div className="w-full">
        <Card className="shadow-lg bg-white w-full">
          <div>
            <h4 className="font-local2 text-lg mb-2 text-gray-600 ">
            No testpapers available in this date range.
            </h4>
           
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportCard;
