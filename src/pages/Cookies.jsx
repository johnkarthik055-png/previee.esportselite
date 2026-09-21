function LegalLayout({ title, children }) {
  return (
    <div style={{ background:'transparent', minHeight:'100vh' }}>
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,48px) 48px', borderBottom:'1px solid #1E293B' }}>
        <div style={{ maxWidth:'720px', margin:'0 auto' }}>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,4vw,48px)', color:'#E5E7EB', marginBottom:'10px' }}>{title}</h1>
          <p style={{ fontSize:'15px', color:'#64748B' }}>Last updated: August 2026</p>
        </div>
      </section>
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'clamp(48px,6vw,80px) clamp(24px,5vw,48px)' }}>
        <div style={{ maxWidth:'720px', margin:'0 auto', fontSize:'17px', color:'#94A3B8', lineHeight:1.8 }}>
          {children}
        </div>
      </section>
    </div>
  )
}

function H2({ children }) { return <h2 className="legal-h2">{children}</h2> }
function P({ children }) { return <p style={{ marginBottom:'20px' }}>{children}</p> }

function CookieTable({ rows }) {
  const tdStyle = { padding:'10px 12px', borderBottom:'1px solid #1E293B', fontSize:'14px', color:'#94A3B8', verticalAlign:'top' }
  const thStyle = { ...tdStyle, color:'#E5E7EB', fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'12px', letterSpacing:'0.05em', textTransform:'uppercase', background:'rgba(10,15,28,0.8)' }
  return (
    <div style={{ overflowX:'auto', marginBottom:'28px' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', border:'1px solid #1E293B', borderRadius:'8px', overflow:'hidden', minWidth:'480px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Purpose</th>
            <th style={thStyle}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(13,21,38,0.6)' : 'rgba(5,8,22,0.4)' }}>
              <td style={{ ...tdStyle, fontFamily:'monospace', color:'#3B82F6', fontSize:'13px' }}>{row.name}</td>
              <td style={tdStyle}>{row.purpose}</td>
              <td style={{ ...tdStyle, whiteSpace:'nowrap' }}>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Cookies() {
  return (
    <LegalLayout title="Cookie Policy">
      <P>This Cookie Policy explains how Esports Elite uses cookies and similar technologies on our website at esportselite.in and our application at app.esportselite.in. By using our platform, you consent to the use of cookies as described here.</P>

      <H2>1. What Are Cookies?</H2>
      <P>Cookies are small text files stored on your device by your web browser when you visit a website. They allow the site to remember information about your visit — such as your login session or preferences — making the platform function correctly and improving your experience. Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (stored for a set period).</P>

      <H2>2. Essential Cookies</H2>
      <P>These cookies are strictly necessary for the platform to function. Without them, you cannot log in or use the application. They cannot be disabled without affecting core functionality.</P>
      <CookieTable rows={[
        { name:'__session',     purpose:'Firebase Authentication session token — keeps you logged in across page loads.',     duration:'Session' },
        { name:'firebase-auth', purpose:'Firebase user authentication state, used by Google Sign-In.',                        duration:'1 year' },
        { name:'ee-csrf',       purpose:'Cross-site request forgery protection token to secure form submissions.',             duration:'Session' },
      ]} />

      <H2>3. Analytics Cookies</H2>
      <P>We use Firebase Analytics (provided by Google LLC) to understand how users interact with the platform. This helps us identify pages that are difficult to use, features that are underperforming, and opportunities to improve the experience. Analytics data is aggregated and does not identify you personally.</P>
      <CookieTable rows={[
        { name:'_ga',           purpose:'Google Analytics client identifier. Used to distinguish unique users.',               duration:'2 years' },
        { name:'_ga_*',         purpose:'Google Analytics session state for the Esports Elite measurement ID.',               duration:'2 years' },
        { name:'firebase-perf', purpose:'Firebase Performance Monitoring — tracks page load times and API latency.',          duration:'Session' },
      ]} />

      <H2>4. Preference Cookies</H2>
      <P>These cookies remember choices you make to personalise your experience, such as your preferred training view or notification settings. They are not strictly necessary but improve convenience.</P>
      <CookieTable rows={[
        { name:'ee-theme',      purpose:'Stores your display preference (dark mode is the default on Esports Elite).',        duration:'1 year' },
        { name:'ee-nav-state',  purpose:'Remembers whether the sidebar navigation is expanded or collapsed.',                  duration:'30 days' },
      ]} />

      <H2>5. Managing Cookies</H2>
      <P>You can control and manage cookies through your browser settings. Most modern browsers allow you to refuse, delete, or be notified about cookies. Please note that disabling essential cookies will prevent you from logging in and using core platform features. Disabling analytics cookies will not affect your ability to use the platform.</P>
      <P>Browser-specific instructions for managing cookies:</P>
      <ul style={{ paddingLeft:'20px', marginBottom:'20px', display:'flex', flexDirection:'column', gap:'6px' }}>
        <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
        <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
        <li>Safari: Preferences → Privacy → Manage Website Data</li>
        <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
      </ul>

      <H2>6. Third-Party Services</H2>
      <P>Firebase (Google LLC) is our primary third-party service provider and may set their own cookies. Google's privacy practices are governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color:'#3B82F6', textDecoration:'none' }}>Google Privacy Policy</a>. We do not use any advertising or tracking cookies from ad networks or social media platforms.</P>

      <H2>7. Updates to This Policy</H2>
      <P>We may update this Cookie Policy to reflect changes in the cookies we use or applicable regulations. Material changes will be communicated via the platform. The "last updated" date at the top of this page reflects the most recent revision.</P>

      <H2>8. Contact</H2>
      <P>If you have questions about our use of cookies, contact us at:<br />Email: johnkarthik055@gmail.com<br />Location: Karnataka, India</P>
    </LegalLayout>
  )
}
