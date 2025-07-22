import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Share2 } from 'lucide-react';
import AIOutputCard from '../components/AIOutputCard';
// @ts-ignore
import jsPDF from 'jspdf';
// @ts-ignore
import html2canvas from 'html2canvas';

// Define the interface for the original form data as stored in sessionStorage
interface StudentFormData {
  age: string;
  gender: string;
  branch: string;
  gpa: string;
  attendance: string;
  backlogs: string;
  skills: string; // Stored as a comma-separated string
  internshipDone: string; // 'Yes' or 'No' string
  clubs: string; // Stored as a comma-separated string
}

// Define the interface for the complete data structure stored in sessionStorage
interface StoredPredictionData {
  placementChance: number;
  roadmap: string[];
  studentData: StudentFormData;
}

// Define the interface for the component's state, matching the stored data
interface DisplayResult {
  placementChance: number;
  roadmap: string[];
  studentData: StudentFormData;
}

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const storedResultString = sessionStorage.getItem('predictionResult');
    if (!storedResultString) {
      // If no data is found, redirect to the form
      navigate('/form');
      return;
    }

    try {
      // Parse the stored string into the StoredPredictionData object
      const stored: StoredPredictionData = JSON.parse(storedResultString);

      // Set the component's state with the extracted data
      setResult({
        placementChance: stored.placementChance,
        roadmap: stored.roadmap,
        studentData: stored.studentData,
      });
    } catch (err) {
      console.error('Failed to parse predictionResult from sessionStorage:', err);
      // If parsing fails, redirect to the form
      navigate('/form');
    }
  }, [navigate]);


  const generatePDF = async () => {
    setGenerating(true);
    try {
      const element = document.getElementById('result-content');
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2, logging: false });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('placement-prediction-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  const shareResult = async () => {
    if (!result) return; // Ensure result is not null

    // Access placementChance directly from the result state
    const message = `I got a ${result.placementChance.toFixed(1)}% placement probability with PlacementAI!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Placement Prediction',
          text: message,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${message} Check it out at ${window.location.origin}`);
      alert('Link copied to clipboard!');
    }
  };

  // Display a loading state if result is null (data not yet loaded or invalid)
  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Destructure properties from the correctly typed result object
  const { placementChance, roadmap, studentData } = result;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Placement Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your academic profile and current market trends
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/form')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Form</span>
          </button>

          <button
            onClick={shareResult}
            className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>

          <button
            onClick={generatePDF}
            disabled={generating}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{generating ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Student Info Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Student Profile Summary
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-500 dark:text-gray-400">Age:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.age}</span></div>
          <div><span className="text-gray-500 dark:text-gray-400">Branch:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.branch}</span></div>
          <div><span className="text-gray-500 dark:text-gray-400">GPA:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.gpa}</span></div>
          <div><span className="text-gray-500 dark:text-gray-400">Attendance:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.attendance}%</span></div>
          <div><span className="text-gray-500 dark:text-gray-400">Backlogs:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.backlogs}</span></div>
          {/* studentData.internshipDone is already a string 'Yes' or 'No' */}
          <div><span className="text-gray-500 dark:text-gray-400">Internship:</span> <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.internshipDone}</span></div>
        </div>
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">Skills:</span>
          {/* studentData.skills is a string, not an array, so remove .join() */}
          <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.skills}</span>
        </div>
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">Clubs:</span>
          {/* studentData.clubs is a string, use it directly */}
          <span className="ml-2 font-medium text-gray-900 dark:text-white">{studentData.clubs || 'N/A'}</span>
        </div>
      </div>

      {/* AI Analysis */}
      <div id="result-content">
        <AIOutputCard
          prediction={placementChance}
          roadmap={roadmap}
        />
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
          What's Next?
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
              Immediate Actions
            </h4>
            <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
              <li>• Save this report for future reference</li>
              <li>• Share with your career counselor</li>
              <li>• Start working on the recommended skills</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
              Long-term Planning
            </h4>
            <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
              <li>• Follow the suggested career roadmap</li>
              <li>• Track your progress monthly</li>
              <li>• Get another prediction after improvements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;