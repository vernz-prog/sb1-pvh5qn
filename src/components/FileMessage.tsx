import React from 'react';
import { FileText, Download } from 'lucide-react';

interface FileMessageProps {
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

export const FileMessage: React.FC<FileMessageProps> = ({
  fileName,
  fileUrl,
  fileSize,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-100 rounded">
        <FileText className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{fileName}</p>
        <p className="text-xs opacity-75">{formatFileSize(fileSize)}</p>
      </div>
      <a
        href={fileUrl}
        download={fileName}
        className="p-2 hover:bg-black/10 rounded-full transition-colors"
      >
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
};