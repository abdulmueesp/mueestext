// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setProfileCompleted } from '@/store/slices/userSlice';
// import { RootState } from '@/store';
// import { message } from '@/Components/common/message/message';

// const Profile = () => {
//     const [name, setName] = useState('');
//     const [errors, setErrors] = useState<{ name?: string }>({});
//     const dispatch = useDispatch();
//     const { phoneNumber, role } = useSelector((state: RootState) => state.user);

//     const lightPrimaryColor = '#f8f9fa';

//     const validateName = (nameValue: string) => {
//         if (!nameValue.trim()) {
//             return 'Please enter your name!';
//         }
//         if (nameValue.trim().length < 2) {
//             return 'Name must be at least 2 characters long!';
//         }
//         return '';
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const nameError = validateName(name);

//         if (nameError) {
//             setErrors({ name: nameError });
//             return;
//         }

//         setErrors({});
//         dispatch(setProfileCompleted(true));
//         message.success(`Welcome ${name}! Profile completed successfully.`);
//     };

//     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setName(value);

//         // Clear error when user starts typing
//         if (errors.name) {
//             setErrors({ ...errors, name: '' });
//         }
//     };

//     return (
//         <div
//             className="pb-4 pl-4 pr-4 pt-7"
//             style={{
//                 backgroundColor: lightPrimaryColor,
//                 minHeight: '100dvh',
//                 boxSizing: 'border-box',
//                 overflowX: 'hidden'
//             }}
//         >
//             <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl">
//                 {/* Header */}
//                 <div className="text-center mb-4">
//                     <h1 className="text-2xl font-semibold mb-2 font-local2">
//                         Complete Profile
//                     </h1>
//                     <p className="text-sm text-gray-600 font-local2">
//                         Welcome! Please complete your profile to continue.
//                     </p>
//                     <p className="text-xs text-gray-500 font-local2 mt-1">
//                         Role: {role?.toUpperCase()} | Phone: +91 {phoneNumber}
//                     </p>
//                 </div>

//                 {/* Regular Form */}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Name Input */}
//                     <div>
//                         <label
//                             className="block text-sm font-medium mb-2 font-local2"
//                             style={{
//                                 color: '#666666',
//                             }}
//                         >
//                             Full Name:
//                         </label>
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={handleNameChange}
//                             placeholder="Enter your full name"
//                             className={`w-full px-3 py-2 border border-gray-300 font-local2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.name ? 'border-red-500' : ''}`}
//                             style={{
//                                 height: '44px',
//                             }}
//                         />
//                         {errors.name && (
//                             <p className="text-red-500 text-xs mt-1 font-local2">
//                                 {errors.name}
//                             </p>
//                         )}
//                     </div>

//                     {/* Submit Button */}
//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full h-11 rounded-md bg-gradient-to-br from-[#007575] to-[#339999] font-medium font-local2 text-white border-none shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
//                         >
//                             Complete Profile
//                         </button>
//                     </div>

//                     <div className='w-[10px] py-[1px]'></div>

//                     {/* Add margin top to the HR and adjust footer spacing */}
//                     <div className="mt-6">
//                         <hr className="flex-1 border-gray-300 mt-[25px]" />
//                         {/* Footer Text */}
//                         <div
//                             className="text-sm leading-relaxed px-2 font-local2 mt-4"
//                             style={{
//                                 color: '#666666',
//                             }}
//                         >
//                             You can use these account details to log in on both myWeb and Examin. Any changes to these details will impact both the Sites.
//                             <br />
//                             By continuing, you acknowledge that you are 18 years and above, and you accept our{' '}
//                             <a
//                                 href="#"
//                                 className="text-blue-500 hover:text-blue-600 no-underline font-local2"
//                             >
//                                 Terms of service
//                             </a>
//                             ,{' '}
//                             <a
//                                 href="#"
//                                 className="text-blue-500 hover:text-blue-600 no-underline font-local2"
//                             >
//                                 Privacy policy
//                             </a>
//                             .
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
// export default Profile
// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { setProfileCompleted, setUserData } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import { message } from "@/Components/common/message/message";
import { Form, Input, Button, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();
  const { phoneNumber, role } = useSelector((state: RootState) => state.user);

  const lightPrimaryColor = "#f8f9fa";

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("✅ Profile Form Values:", values);
    const { name, email, type } = values;

    // 📌 Dispatch the full object
    dispatch(
      setUserData({
        name,
        email,
        type,
        PhoneNumber:phoneNumber, // phone comes from redux (not editable)
      })
    );

    // you can also persist email/type here if you add them to Redux
    dispatch(setProfileCompleted(true));

    message.success(`Welcome ${values.name}! Profile completed successfully.`);
  };

  return (
    <div
      className="pb-4 pl-4 pr-4 pt-7"
      style={{
        backgroundColor: lightPrimaryColor,
        minHeight: "100dvh",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold mb-2 font-local2">
            Complete Profile
          </h1>
          <p className="text-sm text-gray-600 font-local2">
            Welcome! Please complete your profile to continue.
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-3"
          requiredMark={false}
          initialValues={{
            phone: phoneNumber, // 👈 preload phone into form
          }}
        >
          {/* Type Selector */}
          <Form.Item
            label={<span className="font-local2">Type</span>}
            name="type"
            rules={[{ required: true, message: "Please select a type!" }]}
          >
            <Select
              placeholder="Select type"
              size="large"
              className="font-local2"
            >
              <Option value="student">Student</Option>
              <Option value="parent">Parent</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-local2">Full Name</span>}
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 2, message: "Name must be at least 2 characters long!" },
            ]}
          >
            <Input
              placeholder="Enter your full name"
              size="large"
              className="font-local2"
            />
          </Form.Item>

          {/* Email */}

          <Form.Item
            label={<span className="font-local2">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              size="large"
              className="font-local2"
            />
          </Form.Item>

          {/* Phone (readonly, from Redux) */}
          <Form.Item
            label={<span className="font-local2">Phone Number</span>}
            name="phone"
          >
            <Input
              readOnly
              size="large"
              className="font-local2 bg-gray-100"
              addonBefore={<span className="px-1 text-gray-500">+91</span>}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="
    w-full h-11 rounded-md mt-2
    bg-gradient-to-br from-[#007575] to-[#339999] 
    font-medium font-local2 text-white border-none shadow-md
    hover:from-[#007575] hover:to-[#339999] hover:text-white
    !bg-gradient-to-br !from-[#007575] !to-[#339999]
  "
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="mt-6">
          <hr className="flex-1 border-gray-300 mt-[25px]" />
          <div
            className="text-sm leading-relaxed px-2 font-local2 mt-4"
            style={{ color: "#666666" }}
          >
            You can use these account details to log in on both myWeb and
            Examin. Any changes to these details will impact both the Sites.
            <br />
            By continuing, you acknowledge that you are 18 years and above, and
            you accept our{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 no-underline font-local2"
            >
              Terms of service
            </a>
            ,{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 no-underline font-local2"
            >
              Privacy policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
