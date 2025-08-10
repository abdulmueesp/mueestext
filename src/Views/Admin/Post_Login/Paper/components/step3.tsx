
import React, { useState, useRef } from 'react';
import { Eye, Download, FileText, X, ChevronLeft} from 'lucide-react';

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
    onNextStep?: () => void;
}

const Step3: React.FC<Step3Props> = ({ step1Data, sections, onPrevStep }) => {
    const [showPreview, setShowPreview] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    // Calculate totals
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const totalMarks = sections.reduce((sum, section) => 
        sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0), 0
    );

    const handlePreview = () => {
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
    };

    const generatePDFContent = () => {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${step1Data.testPaperName || 'Test Paper'}</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 20mm;
                        }
                        body {
                            font-family: 'Times New Roman', Times, serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 32px;
                            background: white;
                        }
                        .page-break {
                            page-break-after: always;
                        }
                        .text-center {
                            text-align: center;
                        }
                        .mb-6 {
                            margin-bottom: 24px;
                        }
                        .mb-4 {
                            margin-bottom: 16px;
                        }
                        .mb-2 {
                            margin-bottom: 8px;
                        }
                        .mt-2 {
                            margin-top: 8px;
                        }
                        .mt-12 {
                            margin-top: 48px;
                        }
                        .pt-4 {
                            padding-top: 16px;
                        }
                        .ml-4 {
                            margin-left: 16px;
                        }
                        .text-lg {
                            font-size: 18px;
                        }
                        .text-xl {
                            font-size: 20px;
                        }
                        .text-sm {
                            font-size: 14px;
                        }
                        .font-bold {
                            font-weight: bold;
                        }
                        .font-medium {
                            font-weight: 500;
                        }
                        .uppercase {
                            text-transform: uppercase;
                        }
                        .flex {
                            display: flex;
                        }
                        .justify-between {
                            justify-content: space-between;
                        }
                        .items-center {
                            align-items: center;
                        }
                        .items-start {
                            align-items: flex-start;
                        }
                        .gap-3 {
                            gap: 12px;
                        }
                        .space-y-8 > * + * {
                            margin-top: 32px;
                        }
                        .space-y-4 > * + * {
                            margin-top: 16px;
                        }
                        .w-8 {
                            width: 32px;
                        }
                        .w-12 {
                            width: 48px;
                        }
                        .flex-1 {
                            flex: 1;
                        }
                        .flex-shrink-0 {
                            flex-shrink: 0;
                        }
                        .text-right {
                            text-align: right;
                        }
                        .border-t {
                            border-top: 1px solid #d1d5db;
                        }
                        .border-gray-300 {
                            border-color: #d1d5db;
                        }
                        .whitespace-pre-wrap {
                            white-space: pre-wrap;
                        }
                        .leading-relaxed {
                            line-height: 1.625;
                        }
                        @media print {
                            body { 
                                margin: 0; 
                                padding: 32px;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${step1Data.pdfHeader ? `
                        <div class="text-center mb-6">
                            <h1 class="text-lg font-bold">${step1Data.pdfHeader}</h1>
                        </div>
                    ` : ''}

                    <div class="text-center mb-4">
                        <h2 class="text-xl font-bold uppercase">${step1Data.testPaperName}</h2>
                        <h3 class="text-lg font-medium mt-2">
                            ${step1Data.classSubjectValue || 'Class & Subject'}
                        </h3>
                    </div>

                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <strong>Time Allowed:</strong> ${step1Data.timeAllowed || '120'} minutes
                        </div>
                        <div>
                            <strong>Maximum Marks:</strong> ${totalMarks}
                        </div>
                    </div>

                    <div class="mb-6">
                        <div class="font-bold mb-2">General Instructions:</div>
                        <div class="ml-4 text-sm leading-relaxed">
                            ${step1Data.generalInstructions ? 
                                `<div class="whitespace-pre-wrap">${step1Data.generalInstructions}</div>` : 
                                `- All questions are compulsory<br/>
                                 - Write answers in the given space<br/>
                                 - Marks are indicated against each question`
                            }
                        </div>
                    </div>

                    <div class="space-y-8">
                        ${sections.map((section,) => `
                            <div class="section">
                                <div class="text-center mb-4">
                                    <h4 class="text-lg font-bold">${section.name}</h4>
                                </div>
                                
                                <div class="space-y-4">
                                    ${section.questions.map((question, questionIndex) => `
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 flex-shrink-0">
                                                <span class="font-medium">${questionIndex + 1}.</span>
                                            </div>
                                            <div class="flex-1">
                                                <span>${question.question}</span>
                                            </div>
                                            <div class="w-12 flex-shrink-0 text-right">
                                                <span class="font-bold">[${question.marks}]</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${step1Data.pdfFooter ? `
                        <div class="text-center mt-12 pt-4 border-t border-gray-300">
                            <p class="text-sm">${step1Data.pdfFooter}</p>
                        </div>
                    ` : ''}
                </body>
            </html>
        `;
    };

   

    const handleDownloadPDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        
        printWindow.document.write(generatePDFContent());
        printWindow.document.close();
        printWindow.focus();
        
        // Trigger download
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Paper Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-600">Test Paper Name:</span>
                            <p className="text-gray-800">{step1Data.testPaperName || 'Not specified'}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Class & Subject:</span>
                            <p className="text-gray-800">{step1Data.classSubjectValue || 'Not specified'}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Time Allowed:</span>
                            <p className="text-gray-800">{step1Data.timeAllowed ? `${step1Data.timeAllowed} minutes` : 'Not specified'}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Paper Type:</span>
                            <p className="text-gray-800 capitalize">{step1Data.paperType.replace('-', ' ')}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-600">Total Sections:</span>
                            <p className="text-gray-800">{sections.length}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Total Questions:</span>
                            <p className="text-gray-800">{totalQuestions}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">Total Marks:</span>
                            <p className="text-gray-800">{totalMarks}</p>
                        </div>
                        {step1Data.pdfHeader && (
                            <div>
                                <span className="text-sm font-medium text-gray-600">Institution:</span>
                                <p className="text-gray-800">{step1Data.pdfHeader}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sections Overview */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sections Overview</h3>
                
                <div className="space-y-4">
                    {sections.map((section,) => (
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
                                        <div key={question.id} className="flex items-start gap-3 text-sm">
                                            <span className="text-gray-500 font-medium">{qIndex + 1}.</span>
                                            <span className="flex-1 text-gray-700">{question.question}</span>
                                            <span className="text-blue-600 font-medium">[{question.marks}]</span>
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button
                    onClick={onPrevStep}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Questions
                </button>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handlePreview}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        <Eye className="w-5 h-5" />
                        Preview PDF
                    </button>
                    
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                PDF Preview
                            </h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                                <button
                                    onClick={closePreview}
                                    className="text-gray-400 hover:text-gray-600 transition duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Content Preview */}
                        <div className="overflow-y-auto flex-1">
                            <div 
                                ref={pdfRef}
                                className="p-8 bg-white min-h-[800px] w-[210mm] mx-auto" 
                                style={{ fontFamily: 'Times, serif' }}
                            >
                                {/* Header - Institution Name */}
                                {step1Data.pdfHeader && (
                                    <div className="text-center mb-6">
                                        <h1 className="text-lg font-bold">{step1Data.pdfHeader}</h1>
                                    </div>
                                )}

                                {/* Test Paper Title */}
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-bold uppercase">{step1Data.testPaperName}</h2>
                                    <h3 className="text-lg font-medium mt-2">
                                        {step1Data.classSubjectValue || 'Class & Subject'}
                                    </h3>
                                </div>

                                {/* Time and Marks */}
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <strong>Time Allowed:</strong> {step1Data.timeAllowed || '120'} minutes
                                    </div>
                                    <div>
                                        <strong>Maximum Marks:</strong> {totalMarks}
                                    </div>
                                </div>

                                {/* General Instructions */}
                                <div className="mb-6">
                                    <div className="font-bold mb-2">General Instructions:</div>
                                    <div className="ml-4 text-sm leading-relaxed">
                                        {step1Data.generalInstructions ? (
                                            <div className="whitespace-pre-wrap">{step1Data.generalInstructions}</div>
                                        ) : (
                                            <>
                                                - All questions are compulsory<br/>
                                                - Write answers in the given space<br/>
                                                - Marks are indicated against each question
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Sections and Questions */}
                                <div className="space-y-8">
                                    {sections.map((section,) => (
                                        <div key={section.id} className="section">
                                            <div className="text-center mb-4">
                                                <h4 className="text-lg font-bold">{section.name}</h4>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {section.questions.map((question, questionIndex) => (
                                                    <div key={question.id} className="flex items-start gap-3">
                                                        <div className="w-8 flex-shrink-0">
                                                            <span className="font-medium">{questionIndex + 1}.</span>
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

                                {/* Footer */}
                                {step1Data.pdfFooter && (
                                    <div className="text-center mt-12 pt-4 border-t border-gray-300">
                                        <p className="text-sm">{step1Data.pdfFooter}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step3;