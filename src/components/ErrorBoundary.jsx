import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
          <div>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#FF1838', marginBottom: 16 }}>SOMETHING WENT WRONG</p>
            <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 64, color: '#111827', lineHeight: 0.9, marginBottom: 24 }}>
              UNEXPECTED<br />
              <span style={{ background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ERROR.</span>
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#536174', marginBottom: 32 }}>Something broke. Try refreshing the page.</p>
            <button onClick={() => window.location.reload()} style={{ background: '#0B1220', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', marginRight: 16 }}>REFRESH</button>
            <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#1769FF' }}>Go Home</Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
