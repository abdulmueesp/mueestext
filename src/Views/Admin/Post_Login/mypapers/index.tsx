
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Modal, Input, Dropdown, message, Select } from "antd";
import { Search, Eye, Download, ArrowLeft, Printer, User, MoreVertical, FileText, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import img1 from "../../../../assets/matching.png"
import img2 from "../../../../assets/match2.jpeg"
import paperDummy from "../../../../assets/paperdummy.webp"
import { API, GET } from "../../../../Components/common/api";
const { Title, Text } = Typography;

// Class options (same as Books module)
const CLASS_OPTIONS = [
  "0",
  "LKG", 
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8"
];

const classOptions = CLASS_OPTIONS.map(cls => ({ value: cls, label: cls }));

// Dummy papers data matching Paper creation template
const dummyPapers = [
  {
    id: 1,
    title: "Mathematics Class 10 - Unit Test",
    subject: "Mathematics",
    class: "10",
    book: "NCERT Book A",
    examType: "unit text",
    chapters: ["Numbers", "Algebra"],
    totalMarks: 50,
    duration: 90,
    createdBy: "John Doe",
    createdDate: "Aug 29, 2025",
    questions: 10,
    organizedQuestions: {
      'Short Answer': [
        { question: { id: 'S1', type: 'Short Answer', text: 'Define photosynthesis.', defaultMarks: 2 }, marks: 2, globalNumber: 1 },
        { question: { id: 'S2', type: 'Short Answer', text: 'What is a noun?', defaultMarks: 2 }, marks: 2, globalNumber: 2 }
      ],
      'Matching': [
        { question: { id: 'M1', type: 'Matching', text: 'Match the animals to their habitats.', imageUrl:img1, defaultMarks: 4 }, marks: 4, globalNumber: 3 },
        { question: { id: 'M2', type: 'Matching', text: 'Match states to their capitals.', imageUrl:img2, defaultMarks: 4 }, marks: 4, globalNumber: 4 }
      ],
      'Essay': [
        { question: { id: 'E1', type: 'Essay', text: 'Explain the water cycle in detail.', defaultMarks: 10 }, marks: 10, globalNumber: 5 },
        { question: { id: 'E2', type: 'Essay', text: 'Describe your favorite festival.', defaultMarks: 8 }, marks: 8, globalNumber: 6 }
      ],
      'Fill in the blank': [
        { question: { id: 'F1', type: 'Fill in the blank', text: 'Water boils at ____ degrees Celsius.', defaultMarks: 1 }, marks: 1, globalNumber: 7 },
        { question: { id: 'F2', type: 'Fill in the blank', text: 'The capital of France is ____.', defaultMarks: 1 }, marks: 1, globalNumber: 8 }
      ],
      'Multiple Choice': [
        { question: { id: 'MCQ1', type: 'Multiple Choice', text: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], defaultMarks: 2 }, marks: 2, globalNumber: 9 },
        { question: { id: 'MCQ2', type: 'Multiple Choice', text: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], defaultMarks: 2 }, marks: 2, globalNumber: 10 }
      ]
    }
  },
  {
    id: 2,
    title: "Science Class 8 - 1 Midterm",
    subject: "Science",
    class: "8",
    book: "NCERT Book B",
    examType: "1 midterm",
    chapters: ["Plants", "Animals"],
    totalMarks: 30,
    duration: 60,
    createdBy: "Jane Smith",
    createdDate: "Aug 28, 2025",
    questions: 7,
    organizedQuestions: {
      'Short Answer': [
        { question: { id: 'S3', type: 'Short Answer', text: 'What is the process of photosynthesis?', defaultMarks: 2 }, marks: 2, globalNumber: 1 }
      ],
      'Matching': [
        { question: { id: 'M3', type: 'Matching', text: 'Match the parts of a plant.', imageUrl:img1, defaultMarks: 4 }, marks: 4, globalNumber: 2 }
      ],
      'Essay': [
        { question: { id: 'E3', type: 'Essay', text: 'Explain the life cycle of a butterfly.', defaultMarks: 10 }, marks: 10, globalNumber: 3 }
      ],
      'Fill in the blank': [
        { question: { id: 'F3', type: 'Fill in the blank', text: 'Plants make food by a process called ____.', defaultMarks: 1 }, marks: 1, globalNumber: 4 },
        { question: { id: 'F4', type: 'Fill in the blank', text: 'The largest planet in our solar system is ____.', defaultMarks: 1 }, marks: 1, globalNumber: 5 }
      ],
      'Multiple Choice': [
        { question: { id: 'MCQ3', type: 'Multiple Choice', text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], defaultMarks: 1 }, marks: 1, globalNumber: 6 },
        { question: { id: 'MCQ4', type: 'Multiple Choice', text: 'Which is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], defaultMarks: 2 }, marks: 2, globalNumber: 7 }
      ]
    }
  }
];


// Check if device is mobile
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const ViewQuestionPaper = ({ paper, onBack }: any) => {
  const [loading, setLoading] = useState(false);

  const handlePrintQuestionPaper = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      message.error("Popup blocked. Please allow popups for this site.");
      return;
    }
    
    const paperTitle = `${paper.examType || 'Examination'} - ${paper.class || ''} ${paper.subject || ''}`.trim();
    const sectionsHtml = (['Short Answer', 'Matching', 'Essay', 'Fill in the blank', 'Multiple Choice'] as any[])
      .filter(type => paper.organizedQuestions[type] && paper.organizedQuestions[type].length > 0)
      .map(type => `
        <div class="section">
          <div class="section-title">Section: ${type}</div>
          ${paper.organizedQuestions[type].map(({ question, marks, globalNumber }: any) => `
            <div class="question">
              <div class="question-no">${globalNumber}.</div>
              <div class="question-content">
                <div class="question-text">${question.text}</div>
                ${question.type === 'Matching' && question.imageUrl ? `
                  <div class="question-image">
                    <img src="${question.imageUrl}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" />
                  </div>
                ` : ''}
                ${question.type === 'Multiple Choice' && question.options ? `
                  <div class="question-options" style="margin-top: 10px;">
                    ${question.options.map((option: string, index: number) => `
                      <div style="margin: 5px 0;">${String.fromCharCode(65 + index)}. ${option}</div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="marks">[${marks} marks]</div>
            </div>
          `).join('')}
        </div>
      `).join('');
    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paperTitle}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .subtitle { font-size: 18px; margin-top: 10px; }
            .info { display: flex; justify-content: space-between; margin: 20px 0; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; text-decoration: underline; }
            .question { margin: 15px 0; display: flex; align-items: flex-start; page-break-inside: avoid; }
            .question-no { width: 30px; font-weight: bold; }
            .question-content { flex: 1; }
            .question-text { margin-bottom: 5px; }
            .question-image { margin-top: 1px; }
            .marks { font-weight: bold; margin-left: 10px; }
            @media print {
              body { margin: 20px; }
              .section { page-break-inside: avoid; }
              .question { page-break-inside: avoid; margin: 10px 0; }
              .question-image img { max-width: 250px; max-height: 150px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${paperTitle}</div>
            <div class="subtitle">${paper.book || ''} - ${paper.chapters?.join(', ') || ''}</div>
          </div>
          <div class="info">
            <div><strong>Time Allowed:</strong> ${paper.duration || 60} Minutes</div>
            <div><strong>Maximum Marks:</strong> ${paper.totalMarks}</div>
          </div>
          ${sectionsHtml}
        </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Add a small delay for mobile devices
    setTimeout(() => {
      try {
        printWindow.print();
        // Don't close immediately on mobile
        if (!isMobileDevice()) {
          setTimeout(() => printWindow.close(), 500);
        }
      } catch (error) {
        message.error("Failed to print. Please try again.");
        printWindow.close();
      }
    }, 1000);
  };


  const currentSumMarks = Object.values(paper.organizedQuestions).reduce((total: number, questions: any) => 
    total + questions.reduce((sum: number, q: any) => sum + q.marks, 0), 0
  );

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={onBack}
          className="flex items-center justify-center"
        >
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          {paper.title}
        </Title>
      </div>

      {/* Print Options */}
      <div className="mb-6">
        <Card className="shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handlePrintQuestionPaper}
              className="flex items-center gap-2 bg-green-500 text-white border-blue-500 hover:bg-green-500"
            >
              <Printer size={16} />
              Print Question Paper
            </Button>
          </div>
        </Card>
      </div>

      {/* Question Paper Preview */}
      <Card className="shadow-sm">
        <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Times, serif' }}>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase font-local2">
              {paper.examType || 'Examination'} - {paper.class || ''} {paper.subject || ''}
            </h1>
            <h2 className="text-lg mt-2 font-local2">
              {paper.book || ''} {paper.chapters?.length ? `- ${paper.chapters.join(', ')}` : ''}
            </h2>
          </div>

          {/* Time and Marks */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="font-local2"><strong>Time Allowed:</strong> {paper.duration || 60} minutes</div>
            <div className="font-local2"><strong>Maximum Marks:</strong> {currentSumMarks}</div>
          </div>

          {/* Sections and Questions */}
          <div className="space-y-8">
            {(['Short Answer', 'Matching', 'Essay', 'Fill in the blank', 'Multiple Choice'] as any[]).map(type => {
              const questionsOfType = paper.organizedQuestions[type];
              if (!questionsOfType || questionsOfType.length === 0) return null;
              
              return (
                <div key={type} className="section">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-[#007575] font-local2">Section: {type}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {questionsOfType.map(({ question, marks, globalNumber }: any) => (
                      <div key={question.id} className="flex items-start gap-3 py-2">
                        <div className="w-8 flex-shrink-0">
                          <span className="font-medium font-local2">{globalNumber}.</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-local2">{question.text}</div>
                          {question.type === 'Matching' && question.imageUrl && (
                            <div className="mt-2">
                              <img src={question.imageUrl} alt="Question" className="w-40 h-28 object-cover rounded border" />
                            </div>
                          )}
                          {question.type === 'Multiple Choice' && question.options && (
                            <div className="mt-2 space-y-1">
                              {question.options.map((option: string, index: number) => (
                                <div key={index} className="text-sm text-gray-700 font-local2">
                                  {String.fromCharCode(65 + index)}. {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-12 flex-shrink-0 text-right">
                          <span className="font-bold text-gray-600 text-lg font-local2">[{marks}]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

const MyPapers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(undefined);
  const [selectedClass, setSelectedClass] = useState(undefined);
  const [viewingPaper, setViewingPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Fetch subjects from API with loading state
  const fetchSubjects = async () => {
    try {
      setSubjectsLoading(true);
      const data = await GET(API.ALL_SUBJECTS);
      const subjectsList = Array.isArray(data?.results)
        ? data.results.map((s: any) => ({ value: s.subject, label: s.subject }))
        : Array.isArray(data?.subjects)
          ? data.subjects.map((s: any) => ({ value: s.name ?? s.subject, label: s.name ?? s.subject }))
          : [];
      setSubjects(subjectsList);
    } catch (e) {
      console.log("Failed to fetch subjects:", e);
      // Fallback to empty options
      setSubjects([]);
    } finally {
      setSubjectsLoading(false);
    }
  };

  // Show all papers (search is UI only, no filtering)
  const filteredPapers = dummyPapers;

  const handleView = (paper: any) => {
    setViewingPaper(paper);
  };

  const handleBackToList = () => {
    setViewingPaper(null);
  };

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Generate PDF using the same template as Paper creation
  const generatePDF = (paper: any) => {
    setLoading(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        message.error("Popup blocked. Please allow popups for this site.");
        setLoading(false);
        return;
      }
      
      const paperTitle = `${paper.examType || 'Examination'} - ${paper.class || ''} ${paper.subject || ''}`.trim();
      const sectionsHtml = (['Short Answer', 'Matching', 'Essay', 'Fill in the blank', 'Multiple Choice'] as any[])
        .filter(type => paper.organizedQuestions[type] && paper.organizedQuestions[type].length > 0)
        .map(type => `
          <div class="section">
            <div class="section-title">Section: ${type}</div>
            ${paper.organizedQuestions[type].map(({ question, marks, globalNumber }: any) => `
              <div class="question">
                <div class="question-no">${globalNumber}.</div>
                <div class="question-content">
                  <div class="question-text">${question.text}</div>
                  ${question.type === 'Matching' && question.imageUrl ? `
                    <div class="question-image">
                      <img src="${question.imageUrl}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" />
                    </div>
                  ` : ''}
                  ${question.type === 'Multiple Choice' && question.options ? `
                    <div class="question-options" style="margin-top: 10px;">
                      ${question.options.map((option: string, index: number) => `
                        <div style="margin: 5px 0;">${String.fromCharCode(65 + index)}. ${option}</div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
                <div class="marks">[${marks} marks]</div>
              </div>
            `).join('')}
          </div>
        `).join('');
      
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${paperTitle}</title>
            <style>
              body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
              .header { text-align: center; margin-bottom: 30px; }
              .title { font-size: 24px; font-weight: bold; text-transform: uppercase; }
              .subtitle { font-size: 18px; margin-top: 10px; }
              .info { display: flex; justify-content: space-between; margin: 20px 0; }
              .section { margin: 30px 0; }
              .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; text-decoration: underline; }
              .question { margin: 15px 0; display: flex; align-items: flex-start; page-break-inside: avoid; }
              .question-no { width: 30px; font-weight: bold; }
              .question-content { flex: 1; }
              .question-text { margin-bottom: 5px; }
              .question-image { margin-top: 1px; }
              .marks { font-weight: bold; margin-left: 10px; }
              @media print {
                body { margin: 20px; }
                .section { page-break-inside: avoid; }
                .question { page-break-inside: avoid; margin: 10px 0; }
                .question-image img { max-width: 250px; max-height: 150px; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">${paperTitle}</div>
              <div class="subtitle">${paper.book || ''} - ${paper.chapters?.join(', ') || ''}</div>
            </div>
            <div class="info">
              <div><strong>Time Allowed:</strong> ${paper.duration || 60} Minutes</div>
              <div><strong>Maximum Marks:</strong> ${paper.totalMarks}</div>
            </div>
            ${sectionsHtml}
          </body>
        </html>
      `;
      
      printWindow.document.write(content);
      printWindow.document.close();
      
      // Add a small delay for mobile devices
      setTimeout(() => {
        try {
          printWindow.print();
          // Don't close immediately on mobile
          if (!isMobileDevice()) {
            setTimeout(() => printWindow.close(), 500);
          }
        } catch (error) {
          message.error("Failed to print. Please try again.");
          printWindow.close();
        }
      }, 1000);
      
      message.success('PDF generated successfully');
    } catch (error) {
      message.error('Error generating PDF. Please try again.');
      console.error('PDF generation error:', error);
    } finally {
      setLoading(false);
    }
  };



  // If viewing a paper, show the view component
  if (viewingPaper) {
    return <ViewQuestionPaper paper={viewingPaper} onBack={handleBackToList} />;
  }
  const users = [
  { id: "1", name: "Batch A" },
  { id: "2", name: "Batch B" },
  { id: "3", name: "Batch C" },
];

  return (
    <div className="p-6 h-min">
      {/* Heading */}
      <div className="mb-6">
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          My Question Papers
        </Title>
      </div>

      {/* Filters Card */}
      <div className="w-full mb-5">
        <Card className="shadow-sm bg-white w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
             {/* Class Filter */}
             <div className="flex items-center gap-2">
              <Text className="text-gray-600 font-local2">Class:</Text>
              <Select
                value={selectedClass}
                onChange={setSelectedClass}
                className="min-w-[120px]"
                showSearch
                placeholder="Select Class"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={classOptions}
              />
            </div>
            {/* Subject Filter */}
            <div className="flex items-center gap-2">
              <Text className="text-gray-600 font-local2">Subject:</Text>
              <Select
                value={selectedSubject}
                onChange={setSelectedSubject}
                className="min-w-[150px]"
                showSearch
                placeholder="Select subject"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={subjects}
                loading={subjectsLoading}
              />
            </div>

           

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  placeholder="Search By Id"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  suffix={
                    <Button
                      type="primary"
                      icon={<Search size={16} />}
                      className="bg-gradient-to-r from-[#007575] to-[#339999]  hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999]"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </Card>
        <Modal
  title={<span className="font-local2">Share Test Link / Assign Test</span>}
  open={isShareModalOpen}
  onCancel={() => setIsShareModalOpen(false)}
  footer={null}
>
  {/* User boxes */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {users.map((user) => (
      <div
        key={user.id}
        onClick={() =>
          setSelectedUsers((prev) =>
            prev.includes(user.id)
              ? prev.filter((u) => u !== user.id)
              : [...prev, user.id]
          )
        }
        className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition ${
          selectedUsers.includes(user.id)
            ? "border-teal-500 bg-teal-50"
            : "border-gray-200"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <User size={20} className="text-gray-600" />
        </div>
        <span className="text-sm text-gray-700 font-local2">{user.name}</span>
      </div>
    ))}
  </div>

  {/* Submit button */}
  <div className="mt-6 flex justify-end">
    <Button
      type="primary"
      className="bg-gradient-to-r from-[#007575] to-[#339999] text-white font-local2"
      onClick={() => {
        if (selectedUsers.length === 0) {
          message.warning("Please select at least one batch!");
          return;
        }
        message.success("Test link shared successfully!");
        setIsShareModalOpen(false);
        setSelectedUsers([]);
      }}
    >
      Submit
    </Button>
  </div>
</Modal>

      </div>

      {/* Create Test Paper Button */}
      <div className="w-full mb-5">
        <Button 
          type="primary"
          size="middle"
         className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 "
          
           onClick={() => navigate("/paper")}
        >
          Create Test Paper
        </Button>
      </div>

      {/* Papers Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPapers.map((paper) => (
            <div 
              key={paper.id} 
              className="bg-white border border-gray-200  shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => handleView(paper)}
            >
              {/* PDF-like Box Design */}
              <div className="aspect-[3/4] flex flex-col">
                {/* Main Content Area with PDF Image - Reduced Height */}
                <div className="flex-1 relative bg-gray-50" style={{ height: '75%' }}>
                  {/* PDF Preview Image */}
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img 
                      src={paperDummy} 
                      alt="Paper Preview" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  
                  {/* Hover Overlay with View Icon */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <Eye size={24} className="text-[#007575]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - Paper Title with Red Background */}
                <div className="p-3 bg-teal-900" style={{ height: '17%' }}>
                  <div className="text-center flex items-center justify-center h-full">
                    <h3 className="font-local2 font-semibold text-white text-sm">
                      {paper.id}-{paper.subject.toLowerCase()}-{paper.examType?.toLowerCase() || 'exam'}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-local2 text-gray-600 mb-2">No Papers Found</h3>
            <p className="text-gray-500 font-local2">Create your first question paper to get started.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MyPapers;