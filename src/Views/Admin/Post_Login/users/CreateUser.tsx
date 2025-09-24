// @ts-nocheck
import React, { useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, Select, Space, InputNumber, message, Tag } from "antd";
import PageHeader from "../../../../Components/common/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const titleOptions = [
  { value: "Numbers Workbook", label: "Numbers Workbook" },
  { value: "Alphabets Fun", label: "Alphabets Fun" },
  { value: "My First GK", label: "My First GK" },
  { value: "Basics of Computing", label: "Basics of Computing" },
  { value: "Environment Around Us", label: "Environment Around Us" },
  { value: "Malayalam Reader", label: "Malayalam Reader" },
];

const getTitleColor = (title: string) => {
  switch (title) {
    case "Numbers Workbook":
      return "geekblue";
    case "Alphabets Fun":
      return "volcano";
    case "My First GK":
      return "green";
    case "Basics of Computing":
      return "purple";
    case "Environment Around Us":
      return "cyan";
    case "Malayalam Reader":
      return "magenta";
    default:
      return "default";
  }
};

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const record = (location as any)?.state?.record || null;

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        schoolName: record.schoolName,
        schoolCode: record.schoolCode,
        executive: record.executive,
        phone1: record.phone1,
        phone2: record.phone2,
        title: record.titles,
        principalName: record.principalName,
        examIncharge: record.examIncharge,
        email: record.email,
        address: record.address,
        username: record.username,
        password: record.password,
        confirmPassword: record.password,
        status: record.status,
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  const handleCancel = () => {
    navigate("/schools");
  };

  const handleFinish = (values: any) => {
    if (record) {
      console.log("Edit User submit:", { id: record.id, ...values });
      message.success("Record updated successfully!");
    } else {
      console.log("Create User submit:", values);
      message.success("User created successfully!");
    }
    navigate("/schools");
  };

  return (
    <>
      <PageHeader title={record ? "Edit School" : "Create School"} backButton={true} />

      <Card className="w-full mt-4 shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="font-local2"
          initialValues={record ? {
            schoolName: record.schoolName,
            schoolCode: record.schoolCode,
            executive: record.executive,
            phone1: record.phone1,
            phone2: record.phone2,
            title: record.titles,
            principalName: record.principalName,
            examIncharge: record.examIncharge,
            email: record.email,
            address: record.address,
            username: record.username,
            password: record.password,
            confirmPassword: record.password,
            status: record.status,
          } : {}}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="schoolName"
                label="School Name"
                rules={[{ required: true, message: "Please enter school name" }]}
              >
                <Input placeholder="Enter school name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="schoolCode"
                label="School Code"
                rules={[{ required: true, message: "Please enter school code" }]}
              >
                <Input placeholder="Enter school code" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="executive"
                label="Executive"
                rules={[{ required: true, message: "Please enter executive" }]}
              >
                <Input placeholder="Enter executive" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="phone1"
                label="Phone Number 1"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input placeholder="Enter phone number 1" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="phone2"
                label="Phone Number 2"
                rules={[]}
              >
                <Input placeholder="Enter phone number 2 (optional)" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please select title(s)" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Select title(s)"
                  options={titleOptions}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="principalName"
                label="Principal Name"
                rules={[{ required: true, message: "Please enter principal name" }]}
              >
                <Input placeholder="Enter principal name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="examIncharge"
                label="Examination Incharge"
                rules={[{ required: true, message: "Please enter examination incharge" }]}
              >
                <Input placeholder="Enter examination incharge" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                required={false}
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                required={false}
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <TextArea rows={3} placeholder="Enter address" />
              </Form.Item>
            </Col>
          </Row>

         

          {/* Status removed from form per requirement; status is managed via table actions. */}

          <Row justify="end" className="mt-6">
            <Space size="middle">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#007575", borderColor: "#007575" }}
              >
                {record ? 'Update' : 'Submit'}
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default CreateUser;


