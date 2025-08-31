import React, { useState, useEffect } from "react";
import { WhopService } from "./services/whop";

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
import { WhopService } from "./services/whop";

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
    import React, { useState, useEffect } from "react";
    description: "Analyze and visualize your Whop community engagement.",
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
  useEffect(() => {
    console.log('WhopAISuggester mounted');
  }, []);
  const [query, setQuery] = useState("");
  const [apps, setApps] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [viewedApp, setViewedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial apps on component mount
  useEffect(() => {
    const fetchInitialApps = async () => {
      try {
        const data = await WhopService.searchProducts();
        setApps(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading apps:', err);
        setError('Failed to load apps. Please check your API key.');
        setApps(FALLBACK_APPS);
        setLoading(false);
      }
    };

    fetchInitialApps();
  }, []);

  const handleSuggest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    setError(null);
    

    import React, { useState, useEffect } from "react";
    import { WhopService } from "./services/whop";

    const BUTTON = `bg-accent px-6 py-3 text-white rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 shadow-accent`;
    const BUTTON_OUTLINE = `glass px-6 py-3 text-white/90 rounded-lg font-medium hover:text-white hover:bg-white/5 transition-all duration-300`;
    const HEADING_STYLE = `display-text text-5xl md:text-7xl font-bold tracking-tight`;
    const SUBTITLE_STYLE = `text-lg md:text-xl text-zinc-400 max-w-2xl`;

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

    function App() {
      const [query, setQuery] = useState("");
      const [apps, setApps] = useState([]);
      const [suggestions, setSuggestions] = useState([]);
      const [submitted, setSubmitted] = useState(false);
      const [viewedApp, setViewedApp] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchInitialApps = async () => {
          try {
            const data = await WhopService.searchProducts();
            setApps(data);
            setLoading(false);
          } catch (err) {
            console.error('Error loading apps:', err);
            setError('Failed to load apps. Please check your API key.');
            setApps(FALLBACK_APPS);
            setLoading(false);
          }
        };
        fetchInitialApps();
      }, []);

      const handleSuggest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(true);
        setError(null);
        try {
          const results = await WhopService.searchProducts(query);
          setSuggestions(results);
          if (results.length === 0) {
            setError('No apps found matching your search. Try different keywords.');
          }
        } catch (err) {
          console.error('Search error:', err);
          setError('Failed to search apps. Please try again.');
          const filtered = apps.filter(
            (app) =>
              app.name.toLowerCase().includes(query.toLowerCase()) ||
              app.description.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filtered.length ? filtered : apps);
        } finally {
          setLoading(false);
        }
      };

      const handleView = (app) => {
        setViewedApp(app);
      };

      const handleCloseModal = () => {
        setViewedApp(null);
      };

      return (
        <ErrorBoundary>
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <h1 className="text-3xl font-bold mb-8">Whop AI Suggester</h1>
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSuggest} className="flex gap-2 mb-8">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for Whop apps..."
                  className="flex-1 px-4 py-2 rounded border"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
              </form>
              <div>
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {!loading && !error && (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {(submitted ? suggestions : apps).map(app => (
                      <div key={app.id} className="p-4 border rounded bg-white/10">
                        <div className="font-bold text-lg mb-2">{app.name}</div>
                        <div className="text-sm mb-2">{app.description}</div>
                        <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ErrorBoundary>
      );
    }
    }
}
export default App;
