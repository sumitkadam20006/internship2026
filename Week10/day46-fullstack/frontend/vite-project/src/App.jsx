import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchRandomQuote() {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(
        'http://localhost:5000/api/quotes/random'
      );
      setQuote(res.data);
    } catch (err) {
      setError('Failed to fetch quote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Dev Quote Board</h1>
      <p className="sub">Connected to Express API</p>

      {error && <p className="error">{error}</p>}

      {quote && (
        <div className="quote-card">
          <p className="quote-text">"{quote.text}"</p>
          <p className="quote-author">- {quote.author}</p>
        </div>
      )}

      <button onClick={fetchRandomQuote} disabled={loading}>
        {loading ? 'Loading...' : 'New Quote'}
      </button>
    </div>
  );
}

export default App;