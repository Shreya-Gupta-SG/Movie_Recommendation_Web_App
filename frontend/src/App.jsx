import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    setInput(e.target.value)
    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const fetchRecommendations = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setRecommendations([])

    try {
      // Functional Requirement: Send POST to /recommend
      const response = await fetch('http://localhost:3000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations. Please try again.')
      }

      // Functional Requirement: Parse response { "movies": "<string>" }
      const data = await response.json()
      setRecommendations(data.movies);
      
      if (data.movies) {
        // Convert string to list. Assuming comma separated or new line separated.
        // User prompt says "Convert the returned string into a list"
        // Let's handle both comma and newline for robustness
        const movieList = data.movies
          .split(/[,\n]+/)
          .map(movie => movie.trim())
          .filter(movie => movie.length > 0)
        
        setRecommendations(movieList)
      } else {
        setRecommendations([])
      }

    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Movie Recommendation App</h1>
        
        <div className="input-group">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="e.g. action movies with a strong female lead"
            disabled={loading}
          />
        </div>

        <button 
          onClick={fetchRecommendations}
          disabled={!input.trim() || loading}
        >
          {loading ? 'Thinking...' : 'Get Recommendations'}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h2>Recommended Movies:</h2>
            <ul>
              {recommendations.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
