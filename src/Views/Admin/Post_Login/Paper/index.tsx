
// @ts-nocheck
import { useMemo, useRef, useState, useEffect } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Pagination, Row, Select, Typography, message, ConfigProvider, Spin } from 'antd';
import { Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API, GET, POST } from "../../../../Components/common/api";
const { Title, Text } = Typography;

type QuestionType = 'multiplechoice' | 'direct' | 'answerthefollowing' | 'picture';
type MCQSubtype = 'choose_from_brackets' | 'tick_correct' | 'choose_correct';
type DirectSubtype = 'fill_in_blanks' | 'true_or_false' | 'name_following' | 'tick_odd_one' | 'match_following' | 'give_one_word';
type AnswerFollowingSubtype = 'define_following' | 'short_answer' | 'long_answer' | 'paragraph_writing' | 'essay_writing' | 'letter_writing';
type PictureSubtype = 'identify_pictures' | 'look_and_answer' | 'describe_picture';

interface QuestionItem {
  id: string;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  defaultMarks: number;
  options?: string[];
  mcqSubtype?: MCQSubtype;
  directSubtype?: DirectSubtype;
  answerFollowingSubtype?: AnswerFollowingSubtype;
  pictureSubtype?: PictureSubtype;
}

const classOptions = ['0', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'];
const examTypes = [
  { label: 'UNIT TEST', value: 'UNIT TEST' },
  { label: 'FIRST MID TERM', value: 'FIRST MID TERM' },
  { label: 'FIRST TERM', value: 'FIRST TERM' },
  { label: 'SECOND MID TERM', value: 'SECOND MID TERM' },
  { label: 'SECOND TERM', value: 'SECOND TERM' },
  { label: 'THIRD MID TERM', value: 'THIRD MID TERM' },
  { label: 'THIRD TERM', value: 'THIRD TERM' }
];

const mcqSubtypeOptions = [
  { label: 'Choose the correct answer from the brackets and fill in the blanks', value: 'choose_from_brackets' },
  { label: 'Tick the correct answers', value: 'tick_correct' },
  { label: 'Choose the correct answers', value: 'choose_correct' }
];

const directSubtypeOptions = [
  { label: 'Fill in the blanks with correct answers', value: 'fill_in_blanks' },
  { label: 'Write true or false', value: 'true_or_false' },
  { label: 'Name the following', value: 'name_following' },
  { label: 'Tick the odd one in the following', value: 'tick_odd_one' },
  { label: 'Match the following', value: 'match_following' },
  { label: 'Give one word of the following', value: 'give_one_word' }
];

const answerFollowingSubtypeOptions = [
  { label: 'Define the following', value: 'define_following' },
  { label: 'Short Answer Questions', value: 'short_answer' },
  { label: 'Long Answer Questions', value: 'long_answer' },
  { label: 'Paragraph Writing', value: 'paragraph_writing' },
  { label: 'Essay Writing', value: 'essay_writing' },
  { label: 'Letter Writing', value: 'letter_writing' }
];

const pictureSubtypeOptions = [
  { label: 'Identity the pictures', value: 'identify_pictures' },
  { label: 'Look at the pictures and answer the following', value: 'look_and_answer' },
  { label: 'Describe the following picture', value: 'describe_picture' }
];

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Convert number to Roman numeral
const toRomanNumeral = (num: number): string => {
  const romanNumerals: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  
  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

// Convert minutes to hours and minutes format
const formatDuration = (minutes: number): string => {
  if (!minutes || minutes <= 0) return '0 minutes';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
  }
  
  // Check if minutes is 30 for "1/2" format
  if (mins === 30) {
    return `${hours} 1/2 ${hours === 1 ? 'hr' : 'hrs'}`;
  }
  
  return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
};

// Get standard label (Roman numeral for numeric classes)
const getStdLabel = (classValue?: string | number) => {
  if (classValue === undefined || classValue === null || classValue === '') return '-';
  const parsed = Number(classValue);
  if (!Number.isNaN(parsed) && parsed > 0) {
    return toRomanNumeral(parsed);
  }
  return String(classValue).toUpperCase();
};

// Get subject display with book name
const getSubjectDisplay = (subject?: string, book?: string) => {
  const cleanSubject = subject?.trim();
  const cleanBook = book?.trim();
  if (cleanSubject && cleanBook) return `${cleanSubject} (${cleanBook})`;
  if (cleanSubject) return cleanSubject;
  if (cleanBook) return cleanBook;
  return '';
};

// Check if class is 4 or below
const isClassFourOrBelow = (classValue?: string | number): boolean => {
  if (classValue === undefined || classValue === null || classValue === '') return false;
  const classStr = String(classValue);
  // Classes 4 and below: "0", "LKG", "UKG", "1", "2", "3", "4"
  const classesFourOrBelow = ['0', 'LKG', 'UKG', '1', '2', '3', '4'];
  return classesFourOrBelow.includes(classStr);
};

const Paper = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);
  const [showChooser, setShowChooser] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Record<string, number>>({});
  const [selectedQuestionsData, setSelectedQuestionsData] = useState<Record<string, QuestionItem>>({});
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
  const [mcqSubtype, setMcqSubtype] = useState<MCQSubtype | undefined>(undefined);
  const [directSubtype, setDirectSubtype] = useState<DirectSubtype | undefined>(undefined);
  const [answerFollowingSubtype, setAnswerFollowingSubtype] = useState<AnswerFollowingSubtype | undefined>(undefined);
  const [pictureSubtype, setPictureSubtype] = useState<PictureSubtype | undefined>(undefined);
  const chooserRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Get user from Redux
  const user = useSelector((state: any) => state.user.user);

  const totalMarksField = Form.useWatch('totalMarks', form) || 0;
  const formValues = Form.useWatch([], form);
  const selectedClass = Form.useWatch('class', form);
  const selectedSubject = Form.useWatch('subject', form);
  const selectedBook = Form.useWatch('book', form);

  // Ensure clean form state when landing on this page (after navigating back from My Papers, etc.)
  useEffect(() => {
    form.resetFields();
  }, [form]);

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
      setSelectedQuestionsData({});
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
      setSelectedQuestionsData({});
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
      
      // Map new question types to API format
      const mapTypeToAPI = (type: QuestionType): string => {
        const typeMap: Record<QuestionType, string> = {
          'multiplechoice': 'mcq',
          'direct': 'shortanswer',
          'answerthefollowing': 'essay',
          'picture': 'image'
        };
        return typeMap[type] || type;
      };
      
      const query = {
        limit: customPageSize || pageSize,
        page: customPage || page,
        className: formValues.class,
        subject: formValues.subject,
        book: selectedBookName,
        chapters: selectedChapterNames,
        questionTypes: filterTypes.map(type => mapTypeToAPI(type)).join(',')
      };
      const data = await GET("/qustion", query);
      
      // Map API response types back to new question types
      const mapAPIToType = (apiType: string): QuestionType => {
        if (apiType === 'image' || apiType === 'Image') return 'picture';
        if (apiType === 'mcq') return 'multiplechoice';
        if (apiType === 'shortanswer' || apiType === 'shortAnswer') return 'direct';
        if (apiType === 'essay' || apiType === 'longAnswer') return 'answerthefollowing';
        return apiType as QuestionType;
      };
      
      const questionsList = Array.isArray(data?.data)
        ? data.data.map((q: any) => ({
            id: q.questionId || q.id || q._id,
            type: mapAPIToType(q.questionType || q.type || 'direct'),
            text: q.question || q.text || q.title,
            imageUrl: q.imageUrl || q.image,
            defaultMarks: q.marks || q.defaultMarks || 1,
            options: q.options || q.choices,
            mcqSubtype: q.mcqSubtype,
            directSubtype: q.directSubtype,
            answerFollowingSubtype: q.answerFollowingSubtype,
            pictureSubtype: q.pictureSubtype
          }))
        : Array.isArray(data?.results)
          ? data.results.map((q: any) => ({
              id: q.id || q._id,
              type: mapAPIToType(q.questionType || q.type || 'direct'),
              text: q.question || q.text || q.title,
              imageUrl: q.imageUrl || q.image,
              defaultMarks: q.marks || q.defaultMarks || 1,
              options: q.options || q.choices,
              mcqSubtype: q.mcqSubtype,
              directSubtype: q.directSubtype,
              answerFollowingSubtype: q.answerFollowingSubtype,
              pictureSubtype: q.pictureSubtype
            }))
          : Array.isArray(data?.questions)
            ? data.questions.map((q: any) => ({
                id: q.id || q._id,
                type: mapAPIToType(q.questionType || q.type || 'direct'),
                text: q.question || q.text || q.title,
                imageUrl: q.imageUrl || q.image,
                defaultMarks: q.marks || q.defaultMarks || 1,
                options: q.options || q.choices,
                mcqSubtype: q.mcqSubtype,
                directSubtype: q.directSubtype,
                answerFollowingSubtype: q.answerFollowingSubtype,
                pictureSubtype: q.pictureSubtype
              }))
            : Array.isArray(data)
              ? data.map((q: any) => ({
                  id: q.id || q._id,
                  type: mapAPIToType(q.questionType || q.type || 'direct'),
                  text: q.question || q.text || q.title,
                  imageUrl: q.imageUrl || q.image,
                  defaultMarks: q.marks || q.defaultMarks || 1,
                  options: q.options || q.choices,
                  mcqSubtype: q.mcqSubtype,
                  directSubtype: q.directSubtype,
                  answerFollowingSubtype: q.answerFollowingSubtype,
                  pictureSubtype: q.pictureSubtype
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
      'multiplechoice': [],
      'direct': [],
      'answerthefollowing': [],
      'picture': []
    };
    
    let globalCounter = 1;
    
    // Process questions in the desired order of question types for preview/print
    (['multiplechoice', 'direct', 'answerthefollowing', 'picture'] as QuestionType[]).forEach(type => {
      const questionsOfType = Object.entries(selectedQuestions)
        .map(([id, marks]) => ({ 
          id, 
          marks, 
          question: selectedQuestionsData[id] || questionsData.find(q => q.id === id) 
        }))
        .filter(({ question }) => question && question.type === type)
        .sort((a, b) => a.id.localeCompare(b.id));
      
      questionsOfType.forEach(({ question, marks }) => {
        if (question) {
          result[type].push({ question, marks, globalNumber: globalCounter++ });
        }
      });
    });
    
    return result;
  }, [selectedQuestions, selectedQuestionsData, questionsData]);

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
    if (selectedTypes.includes('multiplechoice') && !mcqSubtype) {
      message.error('Please select a Multiple Choice Questions type');
      return;
    }
    if (selectedTypes.includes('direct') && !directSubtype) {
      message.error('Please select a Direct Questions type');
      return;
    }
    if (selectedTypes.includes('answerthefollowing') && !answerFollowingSubtype) {
      message.error('Please select an Answer the following questions type');
      return;
    }
    if (selectedTypes.includes('picture') && !pictureSubtype) {
      message.error('Please select a Picture questions type');
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
    if (selectedTypes.includes('multiplechoice') && !mcqSubtype) {
      message.error('Please select a Multiple Choice Questions type');
      return;
    }
    if (selectedTypes.includes('direct') && !directSubtype) {
      message.error('Please select a Direct Questions type');
      return;
    }
    if (selectedTypes.includes('answerthefollowing') && !answerFollowingSubtype) {
      message.error('Please select an Answer the following questions type');
      return;
    }
    if (selectedTypes.includes('picture') && !pictureSubtype) {
      message.error('Please select a Picture questions type');
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
        // Store the question object
        setSelectedQuestionsData(prevData => ({ ...prevData, [q.id]: q }));
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
          // Remove the question object
          setSelectedQuestionsData(prevData => {
            const newData = { ...prevData };
            delete newData[q.id];
            return newData;
          });
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
    'multiplechoice': { count: 0, marks: 2 },
    'direct': { count: 0, marks: 2 },
    'answerthefollowing': { count: 0, marks: 3 },
    'picture': { count: 0, marks: 3 },
  });
  const [imagePreview, setImagePreview] = useState<{ open: boolean; url: string }>({
    open: false,
    url: '',
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
    if (selectedTypes.includes('multiplechoice') && !mcqSubtype) {
      message.error('Please select a Multiple Choice Questions type');
      return;
    }
    if (selectedTypes.includes('direct') && !directSubtype) {
      message.error('Please select a Direct Questions type');
      return;
    }
    if (selectedTypes.includes('answerthefollowing') && !answerFollowingSubtype) {
      message.error('Please select an Answer the following questions type');
      return;
    }
    if (selectedTypes.includes('picture') && !pictureSubtype) {
      message.error('Please select a Picture questions type');
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
      mcqCount: randomConfig['multiplechoice'].count || 0,
      shortAnswerCount: randomConfig['direct'].count || 0,
      essayCount: randomConfig['answerthefollowing'].count || 0,
      fillInTheBlankCount: 0,
      imageCount: randomConfig['picture'].count || 0
    };

    try {
      message.loading('Generating random questions...', 0);
      
      const data = await GET("/random-gen", query);
      
        // Process the response and update selected questions
        if (data && data.questions && Array.isArray(data.questions)) {
          const next: Record<string, number> = {};
          const generatedQuestions: QuestionItem[] = [];
          const questionsDataMap: Record<string, QuestionItem> = {};
          
          data.questions.forEach((question: any) => {
            const questionId = question.questionId || question.id || question._id;
            // Map API response types to new question types
            let questionType: QuestionType = 'direct';
            if (question.questionType === 'image' || question.questionType === 'Image') {
              questionType = 'picture';
            } else if (question.questionType === 'mcq') {
              questionType = 'multiplechoice';
            } else if (question.questionType === 'shortAnswer' || question.questionType === 'shortanswer') {
              questionType = 'direct';
            } else if (question.questionType === 'longAnswer' || question.questionType === 'essay') {
              questionType = 'answerthefollowing';
            }
            
            // Use the marks configured in the random generate modal, not from API response
            const configuredMarks = randomConfig[questionType]?.marks || 1;
            next[questionId] = configuredMarks;
            
            // Store the question data for display
            const questionItem: QuestionItem = {
              id: questionId,
              type: questionType,
              text: question.question,
              imageUrl: question.imageUrl,
              defaultMarks: configuredMarks,
              options: question.options || [],
              mcqSubtype: question.mcqSubtype,
              directSubtype: question.directSubtype,
              answerFollowingSubtype: question.answerFollowingSubtype,
              pictureSubtype: question.pictureSubtype
            };
            generatedQuestions.push(questionItem);
            questionsDataMap[questionId] = questionItem;
          });
          
          // Update the questions data and selected questions
          setQuestionsData(generatedQuestions);
          setSelectedQuestions(next);
          setSelectedQuestionsData(questionsDataMap);
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
    setSelectedQuestionsData({});
    setLockedAfterRandom(false);
    setLockedAfterChoose(false);
    setPage(1);
    setPageSize(10);
    setModalFilterTypes([]);
    
    // Reset random config
    setRandomConfig({
      'multiplechoice': { count: 0, marks: 2 },
      'direct': { count: 0, marks: 2 },
      'answerthefollowing': { count: 0, marks: 3 },
      'picture': { count: 0, marks: 3 },
    });
    
    // Reset MCQ subtype, Direct subtype, Answer Following subtype, and Picture subtype
    setMcqSubtype(undefined);
    setDirectSubtype(undefined);
    setAnswerFollowingSubtype(undefined);
    setPictureSubtype(undefined);
    
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
      const question = selectedQuestionsData[questionId] || questionsData.find(q => q.id === questionId);
      if (!question) return null;
      
      // Map new question types to API format
      const mapTypeToAPI = (type: QuestionType): string => {
        const typeMap: Record<QuestionType, string> = {
          'multiplechoice': 'mcq',
          'direct': 'shortanswer',
          'answerthefollowing': 'essay',
          'picture': 'image'
        };
        return typeMap[type] || 'shortanswer';
      };
      
      const baseQuestion = {
        question: question.text,
        questionType: mapTypeToAPI(question.type),
        mark: marks
      };
      
      // Add options for Multiple Choice questions
      if (question.type === 'multiplechoice' && question.options) {
        return {
          ...baseQuestion,
          options: question.options.map((option: any) => option.text || option),
          mcqSubtype: question.mcqSubtype || mcqSubtype
        };
      }
      
      // Add directSubtype for Direct questions
      if (question.type === 'direct') {
        return {
          ...baseQuestion,
          directSubtype: question.directSubtype || directSubtype
        };
      }
      
      // Add answerFollowingSubtype for Answer the following questions
      if (question.type === 'answerthefollowing') {
        return {
          ...baseQuestion,
          answerFollowingSubtype: question.answerFollowingSubtype || answerFollowingSubtype
        };
      }
      
      // Add imageUrl and pictureSubtype for picture questions
      if (question.type === 'picture') {
        return {
          ...baseQuestion,
          imageUrl: question.imageUrl,
          pictureSubtype: question.pictureSubtype || pictureSubtype
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
    
    const paperTitle = `${formValues?.examType || 'Examination'} EXAMINATION - 2025-26 `.trim();
    const stdLabel = getStdLabel(formValues?.class);
    const selectedBookName = booksOptions.find(book => book.value === formValues?.book)?.label || formValues?.book;
    const subjectDisplay = getSubjectDisplay(formValues?.subject, selectedBookName);
    const subjectDisplayUpper = subjectDisplay ? subjectDisplay.toUpperCase() : '';
    
    const typeLabels: Record<QuestionType, string> = {
      'multiplechoice': 'Multiple Choice Questions',
      'direct': 'Direct Questions',
      'answerthefollowing': 'Answer the following questions',
      'picture': 'Picture questions'
    };
    
    const sectionsWithQuestions = (['multiplechoice', 'direct', 'answerthefollowing', 'picture'] as QuestionType[])
      .filter(type => organizedQuestions[type].length > 0);
    
    const sectionsHtml = sectionsWithQuestions
      .map((type, sectionIndex) => {
        const romanNumeral = toRomanNumeral(sectionIndex + 1);
        const questionsOfType = organizedQuestions[type];
        const allMarks = questionsOfType.map(q => q.marks);
        const allSameMarks = allMarks.length > 0 && allMarks.every(mark => mark === allMarks[0]);
        const questionCount = questionsOfType.length;
        const sectionMarks = allSameMarks ? allMarks[0] : null;
        const sectionTotal = allSameMarks ? questionCount * sectionMarks : null;
        
        return `
        <div class="section">
          <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
            <span>${romanNumeral}. ${typeLabels[type] || type}</span>
            ${allSameMarks ? `<span style="font-weight: bold;">[${questionCount} × ${sectionMarks} = ${sectionTotal}]</span>` : ''}
          </div>
          ${questionsOfType.map(({ question, marks }, questionIndex) => `
            <div class="question">
              <div class="question-no">${questionIndex + 1})</div>
              <div class="question-content">
                <div class="question-text">${question.text}</div>
                ${question.type === 'picture' && question.imageUrl ? `
                  <div class="question-image">
                    <img src="${question.imageUrl.startsWith('http') ? question.imageUrl : (question.imageUrl.startsWith('/') ? window.location.origin + question.imageUrl : window.location.origin + '/' + question.imageUrl)}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" onerror="this.style.display='none';" />
                  </div>
                ` : ''}
                ${question.type === 'multiplechoice' && question.options ? `
                  <div class="question-options" style="margin-top: 10px;">
                    ${question.options.map((option, index) => `
                      <div style="margin: 5px 0; color: #000;">${String.fromCharCode(65 + index)}. ${option.text || option}</div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              ${!allSameMarks ? `<div class="marks">[${marks} marks]</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
      }).join('');
    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paperTitle}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; margin-bottom: 2px; }
            .name-roll-section { margin-bottom: 15px; font-size: 18px; color: #000; }
            .name-roll-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; gap: 10px; }
            .name-roll-label { font-weight: 600; white-space: nowrap; }
            .name-roll-dots { color: #000; letter-spacing: 2px; font-size: 20px; line-height: 1; overflow: hidden; }
            .name-roll-group { display: flex; align-items: flex-end; min-width: 0; }
            .name-group { flex: 1; min-width: 0; }
            .rollno-group { flex: 0 0 200px; max-width: 200px; }
            .subject-line { margin: 8px 0 18px; color: #000; }
            .subject-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
            .subject-row + .subject-row { margin-top: 4px; }
            .subject-left, .subject-right { flex: 0 0 140px; font-weight: 600; font-size: 18px; }
            .subject-left { text-align: left; }
            .subject-center { flex: 1; text-align: center; font-weight: 600; font-size: 18px; }
            .subject-right { text-align: right; }
            .subject-secondary { font-size: 18px; font-weight: 600; }
            .subject-line-divider { width: 100%; border-bottom: 1px solid #000; height: 2px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; text-align: left; margin-bottom: 15px; color: #000; }
            .question { margin: 15px 0; display: flex; align-items: flex-start; page-break-inside: avoid; }
            .question-no { width: 30px; font-weight: normal; color: #000; font-size: 18px; margin-left: 10px; }
            .question-content { flex: 1; }
            .question-text { margin-bottom: 5px; font-size: 18px; color: #000; font-weight: normal; }
            .question-image { margin-top: 1px; }
            .marks { font-weight: normal; margin-left: 10px; color: #000; }
            @media print {
              body { margin: 20px; }
              /* Allow sections to flow across pages; do not force whole-section moves */
              .section { page-break-inside: auto; break-inside: auto; page-break-before: auto; page-break-after: auto; }
              /* Keep an individual question together on the same page */
              .question { page-break-inside: avoid; break-inside: avoid; margin: 10px 0; }
              .question-image img { max-width: 250px; max-height: 150px; }
            }
          </style>
        </head>
        <body>
          ${isClassFourOrBelow(formValues?.class) ? `
          <div class="name-roll-section">
            <div class="name-roll-row">
              <div class="name-roll-group name-group">
                <span class="name-roll-label">NAME:</span>
                <span class="name-roll-dots">................................................................................................................................................................................................................................................</span>
              </div>
              <div class="name-roll-group rollno-group">
                <span class="name-roll-label">ROLL NO:</span>
                <span class="name-roll-dots">........................................................</span>
              </div>
            </div>
          </div>
          ` : ''}
          <div class="header">
            <div class="title">${paperTitle}</div>
          </div>
          <div class="subject-line">
            <div class="subject-row">
              <div class="subject-left">Std: ${stdLabel || '-'}</div>
              <div class="subject-center">${subjectDisplayUpper || ''}</div>
              <div class="subject-right">Marks: ${totalMarksField || currentSumMarks}</div>
            </div>
            <div class="subject-row subject-row-secondary">
              <div class="subject-left subject-secondary">HM</div>
              <div class="subject-right subject-secondary">Time: ${formatDuration(formValues?.duration || 60)}</div>
            </div>
            <div class="subject-line-divider"></div>
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
        <Form form={form} layout="vertical" preserve={false} className="font-local2">
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
                  options={examTypes}
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
                { label: 'Multiple Choice Questions', value: 'multiplechoice' },
                { label: 'Direct Questions', value: 'direct' },
                { label: 'Answer the following questions', value: 'answerthefollowing' },
                { label: 'Picture questions', value: 'picture' },
              ]}
              value={selectedTypes}
              onChange={(vals) => { 
                setSelectedTypes(vals as QuestionType[]);
                // Clear MCQ subtype if Multiple Choice Questions is deselected
                if (!vals.includes('multiplechoice')) {
                  setMcqSubtype(undefined);
                }
                // Clear Direct subtype if Direct Questions is deselected
                if (!vals.includes('direct')) {
                  setDirectSubtype(undefined);
                }
                // Clear Answer Following subtype if Answer the following questions is deselected
                if (!vals.includes('answerthefollowing')) {
                  setAnswerFollowingSubtype(undefined);
                }
                // Clear Picture subtype if Picture questions is deselected
                if (!vals.includes('picture')) {
                  setPictureSubtype(undefined);
                }
              }}
            />
            {selectedTypes.includes('multiplechoice') && (
              <div className="mt-4">
                <div className="mb-2 text-gray-700 font-medium">Multiple Choice Questions title</div>
                <Select
                  size="large"
                  placeholder="Select MCQ type"
                  value={mcqSubtype}
                  onChange={(value) => setMcqSubtype(value)}
                  options={mcqSubtypeOptions}
                  className="w-full"
                  allowClear
                />
              </div>
            )}
            {selectedTypes.includes('direct') && (
              <div className="mt-4">
                <div className="mb-2 text-gray-700 font-medium">Direct Questions title</div>
                <Select
                  size="large"
                  placeholder="Select Direct Questions type"
                  value={directSubtype}
                  onChange={(value) => setDirectSubtype(value)}
                  options={directSubtypeOptions}
                  className="w-full"
                  allowClear
                />
              </div>
            )}
            {selectedTypes.includes('answerthefollowing') && (
              <div className="mt-4">
                <div className="mb-2 text-gray-700 font-medium">Answer the following questions title</div>
                <Select
                  size="large"
                  placeholder="Select Answer the following questions type"
                  value={answerFollowingSubtype}
                  onChange={(value) => setAnswerFollowingSubtype(value)}
                  options={answerFollowingSubtypeOptions}
                  className="w-full"
                  allowClear
                />
              </div>
            )}
            {selectedTypes.includes('picture') && (
              <div className="mt-4">
                <div className="mb-2 text-gray-700 font-medium">Picture questions title</div>
                <Select
                  size="large"
                  placeholder="Select Picture questions type"
                  value={pictureSubtype}
                  onChange={(value) => setPictureSubtype(value)}
                  options={pictureSubtypeOptions}
                  className="w-full"
                  allowClear
                />
              </div>
            )}
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
        <Card className="shadow-sm border border-gray-200 font-local2">
          <div className="space-y-4 font-local2" ref={topRef}>
            
            <div className=" gap-3 sticky top-0 z-20 bg-gray-50 py-2  p-3 md:p-4 rounded-xl  border-2 border-teal-700">
              <div className="text-[#007575] font-medium text-sm">Filter question types</div>
              <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%] flex flex-wrap gap-2">
                {(['multiplechoice','direct','answerthefollowing','picture'] as QuestionType[]).map(t => {
                  const typeLabels: Record<QuestionType, string> = {
                    'multiplechoice': 'Multiple Choice',
                    'direct': 'Direct',
                    'answerthefollowing': 'Answer Following',
                    'picture': 'Picture'
                  };
                  return (
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
                      className={`font-local2 rounded-full px-3 py-1 text-sm border ${!selectedTypes.includes(t) ? 'opacity-50 cursor-not-allowed' : ''} ${modalFilterTypes.includes(t) ? 'bg-gradient-to-br from-[#007575] to-[#339999] text-white hover:!text-white border-none hover:!bg-gradient-to-br hover:!from-[#007575] hover:!to-[#339999] hover:!opacity-90' : 'bg-white text-gray-700 border-gray-300 hover:!border-[#339999] hover:!text-[#007575]'}`}
                  >
                      {typeLabels[t]}
                  </Button>
                  );
                })}
  
              </div>
                <div className="w-full md:w-[50%] flex items-center justify-end gap-4 text-[15px] text-[#007575] ">
                <span>Selected Questions:{Object.keys(selectedQuestions).length}</span>
                <span>
                  Total Selected Marks: {currentSumMarks} {totalMarksField ? `(of ${totalMarksField})` : ''}
                </span>
              </div>
              </div>
            </div>
           
            <div className="grid grid-cols-1 gap-4 p-3 md:p-6">
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
                        <div className="text-xs uppercase text-gray-500">
                          {q.type === 'multiplechoice' ? 'Multiple Choice' : 
                           q.type === 'direct' ? 'Direct' :
                           q.type === 'answerthefollowing' ? 'Answer Following' :
                           q.type === 'picture' ? 'Picture' : q.type}
                        </div>
                        <div className="text-gray-800">{q.text}</div>
                        {q.type === 'multiplechoice' && q.options && (
                          <div className="text-xs text-gray-600 mt-2">
                            {q.options.map((option: any, index: number) => (
                              <div key={index}>
                                {String.fromCharCode(65 + index)}. {option.text || option}
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'picture' && q.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={q.imageUrl}
                              alt="Question Image"
                              className="w-48 h-32 object-cover rounded border cursor-pointer"
                              onClick={() => setImagePreview({ open: true, url: q.imageUrl || '' })}
                            />
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
        width={900}
        className="font-local2"
      >
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Times, serif' }}>
            {/* Header */}
            {isClassFourOrBelow(formValues?.class) && (
              <div className="mb-4 text-lg font-local2 text-black">
                <div className="flex items-end justify-between gap-2">
                  <div className="flex items-end flex-1 min-w-0">
                    <span className="font-semibold whitespace-nowrap">NAME:</span>
                    <span className="text-[20px] leading-none tracking-wider ml-1 overflow-hidden">................................................................................................................................................................................................................................................</span>
                  </div>
                  <div className="flex items-end flex-shrink-0 w-[200px] max-w-[200px]">
                    <span className="font-semibold whitespace-nowrap">ROLL NO:</span>
                    <span className="text-[20px] leading-none tracking-wider ml-1 overflow-hidden">........................................................</span>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center mb-3">
              <h1 className="text-2xl font-bold uppercase font-local2">
                {formValues?.examType || 'Examination'} EXAMINATION - 2025-26
              </h1>
            </div>
            <div className="flex flex-col gap-1 mb-5 text-base font-local2 text-black">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="font-semibold text-lg text-left whitespace-nowrap sm:flex-[0_0_140px]">
                  Std: {getStdLabel(formValues?.class) || '-'}
                </div>
                <div className="flex-1 text-center font-semibold text-lg sm:px-2">
                  {getSubjectDisplay(formValues?.subject, booksOptions.find(book => book.value === formValues?.book)?.label || formValues?.book)?.toUpperCase() || ''}
                </div>
                <div className="font-semibold text-lg text-right whitespace-nowrap sm:flex-[0_0_140px]">
                  Marks: {totalMarksField || currentSumMarks}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-base font-local2 normal-case mb-2">
                <div className="text-left whitespace-nowrap sm:flex-[0_0_140px] font-semibold text-lg">HM</div>
                <div className="flex-1" />
                <div className="text-right whitespace-nowrap sm:flex-[0_0_140px] font-semibold text-lg">
                  Time: {formatDuration(formValues?.duration || 60)}
                </div>
              </div>
              <div className="flex items-center sm:justify-between gap-3">
                <div className="flex-1 border-b-2 border-gray-500" />
              </div>
            </div>

            {/* Sections and Questions */}
            <div className="space-y-8">
              {(['multiplechoice', 'direct', 'answerthefollowing', 'picture'] as QuestionType[])
                .filter(type => organizedQuestions[type].length > 0)
                .map((type, sectionIndex) => {
                  const questionsOfType = organizedQuestions[type];
                  const romanNumeral = toRomanNumeral(sectionIndex + 1);
                  const allMarks = questionsOfType.map(q => q.marks);
                  const allSameMarks = allMarks.length > 0 && allMarks.every(mark => mark === allMarks[0]);
                  const questionCount = questionsOfType.length;
                  const sectionMarks = allSameMarks ? allMarks[0] : null;
                  const sectionTotal = allSameMarks ? questionCount * sectionMarks : null;
                  
                  const typeLabels: Record<QuestionType, string> = {
                    'multiplechoice': 'Multiple Choice Questions',
                    'direct': 'Direct Questions',
                    'answerthefollowing': 'Answer the following questions',
                    'picture': 'Picture questions'
                  };
                  
                  return (
                    <div key={type} className="section">
                      <div className="text-left mb-4 border-b pb-2">
                        <h3 className="text-lg font-semibold text-black font-local2 flex justify-between items-center">
                          <span>{romanNumeral}. {typeLabels[type] || type}</span>
                          {allSameMarks && <span className="text-base font-bold text-black">({questionCount} × {sectionMarks} = {sectionTotal})</span>}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {questionsOfType.map(({ question, marks }, questionIndex) => (
                          <div key={question.id} className="flex items-start gap-3 py-2" style={{ marginLeft: '8px' }}>
                            <div className="w-8 flex-shrink-0">
                              <span className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{questionIndex + 1})</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{question.text}</div>
                              {question.type === 'picture' && question.imageUrl && (
                                <div className="mt-2">
                                  <img 
                                    src={question.imageUrl} 
                                    alt="Question Image" 
                                    className="w-48 h-32 object-contain rounded border border-gray-300 shadow-sm" 
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              {question.type === 'multiplechoice' && question.options && question.options.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {question.options.map((option: any, optIndex: number) => (
                                    <div key={optIndex} className="text-sm font-local2" style={{ color: '#000' }}>
                                      {String.fromCharCode(65 + optIndex)}. {option.text || option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {!allSameMarks && (
                              <div className="w-12 flex-shrink-0 text-right">
                                <span className="text-lg font-local2" style={{ color: '#000', fontWeight: 400 }}>[{marks}]</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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
          
          {(['multiplechoice', 'direct', 'answerthefollowing', 'picture'] as QuestionType[])
            .map(type => {
              const questionsOfType = Object.entries(selectedQuestions)
                .filter(([id]) => selectedQuestionsData[id]?.type === type)
                .map(([id]) => selectedQuestionsData[id])
                .filter(Boolean) as QuestionItem[];
              return { type, questionsOfType };
            })
            .filter(({ questionsOfType }) => questionsOfType.length > 0)
            .map(({ type, questionsOfType }, sectionIndex) => {
              const romanNumeral = toRomanNumeral(sectionIndex + 1);
              const allMarks = questionsOfType.map(q => selectedQuestions[q.id]);
              const allSameMarks = allMarks.length > 0 && allMarks.every(mark => mark === allMarks[0]);
              const questionCount = questionsOfType.length;
              const sectionMarks = allSameMarks ? allMarks[0] : null;
              const sectionTotal = allSameMarks ? questionCount * sectionMarks : null;
              
              const typeLabels: Record<QuestionType, string> = {
                'multiplechoice': 'Multiple Choice Questions',
                'direct': 'Direct Questions',
                'answerthefollowing': 'Answer the following questions',
                'picture': 'Picture questions'
              };
              
              return (
                <div key={type} className="border rounded-lg p-4">
                  <h4 className="text-md font-semibold mb-3 text-[#007575] border-b pb-2 text-left flex justify-between items-center">
                    <span>{romanNumeral}. {typeLabels[type]} ({questionsOfType.length} questions)</span>
                    {allSameMarks && <span className="text-sm font-normal text-gray-600">[{questionCount} × {sectionMarks} = {sectionTotal}]</span>}
                  </h4>
                  <div className="space-y-3">
                    {questionsOfType.map((question, index) => (
                      <div key={question.id} className="flex justify-between items-start gap-3 p-3 border rounded bg-gray-50">
                        <div className="flex gap-3 flex-1">
                          <span className="font-semibold min-w-[30px]">{index + 1}.</span>
                          <div className="flex-1">
                            <div className="text-gray-800">{question.text}</div>
                            {question.type === 'picture' && question.imageUrl && (
                              <div className="mt-2">
                                <img src={question.imageUrl} alt="Question" className="w-48 h-32 object-cover rounded border" />
                              </div>
                            )}
                            {question.type === 'multiplechoice' && question.options && question.options.length > 0 && (
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
                        {!allSameMarks && (
                          <div className="text-right">
                            <span className="font-semibold text-gray-600 text-lg">[{selectedQuestions[question.id]} marks]</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        open={imagePreview.open}
        onCancel={() => setImagePreview({ open: false, url: '' })}
        footer={null}
        centered
        width={600}
        className="font-local2"
      >
        <div className="flex justify-center items-center">
          {imagePreview.url ? (
            <img
              src={imagePreview.url}
              alt="Preview"
              className="max-h-[70vh] object-contain rounded border"
            />
          ) : (
            <div className="text-gray-500">No image to preview</div>
          )}
        </div>
      </Modal>

      </div>
    </ConfigProvider>
  );
};

export default Paper;