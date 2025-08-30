
// @ts-nocheck
import React, { useState } from 'react';
import {
  Modal,
  Input,
  Button,
  Card,
  Checkbox,
  Select,
  Typography,
  Divider
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

interface Question {
  id: number;
  question: string;
  marks: number;
}

interface Section {
  id: number;
  name: string;
  questions: Question[];
}

interface Step2Props {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

const Step2: React.FC<Step2Props> = ({ sections, setSections }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const [selectedTextbook, setSelectedTextbook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingSectionName, setEditingSectionName] = useState('');
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [currentSectionForMarks, setCurrentSectionForMarks] = useState<number | null>(null);
  const [questionMarks, setQuestionMarks] = useState<{[key: number]: number}>({});

  // Dummy data
  const textbooks = [
    'Marigold – Class 5',
    'Raindrops – Class 5'
  ];

  const chapters = [
    'Marigold - Wonderful Waste!',
    'Chapter-end',
    'The Magic Garden',
    'Who Will be Ningthou?',
    'Crying',
    'My Elder Brother'
  ];

  const exercises = ['chapter-end'];

  const dummyQuestions: Question[] = [
    {
      id: 1,
      question: "What were the preparations in the palace for?",
      marks: 1
    },
    {
      id: 2,
      question: "Why did the Maharaja go into the kitchen in the afternoon?",
      marks: 1
    },
    {
      id: 3,
      question: "What had the cook planned to do with the vegetable scraps?",
      marks: 1
    },
    {
      id: 4,
      question: "Ingredients are the things that are used to make a dish. Circle the ingredients of avial in the box below.",
      marks: 1
    },
    {
      id: 5,
      question: "State whether the following are True or False.",
      marks: 1
    },
    {
      id: 6,
      question: "A recipe is a list of directions to prepare a dish. The following sentences are not in order for preparing avial. Number them in the correct order.",
      marks: 1
    },
    {
      id: 7,
      question: "What is the moral of the story?",
      marks: 2
    },
    {
      id: 8,
      question: "Describe the character of the Maharaja in your own words.",
      marks: 3
    },
    {
      id: 9,
      question: "How did the cook's creativity help in reducing food waste?",
      marks: 2
    },
    {
      id: 10,
      question: "Write a short paragraph about the importance of not wasting food.",
      marks: 5
    }
  ];

  const showModal = (sectionId: number) => {
    setCurrentSectionId(sectionId);
    setIsModalVisible(true);
    setSelectedTextbook('');
    setSelectedChapter('');
    setSelectedExercise('');
    setSelectedQuestions([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentSectionId(null);
    setSelectedTextbook('');
    setSelectedChapter('');
    setSelectedExercise('');
    setSelectedQuestions([]);
  };

  const handleTextbookChange = (value: string) => {
    setSelectedTextbook(value);
    setSelectedChapter('');
    setSelectedExercise('');
    setSelectedQuestions([]);
  };

  const handleChapterChange = (value: string) => {
    setSelectedChapter(value);
    setSelectedExercise('');
    setSelectedQuestions([]);
  };

  const handleExerciseChange = (value: string) => {
    setSelectedExercise(value);
    setSelectedQuestions([]);
  };

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleAddQuestions = () => {
    if (selectedQuestions.length === 0) return;

    const questionsToAdd = dummyQuestions.filter((q: Question) => selectedQuestions.includes(q.id));
    
    setSections(prev => prev.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          questions: [...section.questions, ...questionsToAdd]
        };
      }
      return section;
    }));

    handleCancel();
  };

  const addSection = () => {
    const newSectionId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    const sectionLetter = String.fromCharCode(65 + sections.length);
    setSections(prev => [...prev, {
      id: newSectionId,
      name: `Section ${sectionLetter}`,
      questions: []
    }]);
  };

  const startEditingSection = (sectionId: number, currentName: string) => {
    setEditingSectionId(sectionId);
    setEditingSectionName(currentName);
  };

  const saveEditingSection = () => {
    if (editingSectionName.trim()) {
      setSections(prev => prev.map(section => 
        section.id === editingSectionId 
          ? { ...section, name: editingSectionName.trim() }
          : section
      ));
    }
    setEditingSectionId(null);
    setEditingSectionName('');
  };

  const cancelEditingSection = () => {
    setEditingSectionId(null);
    setEditingSectionName('');
  };

  const removeQuestionFromSection = (sectionId: number, questionId: number) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.filter(q => q.id !== questionId)
        };
      }
      return section;
    }));
  };

  const showMarksModalHandler = (sectionId: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (section && section.questions.length > 0) {
      setCurrentSectionForMarks(sectionId);
      // Initialize marks with current question marks
      const initialMarks: {[key: number]: number} = {};
      section.questions.forEach(q => {
        initialMarks[q.id] = q.marks;
      });
      setQuestionMarks(initialMarks);
      setShowMarksModal(true);
    }
  };

  const handleSaveMarks = () => {
    if (currentSectionForMarks) {
      setSections(prev => prev.map(section => {
        if (section.id === currentSectionForMarks) {
          return {
            ...section,
            questions: section.questions.map(q => ({
              ...q,
              marks: questionMarks[q.id] || q.marks
            }))
          };
        }
        return section;
      }));
    }
    setShowMarksModal(false);
    setCurrentSectionForMarks(null);
    setQuestionMarks({});
  };

  const handleCancelMarks = () => {
    setShowMarksModal(false);
    setCurrentSectionForMarks(null);
    setQuestionMarks({});
  };

  const removeSection = (sectionId: number) => {
    console.log('Removing section with ID:', sectionId);
    console.log('Current sections:', sections);
    
    // Use a more explicit approach to ensure we're only removing the specific section
    setSections(prevSections => {
      const updatedSections = prevSections.filter(section => {
        const shouldKeep = section.id !== sectionId;
        console.log(`Section ${section.id}: ${shouldKeep ? 'keeping' : 'removing'}`);
        return shouldKeep;
      });
      
      console.log('Updated sections:', updatedSections);
      return updatedSections;
    });
  };

  // Calculate totals
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const totalMarks = sections.reduce((sum, section) => 
    sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0), 0
  );

  return (
    <div className="space-y-6">
             {/* Sections */}
               {console.log('Rendering sections:', sections)}
        {sections.map((section) => (
          <Card key={`section-${section.id}`} className="rounded-lg shadow-sm border border-gray-200">
                     {/* Section Header */}
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               {editingSectionId === section.id ? (
                 <div className="flex items-center gap-2">
                   <Input
                     value={editingSectionName}
                     onChange={(e) => setEditingSectionName(e.target.value)}
                     className="w-40"
                     autoFocus
                     onPressEnter={saveEditingSection}
                     onBlur={saveEditingSection}
                   />
                   <Button 
                     type="text" 
                     icon={<CloseOutlined />} 
                     onClick={cancelEditingSection}
                   />
                 </div>
               ) : (
                 <>
                   <Title level={4} className="text-blue-600 mb-0">{section.name}</Title>
                   <Button 
                     type="text" 
                     icon={<EditOutlined />} 
                     onClick={() => startEditingSection(section.id, section.name)}
                   />
                 </>
               )}
             </div>
             <div className="flex items-center gap-3">
               <Text type="secondary">
                 {section.questions.length} questions
               </Text>
                               <Button 
                  type="text" 
                  icon={<CloseOutlined />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Remove button clicked for section:', section.id);
                    removeSection(section.id);
                  }}
                  className="text-red-500"
                  title="Remove Section"
                />
             </div>
           </div>

          {/* Questions List */}
          <div className="space-y-3 mb-4">
            {section.questions.map((question, questionIndex) => (
              <div key={`${section.id}-${question.id}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {questionIndex + 1}
                </div>
                <div className="flex-1">
                  <Text>{question.question}</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Text strong className="text-blue-600">{question.marks} mark{question.marks !== 1 ? 's' : ''}</Text>
                  <Button 
                    type="text" 
                    icon={<CloseOutlined />} 
                    onClick={() => removeQuestionFromSection(section.id, question.id)}
                    className="text-red-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Questions Button */}
          <div className="flex gap-2">
            <Button
              onClick={() => showModal(section.id)}
              icon={<PlusOutlined />}
              type="primary"
              style={{ backgroundColor: '#007575', borderColor: '#007575' }}
            >
              Add Questions
            </Button>
            {section.questions.length > 0 && (
              <Button
                onClick={() => showMarksModalHandler(section.id)}
                type="default"
                style={{ borderColor: '#007575', color: '#007575' }}
              >
                Set Marks
              </Button>
            )}
          </div>
        </Card>
      ))}

      {/* Add Section Button */}
      <Button
        onClick={addSection}
        icon={<PlusOutlined />}
        type="primary"
        style={{ backgroundColor: '#007575', borderColor: '#007575' }}
      >
        Add Section
      </Button>

      {/* Total Summary */}
      <Card className="bg-blue-50 border border-blue-200">
        <div className="flex items-center justify-center gap-6 text-center">
          <div>
            <Title level={3} className="text-blue-600 mb-0">{totalQuestions}</Title>
            <Text className="text-blue-600">Total Questions</Text>
          </div>
          <Divider type="vertical" className="h-12 bg-blue-200" />
          <div>
            <Title level={3} className="text-blue-600 mb-0">{totalMarks}</Title>
            <Text className="text-blue-600">Total Marks</Text>
          </div>
        </div>
      </Card>

      {/* Add Questions Modal */}
      <Modal
        title="Add Questions"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleAddQuestions}
            disabled={selectedQuestions.length === 0}
            style={{ backgroundColor: '#007575', borderColor: '#007575' }}
          >
            Add Questions ({selectedQuestions.length})
          </Button>,
        ]}
        width={800}
      >
        <div className="space-y-6">
          {/* Textbook Selection */}
          <div>
            <Text strong className="block mb-2">Select Textbook *</Text>
            <Select
              value={selectedTextbook}
              onChange={handleTextbookChange}
              placeholder="Choose Textbook"
              className="w-full"
              suffixIcon={<DownOutlined />}
            >
              {textbooks.map(textbook => (
                <Option key={textbook} value={textbook}>{textbook}</Option>
              ))}
            </Select>
          </div>

          {/* Chapter Selection */}
          {selectedTextbook && (
            <div>
              <Text strong className="block mb-2">Select Chapter *</Text>
              <Select
                value={selectedChapter}
                onChange={handleChapterChange}
                placeholder="Choose Chapter"
                className="w-full"
                suffixIcon={<DownOutlined />}
              >
                {chapters.map(chapter => (
                  <Option key={chapter} value={chapter}>{chapter}</Option>
                ))}
              </Select>
            </div>
          )}

          {/* Exercise Selection */}
          {selectedChapter && (
            <div>
              <Text strong className="block mb-2">Select Exercise *</Text>
              <Select
                value={selectedExercise}
                onChange={handleExerciseChange}
                placeholder="Choose Exercise"
                className="w-full"
                suffixIcon={<DownOutlined />}
              >
                {exercises.map(exercise => (
                  <Option key={exercise} value={exercise}>{exercise}</Option>
                ))}
              </Select>
            </div>
          )}

                     {/* Questions List */}
           {selectedExercise && (
             <div>
               <Text strong className="block mb-3">
                 Select Questions ({selectedQuestions.length} selected)
               </Text>
                               <div className="max-h-60 overflow-y-auto">
                  {dummyQuestions.map((question: Question) => (
                    <div key={question.id} className="border-b border-gray-200 py-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Checkbox 
                            checked={selectedQuestions.includes(question.id)}
                            onChange={() => handleQuestionSelect(question.id)}
                            className="w-full"
                          >
                            <Text className="block ml-2">{question.question}</Text>
                          </Checkbox>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Text type="secondary" className="text-xs whitespace-nowrap">
                            {question.marks} mark{question.marks !== 1 ? 's' : ''}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           )}
                 </div>
       </Modal>

       {/* Set Marks Modal */}
       <Modal
         title="Set Question Marks"
         open={showMarksModal}
         onCancel={handleCancelMarks}
         footer={[
           <Button key="cancel" onClick={handleCancelMarks}>
             Cancel
           </Button>,
           <Button 
             key="submit" 
             type="primary" 
             onClick={handleSaveMarks}
             style={{ backgroundColor: '#007575', borderColor: '#007575' }}
           >
             Save Marks
           </Button>,
         ]}
         width={600}
       >
         <div className="space-y-4">
           {currentSectionForMarks && sections.find(s => s.id === currentSectionForMarks)?.questions.map((question, index) => (
             <div key={question.id} className="border-b border-gray-200 pb-3">
               <div className="flex items-start justify-between">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
    
                     <Text>{question.question}</Text>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 ml-4">
                   <Text type="secondary" className="text-xs whitespace-nowrap">Marks:</Text>
                   <Input
                     type="number"
                     max={10}
                     value={questionMarks[question.id] || question.marks}
                     onChange={(e) => {
                       const value = parseInt(e.target.value) || 1;
                       setQuestionMarks(prev => ({
                         ...prev,
                         [question.id]: value
                       }));
                     }}
                     className="w-16"
                     size="small"
                   />
                 </div>
               </div>
             </div>
           ))}
         </div>
       </Modal>
     </div>
   );
 };

export default Step2;