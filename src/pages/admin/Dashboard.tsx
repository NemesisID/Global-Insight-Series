import { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnailUrl?: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");

  // State
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);

  // Event Form State
  const [eventForm, setEventForm] = useState<Partial<Event>>({});
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  // News Form State
  const [newsForm, setNewsForm] = useState<Partial<News>>({});
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState<number | null>(null);

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    fetchEvents();
    fetchNews();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchEvents = async () => {
    try {
      const upcoming = await axios.get("http://localhost:5000/api/events?type=upcoming");
      const previous = await axios.get("http://localhost:5000/api/events?type=previous");
      setEvents([...upcoming.data, ...previous.data]);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/news");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/control");
  };

  // --- Image Handler for Quill ---
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await axios.post('http://localhost:5000/api/upload', formData, getAuthHeader());
          const url = res.data.url;
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, 'image', url);
            }
          }
        } catch (err) {
          console.error('Image upload failed', err);
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  // --- Event Handlers ---
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...eventForm, date: eventDate };
      if (isEditingEvent && currentEventId) {
        await axios.put(`http://localhost:5000/api/events/${currentEventId}`, payload, getAuthHeader());
      } else {
        await axios.post("http://localhost:5000/api/events", payload, getAuthHeader());
      }
      setEventForm({});
      setEventDate(new Date());
      setIsEditingEvent(false);
      setCurrentEventId(null);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event", error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEventForm(event);
    setEventDate(new Date(event.date));
    setIsEditingEvent(true);
    setCurrentEventId(event.id);
  };

  const handleDeleteEvent = async (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:5000/api/events/${id}`, getAuthHeader());
      fetchEvents();
    }
  };

  // --- News Handlers ---
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = newsForm;
      if (isEditingNews && currentNewsId) {
        await axios.put(`http://localhost:5000/api/news/${currentNewsId}`, payload, getAuthHeader());
      } else {
        await axios.post("http://localhost:5000/api/news", payload, getAuthHeader());
      }
      setNewsForm({});
      setIsEditingNews(false);
      setCurrentNewsId(null);
      fetchNews();
    } catch (error) {
      console.error("Error saving news", error);
    }
  };

  const handleEditNews = (item: News) => {
    setNewsForm(item);
    setIsEditingNews(true);
    setCurrentNewsId(item.id);
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm("Are you sure you want to delete this news?")) {
      await axios.delete(`http://localhost:5000/api/news/${id}`, getAuthHeader());
      fetchNews();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="events">Events Manager</TabsTrigger>
          <TabsTrigger value="news">News Manager</TabsTrigger>
        </TabsList>

        {/* EVENTS TAB */}
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event List */}
            <Card>
              <CardHeader>
                <CardTitle>Event List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {events.map((event) => (
                    <div key={event.id} className="border p-4 rounded-lg flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-gray-500">{format(new Date(event.date), "PPP")}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Form */}
            <Card>
              <CardHeader>
                <CardTitle>{isEditingEvent ? "Edit Event" : "Create Event"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={eventForm.title || ""}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!eventDate && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={eventDate}
                          onSelect={setEventDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={eventForm.location || ""}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL (Optional)</Label>
                    <Input
                      value={eventForm.imageUrl || ""}
                      onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={eventForm.description || ""}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isEditingEvent ? "Update Event" : "Create Event"}
                  </Button>
                  {isEditingEvent && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full mt-2"
                      onClick={() => {
                        setIsEditingEvent(false);
                        setEventForm({});
                        setEventDate(new Date());
                        setCurrentEventId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NEWS TAB */}
        <TabsContent value="news">
          <div className="grid grid-cols-1 gap-8">
            {/* News Form - Full Width for Editor */}
            <Card>
              <CardHeader>
                <CardTitle>{isEditingNews ? "Edit News Article" : "Create News Article"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={newsForm.title || ""}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={newsForm.author || ""}
                        onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Thumbnail URL (Optional)</Label>
                    <Input
                      value={newsForm.thumbnailUrl || ""}
                      onChange={(e) => setNewsForm({ ...newsForm, thumbnailUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <div className="h-96 pb-12">
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={newsForm.content || ""}
                        onChange={(content) => setNewsForm({ ...newsForm, content })}
                        modules={modules}
                        className="h-full"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {isEditingNews ? "Update Article" : "Create Article"}
                    </Button>
                    {isEditingNews && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setIsEditingNews(false);
                          setNewsForm({});
                          setCurrentNewsId(null);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* News List */}
            <Card>
              <CardHeader>
                <CardTitle>Published News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                         {item.thumbnailUrl && <img src={item.thumbnailUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />}
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-sm text-gray-500">By {item.author}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditNews(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteNews(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
