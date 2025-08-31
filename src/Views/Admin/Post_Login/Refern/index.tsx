
// @ts-nocheck
import React, { useState } from 'react';
import { Button, Card, Typography, message } from 'antd';
import { ArrowLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const Refer = () => {
     const userData = useSelector((state: RootState) => state.user.userData);
  const navigate = useNavigate();
  const [referralCode] = useState('8SQ968'); // You can make this dynamic

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      message.success('Referral Code copied!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      message.success('Referral Code copied!');
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Hey there! 👋
I've been using MyExam Test Generator, and it has truly transformed the way I create:
✅ Question Papers
✅ Online Tests
✅ Worksheets and Assignments 
Since it has been a game-changer for me, I'd love for you to experience it too! 🎁 Use my exclusive code: ${referralCode} at https://mueestext-lhld-git-main-muees-projects-14c95d13.vercel.app/ to get 10% off on any Test Generator package.
Give it a shot, and if you find it as valuable as I do, feel free to share this with others who might benefit! 🚀
Happy teaching & testing!
${userData?.name || 'User'}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-4 md:p-6 h-min font-local2">
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
          Refer & Earn
        </Title>
      </div>

      {/* Referral Card */}
      <Card className="w-full bg-white shadow-lg" bodyStyle={{ padding: '1.5rem' }}>
        {/* Header */}
        <Title level={3} className="!mb-6 text-blue-500 font-medium font-local2">
          MyExam Referral Program
        </Title>

        {/* Referral Code Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Text className="text-gray-600 text-base font-medium whitespace-nowrap font-local2">
              Referral Code: {referralCode}
            </Text>
            <div className="flex gap-2">
              <Button 
                onClick={handleCopy}
                className="bg-white border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white transition-all duration-200 font-local2"
                icon={<Copy size={16} />}
              >
                Copy
              </Button>
              <Button 
                onClick={handleWhatsAppShare}
                className="bg-white border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white transition-all duration-200 font-local2"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          <Text className="text-gray-600 text-base leading-relaxed font-local2">
            <span className="font-medium font-local2">Share</span> the referral code above. You will{' '}
            <span className="text-green-600 font-semibold font-local2">Earn 10% Papers</span> in your Test Generator subscription and buyers will get{' '}
            <span className="text-red-500 font-semibold font-local2">10% OFF</span> while using your{' '}
            <span className="font-medium font-local2">code</span>.
          </Text>
        </div>

        {/* Benefits List */}
        <div className="space-y-4">
          <div>
            <Text className="text-gray-700 font-medium text-base">
              1. <span className="font-semibold font-local2">Test Generator:</span>
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed ml-4 block mt-1 font-local2">
              Whenever any test generator is purchased using your coupon code, you will get 10% of question papers into your account. This means, if someone purchases 100 Question Papers using your coupon code, we will credit 10 papers into your account that will be valid till your current package's expiry date.
            </Text>
          </div>

          <div>
            <Text className="text-gray-700 font-medium text-base">
              2. <span className="font-semibold font-local2">Student Subscription:</span>
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed ml-4 block mt-1 font-local2">
              If your students purchase any subscription in the MyExam App or website using your coupon code, you will get{' '}
              <span className="font-semibold font-local2">One Paper</span> against each subject purchased. This means if 100 students use your code to buy 3 subjects each, we will credit 300 papers into your account that will be valid till your current package's expiry date.
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Refer;