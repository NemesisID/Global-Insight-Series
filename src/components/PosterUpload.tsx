import { Upload } from "lucide-react";

// Add this component to AdminEvents.tsx after imports

interface PosterUploadProps {
  posterPreview: string;
  posterFile: File | null;
  onFileChange: (file: File | null) => void;
  onPreviewChange: (preview: string) => void;
}

export function PosterUpload({ posterPreview, posterFile, onFileChange, onPreviewChange }: PosterUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onPreviewChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onFileChange(null);
    onPreviewChange("");
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Event Poster
      </label>
      
      {/* Upload Button */}
      <div className="relative">
        <input
          id="poster-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="poster-upload"
          className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <Upload className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">
                Click to upload poster
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                PNG, JPG, WEBP up to 50MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Large Preview */}
      {posterPreview && (
        <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg bg-gray-50">
          <img 
            src={posterPreview} 
            alt="Poster Preview" 
            className="w-full h-auto max-h-[500px] object-contain" 
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-lg flex items-center gap-2 font-medium"
          >
            <X className="w-4 h-4" />
            <span>Remove</span>
          </button>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
            📸 Preview
          </div>
        </div>
      )}
    </div>
  );
}
