import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, Frown, Meh, Smile, ChevronRight, PlusCircle, X } from 'lucide-react';

const MindMirror = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [view, setView] = useState('write');
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const result = await window.storage.list('entry:');
      if (result && result.keys) {
        const loadedEntries = await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await window.storage.get(key);
              return data ? JSON.parse(data.value) : null;
            } catch {
              return null;
            }
          })
        );
        setEntries(loadedEntries.filter(e => e).sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.log('Starting fresh - no entries yet');
      setEntries([]);
    }
  };

  const analyzeSentiment = async (text) => {
    setAnalyzing(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Analyze the emotional sentiment of this journal entry. Respond ONLY with a JSON object (no markdown, no preamble):
{
  "sentiment": "positive/negative/neutral/mixed",
  "score": (number between -1 and 1, where -1 is very negative, 0 is neutral, 1 is very positive),
  "emotions": ["array", "of", "detected", "emotions"],
  "insight": "one brief empathetic sentence about their emotional state",
  "suggestion": "one brief supportive suggestion"
}

Journal entry: "${text}"`
            }
          ],
        })
      });

      const data = await response.json();
      const textContent = data.content.find(block => block.type === 'text')?.text || '';
      const cleaned = textContent.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        sentiment: 'neutral',
        score: 0,
        emotions: ['reflective'],
        insight: 'Your thoughts have been recorded.',
        suggestion: 'Take time to process your feelings.'
      };
    } finally {
      setAnalyzing(false);
    }
  };

  const saveEntry = async () => {
    if (!currentEntry.trim()) return;

    const analysis = await analyzeSentiment(currentEntry);
    const entry = {
      id: Date.now().toString(),
      content: currentEntry,
      timestamp: Date.now(),
      date: new Date().toISOString(),
      ...analysis
    };

    try {
      await window.storage.set(`entry:${entry.id}`, JSON.stringify(entry));
      setEntries([entry, ...entries]);
      setCurrentEntry('');
      setSelectedEntry(entry);
      setView('insights');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const deleteEntry = async (id) => {
    try {
      await window.storage.delete(`entry:${id}`);
      setEntries(entries.filter(e => e.id !== id));
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      case 'mixed': return <Meh className="w-5 h-5 text-yellow-500" />;
      default: return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'bg-green-500';
    if (score < -0.3) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getAverageSentiment = () => {
    if (entries.length === 0) return 0;
    return entries.reduce((sum, e) => sum + e.score, 0) / entries.length;
  };

  const getEmotionFrequency = () => {
    const emotionMap = {};
    entries.forEach(entry => {
      entry.emotions?.forEach(emotion => {
        emotionMap[emotion] = (emotionMap[emotion] || 0) + 1;
      });
    });
    return Object.entries(emotionMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            MindMirror
          </h1>
          <p className="text-gray-600">Reflect, understand, and grow through emotional awareness</p>
        </header>

        <nav className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
          <button
            onClick={() => setView('write')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              view === 'write' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 inline mr-2" />
            Write
          </button>
          <button
            onClick={() => setView('entries')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              view === 'entries' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Entries ({entries.length})
          </button>
          <button
            onClick={() => setView('insights')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              view === 'insights' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Insights
          </button>
        </nav>

        {view === 'write' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write about your thoughts, feelings, and experiences... Be honest with yourself."
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">{currentEntry.length} characters</span>
              <button
                onClick={saveEntry}
                disabled={!currentEntry.trim() || analyzing}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {analyzing ? 'Analyzing...' : 'Save & Analyze'}
              </button>
            </div>
          </div>
        )}

        {view === 'entries' && (
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No entries yet</h3>
                <p className="text-gray-500">Start journaling to see your emotional journey</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {getSentimentIcon(entry.sentiment)}
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.timestamp).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {entry.emotions?.slice(0, 3).map((emotion, i) => (
                            <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {emotion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-700 mb-3 line-clamp-3">{entry.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getSentimentColor(entry.score)} transition-all`}
                        style={{ width: `${((entry.score + 1) / 2) * 100}%` }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEntry(entry);
                        setView('insights');
                      }}
                      className="text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
                    >
                      View Analysis <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'insights' && (
          <div className="space-y-6">
            {selectedEntry ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Entry Analysis</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(selectedEntry.timestamp).toLocaleString()}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">{selectedEntry.content}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-indigo-900 mb-2">Emotional Insight</h3>
                    <p className="text-indigo-700">{selectedEntry.insight}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Suggestion</h3>
                    <p className="text-purple-700">{selectedEntry.suggestion}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {selectedEntry.emotions?.map((emotion, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overall Emotional Trend</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getSentimentColor(getAverageSentiment())} transition-all`}
                          style={{ width: `${((getAverageSentiment() + 1) / 2) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {(getAverageSentiment() * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {getAverageSentiment() > 0.3 ? 'Predominantly positive' :
                     getAverageSentiment() < -0.3 ? 'Predominantly challenging' :
                     'Balanced emotional state'}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Emotions</h2>
                  {getEmotionFrequency().length > 0 ? (
                    <div className="space-y-3">
                      {getEmotionFrequency().map(([emotion, count], i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize text-gray-700">{emotion}</span>
                            <span className="text-gray-500">{count} entries</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${(count / entries.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Start journaling to see your emotional patterns</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMirror;