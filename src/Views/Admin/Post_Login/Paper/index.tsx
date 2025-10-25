
// @ts-nocheck
import { useMemo, useRef, useState, useEffect } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Pagination, Row, Select, Typography, message, ConfigProvider, Spin } from 'antd';
import { Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API, GET, POST } from "../../../../Components/common/api";
const { Title, Text } = Typography;

type QuestionType = 'shortanswer' | 'essay' | 'fillblank' | 'mcq' | 'Image';

interface QuestionItem {
  id: string;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  defaultMarks: number;
  options?: string[];
}

const classOptions = ['0', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'];
const examTypes = ['unit text', '1 midterm', '1 term', '2 midterm', '2 term', '3 midterm', '3 term'];

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const Paper = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);
  const [showChooser, setShowChooser] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Record<string, number>>({});
  const [lockedAfterRandom, setLockedAfterRandom] = useState(false);
  const [lockedAfterChoose, setLockedAfterChoose] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalFilterTypes, setModalFilterTypes] = useState<QuestionType[]>([]);
  const [subjectsOptions, setSubjectsOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false);
  const [booksOptions, setBooksOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [booksLoading, setBooksLoading] = useState<boolean>(false);
  const [chaptersOptions, setChaptersOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [chaptersLoading, setChaptersLoading] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<QuestionItem[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showGeneratedQuestionsModal, setShowGeneratedQuestionsModal] = useState<boolean>(false);
  const [chooseLoading, setChooseLoading] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const chooserRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Get user from Redux
  const user = useSelector((state: any) => state.user.user);

  const totalMarksField = Form.useWatch('totalMarks', form) || 0;
  const formValues = Form.useWatch([], form);
  const selectedClass = Form.useWatch('class', form);
  const selectedSubject = Form.useWatch('subject', form);
  const selectedBook = Form.useWatch('book', form);

  // Fetch subjects from API (same as Chapters module)
  const fetchSubjects = async () => {
    try {
      setSubjectsLoading(true);
      const data = await GET(API.ALL_SUBJECTS);
      const subjectsList = Array.isArray(data?.results)
        ? data.results.map((s: any) => ({ value: s.subject, label: s.subject }))
        : Array.isArray(data?.subjects)
          ? data.subjects.map((s: any) => ({ value: s.name ?? s.subject, label: s.name ?? s.subject }))
          : [];
      setSubjectsOptions(subjectsList);
    } catch (e) {
      // Fallback to default subjects if API fails
      setSubjectsOptions([
        { value: "Malayalam", label: "Malayalam" },
        { value: "English", label: "English" },
        { value: "Maths", label: "Maths" },
        { value: "GK", label: "GK" },
        { value: "Computer", label: "Computer" },
        { value: "EVS", label: "EVS" },
        { value: "Social Science", label: "Social Science" },
        { value: "Science", label: "Science" },
      ]);
    } finally {
      setSubjectsLoading(false);
    }
  };

  // Fetch books based on class and subject
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

  // Load subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch chapters based on class, subject, and book
  const fetchChapters = async (classValue: string, subjectValue: string, bookId: string) => {
    if (!classValue || !subjectValue || !bookId) {
      setChaptersOptions([]);
      return;
    }

    try {
      setChaptersLoading(true);
      const query = {
        class: classValue,
        subject: subjectValue,
        book: bookId
      };
      const data = await GET("/chaptersr", query);
      const chaptersList = Array.isArray(data?.results)
        ? data.results.map((chapter: any) => ({ 
            value: chapter.id || chapter._id || chapter.name || chapter.chapterName, 
            label: chapter.name || chapter.chapterName || chapter.title 
          }))
        : Array.isArray(data?.chapters)
          ? data.chapters.map((chapter: any) => ({ 
              value: chapter.id || chapter._id || chapter.name || chapter.chapterName, 
              label: chapter.name || chapter.chapterName || chapter.title 
            }))
          : Array.isArray(data)
            ? data.map((chapter: any) => ({ 
                value: chapter.id || chapter._id || chapter.name || chapter.chapterName, 
                label: chapter.name || chapter.chapterName || chapter.title 
              }))
            : [];
      setChaptersOptions(chaptersList);
    } catch (e) {
      console.error('Failed to fetch chapters:', e);
      setChaptersOptions([]);
      message.info('no chapters found');
    } finally {
      setChaptersLoading(false);
    }
  };

  // Watch for class and subject changes to fetch books
  useEffect(() => {
    if (selectedClass && selectedSubject && user?.id) {
      fetchBooks(selectedClass, selectedSubject);
    } else {
      setBooksOptions([]);
      // Clear book and chapters when class or subject is cleared
      if (!selectedClass || !selectedSubject) {
        form.setFieldsValue({
          book: undefined,
          chapters: undefined
        });
      }
    }
  }, [selectedClass, selectedSubject, user?.id, form]);

  // Watch for class, subject, and book changes to fetch chapters
  useEffect(() => {
    if (selectedClass && selectedSubject && selectedBook) {
      fetchChapters(selectedClass, selectedSubject, selectedBook);
    } else {
      setChaptersOptions([]);
      // Clear chapters when book is cleared
      if (!selectedBook) {
        form.setFieldsValue({
          chapters: undefined
        });
      }
    }
  }, [selectedClass, selectedSubject, selectedBook, form]);

  // Watch for changes in required fields to clear questions when fields change
  const selectedChapters = Form.useWatch('chapters', form);
  useEffect(() => {
    // Clear questions data when any required field changes
    // This ensures that when user changes class/subject/book/chapters, 
    // the previously fetched questions are hidden until "Choose Questions" is clicked again
    if (questionsData.length > 0) {
      setQuestionsData([]);
      setTotalQuestions(0);
      setSelectedQuestions({});
      setShowChooser(false);
      setLockedAfterChoose(false);
      setLockedAfterRandom(false);
    }
  }, [selectedClass, selectedSubject, selectedBook, selectedChapters]);

  // Also clear questions when question types change
  useEffect(() => {
    if (questionsData.length > 0) {
      setQuestionsData([]);
      setTotalQuestions(0);
      setSelectedQuestions({});
      setShowChooser(false);
      setLockedAfterChoose(false);
      setLockedAfterRandom(false);
    }
  }, [selectedTypes]);

  // Fetch questions when filter types change
  useEffect(() => {
    if (modalFilterTypes.length > 0 && questionsData.length > 0) {
      fetchQuestions();
    }
  }, [modalFilterTypes]);

  // Fetch questions from API
  const fetchQuestions = async (customPage?: number, customPageSize?: number, overrideFilterTypes?: QuestionType[]) => {
    const formValues = form.getFieldsValue();
    if (!formValues.class || !formValues.subject || !formValues.book || !formValues.chapters || formValues.chapters.length === 0 || selectedTypes.length === 0) {
      message.error('Please fill all required fields and select question types');
      return;
    }

    try {
      setQuestionsLoading(true);
      
      // Get book name from selected book ID
      const selectedBookName = booksOptions.find(book => book.value === formValues.book)?.label || formValues.book;
      
      // Get chapter names from selected chapter IDs
      const selectedChapterNames = Array.isArray(formValues.chapters) 
        ? formValues.chapters.map(chapterId => 
            chaptersOptions.find(chapter => chapter.value === chapterId)?.label || chapterId
          ).join(',')
        : formValues.chapters;
      
      // Priority: explicit override -> current modalFilterTypes -> selectedTypes
      const filterTypes = (Array.isArray(overrideFilterTypes) && overrideFilterTypes.length > 0)
        ? overrideFilterTypes
        : (modalFilterTypes.length > 0 ? modalFilterTypes : selectedTypes);
      
      const query = {
        limit: customPageSize || pageSize,
        page: customPage || page,
        className: formValues.class,
        subject: formValues.subject,
        book: selectedBookName,
        chapters: selectedChapterNames,
        questionTypes: filterTypes.map(type => type === 'Image' ? 'image' : type).join(',')
      };
      const data = await GET("/qustion", query);
      const questionsList = Array.isArray(data?.data)
        ? data.data.map((q: any) => ({
            id: q.questionId || q.id || q._id,
            type: q.questionType === 'image' ? 'Image' : (q.questionType || q.type),
            text: q.question || q.text || q.title,
            imageUrl: q.imageUrl || q.image,
            defaultMarks: q.marks || q.defaultMarks || 1,
            options: q.options || q.choices
          }))
        : Array.isArray(data?.results)
          ? data.results.map((q: any) => ({
              id: q.id || q._id,
              type: q.questionType || q.type,
              text: q.question || q.text || q.title,
              imageUrl: q.imageUrl || q.image,
              defaultMarks: q.marks || q.defaultMarks || 1,
              options: q.options || q.choices
            }))
          : Array.isArray(data?.questions)
            ? data.questions.map((q: any) => ({
                id: q.id || q._id,
                type: q.questionType || q.type,
                text: q.question || q.text || q.title,
                imageUrl: q.imageUrl || q.image,
                defaultMarks: q.marks || q.defaultMarks || 1,
                options: q.options || q.choices
              }))
            : Array.isArray(data)
              ? data.map((q: any) => ({
                  id: q.id || q._id,
                  type: q.questionType || q.type,
                  text: q.question || q.text || q.title,
                  imageUrl: q.imageUrl || q.image,
                  defaultMarks: q.marks || q.defaultMarks || 1,
                  options: q.options || q.choices
                }))
              : [];
      setQuestionsData(questionsList);
      setTotalQuestions(data?.total || 0);
    } catch (e) {
      console.error('Failed to fetch questions:', e);
      setQuestionsData([]);
      message.error('Failed to load questions');
    } finally {
      setQuestionsLoading(false);
    }
  };

  const paginatedQuestions = useMemo(() => {
    // Use server-side filtering instead of frontend filtering
    return questionsData;
  }, [questionsData]);

  // Get question numbering for the current page
  const getQuestionNumber = (questionIndex: number) => {
    const start = (page - 1) * pageSize;
    return start + questionIndex + 1;
  };

  // Scroll to top when page changes
  useEffect(() => {
    if (showChooser && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page, pageSize]);

  // Organize selected questions by type for preview
  const organizedQuestions = useMemo(() => {
    const result: Record<QuestionType, Array<{ question: QuestionItem; marks: number; globalNumber: number }>> = {
      'shortanswer': [],
      'essay': [],
      'fillblank': [],
      'mcq': [],
      'Image': []
    };
    
    let globalCounter = 1;
    
    // Process questions in the order of question types
    (['shortanswer', 'essay', 'fillblank', 'mcq', 'Image'] as QuestionType[]).forEach(type => {
      const questionsOfType = Object.entries(selectedQuestions)
        .map(([id, marks]) => ({ id, marks, question: questionsData.find(q => q.id === id) }))
        .filter(({ question }) => question && question.type === type)
        .sort((a, b) => a.id.localeCompare(b.id));
      
      questionsOfType.forEach(({ question, marks }) => {
        result[type].push({ question, marks, globalNumber: globalCounter++ });
      });
    });
    
    return result;
  }, [selectedQuestions, questionsData]);

  const currentSumMarks = useMemo(() => Object.values(selectedQuestions).reduce((a, b) => a + (Number(b) || 0), 0), [selectedQuestions]);

  const handleChooseQuestions = async () => {
    // Check if required fields are filled
    const formValues = form.getFieldsValue();
    if (!formValues.class) {
      message.error('Please fill the Class');
      return;
    }
    if (!formValues.subject) {
      message.error('Please fill the Subject');
      return;
    }
    if (!formValues.book) {
      message.error('Please fill the Book');
      return;
    }
    if (!formValues.chapters || formValues.chapters.length === 0) {
      message.error('Please select at least one Chapter');
      return;
    }
    if (!formValues.examType) {
      message.error('Please fill the Examination Type');
      return;
    }
    if (!formValues.totalMarks) {
      message.error('Please fill the Total Marks');
      return;
    }
    if (!formValues.duration) {
      message.error('Please fill the Duration');
      return;
    }
    if (selectedTypes.length === 0) {
      message.error('Please select at least one Question Type');
      return;
    }
    if (lockedAfterRandom) {
      message.warning('Questions are locked after random generation');
      return;
    }
    try {
      setChooseLoading(true);
      // Fetch questions from API
      await fetchQuestions();
      setLockedAfterChoose(true);
      setShowChooser(true);
      requestAnimationFrame(() => {
        chooserRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } finally {
      setChooseLoading(false);
    }
  };

  const handleRandomGenerate = () => {
    // Check if required fields are filled
    const formValues = form.getFieldsValue();
    if (!formValues.class) {
      message.error('Please fill the Class');
      return;
    }
    if (!formValues.subject) {
      message.error('Please fill the Subject ');
      return;
    }
    if (!formValues.book) {
      message.error('Please fill the Book');
      return;
    }
    if (!formValues.chapters || formValues.chapters.length === 0) {
      message.error('Please select at least one Chapter');
      return;
    }
    if (!formValues.examType) {
      message.error('Please fill the Examination Type');
      return;
    }
    if (!formValues.totalMarks) {
      message.error('Please fill the Total Marks');
      return;
    }
    if (!formValues.duration) {
      message.error('Please fill the Duration');
      return;
    }
    if (selectedTypes.length === 0) {
      message.error('Please select at least one Question Type');
      return;
    }
    if (lockedAfterChoose) {
      message.warning('Random generation is locked after choosing questions manually');
      return;
    }
    setRandomOpen(true);
  };

  const handlePreview = () => {
    if (Object.keys(selectedQuestions).length === 0) {
      message.error('Please select at least one question');
      return;
    }
    setPreviewOpen(true);
  };

  const toggleQuestionSelection = (q: QuestionItem, newMarks?: number) => {
    setSelectedQuestions(prev => {
      const next = { ...prev } as Record<string, number>;
      const isAdding = !(q.id in next) || (typeof newMarks === 'number' && (newMarks as number) !== next[q.id]);
      const proposedMarks = typeof newMarks === 'number' ? (newMarks as number) : (next[q.id] ?? q.defaultMarks);

      if (!(q.id in next)) {
        // adding
        const sumIfAdd = Object.entries(next).reduce((a, [, m]) => a + (Number(m) || 0), 0) + (proposedMarks || 0);
        if (totalMarksField && sumIfAdd > totalMarksField) {
          Modal.warning({ title: 'Total marks exceeded', content: 'This selection exceeds Total Mark. Adjust marks or deselect another question.' });
          return prev;
        }
        next[q.id] = proposedMarks;
      } else {
        if (typeof newMarks === 'number') {
          // editing marks
          const sumIfEdit = Object.entries(next).reduce((a, [id, m]) => a + (id === q.id ? (Number(newMarks) || 0) : (Number(m) || 0)), 0);
          if (totalMarksField && sumIfEdit > totalMarksField) {
            Modal.warning({ title: 'Total marks exceeded', content: 'Edited marks exceed Total Mark. Reduce marks or remove some questions.' });
            return prev;
          }
          next[q.id] = newMarks;
        } else {
          // removing
          delete next[q.id];
        }
      }
      return next;
    });
  };

  const enforceTotalMarks = () => {
    const sum = Object.values(selectedQuestions).reduce((a, b) => a + (Number(b) || 0), 0);
    if (totalMarksField && sum > totalMarksField) {
      Modal.warning({
        title: 'Total marks exceeded',
        content: 'Selected questions total exceeds Total Mark. Please adjust marks or selections.',
      });
      return false;
    }
    return true;
  };

  const handleConfirmChoose = () => {
    if (!enforceTotalMarks()) return;
    setShowChooser(false);
  };

  const [randomConfig, setRandomConfig] = useState<Record<QuestionType, { count: number; marks: number }>>({
    'shortanswer': { count: 0, marks: 2 },
    'essay': { count: 0, marks: 8 },
    'fillblank': { count: 0, marks: 1 },
    'mcq': { count: 0, marks: 2 },
    'Image': { count: 0, marks: 3 },
  });

  const applyRandomGeneration = async () => {
    const formValues = form.getFieldsValue();
    
    // Validate required fields
    if (!formValues.class) {
      message.error('Please fill the Class');
      return;
    }
    if (!formValues.subject) {
      message.error('Please fill the Subject');
      return;
    }
    if (!formValues.book) {
      message.error('Please fill the Book');
      return;
    }
    if (!formValues.chapters || formValues.chapters.length === 0) {
      message.error('Please select at least one Chapter');
      return;
    }
    if (!formValues.examType) {
      message.error('Please fill the Examination Type');
      return;
    }
    if (!formValues.totalMarks) {
      message.error('Please fill the Total Marks');
      return;
    }
    if (!formValues.duration) {
      message.error('Please fill the Duration');
      return;
    }

    // Calculate total marks from random config
    const calculatedTotalMarks = selectedTypes.reduce((total, type) => {
      const config = randomConfig[type];
      return total + (config.count * config.marks);
    }, 0);

    // Validate total marks if totalMarksField is set
    if (totalMarksField && calculatedTotalMarks !== totalMarksField) {
      Modal.warning({
        title: 'Total marks mismatch',
        content: `Calculated marks (${calculatedTotalMarks}) does not match the configured total marks (${totalMarksField}). Please adjust the count or marks per question to match exactly.`,
        okText: 'OK'
      });
      return;
    }

    // Check if at least one question type has count > 0
    const hasQuestions = selectedTypes.some(type => randomConfig[type].count > 0);
    if (!hasQuestions) {
      message.error('Please set at least one question count greater than 0');
      return;
    }

    // Get book name from selected book ID
    const selectedBookName = booksOptions.find(book => book.value === formValues.book)?.label || formValues.book;
    
    // Get chapter names from selected chapter IDs and format as chapter1,chapter2
    const selectedChapterNames = Array.isArray(formValues.chapters) 
      ? formValues.chapters.map(chapterId => 
          chaptersOptions.find(chapter => chapter.value === chapterId)?.label || chapterId
        )
      : [formValues.chapters];
    
    // Prepare query parameters
    const query = {
      subject: formValues.subject,
      className: formValues.class,
      book: selectedBookName,
      chapters: selectedChapterNames.join(','),
      mcqCount: randomConfig['mcq'].count || 0,
      shortAnswerCount: randomConfig['shortanswer'].count || 0,
      essayCount: randomConfig['essay'].count || 0,
      fillInTheBlankCount: randomConfig['fillblank'].count || 0,
      imageCount: randomConfig['Image'].count || 0
    };

    try {
      message.loading('Generating random questions...', 0);
      
      const data = await GET("/random-gen", query);
      
      // Process the response and update selected questions
      if (data && data.questions && Array.isArray(data.questions)) {
        const next: Record<string, number> = {};
        const generatedQuestions: QuestionItem[] = [];
        
        data.questions.forEach((question: any) => {
          const questionId = question.questionId || question.id || question._id;
          const questionType = question.questionType === 'image' ? 'Image' : 
                              question.questionType === 'shortAnswer' ? 'shortanswer' :
                              question.questionType === 'longAnswer' ? 'essay' :
                              question.questionType === 'fillInTheBlank' ? 'fillblank' :
                              question.questionType;
          
          // Use the marks configured in the random generate modal, not from API response
          const configuredMarks = randomConfig[questionType as QuestionType]?.marks || 1;
          next[questionId] = configuredMarks;
          
          // Store the question data for display
          generatedQuestions.push({
            id: questionId,
            type: questionType as QuestionType,
            text: question.question,
            imageUrl: question.imageUrl,
            defaultMarks: configuredMarks,
            options: question.options || []
          });
        });
        
        // Update the questions data and selected questions
        setQuestionsData(generatedQuestions);
        setSelectedQuestions(next);
        setLockedAfterRandom(true);
        setRandomOpen(false);
        setShowGeneratedQuestionsModal(true);
        message.destroy();
        message.success(`Generated ${data.questions.length} questions successfully!`);
      } else {
        message.destroy();
        message.error('No questions returned from the API');
      }
    } catch (error) {
      console.error('Failed to generate random questions:', error);
      message.destroy();
      message.error('Failed to generate random questions. Please try again.');
    }
  };

  const resetLockedState = () => {
    setLockedAfterRandom(false);
    setLockedAfterChoose(false);
  };

  const handleClearAll = () => {
    // Reset form
    form.resetFields();
    
    // Reset all states
    setSelectedTypes([]);
    setShowChooser(false);
    setRandomOpen(false);
    setPreviewOpen(false);
    setSelectedQuestions({});
    setLockedAfterRandom(false);
    setLockedAfterChoose(false);
    setPage(1);
    setPageSize(8);
    setModalFilterTypes([]);
    
    // Reset random config
    setRandomConfig({
      'shortanswer': { count: 0, marks: 2 },
      'essay': { count: 0, marks: 8 },
      'fillblank': { count: 0, marks: 1 },
      'mcq': { count: 0, marks: 2 },
      'Image': { count: 0, marks: 3 },
    });
    
    message.success('All data cleared successfully');
  };

  // Function to save examination data to API
  const saveExaminationData = async () => {
    const formValues = form.getFieldsValue();
    
    // Get book name from selected book ID
    const selectedBookName = booksOptions.find(book => book.value === formValues.book)?.label || formValues.book;
    
    // Get chapter names from selected chapter IDs
    const selectedChapterNames = Array.isArray(formValues.chapters) 
      ? formValues.chapters.map(chapterId => 
          chaptersOptions.find(chapter => chapter.value === chapterId)?.label || chapterId
        )
      : [formValues.chapters];
    
    // Format questions data for API
    const formattedQuestions = Object.entries(selectedQuestions).map(([questionId, marks]) => {
      const question = questionsData.find(q => q.id === questionId);
      if (!question) return null;
      
      const baseQuestion = {
        question: question.text,
        questionType: question.type === 'Image' ? 'image' : question.type,
        mark: marks
      };
      
      // Add options for MCQ questions
      if (question.type === 'mcq' && question.options) {
        return {
          ...baseQuestion,
          options: question.options.map((option: any) => option.text || option)
        };
      }
      
      return baseQuestion;
    }).filter(Boolean);
    
    const payload = {
      schoolId: user?.id,
      subject: formValues.subject,
      class: formValues.class,
      book: selectedBookName,
      chapters: selectedChapterNames,
      examinationType: formValues.examType,
      totalMark: totalMarksField,
      duration: formValues.duration,
      schoolName: user?.displayName || user?.username || 'School',
      questions: formattedQuestions
    };
    
    try {
      setDownloadLoading(true);
      const response = await POST("/examinations", payload);
      console.log('Examination saved successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to save examination:', error);
      message.error('Failed to save examination data');
      throw error;
    } finally {
      setDownloadLoading(false);
    }
  };

  const handlePrintQuestionPaper = async () => {
    // Check if total selected marks match the total marks field
    if (totalMarksField && currentSumMarks !== totalMarksField) {
      Modal.warning({
        title: 'Marks Mismatch',
        content: `Total selected marks (${currentSumMarks}) does not match the total marks field (${totalMarksField}). Please adjust your question selections to match the total marks.`,
        okText: 'OK'
      });
      return;
    }

    try {
      // Save examination data to API first
      await saveExaminationData();
      message.success('Examination data saved successfully');
    } catch (error) {
      // If API call fails, don't proceed to print
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      message.error("Popup blocked. Please allow popups for this site.");
      return;
    }
    
    const paperTitle = `${formValues?.examType || 'Examination'} - ${formValues?.class || ''} ${formValues?.subject || ''}`.trim();
    const sectionsHtml = (['shortanswer', 'essay', 'fillblank', 'mcq', 'Image'] as QuestionType[])
      .filter(type => organizedQuestions[type].length > 0)
      .map(type => `
        <div class="section">
          <div class="section-title">Section: ${type}</div>
          ${organizedQuestions[type].map(({ question, marks }, sectionIndex) => `
            <div class="question">
              <div class="question-no">${sectionIndex + 1}.</div>
              <div class="question-content">
                <div class="question-text">${question.text}</div>
                ${(question.type === 'Image' || question.type === 'image') && question.imageUrl ? `
                  <div class="question-image">
                    <img src="${question.imageUrl}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" />
                  </div>
                ` : ''}
                ${question.type === 'mcq' && question.options ? `
                  <div class="question-options" style="margin-top: 10px;">
                    ${question.options.map((option, index) => `
                      <div style="margin: 5px 0;">${String.fromCharCode(65 + index)}. ${option.text || option}</div>
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
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
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
              /* Allow sections to flow across pages; do not force breaks */
              .section { page-break-inside: auto; break-inside: auto; }
              /* Keep an individual question together on the same page */
              .question { page-break-inside: avoid; break-inside: avoid; margin: 10px 0; }
              .question-image img { max-width: 250px; max-height: 150px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${paperTitle}</div>
      
          </div>
          <div class="info">
            <div><strong>Time Allowed:</strong> ${formValues?.duration || 60} Minutes</div>
            <div><strong>Maximum Marks:</strong> ${totalMarksField}</div>
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
        
        // Navigate to mypapers after download is triggered
        setTimeout(() => {
          navigate('/mypapers');
        }, 2000); // Wait 2 seconds for download to start
        
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

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#007575' } }}>
      <div className="space-y-6 font-local2">
        <Card className="shadow-sm border border-gray-200 p-3 md:p-6 font-local2">
          <Title level={4} className="!mb-4 text-gray-700 font-local2">Create Paper</Title>
        <Form form={form} layout="vertical"  className="font-local2">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Class" name="class"  required={false}  rules={[{ required: true, message: 'Please select class' }]}> 
                <Select
                  size="large"
                  showSearch
                  allowClear
                  placeholder="Select class"
                  options={classOptions.map(c => ({ label: c, value: c }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Subject" name="subject"  required={false}  rules={[{ required: true, message: 'Please select subject' }]}> 
                <Select
                  size="large"
                  showSearch
                  allowClear
                  placeholder="Select subject"
                  options={subjectsOptions}
                  loading={subjectsLoading}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Book" name="book"  required={false}  rules={[{ required: true, message: 'Please select book' }]}> 
                <Select
                  size="large"
                  showSearch
                  allowClear
                  placeholder="Select book"
                  options={booksOptions}
                  loading={booksLoading}
                  disabled={!selectedClass || !selectedSubject}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Chapters" name="chapters"  required={false}  rules={[{ required: true, message: 'Please select chapters' }]}> 
                <Select
                  size="large"
                  mode="multiple"
                  showSearch
                  allowClear
                  placeholder="Select chapters"
                  options={chaptersOptions}
                  loading={chaptersLoading}
                  disabled={!selectedClass || !selectedSubject || !selectedBook}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Examination Type" name="examType"  required={false}  rules={[{ required: true, message: 'Please select exam type' }]}> 
                <Select
                  size="large"
                  showSearch
                  placeholder="Select examination type"
                  options={examTypes.map(e => ({ label: e, value: e }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={4}>
              <Form.Item label="Total Mark" name="totalMarks"  required={false}  rules={[{ required: true }]}>
                <InputNumber min={1} max={999} size="large" className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={4}>
              <Form.Item label="Duration (min)" name="duration"  required={false}  rules={[{ required: true }]}>
                <InputNumber min={1} max={999} size="large" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Divider className="mt-0" />

          <div>
            <div className="mb-2 text-gray-700 font-medium">Question Types</div>
            <Checkbox.Group
              options={[
                { label: 'Short Answer', value: 'shortanswer' },
                { label: 'Essay', value: 'essay' },
                { label: 'Fill in the blank', value: 'fillblank' },
                { label: 'Multiple Choice', value: 'mcq' },
                { label: 'Image', value: 'Image' },
              ]}
              value={selectedTypes}
              onChange={(vals) => { setSelectedTypes(vals as QuestionType[]); }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button type="primary" onClick={handleChooseQuestions} disabled={lockedAfterRandom || chooseLoading} loading={chooseLoading} className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2">
              Choose Questions
            </Button>
            <Button type="primary" onClick={handleRandomGenerate} disabled={lockedAfterChoose} className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2">
              Random Generate
            </Button>
            <Button onClick={handleClearAll} className="bg-red-500 hover:!bg-red-500 border-none text-white hover:!text-white font-local2">
              Clear All
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <div>Selected Questions: {Object.keys(selectedQuestions).length}</div>
            <div>Total Selected Marks: {currentSumMarks} {totalMarksField ? `(of ${totalMarksField})` : ''}</div>
            <Button type="primary"   onClick={handlePreview} 
              disabled={Object.keys(selectedQuestions).length === 0} className="bg-green-500 hover:!bg-green-500 border-none text-white hover:text-white font-local2 mt-5">
              Generate Paper
            </Button>
          </div>
        </Form>
        </Card>

      {showChooser && (
        <div ref={chooserRef}>
        <Card className="shadow-sm border border-gray-200 p-3 md:p-6 font-local2">
          <div className="space-y-4 font-local2" ref={topRef}>
            <div className="text-sm text-gray-600">Select questions by type and adjust marks. Matching type shows images.</div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-gray-700 font-medium text-sm">Filter question types</div>
              <div className="flex flex-wrap gap-2">
                {(['shortanswer','essay','fillblank','mcq','Image'] as QuestionType[]).map(t => (
                  <Button
                    key={`flt-${t}`}
                    size="small"
                    disabled={!selectedTypes.includes(t)}
                    onClick={async () => {
                      setPage(1);
                      const newFilterTypes = modalFilterTypes.includes(t) ? modalFilterTypes.filter(x => x !== t) : [...modalFilterTypes, t];
                      setModalFilterTypes(newFilterTypes);
                      
                      try {
                        setFilterLoading(true);
                        // If no filters selected, show all selectedTypes
                        if (newFilterTypes.length === 0) {
                          setModalFilterTypes([]);
                          await fetchQuestions(1, pageSize, selectedTypes);
                          return;
                        }

                        // Trigger API call with new filter types explicitly
                        await fetchQuestions(1, pageSize, newFilterTypes);
                      } finally {
                        setFilterLoading(false);
                      }
                    }}
                    className={`font-local2 ${modalFilterTypes.includes(t) ? 'bg-gradient-to-br from-[#007575] to-[#339999] text-white border-none hover:!bg-gradient-to-br hover:!from-[#007575] hover:!to-[#339999] hover:!text-white' : ''}`}
                  >
                    {t}
                  </Button>
                ))}
  
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(questionsLoading || filterLoading) && (
                <div className="flex justify-center items-center py-8">
                  <Spin />
                </div>
              )}
              {!questionsLoading && !filterLoading && paginatedQuestions.length === 0 && (
                <div className="text-center text-gray-500 py-8">No questions found</div>
              )}
              {!questionsLoading && !filterLoading && paginatedQuestions.map((q, index) => {
                const checked = q.id in selectedQuestions;
                const currentMarks = selectedQuestions[q.id] ?? q.defaultMarks;
                const questionNumber = getQuestionNumber(index);
                return (
                  <Card key={q.id} className={`border ${checked ? 'border-blue-400' : 'border-gray-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-sm font-semibold text-gray-600 min-w-[30px]">
                        {questionNumber}.
                      </div>
                      <div className="flex-1">
                        <div className="text-xs uppercase text-gray-500">{q.type}</div>
                        <div className="text-gray-800">{q.text}</div>
                        {q.type === 'mcq' && q.options && (
                          <div className="text-xs text-gray-600 mt-2">
                            {q.options.map((option: any, index: number) => (
                              <div key={index}>
                                {String.fromCharCode(65 + index)}. {option.text || option}
                              </div>
                            ))}
                          </div>
                        )}
                        {(q.type === 'Image' || q.type === 'image') && q.imageUrl && (
                          <div className="mt-2">
                            <img src={q.imageUrl} alt="Question Image" className="w-48 h-32 object-cover rounded border" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          <Checkbox checked={checked} onChange={() => toggleQuestionSelection(q)} className="font-local2">
                            Choose
                          </Checkbox>
                          <div className="flex items-center gap-2">
                            <Text type="secondary" className="text-xs">Marks:</Text>
                            <InputNumber min={1} max={100} value={currentMarks} onChange={(val) => toggleQuestionSelection(q, Number(val) || q.defaultMarks)} size="small" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="flex justify-center">
              <Pagination 
                current={page} 
                pageSize={pageSize} 
                total={totalQuestions} 
                onChange={async (p, ps) => { 
                  const newPage = p;
                  const newPageSize = ps || pageSize;
                  
                  // Update states
                  setPage(newPage);
                  if (ps && ps !== pageSize) {
                    setPageSize(newPageSize);
                  }
                  
                  // Fetch questions with the new parameters immediately
                  await fetchQuestions(newPage, newPageSize);
                }} 
                showSizeChanger 
                pageSizeOptions={['10', '20', '50']}
                className="font-local2" 
              />
            </div>
            <Divider className="my-2" />
            <div className="flex items-center justify-between">
              <div className="text-gray-700">Total Selected Marks: {currentSumMarks}</div>
              {totalMarksField && currentSumMarks > totalMarksField && (
                <div className="text-red-500 text-sm">Exceeds Total Mark</div>
              )}
            </div>
          
          </div>
        </Card>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        title={
          <div className="flex items-center justify-between">
            <span>Question Paper Preview</span>
            <Button
              type="primary"
              icon={<Download size={16} />}
              onClick={handlePrintQuestionPaper}
              loading={downloadLoading}
              disabled={downloadLoading}
              className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2"
            >
              {downloadLoading ? 'Saving...' : 'Download PDF'}
            </Button>
          </div>
        }
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width={800}
        className="font-local2"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold">
              {formValues?.examType || 'Examination'} - {formValues?.class || ''} {formValues?.subject || ''}
            </h2>
            {/* <p className="text-gray-600 mt-2">
              {formValues?.book || ''} {formValues?.chapters?.length ? `- ${formValues.chapters.join(', ')}` : ''}
            </p> */}
            <div className="flex justify-between mt-3 text-sm">
              <span><strong>Time:</strong> {formValues?.duration || 60} minutes</span>
              <span><strong>Total Marks:</strong> {currentSumMarks}</span>
            </div>
          </div>
          
          {(['shortanswer', 'essay', 'fillblank', 'mcq', 'Image'] as QuestionType[]).map(type => {
            const questionsOfType = organizedQuestions[type];
            if (questionsOfType.length === 0) return null;
            
            return (
              <div key={type} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold text-center mb-3 text-[#007575]">
                  Section: {type}
                </h3>
                <div className="space-y-3">
                  {questionsOfType.map(({ question, marks }, sectionIndex) => (
                    <div key={question.id} className="flex justify-between items-start gap-3 p-3 border rounded">
                      <div className="flex gap-3 flex-1">
                        <span className="font-semibold min-w-[30px]">{sectionIndex + 1}.</span>
                        <div className="flex-1">
                          <div>{question.text}</div>
                          {(question.type === 'Image' || question.type === 'image') && question.imageUrl && (
                            <div className="mt-2">
                              <img src={question.imageUrl} alt="Question" className="w-40 h-28 object-cover rounded border" />
                            </div>
                          )}
                          {question.type === 'mcq' && question.options && (
                            <div className="mt-2 space-y-1">
                              {question.options.map((option, index) => (
                                <div key={index} className="text-sm text-gray-700">
                                  {String.fromCharCode(65 + index)}. {option.text || option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-600 text-lg">[{marks}]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Random Generate Modal */}
      <Modal
        title="Random Generate"
        open={randomOpen}
        onCancel={() => setRandomOpen(false)}
        onOk={applyRandomGeneration}
        okText="Generate"
        okButtonProps={{ className: 'bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2' }}
        cancelButtonProps={{ className: 'bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2' }}
        destroyOnClose
      >
        <div className="space-y-4 font-local2">
          <div className="text-sm text-gray-600">Set how many questions of each selected type to add and the marks per question. After generation, editing will be locked.</div>
          {selectedTypes.map(t => {
            return (
              <Card key={t} className="border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-gray-800 font-medium">{t}</div>
                    <div className="text-xs text-gray-500">
                      Configure count and marks
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Text type="secondary" className="text-xs whitespace-nowrap">Count:</Text>
                      <Input 
                        type="number"
                        min={0} 
                        value={randomConfig[t].count} 
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = value === '' ? 0 : parseInt(value, 10);
                          if (!isNaN(numValue) && numValue >= 0) {
                            setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], count: numValue } }));
                          }
                        }}
                        size="small"
                        style={{ width: 80 }}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Text type="secondary" className="text-xs whitespace-nowrap">Marks:</Text>
                      <Input 
                        type="number"
                        min={1} 
                        max={100} 
                        value={randomConfig[t].marks} 
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = value === '' ? 1 : parseInt(value, 10);
                          if (!isNaN(numValue) && numValue >= 1) {
                            setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], marks: numValue } }));
                          }
                        }}
                        size="small"
                        style={{ width: 80 }}
                        placeholder="1"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          <Divider className="my-2" />
          <div className="space-y-2">
            <div className="text-gray-700 text-sm">Total Mark limit: {totalMarksField || '-'}</div>
            <div className="text-gray-700 text-sm">
              Current calculated marks: {
                selectedTypes.reduce((total, type) => {
                  const config = randomConfig[type];
                  return total + (config.count * config.marks);
                }, 0)
              }
            </div>
            {totalMarksField && (
              <div className={`text-sm font-medium ${
                selectedTypes.reduce((total, type) => {
                  const config = randomConfig[type];
                  return total + (config.count * config.marks);
                }, 0) === totalMarksField ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedTypes.reduce((total, type) => {
                  const config = randomConfig[type];
                  return total + (config.count * config.marks);
                }, 0) === totalMarksField ? '✓ Marks match perfectly!' : '⚠ Marks do not match - adjust count or marks per question'}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Generated Questions Display Modal */}
      <Modal
        title="Generated Questions"
        open={showGeneratedQuestionsModal}
        onCancel={() => setShowGeneratedQuestionsModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowGeneratedQuestionsModal(false)} className="font-local2">
            Close
          </Button>,
          <Button 
            key="preview" 
            type="primary" 
            onClick={() => {
              setShowGeneratedQuestionsModal(false);
              setPreviewOpen(true);
            }}
            className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2"
          >
            Preview Paper
          </Button>
        ]}
        width={900}
        className="font-local2"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="text-center border-b pb-4">
            <h3 className="text-lg font-bold text-[#007575]">Generated Questions</h3>
            <div className="flex justify-center gap-6 mt-3 text-sm">
              <span><strong>Total Questions:</strong> {Object.keys(selectedQuestions).length}</span>
              <span><strong>Total Marks:</strong> {currentSumMarks}</span>
            </div>
          </div>
          
          {(['shortanswer', 'essay', 'fillblank', 'mcq', 'Image'] as QuestionType[]).map(type => {
            const questionsOfType = questionsData.filter(q => q.type === type && q.id in selectedQuestions);
            if (questionsOfType.length === 0) return null;
            
            return (
              <div key={type} className="border rounded-lg p-4">
                <h4 className="text-md font-semibold mb-3 text-[#007575] border-b pb-2">
                  Section: {type} ({questionsOfType.length} questions)
                </h4>
                <div className="space-y-3">
                  {questionsOfType.map((question, index) => (
                    <div key={question.id} className="flex justify-between items-start gap-3 p-3 border rounded bg-gray-50">
                      <div className="flex gap-3 flex-1">
                        <span className="font-semibold min-w-[30px]">{index + 1}.</span>
                        <div className="flex-1">
                          <div className="text-gray-800">{question.text}</div>
                          {(question.type === 'Image' || question.type === 'image') && question.imageUrl && (
                            <div className="mt-2">
                              <img src={question.imageUrl} alt="Question" className="w-48 h-32 object-cover rounded border" />
                            </div>
                          )}
                          {question.type === 'mcq' && question.options && question.options.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="text-sm text-gray-700">
                                  {String.fromCharCode(65 + optIndex)}. {option.text || option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-600 text-lg">[{selectedQuestions[question.id]} marks]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      </div>
    </ConfigProvider>
  );
};

export default Paper;