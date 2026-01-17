// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Modal, Input, Dropdown, message, Select, Pagination } from "antd";
import { Search, Eye, Download, ArrowLeft, Printer, User, MoreVertical, FileText, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { AlignmentType, BorderStyle, Document, HeadingLevel, Media, Packer, Paragraph, Table, TableCell, TableRow, TabStopType, TextRun, WidthType, ImageRun } from "docx";
import { saveAs } from "file-saver";
import img1 from "../../../../assets/matching.png"
import img2 from "../../../../assets/match2.jpeg"
import paperDummy from "../../../../assets/paperdummy.webp"
import { API, GET, DELETE } from "../../../../Components/common/api";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
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



// Check if device is mobile
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

const getStdLabel = (classValue?: string | number) => {
  if (classValue === undefined || classValue === null || classValue === '') return '-';
  const parsed = Number(classValue);
  if (!Number.isNaN(parsed) && parsed > 0) {
    return toRomanNumeral(parsed);
  }
  return String(classValue).toUpperCase();
};

const getSubjectDisplay = (subject?: string, code?: string) => {
  const cleanSubject = subject?.trim();
  const cleanCode = code?.trim();
  if (cleanSubject && cleanCode) return `${cleanSubject} (${cleanCode})`;
  if (cleanSubject) return cleanSubject;
  if (cleanCode) return cleanCode;
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

const ViewQuestionPaper = ({ paper, onBack, onDelete }: any) => {
  const [wordLoading, setWordLoading] = useState(false);
  const stdLabel = getStdLabel(paper.class);
  const subjectDisplay = getSubjectDisplay(paper.subject, paper.code);
  const subjectDisplayUpper = subjectDisplay ? subjectDisplay.toUpperCase() : '';

  // Logic to group questions by qtitle
  const groupedQuestions = React.useMemo(() => {
    if (!paper.questions || !Array.isArray(paper.questions)) return [];

    // Group by qtitle
    const groups: Record<string, any[]> = {};
    const titlesOrder: string[] = [];

    paper.questions.forEach((q: any) => {
      const title = q.qtitle || "Miscellaneous"; // Fallback title
      if (!groups[title]) {
        groups[title] = [];
        titlesOrder.push(title);
      }
      groups[title].push(q);
    });

    return titlesOrder.map(title => ({
      title,
      questions: groups[title]
    }));
  }, [paper.questions]);


  // Helper to resolve Roman numerals for sub-questions
  const getRomanSubIndex = (index: number) => {
    const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
    return romans[index] || `${index + 1}`;
  };

  // Helper to calculate total marks for the paper
  const currentSumMarks = paper.totalMark || paper.totalMarks ||
    (paper.questions ? paper.questions.reduce((sum: number, q: any) => sum + (q.mark || q.marks || 0), 0) : 0);


  const renderQuestionSection = (group: { title: string, questions: any[] }, groupIndex: number) => {
    const { title, questions } = group;
    const sectionRoman = toRomanNumeral(groupIndex + 1);

    // Calculate marks breakdown
    let markBreakdown = "";
    if (questions.length > 0) {
      const firstMark = questions[0].mark || questions[0].marks || 0;
      const allSame = questions.every((q: any) => (q.mark || q.marks || 0) === firstMark);
      if (allSame && firstMark > 0) {
        markBreakdown = `[${firstMark} x ${questions.length} = ${firstMark * questions.length}]`;
      }
    }
    const showIndividualMarks = !markBreakdown;

    // Determine rendering logic based on title

    // Case: Picture Questions
    const pictureTitles = [
      "describe the following picture",
      "look at the pictures and answer the following",
      "identify the pictures",
      "identity the pictures"
    ];
    const cleanLowerTitle = title.trim().toLowerCase().replace(/\.$/, '');

    if (pictureTitles.some(t => cleanLowerTitle === t || cleanLowerTitle.startsWith(t))) {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 ml-5">
              {/* 1. Main Number (No Text) & Marks */}
              <div className="flex justify-between items-start text-lg text-black font-local2 mb-2">
                <div className="flex-1 pr-4">
                  <span className="mr-2">{getRomanSubIndex(idx)})</span>
                </div>
                <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                  {showIndividualMarks && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                </div>
              </div>

              {/* 2. Image */}
              {q.imageUrl && (
                <div className="mb-3 ml-6">
                  <img
                    src={q.imageUrl}
                    alt="Question"
                    className="max-w-full h-auto max-h-[200px] object-contain border border-gray-200 rounded"
                  />
                </div>
              )}

              {/* 3. Sub-questions a, b, c */}
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : []).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2 ml-6 flex justify-between items-start">
                  <div className="flex-1 text-lg text-black font-local2 pr-4">
                    <span className="mr-2">{String.fromCharCode(97 + subIdx)})</span>
                    <span>{subQ.text || ''}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Case 1: "Choose the correct answer from the brackets and fill in the blanks"
    if (title.trim() === "Choose the correct answer from the brackets and fill in the blanks") {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 ml-5">
              {/* Always Render Question Text if present */}
              {q.question && <div className="text-lg text-black font-local2 mb-2 hidden">{q.question}</div>}
              {/* Note: In sample API, q.question might be duplicate of first subquestion or main text. Subquestions are primary if present. */}

              {/* Subquestions */}
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }]).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2 flex justify-between items-start">
                  <div className="flex-1 text-lg text-black font-local2 pr-4">
                    <span className="mr-2">{getRomanSubIndex(idx)})</span>
                    <span>{subQ.text || q.question}</span>
                    {q.options && q.options.length > 0 && (
                      <span className="ml-4 font-semibold">
                        ({q.options.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                    {showIndividualMarks && subIdx === 0 && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Case 2: "Tick the correct answers"
    if (title.trim() === "Tick the correct answers") {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 ml-5">
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }]).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2 flex justify-between items-start">
                  <div className="flex-1 text-lg text-black font-local2 pr-4">
                    <span className="mr-2">{getRomanSubIndex(idx)})</span>
                    <span>{subQ.text || q.question}</span>

                    {/* Options with Checkboxes - Block below question */}
                    {q.options && q.options.length > 0 && (
                      <div className="mt-2 ml-4">
                        {q.options.map((opt: string, optIdx: number) => (
                          <span key={optIdx} className="inline-flex items-center gap-2 mr-6">
                            <span className="font-semibold">{String.fromCharCode(97 + optIdx)}.</span>
                            <span className="text-2xl leading-none">☐</span>
                            <span>{opt}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                    {showIndividualMarks && subIdx === 0 && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    // Case 3: "Choose the correct answers"
    if (title.trim() === "Choose the correct answers") {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>

          {questions.map((q, idx) => (
            <div key={idx} className="mb-6 ml-5">
              {/* Options at top */}
              <div className="mb-3 font-local2 text-black">
                <span className="mr-2 font-semibold text-lg">{getRomanSubIndex(idx)})</span>
                <div className="inline-block p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold">({q.options && q.options.join(', ')})</span>
                </div>
              </div>

              {/* Subquestions */}
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }]).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2 ml-2 flex justify-between items-start">
                  <div className="flex-1 text-lg text-black font-local2 pr-4">
                    <span className="mr-2">{String.fromCharCode(97 + subIdx)})</span>
                    <span>{subQ.text || q.question}</span>
                  </div>
                  <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                    {showIndividualMarks && subIdx === 0 && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    // Case 4: "Tick the odd one in the following"
    if (title.trim() === "Tick the odd one in the following") {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 ml-5">
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }]).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2 flex justify-between items-start">
                  <div className="flex-1 text-lg text-black font-local2 pr-4">
                    <span className="mr-2">{getRomanSubIndex(idx)})</span>
                    {q.options && q.options.length > 0 && (
                      <span className="inline-flex flex-wrap gap-4">
                        {q.options.map((opt: string, optIdx: number) => (
                          <span key={optIdx} className="inline-flex items-center gap-1">
                            <span className="text-2xl leading-none">☐</span>
                            <span>{opt}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                    {showIndividualMarks && subIdx === 0 && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Case 5: "Match the following"
    if (title.trim() === "Match the following") {
      return (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 ml-5">
              {(q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }]).map((subQ: any, subIdx: number) => (
                <div key={subIdx} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 text-lg text-black font-local2 pr-4">
                      <span className="mr-2">{getRomanSubIndex(idx)})</span>
                      <span>{subQ.text || q.question}</span>
                    </div>
                    <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                      {showIndividualMarks && subIdx === 0 && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
                    </div>
                  </div>
                  {/* Render Image */}
                  {q.imageUrl && (
                    <div className="mt-2 ml-6">
                      <img src={q.imageUrl} alt="Match" className="max-w-full h-auto max-h-[200px] object-contain border border-gray-200 rounded" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Default Fallback Rendering
    return (
      <div key={title} className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2 font-local2">{sectionRoman}. {title} <span className="float-right">{markBreakdown}</span></h3>
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4 ml-8">
            <div className="flex justify-between items-start text-lg text-black font-local2">
              <div className="flex-1 pr-4">
                <span className="mr-2">{getRomanSubIndex(idx)})</span>
                <span>{q.question}</span>
              </div>
              <div className="font-bold whitespace-nowrap ml-4 text-black text-lg">
                {showIndividualMarks && (q.mark || q.marks) ? `[${q.mark || q.marks}]` : null}
              </div>
            </div>
            {q.options && (
              <div className="ml-6 mt-1 text-sm text-gray-700">
                {q.options.map((opt: string, i: number) => <div key={i}>{String.fromCharCode(65 + i)}. {opt}</div>)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Word Download Logic Updates
  const handleDownloadWord = async () => {
    try {
      setWordLoading(true);
      const paperTitle = `${paper.examinationType || paper.examType || 'Examination'} Examination - 2025-26`.toUpperCase();

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: 'Times New Roman', size: 24, color: '000000' },
              paragraph: { spacing: { after: 120 } }
            },
            heading1: {
              run: { font: 'Times New Roman', size: 28, bold: true },
              paragraph: { spacing: { after: 200 } }
            },
            heading2: {
              run: { font: 'Times New Roman', size: 24, bold: true },
              paragraph: { spacing: { before: 100, after: 100 } }
            }
          }
        },
        sections: []
      });

      const docChildren: any[] = [];

      // Header
      if (isClassFourOrBelow(paper.class)) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "NAME: .............................................................................................", bold: true }),
              new TextRun({ text: " ROLL NO: .....................", bold: true })
            ],
            spacing: { after: 200 }
          })
        );
      }

      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: paperTitle, bold: true })]
        })
      );
      docChildren.push(createHeaderTable(stdLabel || '-', subjectDisplayUpper || '-', currentSumMarks, formatDuration(paper.duration || 60)));
      docChildren.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, color: '000000', size: 12, space: 1 } }, spacing: { after: 200 }, children: [new TextRun({ text: '' })] }));


      // Content Logic grouped by Title
      for (let i = 0; i < groupedQuestions.length; i++) {
        const group = groupedQuestions[i];
        const { title, questions } = group;
        const sectionRoman = toRomanNumeral(i + 1);

        // Calculate marks breakdown for Word
        let markBreakdown = "";
        if (questions.length > 0) {
          const firstMark = questions[0].mark || questions[0].marks || 0;
          const allSame = questions.every((q: any) => (q.mark || q.marks || 0) === firstMark);
          if (allSame && firstMark > 0) {
            markBreakdown = `\t[${firstMark} x ${questions.length} = ${firstMark * questions.length}]`;
          }
        }
        const showIndividualMarksWord = !markBreakdown;

        docChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING2,
            children: [
              new TextRun({ text: `${sectionRoman}. ${title}`, bold: true }),
              new TextRun({ text: markBreakdown, bold: true }) // Tab is handled by \t in string if supported or we might need a tab stop
            ],
            tabStops: [
              { type: TabStopType.RIGHT, position: 9500 }
            ]
          })
        );

        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          const subQuestions = q.subQuestions && q.subQuestions.length > 0 ? q.subQuestions : [{ text: q.question }];
          const options = q.options || [];

          // Logic for Picture Questions
          const pictureTitles = [
            "describe the following picture",
            "look at the pictures and answer the following",
            "identify the pictures",
            "identity the pictures" // Handle potential typo from data
          ];

          // Check if title matches any of the picture titles (ignoring case and trailing dots)
          const cleanLowerTitle = title.trim().toLowerCase().replace(/\.$/, '');
          if (pictureTitles.some(t => cleanLowerTitle === t || cleanLowerTitle.startsWith(t))) {
            // 1. Render Main Question Line: i) Question Text [Marks]
            const prefix = `${getRomanSubIndex(i)})`;
            const marks = (q.mark || q.marks) ? ` [${q.mark || q.marks}]` : '';

            docChildren.push(new Paragraph({
              tabStops: [
                { type: TabStopType.RIGHT, position: 9500 }
              ],
              children: [
                new TextRun({ text: `${prefix}` }),
                new TextRun({ text: `\t${marks}`, bold: true })
              ],
              spacing: { after: 100 },
              indent: { left: 250 }
            }));

            // 2. Render Image
            if (q.imageUrl) {
              try {
                const imageBuffer = await fetchImageArrayBuffer(resolveImageUrl(q.imageUrl)) || await convertImageToArrayBufferViaCanvas(resolveImageUrl(q.imageUrl));
                if (imageBuffer) {
                  docChildren.push(new Paragraph({
                    children: [
                      new ImageRun({
                        data: imageBuffer,
                        transformation: {
                          width: 300,
                          height: 200,
                        },
                      }),
                    ],
                    indent: { left: 500 },
                    spacing: { after: 200 }
                  }));
                }
              } catch (err) {
                console.warn("Failed to add image to word doc", err);
              }
            }

            // 3. Render Sub-questions: a) Text
            subQuestions.forEach((subQ: any, subIdx: number) => {
              const subPrefix = `${String.fromCharCode(97 + subIdx)})`; // a), b), c)
              docChildren.push(new Paragraph({
                children: [
                  new TextRun({ text: `${subPrefix} ${subQ.text || ''}` })
                ],
                indent: { left: 500 }, // Indent sub-questions
                spacing: { after: 100 }
              }));
            });

            continue; // Skip default rendering
          }

          // Logic for "Tick the odd one in the following"
          if (title.trim() === "Tick the odd one in the following") {
            subQuestions.forEach((subQ: any, subIdx: number) => {
              const prefix = `${getRomanSubIndex(i)})`;
              const marks = (showIndividualMarksWord && subIdx === 0 && (q.mark || q.marks)) ? ` [${q.mark || q.marks}]` : '';

              const optsText = options.map((opt: string) => `☐ ${opt}`).join('    ');
              const fullText = `${prefix} ${optsText}`;

              docChildren.push(new Paragraph({
                tabStops: [
                  { type: TabStopType.RIGHT, position: 9500 }
                ],
                children: [
                  new TextRun({ text: fullText }),
                  new TextRun({ text: `\t${marks}`, bold: true })
                ],
                spacing: { after: 100 },
                indent: { left: 250 }
              }));
            });
            continue; // Skip the default addition
          }

          if (title.trim() === "Choose the correct answers") {
            // Logic: i) Options block
            docChildren.push(new Paragraph({
              children: [
                new TextRun({ text: `${getRomanSubIndex(i)}) (${options.join(', ')})`, })
              ],
              spacing: { after: 100 },
              indent: { left: 250 }
            }));
          }

          subQuestions.forEach((subQ: any, subIdx: number) => {
            let prefix = "";
            const lowerTitle = title.trim().toLowerCase();

            const useMainIndexTitles = [
              "tick the correct answers",
              "choose the correct answer from the brackets and fill in the blanks",
              "give one word of the following",
              "name the following",
              "fill in the blanks with correct answers",
              "write true or false",
              "match the following",
              "letter writing",
              "essay writing",
              "paragraph writing",
              "long answer questions",
              "short answer questions",
              "define the following"
            ];

            if (useMainIndexTitles.includes(lowerTitle)) {
              // Logic: i), ii), iii) based on Question Index (i)
              prefix = `${getRomanSubIndex(i)})`;
            } else if (lowerTitle === "choose the correct answers") {
              // Logic: a), b), c) for subquestions
              prefix = `${String.fromCharCode(97 + subIdx)})`;
            } else {
              // Default: i), ii) based on subIndex
              prefix = `${getRomanSubIndex(subIdx)})`;
            }

            let qText = `${prefix} ${subQ.text || q.question}`;
            const marks = (showIndividualMarksWord && subIdx === 0 && (q.mark || q.marks)) ? ` [${q.mark || q.marks}]` : '';

            let optionsText = "";
            let optionsParagraph = null;

            if (title.trim() === "Choose the correct answer from the brackets and fill in the blanks") {
              const optsStr = ` (${options.join(', ')})`;
              // Heuristic: 75 chars limit for inline
              if ((qText.length + optsStr.length) <= 75) {
                qText += optsStr;
              } else {
                optionsParagraph = new Paragraph({
                  children: [new TextRun({ text: optsStr })],
                  indent: { left: 500 },
                  spacing: { after: 150 }
                });
              }
            }

            docChildren.push(new Paragraph({
              tabStops: [
                { type: TabStopType.RIGHT, position: 9500 }
              ],
              children: [
                new TextRun({ text: qText }),
                new TextRun({ text: `\t${marks}`, bold: true })
              ],
              spacing: { after: title.trim() === "Tick the correct answers" ? 50 : 100 },
              indent: { left: title.trim() === "Choose the correct answers" ? 500 : 250 }
            }));

            if (optionsParagraph) {
              docChildren.push(optionsParagraph);
            }

            if (title.trim() === "Tick the correct answers") {
              const optsText = options.map((opt: string, i: number) => `${String.fromCharCode(97 + i)}. ☐ ${opt}`).join('    ');
              docChildren.push(new Paragraph({
                children: [new TextRun({ text: optsText })],
                spacing: { after: 150 },
                indent: { left: 500 }
              }));
            }
          });

          // Add Image if exists
          if (q.imageUrl) {
            try {
              const imageBuffer = await fetchImageArrayBuffer(resolveImageUrl(q.imageUrl)) || await convertImageToArrayBufferViaCanvas(resolveImageUrl(q.imageUrl));
              if (imageBuffer) {
                docChildren.push(new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageBuffer,
                      transformation: {
                        width: 300,
                        height: 200,
                      },
                    }),
                  ],
                  indent: { left: 500 },
                  spacing: { after: 200 }
                }));
              }
            } catch (err) {
              console.warn("Failed to add image to word doc", err);
            }
          }



        }
      }

      doc.addSection({ children: docChildren });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${paper.title || 'paper'}.docx`);
      message.success("Word document downloaded successfully.");

    } catch (e) {
      console.error(e);
      message.error("Failed to download Word.");
    } finally {
      setWordLoading(false);
    }
  }


  const resolveImageUrl = (url?: string) => {
    if (!url) return null;
    const trimmed = url.trim();
    if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return trimmed;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("//")) return `${window.location.protocol}${trimmed}`;
    if (trimmed.startsWith("/")) return `${window.location.origin}${trimmed}`;
    return `${window.location.origin}/${trimmed.replace(/^\/+/, "")}`;
  };

  const fetchImageArrayBuffer = async (url?: string) => {
    if (!url) return null;
    try {
      if (url.startsWith("data:")) {
        const data = url.split(",")[1];
        if (!data) return null;
        const binaryString = atob(data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i += 1) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      }

      const sameOrigin = url.startsWith(window.location.origin);
      const fetchOptions: RequestInit = sameOrigin
        ? { credentials: "include" }
        : { mode: "cors" };
      const response = await fetch(url, fetchOptions);
      if (!response.ok) throw new Error("Image fetch failed");
      return await response.arrayBuffer();
    } catch (error) {
      console.warn("Unable to load image for Word export:", error);
      return null;
    }
  };

  const convertImageToArrayBufferViaCanvas = async (url?: string) => {
    if (!url) return null;
    return new Promise<ArrayBuffer | null>((resolve) => {
      try {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth || 320;
            canvas.height = image.naturalHeight || 180;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(null);
              return;
            }
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (!blob) {
                resolve(null);
                return;
              }
              blob
                .arrayBuffer()
                .then((buffer) => resolve(buffer))
                .catch(() => resolve(null));
            }, "image/png");
          } catch (canvasError) {
            console.warn("Canvas conversion failed:", canvasError);
            resolve(null);
          }
        };
        image.onerror = () => resolve(null);
        image.src = url;
      } catch (error) {
        console.warn("Canvas setup failed:", error);
        resolve(null);
      }
    });
  };

  const createHeaderTable = (stdValue: string, subjectValue: string, marksValue: number, durationValue: string) => {
    const cellBorders = {
      top: { style: BorderStyle.NONE, color: 'FFFFFF', size: 0 },
      bottom: { style: BorderStyle.NONE, color: 'FFFFFF', size: 0 },
      left: { style: BorderStyle.NONE, color: 'FFFFFF', size: 0 },
      right: { style: BorderStyle.NONE, color: 'FFFFFF', size: 0 }
    };
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      margins: { left: 0, right: 0 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 20, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: `Std: ${stdValue || '-'}`, bold: true })]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 60, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: subjectValue || '', alignment: AlignmentType.CENTER, bold: true })]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 20, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: `Marks: ${marksValue}`, alignment: AlignmentType.RIGHT, bold: true })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              children: [new Paragraph({ text: 'HM', bold: true })]
            }),
            new TableCell({
              borders: cellBorders,
              children: [new Paragraph({ text: '' })]
            }),
            new TableCell({
              borders: cellBorders,
              children: [new Paragraph({ text: `Time: ${durationValue}`, alignment: AlignmentType.RIGHT, bold: true })]
            })
          ]
        })
      ]
    });
  };

  const handlePrintQuestionPaper = () => {
    window.print();
  };


  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button onClick={onBack} className="flex items-center justify-center">
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          {paper.title}
        </Title>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <Card className="shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <Button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 print:hidden"
            >
              <Printer size={16} />
              Print
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={handleDownloadWord}
                className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 print:hidden"
                loading={wordLoading}
              >
                <Download size={16} />
                Download Word
              </Button>

              <Popconfirm
                title="Are you sure you want to delete this paper?"
                onConfirm={() => onDelete && onDelete(paper.id || paper._id)}
                okText="Yes, Delete"
                cancelText="No"
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="link"
                  icon={<MdDeleteOutline size={23} color="red" />}
                  size="small"
                  title="Delete"
                  className="print:hidden"
                />
              </Popconfirm>
            </div>

          </div>
        </Card>
      </div>

      {/* Question Paper Preview */}
      <Card className="shadow-sm print:shadow-none" id="print-area">
        <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Times, serif' }}>
          {/* Header Section */}
          {isClassFourOrBelow(paper.class) && (
            <div className="mb-4 text-lg font-local2 text-black">
              <div className="flex items-end justify-between gap-2">
                <div className="flex items-end flex-1 min-w-0">
                  <span className="font-semibold whitespace-nowrap">NAME:</span>
                  <span className="text-[20px] leading-none tracking-wider ml-1 overflow-hidden border-b border-dotted border-black flex-1"></span>
                </div>
                <div className="flex items-end flex-shrink-0 w-[200px] max-w-[200px]">
                  <span className="font-semibold whitespace-nowrap">ROLL NO:</span>
                  <span className="text-[20px] leading-none tracking-wider ml-1 overflow-hidden border-b border-dotted border-black flex-1"></span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold uppercase font-local2">
              {paper.examinationType || paper.examType || 'Examination'} EXAMINATION - 2025-26
            </h1>
          </div>

          <div className="flex flex-col gap-1 mb-5 text-base font-local2 text-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="font-semibold text-lg text-left whitespace-nowrap sm:flex-[0_0_140px]">
                Std: {stdLabel || '-'}
              </div>
              <div className="flex-1 text-center font-semibold text-lg sm:px-2">
                {subjectDisplayUpper || ''}
              </div>
              <div className="font-semibold text-lg text-right whitespace-nowrap sm:flex-[0_0_140px]">
                Marks: {currentSumMarks}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-base font-local2 normal-case mb-2">
              <div className="text-left whitespace-nowrap sm:flex-[0_0_140px] font-semibold text-lg">HM</div>
              <div className="flex-1" />
              <div className="text-right whitespace-nowrap sm:flex-[0_0_140px] font-semibold text-lg">
                Time: {formatDuration(paper.duration || 60)}
              </div>
            </div>
            <div className="flex-1 border-b border-gray-400" />
          </div>


          {/* Questions Grouped by Title */}
          <div className="space-y-6">
            {groupedQuestions.length > 0 ? (
              groupedQuestions.map((group, index) => renderQuestionSection(group, index))
            ) : (
              <div className="text-center text-gray-500">No questions found.</div>
            )}
          </div>

        </div>
      </Card>

      {/* Print Styles */}
      <style>{`
        @media print {
            body * {
                visibility: hidden;
            }
            #print-area, #print-area * {
                visibility: visible;
            }
            #print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
                box-shadow: none;
            }
            .print\\:hidden { // Escaping colon for JS string
                display: none !important;
            }
        }
      `}</style>
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
  const examTypes = [
    { label: 'UNIT TEST', value: 'UNIT TEST' },
    { label: 'FIRST MID TERM', value: 'FIRST MID TERM' },
    { label: 'FIRST TERM', value: 'FIRST TERM' },
    { label: 'SECOND MID TERM', value: 'SECOND MID TERM' },
    { label: 'SECOND TERM', value: 'SECOND TERM' },
    { label: 'THIRD MID TERM', value: 'THIRD MID TERM' },
    { label: 'THIRD TERM', value: 'THIRD TERM' }
  ];
  const examTypeOptions = examTypes;
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

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      setLoading(true);
      await DELETE(`/examinations/${id}`);
      message.success('Successfully deleted');
      setViewingPaper(null);
      await fetchPapers();
      navigate('/mypapers');
    } catch (e) {
      console.error('Failed to delete paper:', e);
      message.error('Failed to delete paper');
    } finally {
      setLoading(false);
    }
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

  // If viewing a paper, show the view component
  if (viewingPaper) {
    return <ViewQuestionPaper paper={viewingPaper} onBack={handleBackToList} onDelete={handleDelete} />;
  }
  const users = [
    { id: "1", name: "Batch A" },
    { id: "2", name: "Batch B" },
    { id: "3", name: "Batch C" },
    { id: "4", name: "Batch D" },
    { id: "5", name: "Batch E" },
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
                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition ${selectedUsers.includes(user.id)
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
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} papers`}
              pageSizeOptions={['5', '10', '20', '50', '100']}
              className="font-local2"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default MyPapers;