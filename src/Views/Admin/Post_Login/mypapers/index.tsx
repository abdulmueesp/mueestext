
// @ts-nocheck
import React, { useState } from "react";
import { Button, Card, Typography, Modal, Input, Dropdown, message } from "antd";
import { Search, Filter, Eye, FileText, Download, Share, Repeat, ArrowLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const { Title, Text } = Typography;

// Dummy data for filters
const categoryData = [
  { id: 1, name: "CBSE", count: 45 },
  { id: 2, name: "ICSE", count: 32 },
  { id: 3, name: "State Board", count: 28 },
  { id: 4, name: "NCERT", count: 67 },
  { id: 5, name: "International", count: 15 }
];

const typeOptions = [
  { value: "all", label: "All" },
  { value: "question-paper", label: "Question Paper" },
  { value: "online-test", label: "Online Test" },
  { value: "worksheet", label: "Worksheet" }
];

// Dummy papers data
const dummyPapers = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    paperType: "Question Paper",
    subject: "Mathematics",
    class: "Class 10",
    board: "CBSE",
    createdBy: "John Doe",
    createdDate: "Aug 29, 2025",
    questions: 25,
    marks: 100,
    sections: [
      {
        id: 1,
        name: "Section A - Multiple Choice Questions",
        questions: [
          { id: 1, question: "What is 2 + 2?", marks: 1 },
          { id: 2, question: "Solve: 3x + 5 = 14", marks: 2 },
          { id: 3, question: "Find the area of a circle with radius 7 cm", marks: 3 }
        ]
      },
      {
        id: 2,
        name: "Section B - Short Answer Questions", 
        questions: [
          { id: 4, question: "Explain the Pythagorean theorem with an example", marks: 5 },
          { id: 5, question: "Differentiate between mean, median, and mode", marks: 4 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Science Chapter 5 Test",
    paperType: "Online Test",
    subject: "Science",
    class: "Class 8",
    board: "ICSE",
    createdBy: "Jane Smith",
    createdDate: "Aug 28, 2025",
    questions: 15,
    marks: 50,
    sections: [
      {
        id: 1,
        name: "Section A - Objective Questions",
        questions: [
          { id: 1, question: "What is photosynthesis?", marks: 2 },
          { id: 2, question: "Name the three states of matter", marks: 3 }
        ]
      }
    ]
  }
];

// Dummy solutions data
const solutionAnswers = [
  { questionId: 1, answer: "4" },
  { questionId: 2, answer: "x = 3" },
  { questionId: 3, answer: "Area = πr² = π × 7² = 154 cm²" },
  { questionId: 4, answer: "The Pythagorean theorem states that a² + b² = c². Example: In a right triangle with sides 3, 4, 5: 3² + 4² = 9 + 16 = 25 = 5²" },
  { questionId: 5, answer: "Mean is the average, Median is the middle value, Mode is the most frequent value" }
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
    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paper.title}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .subtitle { font-size: 18px; margin-top: 10px; }
            .info { display: flex; justify-content: space-between; margin: 20px 0; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; }
            .question { margin: 15px 0; display: flex; align-items: flex-start; }
            .question-no { width: 30px; font-weight: bold; }
            .question-text { flex: 1; }
            .marks { font-weight: bold; margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${paper.title}</div>
            <div class="subtitle">${paper.board} - ${paper.class} - ${paper.subject}</div>
          </div>
          <div class="info">
            <div><strong>Time Allowed:</strong> 3 Hours</div>
            <div><strong>Maximum Marks:</strong> ${paper.marks}</div>
          </div>
          <div><strong>General Instructions:</strong></div>
          <ul>
            <li>All questions are compulsory</li>
            <li>Write answers in the given space</li>
            <li>Marks are indicated against each question</li>
          </ul>
          ${paper.sections.map((section: any, sIndex: number) => `
            <div class="section">
              <div class="section-title">${section.name}</div>
              ${section.questions.map((question: any, qIndex: number) => `
                <div class="question">
                  <div class="question-no">${qIndex + 1}.</div>
                  <div class="question-text">${question.question}</div>
                  <div class="marks">[${question.marks}]</div>
                </div>
              `).join('')}
            </div>
          `).join('')}
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

  const handlePrintSolution = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      message.error("Popup blocked. Please allow popups for this site.");
      return;
    }
    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paper.title} - Solutions</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .subtitle { font-size: 18px; margin-top: 10px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; }
            .question { margin: 20px 0; }
            .question-no { font-weight: bold; color: #333; }
            .answer { margin-top: 8px; padding: 10px; background: #f8f9fa; border-left: 3px solid #007bff; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${paper.title} - SOLUTION KEY</div>
            <div class="subtitle">${paper.board} - ${paper.class} - ${paper.subject}</div>
          </div>
          ${paper.sections.map((section: any, sIndex: number) => `
            <div class="section">
              <div class="section-title">${section.name}</div>
              ${section.questions.map((question: any, qIndex: number) => {
                const solution = solutionAnswers.find(s => s.questionId === question.id);
                return `
                  <div class="question">
                    <div class="question-no">${qIndex + 1}. ${question.question} [${question.marks} marks]</div>
                    <div class="answer"><strong>Answer:</strong> ${solution?.answer || 'Answer not available'}</div>
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
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

  const totalMarks = paper.sections.reduce((sum: number, section: any) => 
    sum + section.questions.reduce((sectionSum: number, question: any) => sectionSum + question.marks, 0), 0
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
        <Title level={4} className="!mb-0 text-gray-700">
          {paper.title}
        </Title>
      </div>

      {/* Print Options */}
      <div className="mb-6">
        <Card className="shadow-sm">
          <div className="flex flex-col sm:flex-row  gap-4">
            <Button
              onClick={handlePrintQuestionPaper}
              className="flex items-center gap-2 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            >
              <Printer size={16} />
              Print Question Paper
            </Button>
            <Button
              onClick={handlePrintSolution}
              className="flex items-center gap-2 bg-green-500 text-white border-green-500 hover:bg-green-600"
            >
              <FileText size={16} />
              Print Solution
            </Button>
          </div>
        </Card>
      </div>

      {/* Question Paper Preview */}
      <Card className="shadow-sm">
        <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Times, serif' }}>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase">{paper.title}</h1>
            <h2 className="text-lg mt-2">{paper.board} - {paper.class} - {paper.subject}</h2>
          </div>

          {/* Time and Marks */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div><strong>Time Allowed:</strong> 3 Hours</div>
            <div><strong>Maximum Marks:</strong> {totalMarks}</div>
          </div>

          {/* General Instructions */}
          <div className="mb-6">
            <div className="font-bold mb-2">General Instructions:</div>
            <ul className="ml-6 text-sm">
              <li>All questions are compulsory</li>
              <li>Write answers in the given space</li>
              <li>Marks are indicated against each question</li>
            </ul>
          </div>

          {/* Sections and Questions */}
          <div className="space-y-8">
            {paper.sections.map((section: any, sIndex: number) => (
              <div key={section.id} className="section">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold">{section.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {section.questions.map((question: any, qIndex: number) => (
                    <div key={question.id} className="flex items-start gap-3 py-2">
                      <div className="w-8 flex-shrink-0">
                        <span className="font-medium">{qIndex + 1}.</span>
                      </div>
                      <div className="flex-1">
                        <span>{question.question}</span>
                      </div>
                      <div className="w-12 flex-shrink-0 text-right">
                        <span className="font-bold">[{question.marks}]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

const MyPapers = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [viewingPaper, setViewingPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedType("all");
    setSearchTerm("");
  };

  const applyFilters = () => {
    console.log("Applied filters:", { selectedCategories, selectedType, searchTerm });
    setIsFilterModalOpen(false);
  };

  const handleView = (paper: any) => {
    setViewingPaper(paper);
  };

  const handleBackToList = () => {
    setViewingPaper(null);
  };

  // Generate PDF using jsPDF with mobile compatibility
  const generatePDF = (paper: any) => {
    setLoading(true);
    
    try {
      const doc = new jsPDF();
      
      // Set document properties
      doc.setProperties({
        title: paper.title,
        subject: `${paper.board} - ${paper.class} - ${paper.subject}`,
        creator: 'Question Paper Generator'
      });
      
      // Add title
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text(paper.title, 105, 20, { align: 'center' });
      
      // Add subtitle
      doc.setFontSize(14);
      doc.setFont(undefined, 'normal');
      doc.text(`${paper.board} - ${paper.class} - ${paper.subject}`, 105, 30, { align: 'center' });
      
      // Add time and marks
      doc.setFontSize(12);
      doc.text(`Time Allowed: 3 Hours`, 20, 45);
      doc.text(`Maximum Marks: ${paper.marks}`, 160, 45);
      
      // Add instructions
      doc.text("General Instructions:", 20, 60);
      doc.text("- All questions are compulsory", 25, 70);
      doc.text("- Write answers in the given space", 25, 80);
      doc.text("- Marks are indicated against each question", 25, 90);
      
      let yPosition = 110;
      
      // Add sections and questions
      paper.sections?.forEach((section: any, sIndex: number) => {
        // Add section title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(section.name, 105, yPosition, { align: 'center' });
        yPosition += 10;
        
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add questions
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        section.questions?.forEach((question: any, qIndex: number) => {
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          const questionText = `${qIndex + 1}. ${question.question}`;
          const marksText = `[${question.marks}]`;
          
          // Split long questions into multiple lines
          const splitQuestion = doc.splitTextToSize(questionText, 160);
          
          // Add question text
          doc.text(splitQuestion, 20, yPosition);
          
          // Calculate height of the question text
          const questionHeight = splitQuestion.length * 7;
          
          // Add marks at the end of the question
          doc.text(marksText, 190, yPosition, { align: 'right' });
          
          yPosition += questionHeight + 5;
        });
        
        yPosition += 10;
      });
      
      // Save the PDF with mobile compatibility
      if (isMobileDevice()) {
        // For mobile devices, create a blob and download it
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        
        // Create a temporary link element for download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${paper.title}.pdf`;
        document.body.appendChild(link);
        
        // Simulate click with error handling
        try {
          link.click();
          message.success('Download started');
        } catch (error) {
          message.error('Failed to download. Please try again.');
        }
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } else {
        // For desktop, use the standard save method
        doc.save(`${paper.title}.pdf`);
      }
    } catch (error) {
      message.error('Error generating PDF. Please try again.');
      console.error('PDF generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadWord = (paper: any) => {
    const wordContent = `
      ${paper.title}
      ${paper.board} - ${paper.class} - ${paper.subject}
      
      Time Allowed: 3 Hours
      Maximum Marks: ${paper.marks}
      
      General Instructions:
      - All questions are compulsory
      - Write answers in the given space
      - Marks are indicated against each question
      
      ${paper.sections?.map((section: any) => `
        ${section.name}
        
        ${section.questions?.map((question: any, qIndex: number) => `
          ${qIndex + 1}. ${question.question} [${question.marks}]
        `).join('\n') || ''}
      `).join('\n') || ''}
    `;
    
    const blob = new Blob([wordContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.title}.docx`;
    
    // For mobile devices, append the link to the body first
    if (isMobileDevice()) {
      document.body.appendChild(link);
    }
    
    try {
      link.click();
      message.success('Download started');
    } catch (error) {
      message.error('Failed to download. Please try again.');
    }
    
    // Clean up
    if (isMobileDevice()) {
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } else {
      URL.revokeObjectURL(url);
    }
  };

  const actionItems = (paper: any) => [
    {
      key: 'view',
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Eye size={16} />
          <span>View</span>
        </div>
      ),
      onClick: () => handleView(paper)
    },
    // {
    //   key: 'Question (pdf)',
    //   label: (
    //     <div className="flex items-center gap-2 px-2 py-1">
    //       <FileText size={16} />
    //       <span>Question (pdf)</span>
    //     </div>
    //   ),
    //   onClick: () => generatePDF(paper)
    // },
    // {
    //   key: 'Generate Microsoft Word',
    //   label: (
    //     <div className="flex items-center gap-2 px-2 py-1">
    //       <Download size={16} />
    //       <span>Generate Microsoft Word</span>
    //     </div>
    //   ),
    //   onClick: () => handleDownloadWord(paper)
    // },
    {
      key: 'share',
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Share size={16} />
          <span>Share</span>
        </div>
      ),
      onClick: () => console.log('Share clicked')
    },
    {
      key: 'Repeat',
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Repeat size={16} />
          <span>Repeat</span>
        </div>
      ),
      onClick: () => console.log('Repeat clicked')
    }
  ];

  // If viewing a paper, show the view component
  if (viewingPaper) {
    return <ViewQuestionPaper paper={viewingPaper} onBack={handleBackToList} />;
  }

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
            {/* Filters Button */}
            <Button
              onClick={openFilterModal}
              className="flex items-center gap-2 border-gray-300"
            >
              <Filter size={16} />
              Filters
            </Button>

            {/* Type Selector */}
            <div className="flex items-center gap-2">
              <Text className="text-gray-600">Type:</Text>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 bg-white"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  placeholder="Search By Name..."
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
      </div>

      {/* Create Test Paper Button */}
      <div className="w-full mb-5">
        <Button 
          type="primary"
          size="large"
         className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 "
          
           onClick={() => navigate("/paper")}
        >
          Create Test Paper
        </Button>
      </div>

      {/* Papers List */}
      <div className="w-full">
        <Card className="shadow-sm bg-white w-full">
          <div className="space-y-4">
            {dummyPapers.map((paper) => (
              <div key={paper.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Text strong className="text-lg">{paper.id}) {paper.title}</Text>
                    </div>
                    
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">📄</span>
                        </span>
                        <Text>Question Paper ID: {2242848 + paper.id}</Text>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">🏷️</span>
                        </span>
                        <Text>{paper.board} {paper.class} {paper.subject}</Text>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">📋</span>
                        </span>
                        <Text>{paper.paperType}</Text>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </span>
                        <Text>Created By: {paper.createdBy} ({paper.createdDate})</Text>
                      </div>
                    </div>
                  </div>

                  {/* Actions Button */}
                  <Dropdown
                    menu={{ items: actionItems(paper) }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      className="flex items-center justify-center border border-teal-200 bg-teal-50 text-teal-600 hover:bg-teal-100"
                    >
                      ≡ Actions
                    </Button>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filter Modal */}
      <Modal
        title="Search Papers by Category"
        open={isFilterModalOpen}
        onCancel={closeFilterModal}
        footer={null}
        width={600}
      >
        <div className="space-y-4">
          {/* Categories */}
          <div>
            <Text strong className="block mb-3">Categories:</Text>
            <div className="grid grid-cols-2 gap-2">
              {categoryData.map((category) => (
                <div
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <Text>{category.name}</Text>
                    <Text className="text-sm text-gray-500">({category.count})</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button onClick={clearAllFilters}>
              Clear All
            </Button>
            <Button 
              type="primary"
              onClick={applyFilters}
              className="bg-blue-500 border-blue-500"
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPapers;