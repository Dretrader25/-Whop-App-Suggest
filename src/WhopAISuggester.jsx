import React, { useState, useEffect } from "react";
import { WhopService, WhopWebsocketProvider, useWhopWebsocket, sendWebsocketMessage, listMessagesFromChat, sendMessageToChat, getCurrentUser } from "./services/whop";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 32 }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
const BUTTON = `bg-accent px-6 py-3 text-white rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 shadow-accent`;
const BUTTON_OUTLINE = `glass px-6 py-3 text-white/90 rounded-lg font-medium hover:text-white hover:bg-white/5 transition-all duration-300`;
const HEADING_STYLE = `display-text text-5xl md:text-7xl font-bold tracking-tight`;
const SUBTITLE_STYLE = `text-lg md:text-xl text-zinc-400 max-w-2xl`;

// Temporary fallback data in case API fails
const FALLBACK_APPS = [
  {
    id: 1,
    name: "Whop AI Assistant",
    description: "Automate your Whop tasks and get instant answers.",
    icon: "🤖",
    url: "https://whop.com/ai-assistant"
  },
  {
    id: 2,
    name: "Community Insights",
    description: "Analyze and visualize your Whop community engagement.",
    icon: "📊",
    url: "https://whop.com/community-insights"
  },
  {
    id: 3,
    name: "Event Scheduler",
    description: "Plan, schedule, and manage events with ease.",
    icon: "📅",
    url: "https://whop.com/event-scheduler"
  },
  {
    id: 4,
    name: "Content Booster",
    description: "AI-powered content suggestions for your Whop store.",
    icon: "🚀",
    url: "https://whop.com/content-booster"
  },
  {
    id: 5,
    name: "Support Genie",
    description: "24/7 AI support for your Whop users.",
    icon: "🧞‍♂️",
    url: "https://whop.com/support-genie"
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await WhopService.searchCommunity(query);
      setResults(data);
      if (data.length === 0) {
        setError("No community content found for your search.");
      }
    } catch (err) {
      setError("Failed to fetch community content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <h1 className="text-3xl font-bold mb-8">Whop Community Search</h1>
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Whop community..."
              className="flex-1 px-4 py-2 rounded border"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
          </form>
          <div>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && (
              results.length === 0 ? (
                <div className="text-center text-zinc-400">No results found.</div>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {results.map(item => (
                    <div key={item.id} className="p-4 border rounded bg-white/10">
                      <div className="font-bold text-lg mb-2">{item.title}</div>
                      <div className="text-sm mb-2">{item.description}</div>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                      )}
                      <div className="text-xs text-zinc-400 mt-2">Type: {item.type}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [trainingContent, setTrainingContent] = useState([]);

  // Example: Fetch current user and set owner/admin status
  useEffect(() => {
    async function checkUser() {
      try {
        const user = await getCurrentUser();
        setIsOwner(user?.role === "owner" || user?.role === "admin");
      } catch {
        setIsOwner(false);
      }
    }
    checkUser();
  }, []);

  // Example: Fetch chat history
  useEffect(() => {
    async function fetchMessages() {
      try {
        const history = await listMessagesFromChat();
        setMessages(history);
      } catch (err) {
        setError("Failed to load chat history.");
      }
    }
    fetchMessages();
  }, []);

  // Example: Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      await sendMessageToChat(input);
      setInput("");
      // Optionally refresh messages
      const history = await listMessagesFromChat();
      setMessages(history);
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  // Example: Owner/admin training dashboard
  const handleAddTraining = (content) => {
    setTrainingContent([...trainingContent, content]);
  };

  return (
    <WhopWebsocketProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <h1 className="text-3xl font-bold mb-8">Whop AI Chat</h1>
        <div className="w-full max-w-2xl mb-8">
          <div className="border rounded bg-white/10 p-4 mb-4 h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-zinc-400">No messages yet.</div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={`mb-4 ${msg.sender === "ai" ? "bg-blue-100" : "bg-white/20"} p-2 rounded`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{msg.sender === "ai" ? "AI" : msg.senderName || "User"}</span>
                    <span className="text-xs text-zinc-400">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>
              ))
            )}
            {loading && <div className="text-center text-blue-500">Sending...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded border"
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>Send</button>
          </form>
        </div>
        {isOwner && (
          <div className="w-full max-w-2xl border rounded bg-white/10 p-4">
            <button onClick={() => setShowTraining(!showTraining)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded">
              {showTraining ? "Hide" : "Show"} Training Dashboard
            </button>
            {showTraining && (
              <div>
                <h2 className="text-xl font-bold mb-2">Training Content</h2>
                <ul className="mb-4">
                  {trainingContent.map((item, idx) => (
                    <li key={idx} className="mb-2">{item}</li>
                  ))}
                </ul>
                <form onSubmit={e => {
                  e.preventDefault();
                  const value = e.target.elements.training.value;
                  if (value) handleAddTraining(value);
                  e.target.reset();
                }}>
                  <input name="training" type="text" placeholder="Add training content..." className="px-4 py-2 rounded border mr-2" />
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </WhopWebsocketProvider>
  );
}

export default ChatApp;
