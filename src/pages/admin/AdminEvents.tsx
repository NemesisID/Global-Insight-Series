import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  participants: string;
  description: string;
  poster: string;
  registrationLink?: string;
}

export function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Webinar");
  const [participants, setParticipants] = useState("-");
  const [description, setDescription] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', location);
      formData.append('type', type);
      formData.append('participants', participants);
      formData.append('description', description);
      formData.append('registrationLink', registrationLink);
      
      if (posterFile) {
        formData.append('poster', posterFile);
      }
      
      if (editId) {
        await axios.put(`/api/events/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Event updated successfully");
      } else {
        await axios.post("/api/events", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Event created successfully");
      }
      resetForm();
      fetchEvents();
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: EventItem) => {
    setTitle(event.title);
    setDate(event.date.split("T")[0]);
    setTime(event.time);
    setLocation(event.location);
    setType(event.type);
    setParticipants(event.participants);
    setDescription(event.description);
    setPosterPreview(event.poster); // Show existing poster
    setPosterFile(null); // Clear file input
    setRegistrationLink(event.registrationLink || "");
    setEditId(event.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/api/events/${id}`);
        fetchEvents();
        toast.success("Event deleted");
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setType("Webinar");
    setParticipants("-");
    setDescription("");
    setPosterFile(null);
    setPosterPreview("");
    setRegistrationLink("");
    setEditId(null);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {editId ? "Edit Event" : "Create Event"}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="14:00 - 15:30 WIB"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
              >
                <option value="Webinar">Webinar</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
              <input
                type="text"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="100+ participants or -"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
            <input
              type="url"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (HTML supported)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--forest-green)] focus:border-[var(--forest-green)]"
              placeholder="You can use HTML tags like <b>bold</b>"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Poster</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--forest-green)]/10 file:text-[var(--forest-green)] hover:file:bg-[var(--forest-green)]/20"
              />
              {posterPreview && (
                <div className="h-16 w-16 rounded overflow-hidden border border-gray-200">
                  <img src={posterPreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
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
              {isLoading ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--olive-green)] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-medium text-gray-500">Poster</th>
                <th className="px-6 py-4 font-medium text-gray-500">Title</th>
                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 font-medium text-gray-500">Type</th>
                <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No events found. Create one to get started.
                  </td>
                </tr>
              ) : (
                events.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {item.poster ? (
                        <img src={item.poster} alt={item.title} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{item.type}</td>
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
