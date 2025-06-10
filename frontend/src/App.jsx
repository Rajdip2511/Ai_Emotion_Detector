import { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const analyzeEmotion = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch(`/emotionDetector?textToAnalyze=${encodeURIComponent(text)}`)
      const result = await response.text()
      
      if (result === "Invalid text! Please try again!") {
        setError('Invalid text! Please try again!')
      } else {
        // Parse the response to extract emotion scores
        const emotionRegex = /'(\w+)': ([\d.]+)/g
        const emotions = {}
        let match
        
        while ((match = emotionRegex.exec(result)) !== null) {
          emotions[match[1]] = parseFloat(match[2])
        }
        
        // Extract dominant emotion
        const dominantMatch = result.match(/The dominant emotion is (\w+)\./)
        const dominantEmotion = dominantMatch ? dominantMatch[1] : null
        
        setResults({
          ...emotions,
          dominant_emotion: dominantEmotion,
          raw_response: result
        })
      }
    } catch (err) {
      setError('Failed to analyze emotions. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      analyzeEmotion()
    }
  }

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: 'text-yellow-700 bg-yellow-100 border-yellow-300',
      anger: 'text-red-700 bg-red-100 border-red-300',
      sadness: 'text-blue-700 bg-blue-100 border-blue-300',
      fear: 'text-purple-700 bg-purple-100 border-purple-300',
      disgust: 'text-green-700 bg-green-100 border-green-300'
    }
    return colors[emotion] || 'text-gray-700 bg-gray-100 border-gray-300'
  }

  const formatPercentage = (score) => {
    return (score * 100).toFixed(1)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4">
              Emotion Detector
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Type your text below, and I'll tell you what emotions it contains! 
              Our AI will analyze your text and detect emotions like joy, anger, sadness, fear, and disgust.
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 xl:p-10 w-full">
              {/* Text Input Section */}
              <div className="mb-6 lg:mb-8">
                <label htmlFor="textInput" className="block text-lg lg:text-xl font-semibold text-gray-700 mb-3">
                  Your Text
                </label>
                <textarea
                  id="textInput"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type or paste your text here... (Press Ctrl+Enter to analyze)"
                  className="w-full h-32 sm:h-40 lg:h-48 p-4 lg:p-6 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors resize-none text-gray-700 bg-white placeholder-gray-400 text-base lg:text-lg"
                  disabled={isAnalyzing}
                />
                <div className="text-sm lg:text-base text-gray-500 mt-2">
                  Tip: Press Ctrl+Enter to quickly analyze your text
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mb-6 lg:mb-8">
                <button
                  onClick={analyzeEmotion}
                  disabled={!text.trim() || isAnalyzing}
                  className={`w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold text-white text-base lg:text-lg transition-all duration-200 ${
                    !text.trim() || isAnalyzing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-b-2 border-white mr-2"></div>
                      Analyzing emotions...
                    </div>
                  ) : (
                    'Analyze Emotion'
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base lg:text-lg">{error}</span>
                  </div>
                </div>
              )}

              {/* Results Section */}
              {results && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="border-t pt-6 lg:pt-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 lg:mb-8">Analysis Results</h2>
                    
                    {/* Emotion Scores Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
                      {Object.entries(results)
                        .filter(([key]) => key !== 'dominant_emotion' && key !== 'raw_response')
                        .map(([emotion, score]) => (
                          <div
                            key={emotion}
                            className={`p-4 lg:p-6 rounded-lg border-2 transition-all duration-200 ${
                              emotion === results.dominant_emotion
                                ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-105'
                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-semibold border ${getEmotionColor(emotion)}`}>
                                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                              </span>
                              <span className="text-lg lg:text-xl font-bold text-gray-800">
                                {formatPercentage(score)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4">
                              <div
                                className={`h-3 lg:h-4 rounded-full transition-all duration-1000 ease-out ${
                                  emotion === results.dominant_emotion
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                                    : 'bg-gray-400'
                                }`}
                                style={{ width: `${Math.min(formatPercentage(score), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Dominant Emotion Card */}
                    {results.dominant_emotion && (
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 lg:p-8 rounded-lg mb-6 lg:mb-8 shadow-lg">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2 flex items-center">
                          <svg className="w-6 h-6 lg:w-8 lg:h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Dominant Emotion
                        </h3>
                        <p className="text-lg lg:text-xl">
                          The primary emotion detected in your text is{' '}
                          <span className="font-bold text-yellow-300 text-xl lg:text-2xl">
                            {results.dominant_emotion.charAt(0).toUpperCase() + results.dominant_emotion.slice(1)}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Detailed Analysis */}
                    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3 lg:mb-4 flex items-center text-base lg:text-lg">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Detailed Analysis
                      </h4>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed break-words">
                        {results.raw_response}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 lg:mt-12 text-gray-500">
            <p className="text-sm sm:text-base lg:text-lg">Powered by Watson NLP and React</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
