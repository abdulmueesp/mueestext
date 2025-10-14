
// @ts-nocheck
import { useMemo, useRef, useState, useEffect } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, InputNumber, Modal, Pagination, Row, Select, Typography, message, ConfigProvider } from 'antd';
import { Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import img1 from "../../../../assets/match2.jpeg"
import img2 from "../../../../assets/matching.png"
import { API, GET } from "../../../../Components/common/api";
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

const baseQuestions: QuestionItem[] = [
  { id: 'S1', type: 'Short Answer', text: 'Define photosynthesis.', defaultMarks: 2 },
  { id: 'S2', type: 'Short Answer', text: 'What is a noun?', defaultMarks: 2 },
  { id: 'E1', type: 'Essay', text: 'Explain the water cycle in detail.', defaultMarks: 10 },
  { id: 'E2', type: 'Essay', text: 'Describe your favorite festival.', defaultMarks: 8 },
  { id: 'M1', type: 'Matching', text: 'Match the animals to their habitats.', imageUrl:img1, defaultMarks: 4 },
  { id: 'M2', type: 'Matching', text: 'Match states to their capitals.', imageUrl:img2, defaultMarks: 4 },
  { id: 'F1', type: 'Fill in the blank', text: 'Water boils at ____ degrees Celsius.', defaultMarks: 1 },
  { id: 'F2', type: 'Fill in the blank', text: 'The capital of France is ____.', defaultMarks: 1 },
  { id: 'F3', type: 'Fill in the blank', text: 'Plants make food by a process called ____.', defaultMarks: 1 },
  { id: 'F4', type: 'Fill in the blank', text: 'The largest planet in our solar system is ____.', defaultMarks: 1 },
  { id: 'MCQ1', type: 'Multiple Choice', text: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], defaultMarks: 2 },
  { id: 'MCQ2', type: 'Multiple Choice', text: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], defaultMarks: 2 },
  { id: 'MCQ3', type: 'Multiple Choice', text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], defaultMarks: 1 },
  { id: 'MCQ4', type: 'Multiple Choice', text: 'Which is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], defaultMarks: 2 },
  { id: 'MCQ5', type: 'Multiple Choice', text: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], defaultMarks: 2 },
];

const allQuestions: QuestionItem[] = (() => {
  const many: QuestionItem[] = [];
  for (let i = 0; i < 10; i++) {
    baseQuestions.forEach((q) => {
      many.push({ ...q, id: `${q.id}_${i + 1}` });
    });
  }
  return many;
})();

const chapterOptions = [
  'Basics',
  'Numbers',
  'Plants',
  'Animals',
  'Our Earth',
  'Grammar',
];

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const Paper = () => {
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
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
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

  // Fetch questions when filter types change
  useEffect(() => {
    if (modalFilterTypes.length > 0 && questionsData.length > 0) {
      fetchQuestions();
    }
  }, [modalFilterTypes]);

  // Fetch questions from API
  const fetchQuestions = async (customPage?: number, customPageSize?: number) => {
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
      
      // Use modalFilterTypes if available, otherwise use selectedTypes
      const filterTypes = modalFilterTypes.length > 0 ? modalFilterTypes : selectedTypes;
      
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

  const availableQuestions = useMemo(() => {
    if (selectedTypes.length === 0) return [] as QuestionItem[];
    return questionsData;
  }, [selectedTypes, questionsData]);

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
    if (selectedTypes.length === 0) {
      message.error('Please select at least one Question Type');
      return;
    }
    if (lockedAfterRandom) {
      message.warning('Questions are locked after random generation');
      return;
    }
    
    // Fetch questions from API
    await fetchQuestions();
    
    setLockedAfterChoose(true);
    setShowChooser(true);
    requestAnimationFrame(() => {
      chooserRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

  const applyRandomGeneration = () => {
    // Build a selection using available pool per type
    const next: Record<string, number> = {};
    let totalGeneratedMarks = 0;
    
    // First, check if we have enough questions in the pool for each type
    for (const t of selectedTypes) {
      const pool = allQuestions.filter(q => q.type === t);
      const cfg = randomConfig[t];
      
      if (pool.length < cfg.count) {
        Modal.warning({
          title: 'Insufficient Questions',
          content: `Not enough ${t} questions available. Required: ${cfg.count}, Available: ${pool.length}. Please reduce the count or add more questions.`,
          okText: 'OK'
        });
        return;
      }
    }
    
    // Generate questions for each type
    selectedTypes.forEach(t => {
      const pool = allQuestions.filter(q => q.type === t);
      const cfg = randomConfig[t];
      
      // Shuffle the pool to get random selection
      const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
      
      let picked = 0;
      for (let i = 0; i < shuffledPool.length && picked < cfg.count; i++) {
        const q = shuffledPool[i];
        next[q.id] = cfg.marks;
        totalGeneratedMarks += cfg.marks;
        picked++;
      }
    });
    
    // Check if total marks exceed the configured total marks
    if (totalMarksField && totalGeneratedMarks > totalMarksField) {
      Modal.warning({
        title: 'Total marks exceeded',
        content: 'Randomly generated questions exceed Total Mark. Reduce counts or marks.',
      });
      return;
    }
    
    // Check if total marks don't match the configured total marks exactly
    if (totalMarksField && totalGeneratedMarks !== totalMarksField) {
      Modal.warning({
        title: 'Total marks mismatch',
        content: `Generated questions total marks (${totalGeneratedMarks}) does not match the configured total marks (${totalMarksField}). Please adjust the count or marks per question to match exactly.`,
        okText: 'OK'
      });
      return;
    }
    
    setSelectedQuestions(next);
    setLockedAfterRandom(true);
    setRandomOpen(false);
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

  const handlePrintQuestionPaper = () => {
    // Check if total selected marks match the total marks field
    if (totalMarksField && currentSumMarks !== totalMarksField) {
      Modal.warning({
        title: 'Marks Mismatch',
        content: `Total selected marks (${currentSumMarks}) does not match the total marks field (${totalMarksField}). Please adjust your question selections to match the total marks.`,
        okText: 'OK'
      });
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
                <InputNumber min={1} max={999} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={4}>
              <Form.Item label="Duration (min)" name="duration"  required={false}  rules={[{ required: true }]}>
                <InputNumber min={1} max={999} className="w-full" />
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
              onChange={(vals) => { setSelectedTypes(vals as QuestionType[]); if (lockedAfterRandom || lockedAfterChoose) resetLockedState(); }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button type="primary" onClick={handleChooseQuestions} disabled={lockedAfterRandom} className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2">
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
                      
                      // If no filters selected, show all question types
                      if (newFilterTypes.length === 0) {
                        setModalFilterTypes([]);
                        return;
                      }
                      
                      // Trigger API call with new filter
                      await fetchQuestions(1, pageSize);
                    }}
                    className={`font-local2 ${modalFilterTypes.includes(t) ? 'bg-gradient-to-br from-[#007575] to-[#339999] text-white border-none hover:!bg-gradient-to-br hover:!from-[#007575] hover:!to-[#339999] hover:!text-white' : ''}`}
                  >
                    {t}
                  </Button>
                ))}
  
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {paginatedQuestions.map((q, index) => {
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
              className="bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2"
            >
              Download PDF
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
        okText="Ok"
        okButtonProps={{ className: 'bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2' }}
        cancelButtonProps={{ className: 'bg-gradient-to-br from-[#007575] to-[#339999] border-none text-white font-local2' }}
        destroyOnClose
      >
        <div className="space-y-4 font-local2">
          <div className="text-sm text-gray-600">Set how many questions of each selected type to add and the marks per question. After generation, editing will be locked.</div>
          {selectedTypes.map(t => {
            const availableCount = allQuestions.filter(q => q.type === t).length;
            const isExceedingAvailable = randomConfig[t].count > availableCount;
            
            return (
              <Card key={t} className={`border ${isExceedingAvailable ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-gray-800 font-medium">{t}</div>
                    <div className="text-xs text-gray-500">
                      Configure count and marks
                      {isExceedingAvailable && (
                        <span className="text-red-500 ml-1">(Max available: {availableCount})</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-2">
                      <Text type="secondary" className="text-xs">Count</Text>
                      <InputNumber 
                        min={0} 
                        max={availableCount} 
                        value={randomConfig[t].count} 
                        onChange={(v) => setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], count: Number(v) || 0 } }))}
                        status={isExceedingAvailable ? 'error' : undefined}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Text type="secondary" className="text-xs">Marks</Text>
                      <InputNumber min={1} max={100} value={randomConfig[t].marks} onChange={(v) => setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], marks: Number(v) || 1 } }))} />
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
      </div>
    </ConfigProvider>
  );
};

export default Paper;