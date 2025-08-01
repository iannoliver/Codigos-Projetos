import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/tools')
      setHistory(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleGenerate = async () => {
    if (!description) return
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:3001/generate-tool', { description })
      setCode(data.code)
      fetchHistory()
    } catch (e) {
      alert('Erro ao gerar ferramenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Tool Generator</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="4"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descreva a ferramenta"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Gerando...' : 'Gerar'}
      </button>
      {code && (
        <pre className="bg-white p-2 mt-4 overflow-auto border" style={{maxHeight:'300px'}}>
{code}
        </pre>
      )}
      <h2 className="text-xl font-semibold mt-6">Histórico</h2>
      <ul className="list-disc pl-5">
        {history.map(item => (
          <li key={item.id}>{item.description} - {new Date(item.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
