
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Modal, Input, Dropdown, message, Select, Pagination } from "antd";
import { Search, Eye, Download, ArrowLeft, Printer, User, MoreVertical, FileText, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
    
    const paperTitle = `${paper.examinationType || paper.examType || 'Examination'} - ${paper.class || ''} ${paper.subject || ''}`.trim();
    
    let sectionsHtml = '';
    if (paper.questions && Array.isArray(paper.questions)) {
      // Group questions by type for API format
      const groupedQuestions = paper.questions.reduce((acc: any, question: any, index: number) => {
        const type = question.questionType;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push({ ...question, globalNumber: index + 1 });
        return acc;
      }, {});

      const typeLabels: any = {
        'mcq': 'Multiple Choice',
        'shortanswer': 'Short Answer',
        'essay': 'Essay',
        'fillblank': 'Fill in the blank',
        'image': 'Image Questions'
      };

      sectionsHtml = Object.entries(groupedQuestions).map(([type, questions]: [string, any]) => `
        <div class="section">
          <div class="section-title">Section: ${typeLabels[type] || type}</div>
          ${questions.map((question: any) => `
            <div class="question">
              <div class="question-no">${question.globalNumber}.</div>
              <div class="question-content">
                <div class="question-text">${question.question}</div>
                ${question.questionType === 'image' ? `
                  <div class="question-image" style="margin-top: 10px;">
                    ${question.imageUrl ? `
                      <img src="${question.imageUrl}" alt="Question Image" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px; display: block;" />
                    ` : `
                      <div style="width: 300px; height: 150px; border: 2px dashed #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9; color: #666; font-style: italic;">
                        Image not available
                      </div>
                    `}
                  </div>
                ` : ''}
                ${question.questionType === 'mcq' && question.options && question.options.length > 0 ? `
                  <div class="question-options" style="margin-top: 10px;">
                    ${question.options.map((option: string, index: number) => `
                      <div style="margin: 5px 0;">${String.fromCharCode(65 + index)}. ${option}</div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="marks">[${question.mark} marks]</div>
            </div>
          `).join('')}
        </div>
      `).join('');
    } else {
      // Fallback for organized questions format
      sectionsHtml = (['Short Answer', 'Matching', 'Essay', 'Fill in the blank', 'Multiple Choice'] as any[])
        .filter(type => paper.organizedQuestions?.[type] && paper.organizedQuestions[type].length > 0)
      .map(type => `
        <div class="section">
          <div class="section-title">Section: ${type}</div>
          ${paper.organizedQuestions[type].map(({ question, marks, globalNumber }: any) => `
            <div class="question">
              <div class="question-no">${globalNumber}.</div>
              <div class="question-content">
                <div class="question-text">${question.text}</div>
                  ${(question.type === 'Matching' || question.type === 'Image' || question.type === 'image') ? `
                    <div class="question-image" style="margin-top: 10px;">
                      ${question.imageUrl ? `
                        <img src="${question.imageUrl}" alt="Question Image" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px; display: block;" />
                      ` : `
                        <div style="width: 300px; height: 150px; border: 2px dashed #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9; color: #666; font-style: italic;">
                          Image not available
                        </div>
                      `}
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
    }
    
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
            .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; }
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


  // Calculate total marks from API data or organized questions
  const currentSumMarks = paper.totalMark || paper.totalMarks || 
    (paper.organizedQuestions ? Object.values(paper.organizedQuestions).reduce((total: number, questions: any) => 
      total + questions.reduce((sum: number, q: any) => sum + q.marks, 0), 0) : 0);

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
              {paper.examinationType || paper.examType || 'Examination'} - {paper.class || ''} {paper.subject || ''}
            </h1>
          </div>

          {/* Time and Marks */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="font-local2"><strong>Time Allowed:</strong> {paper.duration || 60} minutes</div>
            <div className="font-local2"><strong>Maximum Marks:</strong> {currentSumMarks}</div>
          </div>

          {/* Sections and Questions */}
          <div className="space-y-8">
            {paper.questions && Array.isArray(paper.questions) ? (
              // Group questions by type and display in sections
              (() => {
                const groupedQuestions = paper.questions.reduce((acc: any, question: any, index: number) => {
                  const type = question.questionType;
                  if (!acc[type]) {
                    acc[type] = [];
                  }
                  acc[type].push({ ...question, globalNumber: index + 1 });
                  return acc;
                }, {});

                const typeLabels: any = {
                  'mcq': 'Multiple Choice',
                  'shortanswer': 'Short Answer',
                  'essay': 'Essay',
                  'fillblank': 'Fill in the blank',
                  'image': 'Image Questions'
                };

                return Object.entries(groupedQuestions).map(([type, questions]: [string, any]) => (
                  <div key={type} className="section">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-[#007575] font-local2">Section: {typeLabels[type] || type}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {questions.map((question: any) => (
                        <div key={question.globalNumber} className="flex items-start gap-3 py-2">
                          <div className="w-8 flex-shrink-0">
                            <span className="font-medium font-local2">{question.globalNumber}.</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-local2">{question.question}</div>
                            {question.questionType === 'image' && (
                              <div className="mt-2">
                                {question.imageUrl ? (
                                  <img 
                                    src={question.imageUrl} 
                                    alt="Question Image" 
                                    className="w-48 h-32 object-contain rounded border border-gray-300 shadow-sm" 
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.nextElementSibling.style.display = 'block';
                                    }}
                                  />
                                ) : null}
                                <div 
                                  className="w-48 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 text-gray-500 text-sm font-local2"
                                  style={{ display: question.imageUrl ? 'none' : 'block' }}
                                >
                                  Image not available
                                </div>
                              </div>
                            )}
                            {question.questionType === 'mcq' && question.options && question.options.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {question.options.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="text-sm text-gray-700 font-local2">
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="w-12 flex-shrink-0 text-right">
                            <span className="font-bold text-gray-600 text-lg font-local2">[{question.mark}]</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()
            ) : (
              // Handle organized questions format (fallback)
              (['Short Answer', 'Matching', 'Essay', 'Fill in the blank', 'Multiple Choice'] as any[]).map(type => {
                const questionsOfType = paper.organizedQuestions?.[type];
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
                            {(question.type === 'Matching' || question.type === 'Image' || question.type === 'image') && (
                            <div className="mt-2">
                                {question.imageUrl ? (
                                  <img 
                                    src={question.imageUrl} 
                                    alt="Question Image" 
                                    className="w-48 h-32 object-contain rounded border border-gray-300 shadow-sm" 
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.nextElementSibling.style.display = 'block';
                                    }}
                                  />
                                ) : null}
                                <div 
                                  className="w-48 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 text-gray-500 text-sm font-local2"
                                  style={{ display: question.imageUrl ? 'none' : 'block' }}
                                >
                                  Image not available
                                </div>
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
              }).filter(Boolean)
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const MyPapers = () => {
  const [selectedSubject, setSelectedSubject] = useState(undefined);
  const [selectedClass, setSelectedClass] = useState(undefined);
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [selectedBookName, setSelectedBookName] = useState<string>('');
  const [selectedExamType, setSelectedExamType] = useState(undefined);
  const [viewingPaper, setViewingPaper] = useState(null);
  
  // Exam type options
  const examTypes = ['unit text', '1 midterm', '1 term', '2 midterm', '2 term', '3 midterm', '3 term'];
  const examTypeOptions = examTypes.map(type => ({ value: type, label: type }));
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false);
  const [booksOptions, setBooksOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [booksLoading, setBooksLoading] = useState<boolean>(false);
  const [papers, setPapers] = useState<any[]>([]);
  const [papersLoading, setPapersLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPapers, setTotalPapers] = useState<number>(0);

  const navigate = useNavigate();
  
  // Get user from Redux
  const user = useSelector((state: any) => state.user.user);

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

  // Fetch books based on class and subject (same logic as Paper creation page)
  const fetchBooks = async (classValue: string, subjectValue: string) => {
    if (!classValue || !subjectValue || !user?.id) {
      setBooksOptions([]);
      return;
    }

    try {
      setBooksLoading(true);
      const query = {
        class: classValue,
        subject: subjectValue,
        userId: user.id
      };
      const data = await GET("/books/filter", query);
      const booksList = Array.isArray(data?.results)
        ? data.results.map((book: any) => ({ 
            value: book.id || book._id || book.name || book.title, 
            label: book.name || book.title || book.book 
          }))
        : Array.isArray(data?.books)
          ? data.books.map((book: any) => ({ 
              value: book.id || book._id || book.name || book.title, 
              label: book.name || book.title || book.book 
            }))
          : Array.isArray(data)
            ? data.map((book: any) => ({ 
                value: book.id || book._id || book.name || book.title, 
                label: book.name || book.title || book.book 
              }))
            : [];
      setBooksOptions(booksList);
    } catch (e) {
      console.error('Failed to fetch books:', e);
      setBooksOptions([]);
      message.error('Failed to load books');
    } finally {
      setBooksLoading(false);
    }
  };

  // Use papers directly from API (filtering is done server-side)
  const filteredPapers = papers;

  const handleView = (paper: any) => {
    setViewingPaper(paper);
  };

  const handleBackToList = () => {
    setViewingPaper(null);
  };

  // Fetch papers from API
  const fetchPapers = async () => {
    if (!user?.id) {
      console.log("User ID not available");
      return;
    }

    try {
      setPapersLoading(true);
      
      // Build query parameters for filters
      const query: any = {};
      
      // Add pagination parameters
      query.page = currentPage;
      query.pageSize = pageSize;
      
      // Add filter parameters if they are selected
      if (selectedClass) {
        query.class = selectedClass;
      }
      if (selectedSubject) {
        query.subject = selectedSubject;
      }
      if (selectedBookName) {
        query.book = selectedBookName;
      }
      if (selectedExamType) {
        query.examinationType = selectedExamType;
      }
      
      // Use school ID in the URL path
      const data = await GET(`/examinations/school/${user.id}`, query);
      
      // Handle API response format - examinations array
      const papersList = Array.isArray(data?.examinations)
        ? data.examinations
        : Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
              ? data
              : [];
      
      setPapers(papersList);
      setTotalPapers(data?.total || 0);
    } catch (e) {
      console.error('Failed to fetch papers:', e);
      setPapers([]);
      message.error('Failed to load papers');
    } finally {
      setPapersLoading(false);
    }
  };

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch papers when component mounts and user is available
  useEffect(() => {
    if (user?.id) {
      fetchPapers();
    }
  }, [user?.id]);

  // Watch for class and subject changes to fetch books
  useEffect(() => {
    if (selectedClass && selectedSubject && user?.id) {
      fetchBooks(selectedClass, selectedSubject);
    } else {
      setBooksOptions([]);
      // Clear book when class or subject is cleared
      if (!selectedClass || !selectedSubject) {
        setSelectedBook(undefined);
        setSelectedBookName('');
      }
    }
  }, [selectedClass, selectedSubject, user?.id]);

  // Refetch papers when filters or pagination change
  useEffect(() => {
    if (user?.id) {
      fetchPapers();
    }
  }, [selectedClass, selectedSubject, selectedBookName, selectedExamType, currentPage, pageSize, user?.id]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedSubject, selectedBookName, selectedExamType]);

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
                  ${(question.type === 'Matching' || question.type === 'Image' || question.type === 'image') ? `
                    <div class="question-image" style="margin-top: 10px;">
                      ${question.imageUrl ? `
                        <img src="${question.imageUrl}" alt="Question Image" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px; display: block;" />
                      ` : `
                        <div style="width: 300px; height: 150px; border: 2px dashed #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9; color: #666; font-style: italic;">
                          Image not available
                        </div>
                      `}
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
              .section-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; }
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
          My Papers
        </Title>
      </div>

      {/* Filters Card */}
      <div className="w-full mb-5">
        <Card className="shadow-sm bg-white w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
             {/* Class Filter */}
             <div className="flex items-center gap-2">
              <Select
                value={selectedClass}
                allowClear
                onChange={setSelectedClass}
                className="w-[150px] font-local2"
                showSearch
                placeholder="Filter by Class"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={classOptions}
              />
            </div>
            {/* Subject Filter */}
            <div className="flex items-center gap-2">
              <Select
                value={selectedSubject}
                allowClear
                onChange={setSelectedSubject}
                className="w-[200px] font-local2"
                showSearch
                placeholder="Filter by Subject"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={subjects}
                loading={subjectsLoading}
              />
            </div>

            {/* Book Filter */}
            <div className="flex items-center gap-2">
              <Select
                value={selectedBook}
                allowClear
                onChange={(value) => {
                  setSelectedBook(value);
                  // Find the book name from the options
                  const bookOption = booksOptions.find(option => option.value === value);
                  setSelectedBookName(bookOption ? bookOption.label : '');
                }}
                className="w-[250px] font-local2"
                showSearch
                placeholder="Filter by Book"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={booksOptions}
                loading={booksLoading}
                disabled={!selectedClass || !selectedSubject}
              />
            </div>

            {/* Exam Type Filter */}
            <div className="flex items-center gap-2">
              <Select
                value={selectedExamType}
                allowClear
                onChange={setSelectedExamType}
                className="w-[200px] font-local2"
                showSearch
                placeholder="Filter by Exam Type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={examTypeOptions}
              />
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
        {papersLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007575] mx-auto mb-4"></div>
              <p className="text-gray-600 font-local2">Loading papers...</p>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPapers.map((paper) => (
            <div 
                key={paper.id || paper._id} 
              className="bg-white border border-gray-200  shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => handleView(paper)}
            >
                {/* Triangle Corner Decoration */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-teal-600 border-r-transparent z-10"></div>
                
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

                  {/* Footer - Class-Subject-ExaminationType */}
                <div className="p-3 bg-gradient-to-r from-[#007575] to-[#339999]" style={{ height: '17%' }}>
                  <div className="text-center flex items-center justify-center h-full">
                    <h3 className="font-local2 font-semibold text-white text-sm">
                        {paper.class || 'N/A'} - {paper.subject || 'subject'} - {paper.examinationType || 'exam'}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Empty State */}
        {!papersLoading && filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-local2 text-gray-600 mb-2">No Papers Found</h3>
            <p className="text-gray-500 font-local2">
              {papers.length === 0 
                ? "Create your first question paper to get started." 
                : "No papers match your current filters."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!papersLoading && filteredPapers.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalPapers}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              onShowSizeChange={(current, size) => {
                setCurrentPage(1);
                setPageSize(size);
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} papers`}
              pageSizeOptions={['10', '20', '50', '100']}
              className="font-local2"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default MyPapers;