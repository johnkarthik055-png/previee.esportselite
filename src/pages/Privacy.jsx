import { useEffect } from 'react'

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

function H2({ children }) {
  return <h2 className="legal-h2">{children}</h2>
}
function P({ children }) { return <p style={{ marginBottom:'20px' }}>{children}</p> }
function UL({ items }) {
  return (
    <ul style={{ paddingLeft:'20px', marginBottom:'20px', display:'flex', flexDirection:'column', gap:'8px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

export default function Privacy() {
  useEffect(() => { document.title = 'Privacy Policy | Esports Elite' }, [])
  return (
    <LegalLayout title="Privacy Policy">
      <P>Esports Elite ("we", "our", "us") operates the platform accessible at app.esportselite.in and esportselite.in. This Privacy Policy explains how we collect, use, and protect your information.</P>

      <H2>1. Information We Collect</H2>
      <P>We collect the following categories of information:</P>
      <UL items={[
        'Account information: name, email address, and profile data you provide on registration.',
        'Training data: drill logs, session records, rep counts, and accuracy data you enter.',
        'Match data: match results, kills, placement, and notes you log in the Match Logger.',
        'Usage data: pages visited, features used, and session duration — collected via Firebase Analytics.',
        'Device information: browser type, OS, and IP address used for security and debugging.',
        'Cookies: session cookies for authentication and analytics cookies for platform improvement.',
      ]} />

      <H2>2. How We Use Your Information</H2>
      <UL items={[
        'To provide and operate the Esports Elite platform and its features.',
        'To power the AI Coach by analysing your combined training and match data.',
        'To track your XP, progression, and streaks accurately.',
        'To send platform updates, feature announcements, and support communications.',
        'To improve platform performance, fix bugs, and develop new features.',
        'To comply with applicable legal obligations.',
      ]} />

      <H2>3. Firebase and Third-Party Services</H2>
      <P>We use Firebase (Google LLC) for user authentication, real-time database storage, and analytics. Firebase processes data in accordance with Google's Privacy Policy. We may also use Firebase Performance Monitoring. We do not sell your data to any third party.</P>

      <H2>4. Data Storage and Security</H2>
      <P>Your data is stored on Firebase infrastructure with encryption at rest and in transit using TLS. We implement appropriate technical and organisational measures to protect your information. However, no method of internet transmission is 100% secure — we cannot guarantee absolute security.</P>

      <H2>5. Data Retention</H2>
      <P>We retain your account and training data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are legally required to retain it.</P>

      <H2>6. Your Rights</H2>
      <P>You have the right to:</P>
      <UL items={[
        'Access the personal data we hold about you.',
        'Request correction of inaccurate or incomplete data.',
        'Request deletion of your account and all associated data.',
        'Object to or request restriction of processing of your data.',
        'Data portability — receive a copy of your data in a structured, machine-readable format.',
      ]} />
      <P>To exercise any of these rights, contact us at johnkarthik055@gmail.com.</P>

      <H2>7. Cookies</H2>
      <P>We use essential cookies to maintain your login session, and analytics cookies to understand how the platform is used. You can manage cookies through your browser settings. Disabling essential cookies will affect platform functionality. See our Cookie Policy for full details.</P>

      <H2>8. Children's Privacy</H2>
      <P>Esports Elite is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, contact us and we will delete it promptly.</P>

      <H2>9. Changes to This Policy</H2>
      <P>We may update this Privacy Policy from time to time. Material changes will be communicated via the platform or by email with at least 14 days notice. Continued use after changes constitutes acceptance of the updated policy.</P>

      <H2>10. Contact</H2>
      <P>For privacy-related questions or to exercise your rights, contact us at:<br />Email: johnkarthik055@gmail.com<br />Location: Karnataka, India</P>
      <p style={{ marginBottom:'20px', color:'#E2E8F0' }}>
        Data Controller: GURUSWAMY REDDY SAI KARTHIK REDDY (operating as Esports Elite)<br />
        Email: johnkarthik055@gmail.com<br />
        Phone: +91 7892338703
      </p>
    </LegalLayout>
  )
}
