import React, { useState } from 'react';
import { Download, FileText, Users, TrendingUp } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import { predictBatchPlacement } from '../utils/api';

const Batch = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setResults(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    setResults(null);
  };

  const processFile = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // For demo purposes, simulating batch processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock results
      const mockResults = {
        totalStudents: 25,
        averagePlacement: 76.8,
        highProbability: 12,
        mediumProbability: 8,
        lowProbability: 5,
        students: [
          { id: 1, name: 'John Doe', branch: 'CSE', gpa: 8.2, probability: 89.5, status: 'High' },
          { id: 2, name: 'Jane Smith', branch: 'ECE', gpa: 7.8, probability: 78.3, status: 'High' },
          { id: 3, name: 'Mike Johnson', branch: 'EEE', gpa: 7.2, probability: 68.7, status: 'Medium' },
          { id: 4, name: 'Sarah Wilson', branch: 'CSE', gpa: 8.8, probability: 94.2, status: 'High' },
          { id: 5, name: 'David Brown', branch: 'MECH', gpa: 6.5, probability: 45.8, status: 'Low' },
        ]
      };

      setResults(mockResults);
    } catch (error) {
      setError('Error processing file. Please try again.');
      console.error('Batch processing error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Name', 'Branch', 'GPA', 'Placement Probability (%)', 'Status'],
      ...results.students.map(student => [
        student.name,
        student.branch,
        student.gpa,
        student.probability.toFixed(1),
        student.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'placement_predictions.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const template = [
      ['Name', 'Age', 'Gender', 'Branch', 'GPA', 'Attendance', 'Backlogs', 'Skills', 'Internship Done', 'Clubs'],
      ['John Doe', '21', 'Male', 'CSE', '8.2', '92', '0', 'Python,JavaScript,React', 'Yes', 'Tech Club'],
      ['Jane Smith', '20', 'Female', 'ECE', '7.8', '88', '1', 'C++,MATLAB,Arduino', 'No', 'Robotics Club']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch_upload_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'High': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Low': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Batch Placement Prediction
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a CSV file with student data to get placement predictions for multiple students at once.
          Perfect for educational institutions and career counselors.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload Student Data
          </h2>
          <button
            onClick={downloadTemplate}
            className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Download Template</span>
          </button>
        </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onRemoveFile={handleRemoveFile}
          error={error}
        />

        {selectedFile && (
          <div className="mt-6">
            <button
              onClick={processFile}
              disabled={processing}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Students...</span>
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  <span>Process Batch</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.totalStudents}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.averagePlacement.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Probability</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-semibold">H</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.highProbability}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Probability</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold">M</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.mediumProbability}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Medium Probability</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Detailed Results
              </h3>
              <button
                onClick={downloadResults}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download Results</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      GPA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Probability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {student.branch}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {student.gpa}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.probability.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batch;