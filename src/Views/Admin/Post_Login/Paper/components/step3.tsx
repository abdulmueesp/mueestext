
// import React, { useState } from 'react';
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// // Simple text icons (kept minimal)
// const ChevronLeft = ({ className, style }: any) => <span className={className} style={style}>‹</span>;
// const ArrowUp = ({ className, style }: any) => <span className={className} style={style}>↑</span>;
// const ArrowDown = ({ className, style }: any) => <span className={className} style={style}>↓</span>;

// interface Question {
//     id: number;
//     question: string;
//     marks: number;
// }

// interface Section {
//     id: number;
//     name: string;
//     questions: Question[];
// }

// interface Step1Data {
//     module: string;
//     course: string;
//     subject: string;
//     classSubjectValue: string;
//     paperType: string;
//     paperFormat: string;
//     pdfHeader: string;
//     pdfFooter: string;
//     testPaperName: string;
//     timeAllowed: string;
//     generalInstructions: string;
// }

// interface Step3Props {
//     step1Data: Step1Data;
//     sections: Section[];
//     onPrevStep: () => void;
//     setStep1Data: React.Dispatch<React.SetStateAction<Step1Data>>;
//     setSections: React.Dispatch<React.SetStateAction<Section[]>>;
// }

// const Step3: React.FC<Step3Props> = ({ step1Data, sections, onPrevStep, setStep1Data, setSections }) => {
//     // Local editing state mirrors (optional)
//     const [localHeader, setLocalHeader] = useState(step1Data.pdfHeader || 'My Institute');
//     const [localName, setLocalName] = useState(step1Data.testPaperName || 'Test Paper');
//     const [localTime, setLocalTime] = useState(step1Data.timeAllowed || '120');
//     const [localInstructions, setLocalInstructions] = useState(step1Data.generalInstructions || '');

//     const persistPaperMeta = () => {
//         setStep1Data(prev => ({
//             ...prev,
//             pdfHeader: localHeader,
//             testPaperName: localName,
//             timeAllowed: localTime.replace(/[^0-9]/g, ''),
//             generalInstructions: localInstructions,
//         }));
//     };

//     const moveQuestion = (sectionId: number, fromIndex: number, toIndex: number) => {
//         if (toIndex < 0) return;
//         setSections(prev => prev.map(sec => {
//             if (sec.id !== sectionId) return sec;
//             if (toIndex >= sec.questions.length) return sec;
//             const updated = [...sec.questions];
//             const [moved] = updated.splice(fromIndex, 1);
//             updated.splice(toIndex, 0, moved);
//             return { ...sec, questions: updated };
//         }));
//     };

//     const changeMarks = (sectionId: number, questionId: number, marks: number) => {
//         setSections(prev => prev.map(sec => (
//             sec.id === sectionId
//                 ? { ...sec, questions: sec.questions.map(q => q.id === questionId ? { ...q, marks } : q) }
//                 : sec
//         )));
//     };

//     // Calculate totals
//     const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
//     const totalMarks = sections.reduce((sum, section) => 
//         sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0), 0
//     );

//     return (
//         <div className="space-y-6">
//             {/* Summary Card - Editable Meta */}
//             <div className="bg-white rounded-lg p-4 pb-12 md:p-6 shadow-sm border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Paper Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Left Column */}
//                     <div className="space-y-3">
//                         <div>
//                             <span className="text-sm font-medium text-gray-600">Test Paper Name</span>
//                             <input
//                                 value={localName}
//                                 onChange={(e) => setLocalName(e.target.value)}
//                                 onBlur={persistPaperMeta}
//                                 className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
//                                 placeholder="Enter test paper name"
//                             />
//                         </div>
//                         <div>
//                             <span className="text-sm font-medium text-gray-600">Class & Subject</span>
//                             <div className="text-gray-800 mt-1">{step1Data.classSubjectValue || 'Not specified'}</div>
//                         </div>
//                         <div>
//                             <span className="text-sm font-medium text-gray-600">Time Allowed (minutes)</span>
//                             <input
//                                 value={localTime}
//                                 onChange={(e) => setLocalTime(e.target.value.replace(/[^0-9]/g, ''))}
//                                 onBlur={persistPaperMeta}
//                                 className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
//                                 placeholder="Enter time in minutes"
//                             />
//                         </div>
//                         <div>
//                             <span className="text-sm font-medium text-gray-600">Institution (Header)</span>
//                             <input
//                                 value={localHeader}
//                                 onChange={(e) => setLocalHeader(e.target.value)}
//                                 onBlur={persistPaperMeta}
//                                 className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
//                                 placeholder="Enter header text"
//                             />
//                         </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-3">
                      
//                         <div>
//                             <span className="text-sm font-medium text-gray-600">General Instructions</span>
//                             <div className="mt-1 w-full">
//                                 <ReactQuill
//                                     theme="snow"
//                                     value={localInstructions}
//                                     onChange={(value) => {
//                                         setLocalInstructions(value);
//                                     }}
//                                     onBlur={persistPaperMeta}
//                                     placeholder="Enter general instructions..."
//                                     modules={{
//                                         toolbar: [
//                                             ["bold", "italic", "underline"], // text styles
//                                             [{ list: "ordered" }, { list: "bullet" }],
//                                             ["formula"], // math input
//                                             ["clean"],
//                                         ],
//                                     }}
//                                     className="bg-white rounded-md w-full"
//                                     style={{ 
//                                         height: '120px',
//                                         minHeight: '120px',
//                                         maxWidth: '100%'
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sections Overview with Reordering and Marks Editing */}
//             <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions</h3>
//                 <div className="space-y-4">
//                     {sections.map((section) => (
//                         <div key={section.id} className="border border-gray-200 rounded-lg p-4">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h4 className="font-medium text-blue-600">{section.name}</h4>
//                                 <div className="text-sm text-gray-500">
//                                     {section.questions.length} questions • {section.questions.reduce((sum, q) => sum + q.marks, 0)} marks
//                                 </div>
//                             </div>

//                             {section.questions.length > 0 ? (
//                                 <div className="space-y-2">
//                                     {section.questions.map((question, qIndex) => (
//                                         <div key={question.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
//                                             <span className="text-gray-500 font-medium w-6 text-center">{qIndex + 1}.</span>
//                                             <span className="flex-1 text-gray-700">{question.question}</span>
//                                             <div className="flex items-center gap-2">
//                                                 <span className="text-xs text-gray-500">Marks</span>
//                                                 <input
//                                                     type="number"
//                                                     min={0}
//                                                     value={question.marks}
//                                                     onChange={(e) => changeMarks(section.id, question.id, Math.max(0, parseInt(e.target.value || '0')))}
//                                                     className="w-16 border border-gray-300 rounded px-2 py-1"
//                                                 />
//                                                 <button
//                                                     onClick={() => moveQuestion(section.id, qIndex, qIndex - 1)}
//                                                     className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
//                                                     title="Move up"
//                                                 >
//                                                     <ArrowUp />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => moveQuestion(section.id, qIndex, qIndex + 1)}
//                                                     className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
//                                                     title="Move down"
//                                                 >
//                                                     <ArrowDown />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p className="text-gray-500 text-sm italic">No questions added</p>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-between">
//                 <button
//                     onClick={onPrevStep}
//                     className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
//                 >
//                     <ChevronLeft className="w-5 h-5" />
//                     Back to Questions
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Step3;
// @ts-nocheck
import { message } from 'antd';
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Simple text icons (kept minimal)
const ChevronLeft = ({ className, style }: any) => <span className={className} style={style}>‹</span>;
const ArrowUp = ({ className, style }: any) => <span className={className} style={style}>↑</span>;
const ArrowDown = ({ className, style }: any) => <span className={className} style={style}>↓</span>;
const X = ({ className, style }: any) => <span className={className} style={style}>×</span>;

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

interface Step1Data {
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

interface Step3Props {
    step1Data: Step1Data;
    sections: Section[];
    onPrevStep: () => void;
    setStep1Data: React.Dispatch<React.SetStateAction<Step1Data>>;
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

interface InternalChoiceSection {
    sectionId: number;
    sectionName: string;
    totalQuestions: number;
    questionsToAttempt: number;
}

const Step3: React.FC<Step3Props> = ({ step1Data, sections, onPrevStep, setStep1Data, setSections }) => {
    // Local editing state mirrors (optional)
    const [localHeader, setLocalHeader] = useState(step1Data.pdfHeader || 'My Institute');
    const [localName, setLocalName] = useState(step1Data.testPaperName || 'Test Paper');
    const [localTime, setLocalTime] = useState(step1Data.timeAllowed || '120');
    const [localInstructions, setLocalInstructions] = useState(step1Data.generalInstructions || '');
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [internalChoiceSections, setInternalChoiceSections] = useState<InternalChoiceSection[]>([]);
    const [adjustedTotalMarks, setAdjustedTotalMarks] = useState('');

    const persistPaperMeta = () => {
        setStep1Data(prev => ({
            ...prev,
            pdfHeader: localHeader,
            testPaperName: localName,
            timeAllowed: localTime.replace(/[^0-9]/g, ''),
            generalInstructions: localInstructions,
        }));
    };

    const moveQuestion = (sectionId: number, fromIndex: number, toIndex: number) => {
        if (toIndex < 0) return;
        setSections(prev => prev.map(sec => {
            if (sec.id !== sectionId) return sec;
            if (toIndex >= sec.questions.length) return sec;
            const updated = [...sec.questions];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return { ...sec, questions: updated };
        }));
    };

    const changeMarks = (sectionId: number, questionId: number, marks: number) => {
        setSections(prev => prev.map(sec => (
            sec.id === sectionId
                ? { ...sec, questions: sec.questions.map(q => q.id === questionId ? { ...q, marks } : q) }
                : sec
        )));
    };

    const openModal = () => {
        // Initialize internal choice sections with current section data
        const initialSections = sections.map(section => ({
            sectionId: section.id,
            sectionName: section.name,
            totalQuestions: section.questions.length,
            questionsToAttempt: section.questions.length
        }));
        setInternalChoiceSections(initialSections);
        setIsModalOpen(true);
    };

    const updateQuestionsToAttempt = (sectionId: number, value: number) => {
        setInternalChoiceSections(prev => 
            prev.map(section => 
                section.sectionId === sectionId 
                    ? { ...section, questionsToAttempt: Math.min(Math.max(1, value), section.totalQuestions) }
                    : section
            )
        );
    };

    const saveInternalChoice = () => {
        message.success('Internal choice settings saved successfully!');
       
            setIsModalOpen(false);
        
    };

    // Calculate totals
    const totalMarks = sections.reduce((sum, section) => 
        sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0), 0
    );

    return (
        <div className="space-y-6">
            {/* Summary Card - Editable Meta */}
            <div className="bg-white rounded-lg p-4 pb-12 md:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Paper Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-600">Test Paper Name</span>
                            <input
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                                onBlur={persistPaperMeta}
                                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter test paper name"
                            />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Class & Subject</span>
                            <div className="text-gray-800 mt-1">{step1Data.classSubjectValue || 'Not specified'}</div>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Time Allowed (minutes)</span>
                            <input
                                value={localTime}
                                onChange={(e) => setLocalTime(e.target.value.replace(/[^0-9]/g, ''))}
                                onBlur={persistPaperMeta}
                                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter time in minutes"
                            />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Institution (Header)</span>
                            <input
                                value={localHeader}
                                onChange={(e) => setLocalHeader(e.target.value)}
                                onBlur={persistPaperMeta}
                                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter header text"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-600">General Instructions</span>
                            <div className="mt-1 w-full">
                                <ReactQuill
                                    theme="snow"
                                    value={localInstructions}
                                    onChange={(value) => {
                                        setLocalInstructions(value);
                                    }}
                                    onBlur={persistPaperMeta}
                                    placeholder="Enter general instructions..."
                                    modules={{
                                        toolbar: [
                                            ["bold", "italic", "underline"], // text styles
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["formula"], // math input
                                            ["clean"],
                                        ],
                                    }}
                                    className="bg-white rounded-md w-full"
                                    style={{ 
                                        height: '120px',
                                        minHeight: '120px',
                                        maxWidth: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Section */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions</h3>
                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-medium text-blue-600">{section.name}</h4>
                                <div className="text-sm text-gray-500">
                                    {section.questions.length} questions • {section.questions.reduce((sum, q) => sum + q.marks, 0)} marks
                                </div>
                            </div>

                            {section.questions.length > 0 ? (
                                <div className="space-y-2">
                                    {section.questions.map((question, qIndex) => (
                                        <div key={question.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                                            <span className="text-gray-500 font-medium w-6 text-center">{qIndex + 1}.</span>
                                            <span className="flex-1 text-gray-700">{question.question}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">Marks</span>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={question.marks}
                                                    onChange={(e) => changeMarks(section.id, question.id, Math.max(0, parseInt(e.target.value || '0')))}
                                                    className="w-16 border border-gray-300 rounded px-2 py-1"
                                                />
                                                <button
                                                    onClick={() => moveQuestion(section.id, qIndex, qIndex - 1)}
                                                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                                    title="Move up"
                                                >
                                                    <ArrowUp />
                                                </button>
                                                <button
                                                    onClick={() => moveQuestion(section.id, qIndex, qIndex + 1)}
                                                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                                    title="Move down"
                                                >
                                                    <ArrowDown />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm italic">No questions added</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Advanced Test Options Section */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Test Options</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-700 mb-3">Add Internal Choice within Sections</h4>
                        <button
                            onClick={openModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Enable
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Add Optional questions to sections</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    <X />
                                </button>
                            </div>

                            {/* Table */}
                            <div className="mb-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">Section Name</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">Section Questions</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">Questions to be Attempted</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {internalChoiceSections.map((section, index) => (
                                                <tr key={section.sectionId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-4 py-3 border-b text-gray-800">{section.sectionName}</td>
                                                    <td className="px-4 py-3 border-b text-gray-600">{section.totalQuestions}</td>
                                                    <td className="px-4 py-3 border-b">
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            max={section.totalQuestions}
                                                            value={section.questionsToAttempt}
                                                            onChange={(e) => updateQuestionsToAttempt(section.sectionId, parseInt(e.target.value) || 1)}
                                                            className="w-20 border border-gray-300 rounded px-2 py-1"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Total Marks Adjustment */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Change testpaper total marks accordingly:
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={adjustedTotalMarks}
                                    onChange={(e) => setAdjustedTotalMarks(e.target.value)}
                                    placeholder={`Current total: ${totalMarks}`}
                                    className="border border-gray-300 rounded px-3 py-2 w-32"
                                />
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={saveInternalChoice}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                                >
                                    Save
                                </button>
                            </div>

                            {/* Success Message */}
                
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button
                    onClick={onPrevStep}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Questions
                </button>
            </div>
        </div>
    );
};

export default Step3;