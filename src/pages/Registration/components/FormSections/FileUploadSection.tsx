
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp, Trash2 } from "lucide-react";

interface FileUploadSectionProps {
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

const FileUploadSection = ({ selectedFile, handleFileChange, removeFile }: FileUploadSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upload Response to Questions</h3>
      
      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload File</Label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
              >
                <span>Upload a file</span>
                <Input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC up to 10MB
            </p>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-2 flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-md">
            <FileUp size={16} />
            <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={removeFile}
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
