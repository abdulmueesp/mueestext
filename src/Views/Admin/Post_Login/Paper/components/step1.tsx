
import React, { useState, useEffect } from 'react';
import { ArrowRight, X, ChevronDown } from 'lucide-react';

interface Step1Props {
    step1Data: {
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
    };
    setStep1Data: React.Dispatch<React.SetStateAction<{
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
    }>>;
}

const Step1 = ({ step1Data, setStep1Data }: Step1Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const modules = ['CBSE', 'ICSE & ISC', 'UP Board'];
    const courses = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
    const subjects = ['Common English', 'Malayalam', 'Biology', 'Chemistry', 'Maths', 'Arabic'];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChange = (field: keyof typeof step1Data, value: string) => {
        setStep1Data(prev => ({ ...prev, [field]: value }));
    };

    const handleOk = () => {
        if (selectedModule && selectedCourse && selectedSubject) {
            const classSubjectValue = `${selectedModule} > ${selectedCourse} > ${selectedSubject}`;
            setStep1Data(prev => ({
                ...prev,
                module: selectedModule,
                course: selectedCourse,
                subject: selectedSubject,
                classSubjectValue
            }));
            setIsModalVisible(false);
            // Reset modal selections
            setSelectedModule('');
            setSelectedCourse('');
            setSelectedSubject('');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        // Reset modal selections
        setSelectedModule('');
        setSelectedCourse('');
        setSelectedSubject('');
    };

    const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModule(e.target.value);
        setSelectedCourse('');
        setSelectedSubject('');
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
        setSelectedSubject('');
    };

    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(e.target.value);
    };

    const handlePaperTypeChange = (type: string) => {
        handleChange('paperType', type);
    };


    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange('pdfHeader', e.target.value);
    };

    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange('pdfFooter', e.target.value);
    };

    const handleTestPaperNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange('testPaperName', e.target.value);
    };

    const handleTimeAllowedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        handleChange('timeAllowed', value);
    };

    const handleGeneralInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleChange('generalInstructions', e.target.value);
    };

    // Initialize modal selections from step1Data when modal opens
    useEffect(() => {
        if (isModalVisible && step1Data.module) {
            setSelectedModule(step1Data.module);
            if (step1Data.course) {
                setSelectedCourse(step1Data.course);
                if (step1Data.subject) {
                    setSelectedSubject(step1Data.subject);
                }
            }
        }
    }, [isModalVisible, step1Data.module, step1Data.course, step1Data.subject]);

    return (
        <div className="space-y-6">
            {/* Class & Subject Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 xl:col-span-6">
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                            Class & Subject *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Select Class & Subject"
                                value={step1Data.classSubjectValue}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                onClick={showModal}
                                className="px-4 py-2 bg-[#06014f] text-white rounded-md hover:bg-[#06014f]/90 transition duration-200 whitespace-nowrap"
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paper Type Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 xl:col-span-6">
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                            Paper Type *
                        </label>
                        <div className="space-y-3">
                            {/* Question Paper Option */}
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="paperType"
                                    value="question-paper"
                                    checked={step1Data.paperType === 'question-paper'}
                                    onChange={() => handlePaperTypeChange('question-paper')}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                                    step1Data.paperType === 'question-paper'
                                        ? 'border-[#06014f] bg-[#06014f]'
                                        : 'border-gray-300 bg-white'
                                }`}>
                                    {step1Data.paperType === 'question-paper' && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </div>
                                <span className="text-gray-700">Question Paper (PDF/Word)</span>
                            </label>

                            {/* Worksheet Option */}
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="paperType"
                                    value="worksheet"
                                    checked={step1Data.paperType === 'worksheet'}
                                    onChange={() => handlePaperTypeChange('worksheet')}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                                    step1Data.paperType === 'worksheet'
                                        ? 'border-[#06014f] bg-[#06014f]'
                                        : 'border-gray-300 bg-white'
                                }`}>
                                    {step1Data.paperType === 'worksheet' && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </div>
                                <span className="text-gray-700">Worksheet (PDF/Word)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Header & Footer Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 xl:col-span-6">
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                            PDF Header & Footer
                        </label>
                        <div className="space-y-4">
                            {/* Test Paper Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Test Paper Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter test paper name"
                                    value={step1Data.testPaperName}
                                    onChange={handleTestPaperNameChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be the title of your test paper
                                </p>
                            </div>

                            {/* Time Allowed Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Time Allowed (minutes) *
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter time in minutes"
                                    value={step1Data.timeAllowed}
                                    onChange={handleTimeAllowedChange}
                                    min="1"
                                    max="999"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Duration of the test in minutes
                                </p>
                            </div>

                            {/* Header Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Institution name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Institution name (e.g., school/college name)"
                                    value={step1Data.pdfHeader}
                                    onChange={handleHeaderChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    This text will appear at the top of  page in the PDF
                                </p>
                            </div>

                            {/* Footer Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Footer Text
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter footer text (e.g., Page numbers, Date)"
                                    value={step1Data.pdfFooter}
                                    onChange={handleFooterChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    This text will appear at the bottom of each page in the PDF
                                </p>
                            </div>

                            {/* Preview Section */}
                            {(step1Data.testPaperName || step1Data.timeAllowed || step1Data.pdfHeader || step1Data.pdfFooter) && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Preview:</h4>
                                    <div className="space-y-2">
                                        {step1Data.testPaperName && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-600">Test Paper Name:</span>
                                                <span className="ml-2 text-gray-800">"{step1Data.testPaperName}"</span>
                                            </div>
                                        )}
                                        {step1Data.timeAllowed && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-600">Time Allowed:</span>
                                                <span className="ml-2 text-gray-800">{step1Data.timeAllowed} minutes</span>
                                            </div>
                                        )}
                                        {step1Data.pdfHeader && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-600">Header:</span>
                                                <span className="ml-2 text-gray-800">"{step1Data.pdfHeader}"</span>
                                            </div>
                                        )}
                                        {step1Data.pdfFooter && (
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-600">Footer:</span>
                                                <span className="ml-2 text-gray-800">"{step1Data.pdfFooter}"</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* General Instructions Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 xl:col-span-6">
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                            General Instructions
                        </label>
                        <div className="space-y-4">
                            <div>
                                <textarea
                                    placeholder="Enter general instructions"
                                    value={step1Data.generalInstructions}
                                    onChange={handleGeneralInstructionsChange}
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    These instructions will appear at the beginning of the test paper
                                </p>
                            </div>

                            {/* Instructions Preview */}
                            {step1Data.generalInstructions && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Instructions Preview:</h4>
                                    <div className="text-sm text-gray-800 whitespace-pre-wrap">
                                        {step1Data.generalInstructions}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Class & Subject Selection */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Select Class & Subject</h3>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600 transition duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 md:p-6 space-y-4">
                            {/* Module Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Module *
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedModule}
                                        onChange={handleModuleChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                    >
                                        <option value="">Choose Module</option>
                                        {modules.map(module => (
                                            <option key={module} value={module}>{module}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Course Selection - Only show if module is selected */}
                            {selectedModule && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Course *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedCourse}
                                            onChange={handleCourseChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Choose Course</option>
                                            {courses.map(course => (
                                                <option key={course} value={course}>{course}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            {/* Subject Selection - Only show if course is selected */}
                            {selectedCourse && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Subject *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedSubject}
                                            onChange={handleSubjectChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Choose Subject</option>
                                            {subjects.map(subject => (
                                                <option key={subject} value={subject}>{subject}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            {/* Selection Preview */}
                            {(selectedModule || selectedCourse || selectedSubject) && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Current Selection:</span>
                                        <div className="mt-1">
                                            {selectedModule && (
                                                <div className="flex items-center">
                                                    <span className="text-blue-600">{selectedModule}</span>
                                                    {selectedCourse && <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />}
                                                </div>
                                            )}
                                            {selectedCourse && (
                                                <div className="flex items-center">
                                                    <span className="text-green-600">{selectedCourse}</span>
                                                    {selectedSubject && <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />}
                                                </div>
                                            )}
                                            {selectedSubject && (
                                                <div>
                                                    <span className="text-purple-600">{selectedSubject}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-gray-200">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOk}
                                disabled={!selectedModule || !selectedCourse || !selectedSubject}
                                className={`px-4 py-2 rounded-md transition duration-200 ${
                                    selectedModule && selectedCourse && selectedSubject
                                        ? 'bg-[#06014f] text-white hover:bg-[#06014f]/90'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step1;