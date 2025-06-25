import React, { useCallback } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onRemoveFile?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
  success?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  accept = '.csv',
  maxSize = 10,
  error,
  success,
}) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.size <= maxSize * 1024 * 1024) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect, maxSize]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= maxSize * 1024 * 1024) {
        onFileSelect(file);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer group"
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 group-hover:text-primary-500 transition-colors duration-200" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Drop your CSV file here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              or <span className="text-primary-600 dark:text-primary-400 font-medium">browse files</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Maximum file size: {maxSize}MB | Supported format: CSV
            </p>
          </label>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {onRemoveFile && (
              <button
                onClick={onRemoveFile}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm">{success}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;