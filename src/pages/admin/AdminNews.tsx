import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Rich text content
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/news");
      // Ensure we always have an array
      setNews(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch news", error);
      toast.error("Failed to load news");
      setNews([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = { title, content, image, author };
      
      if (editId) {
        await axios.put(`/api/news/${editId}`, payload);
        toast.success("News updated successfully");
      } else {
        await axios.post("/api/news", payload);
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
    setAuthor("");
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--forest-green)]/10 file:text-[var(--forest-green)] hover:file:bg-[var(--forest-green)]/20"
              />
              {image && (
                <div className="h-16 w-16 rounded overflow-hidden border border-gray-200">
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
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

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => { setIsEditing(false); resetForm(); }}
              className="px-6 py-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--olive-green)] transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Article"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">News Management</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--olive-green)] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add News
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-medium text-gray-500">Image</th>
                <th className="px-6 py-4 font-medium text-gray-500">Title</th>
                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
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
