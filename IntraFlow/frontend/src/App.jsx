import { useState, useEffect } from 'react'
import './Apps.css'

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return {}
  }
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')

  const payload = decodeToken(token)
  const loggedUser = payload?.username || payload?.user || '-'

  const login = async () => {
    setError('')
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) {
      setError('Usuário ou senha inválidos')
      return
    }

    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      setError('Erro ao autenticar usuário')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  const loadRequests = async () => {
    const res = await fetch('http://localhost:3001/requests', {
      headers: { Authorization: 'Bearer ' + token }
    })
    const data = await res.json()
    setRequests(data)
  }

  useEffect(() => {
    if (token) loadRequests()
  }, [token])

  if (!token) {
    return (
      <div className="login">
        <h2>Login</h2>
        <input
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Entrar</button>
        {error && <p style={{ color: 'tomato', textAlign: 'center' }}>{error}</p>}
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>IntraFlow</h1>
        <div className="nav-right">
          <span>👋 {loggedUser}</span>
          <button className="logout-btn" onClick={logout}>Sair</button>
        </div>
      </nav>

      <div className="content">
        <h2>Solicitações</h2>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Solicitante</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.username || '-'}</td>
                <td>{r.type}</td>
                <td className={`status ${r.status.toLowerCase()}`}>{r.status}</td>
                <td>{r.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
