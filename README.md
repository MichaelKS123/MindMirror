# MindMirror

**An AI-Powered Emotional Journaling Platform**

*Developed by Michael Semera*

---

## 📖 Overview

MindMirror is a modern journaling application that combines personal reflection with advanced AI-powered sentiment analysis. Built with React and Claude AI, it helps users understand their emotional patterns, track their mental well-being, and gain insights into their feelings over time.

The application analyzes journal entries in real-time, detecting emotions, sentiment polarity, and providing empathetic insights and suggestions to support the user's emotional journey.

---

## ✨ Features

### Core Functionality
- **Intelligent Journaling**: Write journal entries with a clean, distraction-free interface
- **AI Sentiment Analysis**: Powered by Claude API to analyze emotional content
- **Emotion Detection**: Identifies multiple emotions present in each entry
- **Sentiment Scoring**: Provides a numerical score from -1 (negative) to +1 (positive)
- **Personalized Insights**: Receives empathetic feedback and supportive suggestions
- **Persistent Storage**: All entries are saved securely and persist across sessions

### Analytics & Insights
- **Emotional Trends**: Track overall sentiment patterns over time
- **Emotion Frequency**: Visualize your most common emotional states
- **Entry History**: Browse and review past journal entries
- **Visual Indicators**: Color-coded sentiment bars and emotion tags

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient design with smooth animations
- **Intuitive Navigation**: Three main views: Write, Entries, and Insights
- **Entry Management**: Easy deletion of entries with confirmation

---

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **Lucide React**: Beautiful icon system
- **Tailwind CSS**: Utility-first styling (core classes only)
- **Browser Storage API**: Persistent data storage

### Backend/AI
- **Claude API (Sonnet 4)**: Advanced sentiment analysis and emotion detection
- **Natural Language Processing**: Context-aware emotional understanding
- **JSON Structured Outputs**: Clean, parseable analysis results

### Architecture
- **Single Page Application**: No backend server required
- **Client-Side Storage**: Browser-based persistent storage
- **Async/Await Patterns**: Modern JavaScript async handling
- **Component-Based Design**: Modular, reusable React components

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Local Development

1. **Clone or download the project files**
```bash
# Create project directory
mkdir mindmirror
cd mindmirror
```

2. **Initialize React project**
```bash
npx create-react-app .
```

3. **Install dependencies**
```bash
npm install lucide-react
```

4. **Replace `src/App.js` with the MindMirror component code**

5. **Update `src/App.css` to include Tailwind or use inline styles**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **Start the development server**
```bash
npm start
```

7. **Open browser to `http://localhost:3000`**

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build` directory.

---

## 💡 Usage Guide

### Writing an Entry
1. Click the **Write** tab
2. Type your thoughts and feelings in the text area
3. Click **Save & Analyze** to process your entry
4. View the AI-generated analysis with emotional insights

### Viewing Entries
1. Click the **Entries** tab
2. Browse through your journal history
3. See emotion tags and sentiment indicators for each entry
4. Click **View Analysis** to see detailed insights
5. Delete entries by clicking the X icon

### Tracking Insights
1. Click the **Insights** tab
2. View your overall emotional trend percentage
3. Explore your top 5 most frequent emotions
4. See visual representations of your emotional patterns

---

## 🏗️ Project Structure

```
mindmirror/
├── src/
│   ├── App.js                 # Main MindMirror component
│   ├── index.js               # React entry point
│   └── App.css                # Styles
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies
└── README.md                  # Documentation
```

### Key Components

**State Management**
- `entries`: Array of all journal entries
- `currentEntry`: Text being written
- `analyzing`: Loading state during AI processing
- `view`: Current view (write/entries/insights)
- `selectedEntry`: Entry being viewed in detail

**Core Functions**
- `analyzeSentiment()`: Sends entry to Claude API for analysis
- `saveEntry()`: Saves entry with analysis to storage
- `loadEntries()`: Loads all entries from persistent storage
- `deleteEntry()`: Removes entry from storage
- `getSentimentIcon()`: Returns appropriate emotion icon
- `getAverageSentiment()`: Calculates overall emotional trend
- `getEmotionFrequency()`: Analyzes emotion distribution

---

## 🔐 Data & Privacy

### Storage Architecture
- **Client-Side Only**: All data stored in browser's storage API
- **No External Database**: No data sent to external servers except AI analysis
- **User-Controlled**: Users can delete entries anytime
- **Session Persistence**: Data persists across browser sessions

### AI Processing
- Journal entries are sent to Claude API for sentiment analysis
- Analysis includes: sentiment type, score, emotions, insight, and suggestion
- API responses are processed and stored locally
- Original entry content remains private to the user

---

## 🎨 Design Philosophy

### Visual Design
- **Calming Colors**: Soft gradients from indigo to purple to pink
- **Clear Hierarchy**: Easy-to-scan layout with distinct sections
- **Emotion-Driven**: Color-coded sentiments (green=positive, red=negative, yellow=neutral)
- **Minimalist Interface**: Focus on content, not chrome

### User Experience
- **Zero Learning Curve**: Intuitive navigation and clear labels
- **Instant Feedback**: Real-time character counts and loading states
- **Empathetic Tone**: Supportive language throughout the interface
- **Progressive Enhancement**: Works without JavaScript (static view)

---

## 🔄 Future Enhancements

Potential features for future versions:
- **Export Functionality**: Download entries as PDF or JSON
- **Search & Filter**: Find entries by date, emotion, or keyword
- **Mood Calendar**: Visual calendar view with daily sentiment indicators
- **Journaling Prompts**: AI-generated prompts for when inspiration is low
- **Streak Tracking**: Encourage consistent journaling habits
- **Data Visualization**: Charts and graphs of emotional trends
- **Multi-User Support**: User accounts with authentication
- **Cloud Sync**: Backup entries to cloud storage
- **Mobile App**: Native iOS and Android applications
- **Voice Journaling**: Speech-to-text entry input

---

## 🐛 Troubleshooting

### Common Issues

**Entries not saving**
- Check browser storage permissions
- Ensure sufficient storage space
- Clear browser cache and reload

**Analysis not working**
- Verify internet connection
- Check browser console for API errors
- Try with a shorter entry to test

**UI not loading**
- Clear browser cache
- Check for JavaScript errors in console
- Ensure React dependencies are installed

---

## 📝 Development Notes

### Code Quality
- **No External Libraries**: Minimal dependencies for faster loading
- **ES6+ Syntax**: Modern JavaScript features throughout
- **Async Patterns**: Proper error handling with try-catch
- **Type Safety**: Defensive coding with null checks
- **Clean Code**: Well-commented, readable, and maintainable

### Performance Optimizations
- **Lazy Loading**: Entries load on demand
- **Efficient Sorting**: Newest entries first
- **Minimal Re-renders**: Strategic use of React state
- **Optimized Images**: SVG icons for crisp rendering

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **Color Contrast**: WCAG AA compliant colors
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels where needed

---

## 🤝 Contributing

This is a portfolio project by Michael Semera. For questions or suggestions, please reach out directly.

---

## 📄 License

This project is created for portfolio purposes. All rights reserved by Michael Semera.

---

## 👨‍💻 About the Developer

**Michael Semera**
- Portfolio Project: MindMirror
- Specialization: Full-stack development with AI integration
- Focus: Building meaningful applications that improve mental well-being

---

## 🙏 Acknowledgments

- **Claude AI by Anthropic**: Powers the sentiment analysis engine
- **Lucide Icons**: Beautiful icon system
- **React Community**: For excellent documentation and support
- **Tailwind CSS**: For utility-first styling philosophy

---

## 📞 Contact

For questions about this project, please contact Michael Semera.

- 💼 LinkedIn: [Michael Semera](https://www.linkedin.com/in/michael-semera-586737295/)
- 🐙 GitHub: [@MichaelKS123](https://github.com/MichaelKS123)
- 📧 Email: michaelsemera15@gmail.com

---

**Built with ❤️ by Michael Semera**

*Last Updated: November 2025*