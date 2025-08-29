
// @ts-nocheck
import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Radio,
  Upload,
  Row,
  Col,
  message,
} from "antd";
import { ArrowLeft } from "lucide-react";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import img from "../../../../../assets/institute1.jpeg";
import img1 from "../../../../../assets/institute2.jpeg";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function PdfOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [headerType, setHeaderType] = useState("logo"); // default
  const [fileList, setFileList] = useState<any[]>([]);
  const [editingRecord, setEditingRecord] = useState<any>(null);
const navigate = useNavigate();
  // Dummy data
  const headers = [
    {
      id: 1,
      institution: "Green Valley Institute",
      address: "123 Main Street, City",
      footer: "sadsfbg",
      settingName: "Setting 1",
      headerType: "logo",
      logo: img,
    },
    {
      id: 2,
      institution: "Sunrise Academy",
      address: "45 Market Road, Town",
      footer: "awsdfg",
      settingName: "Setting 2",
      headerType: "logo",
      logo: img1,
    },
  ];

  const openModal = (record?: any) => {
    setEditingRecord(record || null);
    const type = record?.headerType || "logo";
    setHeaderType(type);

    if (record?.logo) {
      setFileList([
        {
          uid: "1",
          name: "logo.png",
          status: "done",
          url: record.logo,
        },
      ]);
    } else {
      setFileList([]);
    }

    form.setFieldsValue({
      headerType: type,
      institution: record?.institution || "",
      address: record?.address || "",
      footer: record?.footer || "",
      settingName: record?.settingName || "",
    });

    setIsModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Saved values:", { ...values, logo: fileList });
      message.success("Edited successfully!");
      setIsModalOpen(false);
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <Button shape="square" className="flex items-center justify-center">
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          Existing Headers
        </Title>
      </div>

      {/* Cards */}
      {headers.map((item) => (
        <Card key={item.id} className="shadow-sm rounded-lg">
          <div className="flex items-start gap-3">
            <img
              src={item.logo}
              alt="dummy"
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-700">
                {item.institution}
              </div>
              <div className="text-sm text-gray-500">{item.address}</div>
              <div className="text-sm text-gray-500 mt-1">
                Footer: {item.footer}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-3">
            <Button
              icon={<EditOutlined />}
              className="bg-white border-blue-500 text-blue-500 hover:!bg-blue-500 hover:!text-white font-local2"
              onClick={() => openModal(item)}
            >
              Edit
            </Button>
          </div>
        </Card>
      ))}

      {/* Bottom Buttons */}
      <div className="flex justify-center gap-3 pt-4">
        <Button type="primary" 
        style={{ backgroundColor: "#007575", borderColor: "#007575" }}
        onClick={() => openModal()}>
          Add New Header
        </Button>
       
      </div>

      {/* Edit/Add Modal */}
      <Modal
        title="Edit Header"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false} // hide red *
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item label="Header Type" name="headerType">
                <Radio.Group
                  onChange={(e) => setHeaderType(e.target.value)}
                  value={headerType}
                >
                  <Radio value="text">Only Text</Radio>
                  <Radio value="logo">Text + Square Logo</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {headerType === "logo" && (
              <Col xs={24} md={24}>
                <Form.Item label="Upload Logo" name="logo">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    maxCount={1}
                    showUploadList={{
                      showRemoveIcon: false,
                      showPreviewIcon: false,
                    }}
                  >
                    {fileList.length === 0 && (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            )}

            <Col xs={24} md={12}>
              <Form.Item
                label="Institution Name"
                name="institution"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Footer" name="footer">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Setting Name"
                name="settingName"
                rules={[{ required: true, message: "Please enter setting name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              style={{ backgroundColor: "#007575", color: "white" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
