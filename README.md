# Emotion Detector Web Application

A comprehensive web application that analyzes customer feedback text and detects emotions using AI. Built with React + Vite + Tailwind CSS for the frontend and Python + Flask for the backend, integrating Watson NLP for emotion detection.

## 🌟 Features

- **Real-time Emotion Analysis**: Analyze text for emotions including joy, anger, sadness, fear, and disgust
- **Beautiful Modern UI**: Responsive design with Tailwind CSS, gradients, and smooth animations
- **Dominant Emotion Detection**: Identifies the primary emotion in the text
- **Interactive Visualization**: Progress bars and color-coded emotion scores
- **Error Handling**: Graceful handling of empty inputs and API errors
- **Fallback Mock System**: Works even when Watson API is not accessible
- **Unit Testing**: Comprehensive test suite for all functionalities
- **Code Quality**: 10/10 PyLint score for clean, production-ready code

## 🏗️ Project Structure

```
EmotionDetector/
├── frontend/                 # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Tailwind CSS styles
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
└── backend/
    └── final_project/       # Flask backend
        ├── EmotionDetection/         # Emotion detection package
        │   ├── __init__.py          # Package initialization
        │   ├── emotion_detection.py # Main emotion detector
        │   └── emotion_detection_mock.py # Mock for demonstration
        ├── templates/               # HTML templates
        │   └── index.html          # Basic HTML template
        ├── static/                 # Static files
        │   └── mywebscript.js      # Basic JavaScript
        ├── server.py               # Flask application
        ├── test_emotion_detection.py # Unit tests
        ├── test_basic.py           # Basic functionality tests
        └── requirements.txt        # Python dependencies
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend/final_project
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run unit tests:**
   ```bash
   python test_emotion_detection.py
   ```

4. **Start the Flask server:**
   ```bash
   python server.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## 🎯 Usage

1. **Open your browser** and go to `http://localhost:3000`
2. **Enter text** in the text area (e.g., "I love this new technology!")
3. **Click "Analyze Emotion"** or press `Ctrl+Enter`
4. **View results** showing:
   - Individual emotion scores (anger, disgust, fear, joy, sadness)
   - Dominant emotion highlighted
   - Progress bars and percentages
   - Detailed analysis

## 🧪 Testing

### Unit Tests
```bash
cd backend/final_project
python test_emotion_detection.py
```

### Basic Functionality Tests
```bash
cd backend/final_project
python test_basic.py
```

### Static Code Analysis
```bash
cd backend/final_project
python -m pylint server.py
```

## 🛠️ Technical Implementation

### Backend (Python + Flask)

- **EmotionDetection Package**: Modular emotion detection with Watson NLP integration
- **Fallback System**: Mock emotion detector for offline demonstration
- **Error Handling**: Comprehensive error handling for API failures and invalid inputs
- **RESTful API**: Clean API endpoints following REST principles
- **Unit Testing**: Complete test coverage for all functionality

### Frontend (React + Vite + Tailwind)

- **Modern React**: Hooks-based functional components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Dynamic UI updates during analysis
- **Error States**: User-friendly error messages and loading states
- **Accessibility**: Proper labeling and keyboard navigation

### API Integration

- **Primary**: Watson NLP Emotion Detection API
- **Fallback**: Local mock function with realistic emotion detection
- **Timeout Handling**: 10-second timeout for API requests
- **Error Recovery**: Graceful fallback to mock when API is unavailable

## 📁 Key Components

### Emotion Detection Function
```python
def emotion_detector(text_to_analyze):
    """
    Detects emotions using Watson NLP API with fallback to mock function
    Returns: dict with emotion scores and dominant emotion
    """
```

### React App Component
```jsx
function App() {
    // State management for text, analysis results, loading, and errors
    // Handles API communication and UI updates
}
```

### Flask Server
```python
@app.route("/emotionDetector")
def emotion_detector_route():
    # Handles emotion detection requests
    # Returns formatted response strings
```

## 🎨 UI Features

- **Gradient Background**: Beautiful blue gradient background
- **Card-based Layout**: Clean white cards with shadows
- **Color-coded Emotions**: Each emotion has its own color scheme
- **Progress Bars**: Visual representation of emotion scores
- **Loading Animation**: Spinning indicator during analysis
- **Responsive Grid**: Emotion cards adapt to screen size
- **Hover Effects**: Interactive button and card animations

## 🔧 Configuration

### Vite Proxy Setup
The frontend is configured to proxy API requests to the Flask backend:
```javascript
server: {
  proxy: {
    '/emotionDetector': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

### Tailwind CSS
Custom configuration for the emotion detection theme with extended color palette and utilities.

## 📋 Dependencies

### Frontend
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **vite**: ^5.4.10
- **tailwindcss**: ^3.4.15
- **autoprefixer**: ^10.4.20
- **postcss**: ^8.4.49

### Backend
- **flask**: 3.1.1
- **requests**: 2.32.4
- **pylint**: 3.3.7

## 🚀 Production Deployment

### Backend Deployment
1. Set environment variables for production
2. Use a production WSGI server like Gunicorn
3. Configure proper logging and monitoring

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve static files with a web server like Nginx
3. Update API endpoints for production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

This project is part of an IBM Skills Network course on AI-based web application development.

## 🎯 Project Tasks Completed

✅ **Task 1**: Fork and Clone project repository  
✅ **Task 2**: Create emotion detection application using Watson NLP  
✅ **Task 3**: Format the output of the application  
✅ **Task 4**: Package the application  
✅ **Task 5**: Run Unit tests on the application  
✅ **Task 6**: Deploy as web application using Flask  
✅ **Task 7**: Incorporate Error handling  
✅ **Task 8**: Run static code analysis  
✅ **Bonus**: Create modern React frontend with Tailwind CSS

## 🎊 Demo

The application demonstrates real-time emotion detection with a beautiful, modern interface. Test with these sample inputs:

- **Happy**: "I love this new technology!"
- **Angry**: "I am really mad about this"
- **Sad**: "I am so sad about this"
- **Fear**: "I am really afraid that this will happen"
- **Disgust**: "I feel disgusted just hearing about this"

---

**Built with ❤️ using React, Vite, Tailwind CSS, Python, Flask, and Watson NLP** 