
import React, { useState } from 'react';
import { Plus, Edit, X, ChevronDown } from 'lucide-react';

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
        // Reset selections
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

    const handleTextbookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTextbook(e.target.value);
        setSelectedChapter('');
        setSelectedExercise('');
        setSelectedQuestions([]);
    };

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChapter(e.target.value);
        setSelectedExercise('');
        setSelectedQuestions([]);
    };

    const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExercise(e.target.value);
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
        const newSectionId = Math.max(...sections.map(s => s.id)) + 1;
        const sectionLetter = String.fromCharCode(65 + sections.length); // A, B, C, etc.
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

    // Calculate totals
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const totalMarks = sections.reduce((sum, section) => 
        sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0), 0
    );

    return (
        <div className="space-y-6">
            {/* Sections */}
            {sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {editingSectionId === section.id ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={editingSectionName}
                                        onChange={(e) => setEditingSectionName(e.target.value)}
                                        className="px-2 py-1 border border-gray-300 rounded text-lg font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') saveEditingSection();
                                            if (e.key === 'Escape') cancelEditingSection();
                                        }}
                                    />
                                    <button
                                        onClick={saveEditingSection}
                                        className="text-green-600 hover:text-green-800 p-1"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={cancelEditingSection}
                                        className="text-red-600 hover:text-red-800 p-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lg font-medium text-blue-600">{section.name}</h3>
                                    <button
                                        onClick={() => startEditingSection(section.id, section.name)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">
                            {section.questions.length} questions
                        </span>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-3 mb-4">
                        {section.questions.map((question, questionIndex) => (
                            <div key={`${section.id}-${question.id}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                    {questionIndex + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{question.question}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-blue-600">{question.marks} mark{question.marks !== 1 ? 's' : ''}</span>
                                    <button
                                        onClick={() => removeQuestionFromSection(section.id, question.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Questions Button */}
                    <button
                        onClick={() => showModal(section.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        <Plus className="w-4 h-4" />
                        Add Questions
                    </button>
                </div>
            ))}

            {/* Add Section Button */}
            <button
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
                <Plus className="w-4 h-4" />
                Add Section
            </button>

            {/* Total Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-6 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                        <div className="text-sm text-blue-600">Total Questions</div>
                    </div>
                    <div className="w-px h-12 bg-blue-200"></div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{totalMarks}</div>
                        <div className="text-sm text-blue-600">Total Marks</div>
                    </div>
                </div>
            </div>

            {/* Add Questions Modal */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Add Questions</h3>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600 transition duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 md:p-6 space-y-6">
                            {/* Textbook Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Textbook *
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedTextbook}
                                        onChange={handleTextbookChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                    >
                                        <option value="">Choose Textbook</option>
                                        {textbooks.map(textbook => (
                                            <option key={textbook} value={textbook}>{textbook}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Chapter Selection */}
                            {selectedTextbook && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Chapter *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedChapter}
                                            onChange={handleChapterChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Choose Chapter</option>
                                            {chapters.map(chapter => (
                                                <option key={chapter} value={chapter}>{chapter}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            {/* Exercise Selection */}
                            {selectedChapter && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Exercise *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedExercise}
                                            onChange={handleExerciseChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Choose Exercise</option>
                                            {exercises.map(exercise => (
                                                <option key={exercise} value={exercise}>{exercise}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            {/* Questions List */}
                            {selectedExercise && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Questions ({selectedQuestions.length} selected)
                                    </label>
                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {dummyQuestions.map((question: Question) => (
                                            <label key={question.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedQuestions.includes(question.id)}
                                                    onChange={() => handleQuestionSelect(question.id)}
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-gray-800 text-sm">{question.question}</p>
                                                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                        {question.marks} mark{question.marks !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between items-center p-4 md:p-6 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                {selectedQuestions.length > 0 && (
                                    <span>{selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} selected</span>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddQuestions}
                                    disabled={selectedQuestions.length === 0}
                                    className={`px-4 py-2 rounded-md transition duration-200 ${
                                        selectedQuestions.length > 0
                                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Add Questions ({selectedQuestions.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step2;