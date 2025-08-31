// @ts-nocheck
import React, { useState } from 'react';
import { Button, Card, Input, Table, Typography} from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { message } from '@/Components/common/message/message';
const { Title, Text } = Typography;

const MergePapers = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [paperIds, setPaperIds] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      // Check if input contains only numbers
      if (!/^\d+$/.test(inputValue.trim())) {
        message.error('Please enter only numbers for Question Paper ID');
        return;
      }
      
      const newPaper = {
        key: Date.now(),
        sno: paperIds.length + 1,
        testpaperId: inputValue.trim(),
      };
      setPaperIds([...paperIds, newPaper]);
      setInputValue('');
    }
  };

  const handleDelete = (key) => {
    const filteredPapers = paperIds.filter(paper => paper.key !== key);
    // Renumber the remaining papers
    const renumberedPapers = filteredPapers.map((paper, index) => ({
      ...paper,
      sno: index + 1,
    }));
    setPaperIds(renumberedPapers);
  };

  const handleMergeAll = () => {
    message.success('Successfully merged!');
    setPaperIds([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sno',
      key: 'sno',
      width: 80,
      className: 'text-gray-700 font-medium',
    },
    {
      title: 'Testpaper ID',
      dataIndex: 'testpaperId',
      key: 'testpaperId',
      className: 'text-gray-700',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          className="hover:bg-red-50"
        />
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6  h-min">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          shape="square" 
          className="flex items-center justify-center"
          icon={<ArrowLeftOutlined />}
        />
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          Merge Testpapers
        </Title>
      </div>

      {/* Main Card */}
      <Card 
        title="Merge Question Papers"
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="w-full bg-white shadow-lg font-local2"
        bodyStyle={{ padding: '2rem' }}
      >
        {/* Instructions */}
        <div className="mb-6">
          <Text className="text-gray-600 text-base leading-relaxed font-local2 block mb-4">
            Kindly enter the Question Paper IDs you would like to merge into a single paper. The papers will be merged in the exact sequence in which the IDs are listed. Each paper will appear as a separate section in the final PDF—e.g., Paper ID X will become Section A, Paper ID Y will become Section B, and so on. If a paper already includes sections, they will be renumbered in sequential order.
          </Text>
          <Text className="text-red-600 font-semibold text-base font-local2">
            Important: The total number of questions in the merged paper must not exceed 200.
          </Text>
        </div>

        {/* Input Section */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Input
            placeholder="Enter Question Paper ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleKeyPress}
            className="font-local2"
            style={{ height: '40px', width: '300px' }}
          />
          <Button
            type="primary"
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 border-0 font-local2"
            style={{ height: '40px', minWidth: '80px' }}
          >
            Add
          </Button>
        </div>

        {/* Table Section - Only show when there are papers */}
        {paperIds.length > 0 && (
          <>
            <div className="mb-6">
              <Title level={5} className="text-gray-700 mb-4 font-local2">
                Added Question Paper IDs:
              </Title>
              <Table
                columns={columns}
                dataSource={paperIds}
                pagination={false}
                className="border border-gray-200 rounded-lg overflow-hidden"
                size="middle"
              />
            </div>

            {/* Merge All Button - Only show when there are 2 or more papers */}
            {paperIds.length >= 2 && (
              <div className="text-center">
                <Button
                  size="large"
                  onClick={handleMergeAll}
                  className="bg-green-600 border-green-600 text-white hover:!bg-green-600 hover:!text-white hover:!border-white font-local2 bg-opacity-80 hover:!bg-opacity-80"
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    minWidth: '150px'
                  }}
                >
                  Merge All
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default MergePapers;