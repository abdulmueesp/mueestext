
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Modal, Input, Dropdown, message, Select, Pagination } from "antd";
import { Search, Eye, Download, ArrowLeft, Printer, User, MoreVertical, FileText, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { AlignmentType, BorderStyle, Document, HeadingLevel, Media, Packer, Paragraph, Table, TableCell, TableRow, TabStopType, TextRun, WidthType } from "docx";
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

type PaperSection = {
  heading: string;
  summary?: string;
  questions: Array<{
    number: number;
    text: string;
    marks?: number | null;
    options?: string[];
    imageUrl?: string | null;
  }>;
};

type PrintableBodyArgs = {
  includeNameRoll: boolean;
  paperTitle: string;
  stdLabel: string;
  subjectDisplay: string;
  totalMarks: number;
  durationLabel: string;
  sectionsHtml: string;
};

const renderSectionsHtml = (sections: PaperSection[]) =>
  sections
    .map((section) => `
      <div class="section">
        <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>${section.heading}</span>
          ${section.summary ? `<span style="font-weight: bold;">${section.summary}</span>` : ''}
        </div>
        ${section.questions
          .map(
            (question) => `
              <div class="question">
                <div class="question-no">${question.number})</div>
                <div class="question-content">
                  <div class="question-text">${question.text || ''}</div>
                  ${
                    question.imageUrl
                      ? `
                        <div class="question-image">
                          <img src="${question.imageUrl}" alt="Question Image" style="max-width: 250px; max-height: 150px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" onerror="this.style.display='none';" />
                        </div>
                      `
                      : ''
                  }
                  ${
                    question.options && question.options.length > 0
                      ? `
                        <div class="question-options" style="margin-top: 10px;">
                          ${question.options
                            .map(
                              (option, index) => `
                                <div style="margin: 5px 0; color: #000;">${String.fromCharCode(65 + index)}. ${option}</div>
                              `
                            )
                            .join('')}
                        </div>
                      `
                      : ''
                  }
                </div>
                ${
                  question.marks === null || question.marks === undefined
                    ? ''
                    : `<div class="marks">[${question.marks} marks]</div>`
                }
              </div>
            `
          )
          .join('')}
      </div>
    `)
    .join('');

const PRINT_TEMPLATE_STYLES = `
  body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; color: #000; }
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
  .marks { font-weight: normal; margin-left: 10px; color: #000; white-space: nowrap; }
  @media print {
    body { margin: 20px; }
    .section { page-break-inside: auto; break-inside: auto; page-break-before: auto; page-break-after: auto; }
    .question { page-break-inside: avoid; break-inside: avoid; margin: 10px 0; }
    .question-image img { max-width: 250px; max-height: 150px; }
  }
`;

const buildPrintableBody = ({
  includeNameRoll,
  paperTitle,
  stdLabel,
  subjectDisplay,
  totalMarks,
  durationLabel,
  sectionsHtml
}: PrintableBodyArgs) => `
  ${includeNameRoll
    ? `<div class="name-roll-section">
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
      </div>`
    : ''}
  <div class="header">
    <div class="title">${paperTitle}</div>
  </div>
  <div class="subject-line">
    <div class="subject-row">
      <div class="subject-left">Std: ${stdLabel || '-'}</div>
      <div class="subject-center">${subjectDisplay || ''}</div>
      <div class="subject-right">Marks: ${totalMarks}</div>
    </div>
    <div class="subject-row subject-row-secondary">
      <div class="subject-left subject-secondary">HM</div>
      <div class="subject-right subject-secondary">Time: ${durationLabel}</div>
    </div>
    <div class="subject-line-divider"></div>
  </div>
  ${sectionsHtml}
`;

const buildPrintableDocumentHtml = (paperTitle: string, bodyContent: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${paperTitle}</title>
      <style>
        ${PRINT_TEMPLATE_STYLES}
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
  </html>
`;

const ViewQuestionPaper = ({ paper, onBack, onDelete }: any) => {
  const [wordLoading, setWordLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const stdLabel = getStdLabel(paper.class);
  const subjectDisplay = getSubjectDisplay(paper.subject, paper.bookName || paper.book);
  const subjectDisplayUpper = subjectDisplay ? subjectDisplay.toUpperCase() : '';

  const handlePrintQuestionPaper = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      message.error("Popup blocked. Please allow popups for this site.");
      return;
    }

    const sectionsHtml = renderSectionsHtml(buildPaperSections());
    const paperTitle = `${paper.examinationType || paper.examType || 'Examination'} EXAMINATION - 2025-26`.trim();
    const bodyContent = buildPrintableBody({
      includeNameRoll: isClassFourOrBelow(paper.class),
      paperTitle,
      stdLabel: stdLabel || '-',
      subjectDisplay: subjectDisplayUpper || '',
      totalMarks: currentSumMarks,
      durationLabel: formatDuration(paper.duration || 60),
      sectionsHtml
    });
    const content = buildPrintableDocumentHtml(paperTitle, bodyContent);
    
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


  // Calculate total marks from API data or organized questions
  const currentSumMarks = paper.totalMark || paper.totalMarks || 
    (paper.organizedQuestions ? Object.values(paper.organizedQuestions).reduce((total: number, questions: any) => 
      total + questions.reduce((sum: number, q: any) => sum + q.marks, 0), 0) : 0);

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

  const buildPaperSections = (): PaperSection[] => {
    const sections: PaperSection[] = [];

    const typeLabels: Record<string, string> = {
      mcq: 'Multiple Choice',
      shortanswer: 'Short Answer',
      essay: 'Essay',
      fillblank: 'Fill in the blank',
      image: 'Image'
    };
    const desiredOrder = ['mcq', 'fillblank', 'shortanswer', 'image', 'essay'];

    if (paper.questions && Array.isArray(paper.questions)) {
      const groupedQuestions = paper.questions.reduce((acc: Record<string, any[]>, question: any) => {
        const type = question.questionType;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(question);
        return acc;
      }, {});

      desiredOrder
        .filter((type) => groupedQuestions[type] && groupedQuestions[type].length > 0)
        .forEach((type, sectionIndex) => {
          const questionsOfType = groupedQuestions[type];
          const allMarks = questionsOfType.map((q: any) => q.mark || q.marks || 0);
          const allSameMarks = allMarks.length > 0 && allMarks.every((mark: number) => mark === allMarks[0]);
          const sectionMarks = allSameMarks ? allMarks[0] : null;
          const sectionTotal = allSameMarks ? sectionMarks! * questionsOfType.length : null;

          sections.push({
            heading: `${toRomanNumeral(sectionIndex + 1)}. ${typeLabels[type] || type}`,
            summary: allSameMarks ? `[${questionsOfType.length} × ${sectionMarks} = ${sectionTotal}]` : undefined,
            questions: questionsOfType.map((question: any, index: number) => ({
              number: index + 1,
              text: question.question || '',
              marks: allSameMarks ? null : (question.mark || question.marks || 0),
              options: question.questionType === 'mcq' ? question.options : undefined,
              imageUrl: question.questionType === 'image' && question.imageUrl ? resolveImageUrl(question.imageUrl) : null
            }))
          });
        });
    } else if (paper.organizedQuestions) {
      const typeMapping: Record<string, string> = {
        'Multiple Choice': 'mcq',
        'Fill in the blank': 'fillblank',
        'Short Answer': 'shortanswer',
        'Matching': 'image',
        'Essay': 'essay'
      };

      desiredOrder
        .map((type) => {
          const typeName = Object.keys(typeMapping).find((key) => typeMapping[key] === type) || type;
          const questionsOfType = paper.organizedQuestions?.[typeName];
          return questionsOfType && questionsOfType.length > 0 ? { typeName, questionsOfType } : null;
        })
        .filter(Boolean)
        .forEach((section: any, sectionIndex: number) => {
          const { typeName, questionsOfType } = section;
          const allMarks = questionsOfType.map((q: any) => q.marks || 0);
          const allSameMarks = allMarks.length > 0 && allMarks.every((mark: number) => mark === allMarks[0]);
          const sectionMarks = allSameMarks ? allMarks[0] : null;
          const sectionTotal = allSameMarks ? sectionMarks! * questionsOfType.length : null;

          sections.push({
            heading: `${toRomanNumeral(sectionIndex + 1)}. ${typeName}`,
            summary: allSameMarks ? `[${questionsOfType.length} × ${sectionMarks} = ${sectionTotal}]` : undefined,
            questions: questionsOfType.map(({ question, marks }: any, index: number) => ({
              number: index + 1,
              text: question.text || question.question || '',
              marks: allSameMarks ? null : marks,
              options: question.type === 'Multiple Choice' ? question.options : undefined,
              imageUrl: (question.type === 'Matching' || question.type === 'Image' || question.type === 'image') && question.imageUrl ? resolveImageUrl(question.imageUrl) : null
            }))
          });
        });
    }

    return sections;
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
              width: { size: 33, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: `Std: ${stdValue || '-'}`, bold: true })]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 34, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: subjectValue || '', alignment: AlignmentType.CENTER, bold: true })]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 33, type: WidthType.PERCENTAGE },
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

  const handleDownloadWord = async () => {
    try {
      setWordLoading(true);
      const sections = buildPaperSections();
      const paperTitle = `${paper.examinationType || paper.examType || 'Examination'} Examination - 2025-26`.toUpperCase();
      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: 'Times New Roman', size: 24, color: '000000' },
              paragraph: { spacing: { after: 120 } }
            },
            heading1: {
              run: { font: 'Times New Roman', size: 32, bold: true },
              paragraph: { spacing: { after: 200 } }
            },
            heading2: {
              run: { font: 'Times New Roman', size: 28, bold: true },
              paragraph: { spacing: { before: 200, after: 120 } }
            }
          }
        },
        sections: []
      });
      const docChildren: any[] = [];

      if (isClassFourOrBelow(paper.class)) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: "NAME: ________________________________________________", bold: true })],
            spacing: { after: 100 }
          })
        );
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: "ROLL NO: ______________________", bold: true })],
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
      docChildren.push(
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.SINGLE, color: '000000', size: 12, space: 1 }
          },
          spacing: { after: 200 },
          children: [new TextRun({ text: '' })]
        })
      );

      const appendImageParagraph = async (imageUrl?: string | null) => {
        if (!imageUrl) return;
        try {
          let buffer = await fetchImageArrayBuffer(imageUrl);
          if (!buffer) {
            buffer = await convertImageToArrayBufferViaCanvas(imageUrl);
          }
          if (!buffer) {
            docChildren.push(
              new Paragraph({
                text: `Image not available: ${imageUrl}`,
                italics: true
              })
            );
            return;
          }
          try {
            const uintArray = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
            const image = Media.addImage(doc, uintArray, 320, 180);
            docChildren.push(
              new Paragraph({
                children: [image],
                alignment: AlignmentType.LEFT,
                spacing: { after: 150 }
              })
            );
          } catch (imageError) {
            console.warn('Unable to embed image in Word export:', imageError);
            docChildren.push(
              new Paragraph({
                text: `Image not embedded: ${imageUrl}`,
                italics: true
              })
            );
          }
        } catch (error) {
          console.warn('Unable to fetch image for Word export:', error);
          docChildren.push(
            new Paragraph({
              text: `Image not available: ${imageUrl}`,
              italics: true
            })
          );
        }
      };

      for (const section of sections) {
        docChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING2,
            spacing: { before: 200, after: 50 },
            children: [new TextRun({ text: section.heading, bold: true })]
          })
        );

        if (section.summary) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: section.summary, italics: true })],
              spacing: { after: 100 }
            })
          );
        }

        // eslint-disable-next-line no-await-in-loop
        for (const question of section.questions) {
          const hasMarks = question.marks !== null && question.marks !== undefined;
          const questionParagraphChildren = [
            new TextRun({
              text: `${question.number}) ${question.text}`
            })
          ];

          if (hasMarks) {
            questionParagraphChildren.push(new TextRun({ text: '\t' }));
            questionParagraphChildren.push(
              new TextRun({
                text: `[${question.marks} marks]`,
                bold: true
              })
            );
          }

          docChildren.push(
            new Paragraph({
              spacing: { after: 50 },
              tabStops: hasMarks
                ? [
                    {
                      type: TabStopType.RIGHT,
                      position: 9000
                    }
                  ]
                : undefined,
              children: questionParagraphChildren
            })
          );

          if (question.options && question.options.length > 0) {
            question.options.forEach((option, index) => {
              docChildren.push(
                new Paragraph({
                  text: `${String.fromCharCode(65 + index)}. ${option}`,
                  bullet: { level: 0 },
                  spacing: { after: 20 }
                })
              );
            });
          }

          if (question.imageUrl) {
            // eslint-disable-next-line no-await-in-loop
            await appendImageParagraph(question.imageUrl);
          }
        }
      }

      if (docChildren.length === 0) {
        docChildren.push(new Paragraph({ text: "No questions available for this paper." }));
      }

      doc.addSection({
        properties: {},
        children: docChildren
      });

      const blob = await Packer.toBlob(doc);
      const filename = `${paper.title || subjectDisplayUpper || 'question-paper'}.docx`;
      saveAs(blob, filename);
      message.success("Word document downloaded successfully.");
    } catch (error) {
      console.error("Failed to download Word document:", error);
      message.error("Failed to download Word document. Please try again.");
    } finally {
      setWordLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    let container: HTMLDivElement | null = null;
    try {
      setPdfLoading(true);
      const sectionsHtml = renderSectionsHtml(buildPaperSections());
      const paperTitle = `${paper.examinationType || paper.examType || 'Examination'} EXAMINATION - 2025-26`.trim();
      const bodyContent = buildPrintableBody({
        includeNameRoll: isClassFourOrBelow(paper.class),
        paperTitle,
        stdLabel: stdLabel || '-',
        subjectDisplay: subjectDisplayUpper || '',
        totalMarks: currentSumMarks,
        durationLabel: formatDuration(paper.duration || 60),
        sectionsHtml
      });

      container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.style.width = "210mm";
      container.style.background = "#fff";
      container.innerHTML = `<style>${PRINT_TEMPLATE_STYLES}</style>${bodyContent}`;
      document.body.appendChild(container);

      const docInstance = new jsPDF("p", "pt", "a4");
      await docInstance.html(container, {
        margin: [40, 40, 40, 40],
        autoPaging: "text",
        html2canvas: {
          scale: 0.55,
          useCORS: true
        },
        callback: (docRef) => {
          const filename = `${paper.title || subjectDisplayUpper || 'question-paper'}.pdf`;
          docRef.save(filename);
        }
      });

      message.success("PDF downloaded successfully.");
    } catch (error) {
      console.error('Failed to download PDF:', error);
      message.error('Failed to download PDF. Please try again.');
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      setPdfLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={onBack}
          className="flex items-center justify-center"
        >
          <ArrowLeft size={18} />
        </Button>
        <Title level={4} className="!mb-0 text-gray-700 font-local2">
          {paper.title}
        </Title>
      </div>

      {/* Print Options */}
      <div className="mb-6">
        <Card className="shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <Button
              onClick={handlePrintQuestionPaper}
              className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-500"
            >
              <Printer size={16} />
              Print Question Paper
            </Button>
            <Button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-3 bg-purple-500 text-white hover:bg-purple-500"
              loading={pdfLoading}
            >
              <FileText size={16} />
              Download PDF
            </Button>
            <Button
              onClick={handleDownloadWord}
              className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-3 bg-blue-500 text-white hover:bg-blue-500"
              loading={wordLoading}
            >
              <Download size={16} />
              Download Word
            </Button>
            <div>
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
            />
          </Popconfirm>
          </div>
          </div>
        </Card>
      </div>

      {/* Question Paper Preview */}
      <Card className="shadow-sm">
        <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Times, serif' }}>
          {/* Header */}
          {isClassFourOrBelow(paper.class) && (
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
          <div className="flex items-center sm:justify-between gap-3">
            <div className="flex-1 border-b border-gray-400" />
          </div>
          </div>

          {/* <div className="border-b mb-6" /> */}

          {/* Sections and Questions */}
          <div className="space-y-8">
            {paper.questions && Array.isArray(paper.questions) ? (
              // Group questions by type and display in sections
              (() => {
                const groupedQuestions = paper.questions.reduce((acc: any, question: any) => {
                  const type = question.questionType;
                  if (!acc[type]) {
                    acc[type] = [];
                  }
                  acc[type].push(question);
                  return acc;
                }, {});

                const typeLabels: any = {
                  'mcq': 'Multiple Choice',
                  'shortanswer': 'Short Answer',
                  'essay': 'Essay',
                  'fillblank': 'Fill in the blank',
                  'image': 'Image'
                };

                const desiredOrder = ['mcq', 'fillblank', 'shortanswer', 'image', 'essay'];
                return desiredOrder
                  .filter((type) => groupedQuestions[type] && groupedQuestions[type].length > 0)
                  .map((type, sectionIndex) => {
                    const romanNumeral = toRomanNumeral(sectionIndex + 1);
                    const questionsOfType = groupedQuestions[type];
                    const allMarks = questionsOfType.map((q: any) => q.mark || q.marks || 0);
                    const allSameMarks = allMarks.length > 0 && allMarks.every((mark: number) => mark === allMarks[0]);
                    const questionCount = questionsOfType.length;
                    const sectionMarks = allSameMarks ? allMarks[0] : null;
                    const sectionTotal = allSameMarks ? questionCount * sectionMarks : null;
                    
                    return (
                      <div key={type} className="section">
                        <div className="text-left mb-4 border-b pb-2">
                          <h3 className="text-lg font-semibold text-black font-local2 flex justify-between items-center">
                            <span>{romanNumeral}. {typeLabels[type] || type}</span>
                            {allSameMarks && <span className="text-base font-bold text-black">({questionCount} × {sectionMarks} = {sectionTotal})</span>}
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {questionsOfType.map((question: any, questionIndex: number) => (
                            <div key={questionIndex} className="flex items-start gap-3 py-2" style={{ marginLeft: '8px' }}>
                              <div className="w-8 flex-shrink-0">
                                <span className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{questionIndex + 1})</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{question.question}</div>
                                {question.questionType === 'image' && question.imageUrl && (
                                  <div className="mt-2">
                                    <img 
                                      src={question.imageUrl} 
                                      alt="Question Image" 
                                      className="w-48 h-32 object-contain rounded border border-gray-300 shadow-sm" 
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling.style.display = 'block';
                                      }}
                                    />
                                    <div 
                                      className="w-48 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 text-gray-500 text-sm font-local2"
                                      style={{ display: 'none' }}
                                    >
                                      Image not available
                                    </div>
                                  </div>
                                )}
                                {question.questionType === 'mcq' && question.options && question.options.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {question.options.map((option: string, optIndex: number) => (
                                      <div key={optIndex} className="text-sm font-local2" style={{ color: '#000' }}>
                                        {String.fromCharCode(65 + optIndex)}. {option}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {!allSameMarks && (
                                <div className="w-12 flex-shrink-0 text-right">
                                  <span className="text-lg font-local2" style={{ color: '#000', fontWeight: 400 }}>[{question.mark || question.marks || 0}]</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
              })()
            ) : (
              // Handle organized questions format (fallback)
              (() => {
                const typeMapping: any = {
                  'Multiple Choice': 'mcq',
                  'Fill in the blank': 'fillblank',
                  'Short Answer': 'shortanswer',
                  'Matching': 'image',
                  'Essay': 'essay'
                };
                
                const desiredOrder = ['mcq', 'fillblank', 'shortanswer', 'image', 'essay'];
                const sectionsWithQuestions = desiredOrder
                  .map(type => {
                    const typeName = Object.keys(typeMapping).find(key => typeMapping[key] === type) || type;
                    const questionsOfType = paper.organizedQuestions?.[typeName];
                    return questionsOfType && questionsOfType.length > 0 ? { type, typeName, questionsOfType } : null;
                  })
                  .filter(Boolean);
                
                return sectionsWithQuestions.map((section: any, sectionIndex: number) => {
                  const romanNumeral = toRomanNumeral(sectionIndex + 1);
                  const { typeName, questionsOfType } = section;
                  const allMarks = questionsOfType.map((q: any) => q.marks || 0);
                  const allSameMarks = allMarks.length > 0 && allMarks.every((mark: number) => mark === allMarks[0]);
                  const questionCount = questionsOfType.length;
                  const sectionMarks = allSameMarks ? allMarks[0] : null;
                  const sectionTotal = allSameMarks ? questionCount * sectionMarks : null;
                  
                  return (
                    <div key={typeName} className="section">
                      <div className="text-left mb-4 border-b pb-2">
                        <h3 className="text-lg font-semibold text-black font-local2 flex justify-between items-center">
                          <span>{romanNumeral}. {typeName}</span>
                          {allSameMarks && <span className="text-base font-bold text-black">({questionCount} × {sectionMarks} = {sectionTotal})</span>}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {questionsOfType.map(({ question, marks }: any, questionIndex: number) => (
                          <div key={questionIndex} className="flex items-start gap-3 py-2" style={{ marginLeft: '8px' }}>
                            <div className="w-8 flex-shrink-0">
                              <span className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{questionIndex + 1})</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-local2 text-lg" style={{ color: '#000', fontWeight: 400 }}>{question.text}</div>
                              {(question.type === 'Matching' || question.type === 'Image' || question.type === 'image') && question.imageUrl && (
                                <div className="mt-2">
                                  <img 
                                    src={question.imageUrl} 
                                    alt="Question Image" 
                                    className="w-48 h-32 object-contain rounded border border-gray-300 shadow-sm" 
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.nextElementSibling.style.display = 'block';
                                    }}
                                  />
                                  <div 
                                    className="w-48 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 text-gray-500 text-sm font-local2"
                                    style={{ display: 'none' }}
                                  >
                                    Image not available
                                  </div>
                                </div>
                              )}
                              {question.type === 'Multiple Choice' && question.options && (
                                <div className="mt-2 space-y-1">
                                  {question.options.map((option: string, index: number) => (
                                    <div key={index} className="text-sm font-local2" style={{ color: '#000' }}>
                                      {String.fromCharCode(65 + index)}. {option}
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
                });
              })()
            )}
          </div>
        </div>
      </Card>
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
        className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition ${
          selectedUsers.includes(user.id)
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
              pageSizeOptions={['5','10', '20', '50', '100']}
              className="font-local2"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default MyPapers;