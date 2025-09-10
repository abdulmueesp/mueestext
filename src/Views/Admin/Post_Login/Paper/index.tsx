
// @ts-nocheck
import { useMemo, useRef, useState, useEffect } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, InputNumber, Modal, Pagination, Row, Select, Typography, message, ConfigProvider } from 'antd';
import { Download } from 'lucide-react';
import img1 from "../../../../assets/match2.jpeg"
import img2 from "../../../../assets/matching.png"
const { Title, Text } = Typography;

type QuestionType = 'Short Answer' | 'Matching' | 'Essay' | 'Fill in the blank';

interface QuestionItem {
  id: string;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  defaultMarks: number;
}

const classOptions = ['0', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'];
const subjectOptions = ['english', 'Mathematics', 'gk', 'evs', 'social science', 'science', 'malayalam', 'computer'];
const bookOptions = ['NCERT Book A', 'NCERT Book B', 'Workbook Alpha', 'Practice Set Vol. 1'];
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
  const [pageSize, setPageSize] = useState(8);
  const [modalFilterTypes, setModalFilterTypes] = useState<QuestionType[]>([]);
  const chooserRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const totalMarksField = Form.useWatch('totalMarks', form) || 0;
  const formValues = Form.useWatch([], form);

  const availableQuestions = useMemo(() => {
    if (selectedTypes.length === 0) return [] as QuestionItem[];
    return allQuestions.filter(q => selectedTypes.includes(q.type));
  }, [selectedTypes]);

  const paginatedQuestions = useMemo(() => {
    const filterList = modalFilterTypes.length > 0 ? availableQuestions.filter(q => modalFilterTypes.includes(q.type)) : availableQuestions;
    const start = (page - 1) * pageSize;
    return filterList.slice(start, start + pageSize);
  }, [availableQuestions, page, pageSize, modalFilterTypes]);

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
      'Short Answer': [],
      'Matching': [],
      'Essay': [],
      'Fill in the blank': []
    };
    
    let globalCounter = 1;
    
    // Process questions in the order of question types
    (['Short Answer', 'Matching', 'Essay', 'Fill in the blank'] as QuestionType[]).forEach(type => {
      const questionsOfType = Object.entries(selectedQuestions)
        .map(([id, marks]) => ({ id, marks, question: allQuestions.find(q => q.id === id)! }))
        .filter(({ question }) => question?.type === type)
        .sort((a, b) => a.id.localeCompare(b.id));
      
      questionsOfType.forEach(({ question, marks }) => {
        result[type].push({ question, marks, globalNumber: globalCounter++ });
      });
    });
    
    return result;
  }, [selectedQuestions]);

  const currentSumMarks = useMemo(() => Object.values(selectedQuestions).reduce((a, b) => a + (Number(b) || 0), 0), [selectedQuestions]);

  const handleChooseQuestions = () => {
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
    if (selectedTypes.length === 0) {
      message.error('Please select at least one Question Type');
      return;
    }
    if (lockedAfterRandom) {
      message.warning('Questions are locked after random generation');
      return;
    }
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
    'Short Answer': { count: 0, marks: 2 },
    'Matching': { count: 0, marks: 4 },
    'Essay': { count: 0, marks: 8 },
    'Fill in the blank': { count: 0, marks: 1 },
  });

  const applyRandomGeneration = () => {
    // Build a selection using available pool per type
    const next: Record<string, number> = {};
    selectedTypes.forEach(t => {
      const pool = allQuestions.filter(q => q.type === t);
      const cfg = randomConfig[t];
      let picked = 0;
      for (let i = 0; i < pool.length && picked < cfg.count; i++) {
        const q = pool[i];
        next[q.id] = cfg.marks;
        picked++;
      }
    });
    const sum = Object.values(next).reduce((a, b) => a + (Number(b) || 0), 0);
    
    // Check if total marks exceed the configured total marks
    if (totalMarksField && sum > totalMarksField) {
      Modal.warning({
        title: 'Total marks exceeded',
        content: 'Randomly generated questions exceed Total Mark. Reduce counts or marks.',
      });
      return;
    }
    
    // Check if total marks don't match the configured total marks exactly
    if (totalMarksField && sum !== totalMarksField) {
      Modal.warning({
        title: 'Total marks mismatch',
        content: `Generated questions total marks (${sum}) does not match the configured total marks (${totalMarksField}). Please adjust the count or marks per question to match exactly.`,
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
      'Short Answer': { count: 0, marks: 2 },
      'Matching': { count: 0, marks: 4 },
      'Essay': { count: 0, marks: 8 },
      'Fill in the blank': { count: 0, marks: 1 },
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
    const sectionsHtml = (['Short Answer', 'Matching', 'Essay', 'Fill in the blank'] as QuestionType[])
      .filter(type => organizedQuestions[type].length > 0)
      .map(type => `
        <div class="section">
          <div class="section-title">Section: ${type}</div>
          ${organizedQuestions[type].map(({ question, marks, globalNumber }) => `
            <div class="question">
              <div class="question-no">${globalNumber}.</div>
              <div class="question-content">
                <div class="question-text">${question.text}</div>
                ${question.type === 'Matching' && question.imageUrl ? `
                  <div class="question-image">
                    <img src="${question.imageUrl}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" />
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
              .section { page-break-inside: avoid; }
              .question { page-break-inside: avoid; margin: 10px 0; }
              .question-image img { max-width: 250px; max-height: 150px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${paperTitle}</div>
            <div class="subtitle">${formValues?.book || ''} - ${formValues?.chapters?.join(', ') || ''}</div>
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
                  showSearch
                  placeholder="Select class"
                  options={classOptions.map(c => ({ label: c, value: c }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Subject" name="subject"  required={false}  rules={[{ required: true, message: 'Please select subject' }]}> 
                <Select
                  showSearch
                  placeholder="Select subject"
                  options={subjectOptions.map(s => ({ label: s, value: s }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Book" name="book"  required={false}  rules={[{ required: true, message: 'Please select book' }]}> 
                <Select
                  showSearch
                  placeholder="Select book"
                  options={bookOptions.map(b => ({ label: b, value: b }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Examination Type" name="examType"  required={false}  rules={[{ required: true, message: 'Please select exam type' }]}> 
                <Select
                  showSearch
                  placeholder="Select examination type"
                  options={examTypes.map(e => ({ label: e, value: e }))}
                  filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Chapters" name="chapters"  required={false}  rules={[{ required: true, message: 'Please select chapters' }]}> 
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select chapters"
                  options={chapterOptions.map(c => ({ label: c, value: c }))}
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
                { label: 'Short Answer', value: 'Short Answer' },
                { label: 'Matching', value: 'Matching' },
                { label: 'Essay', value: 'Essay' },
                { label: 'Fill in the blank', value: 'Fill in the blank' },
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
                {(['Short Answer','Matching','Essay','Fill in the blank'] as QuestionType[]).map(t => (
                  <Button
                    key={`flt-${t}`}
                    size="small"
                    disabled={!selectedTypes.includes(t)}
                    onClick={() => {
                      setPage(1);
                      setModalFilterTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
                    }}
                    className={`font-local2 ${modalFilterTypes.includes(t) ? 'bg-gradient-to-br from-[#007575] to-[#339999] text-white border-none' : ''}`}
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
                      {q.type === 'Matching' && q.imageUrl && (
                        <img src={q.imageUrl} alt="q" className="w-24 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <div className="text-xs uppercase text-gray-500">{q.type}</div>
                        <div className="text-gray-800">{q.text}</div>
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
                total={(modalFilterTypes.length ? availableQuestions.filter(q => modalFilterTypes.includes(q.type)) : availableQuestions).length} 
                onChange={(p, ps) => { 
                  setPage(p); 
                  if (ps) setPageSize(ps); 
                }} 
                showSizeChanger 
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
            <p className="text-gray-600 mt-2">
              {formValues?.book || ''} {formValues?.chapters?.length ? `- ${formValues.chapters.join(', ')}` : ''}
            </p>
            <div className="flex justify-between mt-3 text-sm">
              <span><strong>Time:</strong> {formValues?.duration || 60} minutes</span>
              <span><strong>Total Marks:</strong> {currentSumMarks}</span>
            </div>
          </div>
          
          {(['Short Answer', 'Matching', 'Essay', 'Fill in the blank'] as QuestionType[]).map(type => {
            const questionsOfType = organizedQuestions[type];
            if (questionsOfType.length === 0) return null;
            
            return (
              <div key={type} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold text-center mb-3 text-[#007575]">
                  Section: {type}
                </h3>
                <div className="space-y-3">
                  {questionsOfType.map(({ question, marks, globalNumber }) => (
                    <div key={question.id} className="flex justify-between items-start gap-3 p-3 border rounded">
                      <div className="flex gap-3 flex-1">
                        <span className="font-semibold min-w-[30px]">{globalNumber}.</span>
                        <div className="flex-1">
                          <div>{question.text}</div>
                          {question.type === 'Matching' && question.imageUrl && (
                            <div className="mt-2">
                              <img src={question.imageUrl} alt="Question" className="w-40 h-28 object-cover rounded border" />
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
          {selectedTypes.map(t => (
            <Card key={t} className="border border-gray-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-gray-800 font-medium">{t}</div>
                  <div className="text-xs text-gray-500">Configure count and marks</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Text type="secondary" className="text-xs">Count</Text>
                    <InputNumber min={0} max={50} value={randomConfig[t].count} onChange={(v) => setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], count: Number(v) || 0 } }))} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Text type="secondary" className="text-xs">Marks</Text>
                    <InputNumber min={1} max={100} value={randomConfig[t].marks} onChange={(v) => setRandomConfig(prev => ({ ...prev, [t]: { ...prev[t], marks: Number(v) || 1 } }))} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
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