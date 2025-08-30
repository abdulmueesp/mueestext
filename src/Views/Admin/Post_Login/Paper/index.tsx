
// @ts-nocheck
import { useState } from 'react';
import { Steps, Button, message } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';

const { Step } = Steps;

interface Step1DataType {
  module: string;
  course: string;
  subject: string;
  classSubjectValue: string;
  paperType: string;
  paperFormat: string;
  pdfHeader: string;
  pdfFooter: string;
  testPaperName: string;
  timeAllowed: string;
  generalInstructions: string;
}

const Paper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sections, setSections] = useState<any[]>([
    { id: 1, name: 'Section A', questions: [] }
  ]);

  const [step1Data, setStep1Data] = useState<Step1DataType>({
    module: '',
    course: '',
    subject: '',
    classSubjectValue: '',
    paperType: 'question-paper',
    paperFormat: 'pdf',
    pdfHeader: '',
    pdfFooter: '',
    testPaperName: '',
    timeAllowed: '',
    generalInstructions: ''
  });

  const validateStep1 = () => {
    const requiredFields = [
      { field: 'module', message: 'Please select Module' },
      { field: 'course', message: 'Please select Course' },
      { field: 'subject', message: 'Please select Subject' },
      { field: 'classSubjectValue', message: 'Please select Class & Subject' },
      { field: 'testPaperName', message: 'Please enter Test Paper Name' },
      { field: 'timeAllowed', message: 'Please enter Time Allowed' }
    ];

    for (let item of requiredFields) {
      if (!step1Data[item.field as keyof Step1DataType]) {
        message.error(item.message);
        return false;
      }
    }
    return true;
  };

  const steps = [
    { title: 'Create a new test', description: 'Set up basic test information' },
    { title: 'Add questions', description: 'Add questions to your test' },
    { title: 'Preview and generate', description: 'Review and generate PDF' }
  ];

  const nextStep = () => {
    if (currentStep === 0 && !validateStep1()) {
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Step1 step1Data={step1Data} setStep1Data={setStep1Data} />;
      case 1:
        return <Step2 sections={sections} setSections={setSections} />;
      case 2:
        return <Step3 step1Data={step1Data} 
          sections={sections} 
          onPrevStep={() => setCurrentStep(1)} />;
      default:
        return <Step1 step1Data={step1Data} setStep1Data={setStep1Data} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="shadow-sm  border-gray-200 py-3 px-1 md:p-7">
        <div>
          {/* Ant Design Steps */}
          <Steps current={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step 
                key={index}
                title={step.title}
                description={step.description}
                icon={index < currentStep ? <CheckOutlined /> : undefined}
              />
            ))}
          </Steps>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              // icon={<LeftOutlined />}
              className="flex items-center"
            >
              Previous
            </Button>

            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>

            <Button
              onClick={nextStep}
              type="primary"
              disabled={currentStep === steps.length - 1}
              style={{ backgroundColor: '#007575', borderColor: '#007575' }}
              // icon={currentStep === steps.length - 1 ? <FileTextOutlined /> : <RightOutlined />}
              className="flex items-center"
            >
              {currentStep === steps.length - 1 ? 'Generate PDF' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paper;