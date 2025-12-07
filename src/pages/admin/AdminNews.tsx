import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PosterUpload } from "../../components/PosterUpload";

// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';

// Configure Font Sizes (Pixel based) - Allow custom values
const Size = Quill.import('attributors/style/size');
Size.whitelist = null; // ALL pixel values allowed
Quill.register(Size, true);

Quill.register('modules/imageResize', ImageResize);

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

export function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/news");
      if (Array.isArray(res.data)) {
        setNews(res.data);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Failed to fetch news", error);
      toast.error("Failed to fetch news");
      setNews([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      
      if (editId) {
        await axios.put(`/api/news/${editId}`, formData, { headers });
        toast.success("News updated successfully");
      } else {
        await axios.post("/api/news", formData, { headers });
        toast.success("News created successfully");
      }
      
      setIsEditing(false);
      resetForm();
      fetchNews();
    } catch (error) {
      console.error("Failed to save news", error);
      toast.error("Failed to save news");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image);
    setImageFile(null);
    setAuthor(item.author || "");
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      try {
        await axios.delete(`/api/news/${id}`);
        fetchNews();
        toast.success("News deleted");
      } catch (error) {
        toast.error("Failed to delete news");
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setContent("");
    setImage("");
    setImageFile(null);
    setAuthor("");
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'size': ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  }), []);

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {editId ? "Edit News" : "Create News"}
          </h2>
          <button
            onClick={() => { setIsEditing(false); resetForm(); }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
              />
            </div>
          </div>

          <div>
             <PosterUpload 
                posterPreview={image}
                posterFile={imageFile}
                onFileChange={setImageFile}
                onPreviewChange={setImage}
                className="aspect-video w-full max-w-2xl"
                imageClassName="w-full h-full object-cover"
             />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <div className="h-96 mb-12">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                modules={modules}
                className="h-full"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save News"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">News Management</h2>
          <p className="text-sm text-gray-500 mt-1">Publish and edit news articles and updates.</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-5 py-2.5 bg-[var(--forest-green)] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold shadow-sm flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add News
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.length === 0 ? (
                 <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                     No news articles found. Create one to get started.
                   </td>
                 </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 50) + "..." }} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
