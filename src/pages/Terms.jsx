import { useEffect } from 'react'

function LegalLayout({ title, updated, children }) {
  return (
    <div style={{ background:'transparent', minHeight:'100vh' }}>
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,48px) 48px', borderBottom:'1px solid #1E293B' }}>
        <div style={{ maxWidth:'720px', margin:'0 auto' }}>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,4vw,48px)', color:'#E5E7EB', marginBottom:'10px' }}>{title}</h1>
          <p style={{ fontSize:'15px', color:'#64748B' }}>{updated}</p>
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
function UL({ items }) {
  return (
    <ul style={{ paddingLeft:'20px', marginBottom:'20px', display:'flex', flexDirection:'column', gap:'8px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

export default function Terms() {
  useEffect(() => { document.title = 'Terms of Service | Esports Elite' }, [])
  return (
    <LegalLayout title="Terms of Service" updated="Last Updated: September 2, 2026">
      <P>Welcome to Esports Elite. These Terms of Service ("Terms") govern your access to and use of the Esports Elite application, website, services, features, content, competitions, training programs, and related services (collectively, the "Platform").</P>
      <P>By creating an account, accessing, or using Esports Elite, you agree to these Terms. If you do not agree with these Terms, you must not use the Platform.</P>
      <p style={{ fontFamily:'Inter, sans-serif', fontWeight:400, fontSize:'14px', color:'#E2E8F0', marginBottom:'20px' }}>
        Esports Elite is operated by GURUSWAMY REDDY SAI KARTHIK REDDY. For any legal correspondence, contact us at johnkarthik055@gmail.com or +91 7892338703.
      </p>

      <H2>1. About Esports Elite</H2>
      <P>Esports Elite is an esports-focused platform designed to help players improve their competitive gaming skills through training, performance tracking, analysis, challenges, competitions, community features, and other esports-related services.</P>
      <P>The specific features available to you may depend on your account type, game, region, eligibility, and the services offered at the time.</P>

      <H2>2. Eligibility</H2>
      <P>You must meet the minimum age and eligibility requirements applicable to the Platform and the particular service you are using.</P>
      <P>If you are under the age required to independently enter into a legally binding agreement in your jurisdiction, you may use the Platform only with the involvement and consent of a parent or legal guardian where required by law.</P>
      <P>You are responsible for providing accurate information regarding your age and eligibility.</P>
      <P>Esports Elite reserves the right to request reasonable information to verify eligibility where necessary.</P>

      <H2>3. Account Registration</H2>
      <P>Certain features require you to create an account.</P>
      <P>You agree to:</P>
      <UL items={[
        'Provide accurate and complete information.',
        'Keep your account information up to date.',
        'Maintain the confidentiality of your login credentials.',
        'Not share, sell, transfer, or otherwise provide access to your account to another person.',
        'Immediately notify Esports Elite if you believe your account has been compromised.',
      ]} />
      <P>You are responsible for activity carried out through your account unless the activity resulted from circumstances outside your reasonable control.</P>

      <H2>4. Acceptable Use</H2>
      <P>You agree to use Esports Elite lawfully and fairly.</P>
      <P>You must not:</P>
      <UL items={[
        'Cheat, exploit, manipulate, or abuse Platform features.',
        'Attempt to gain an unfair competitive advantage through unauthorized means.',
        'Use bots, scripts, automation, exploits, hacks, or unauthorized software to interact with the Platform.',
        'Manipulate rankings, statistics, results, leaderboards, or competition outcomes.',
        'Create multiple accounts for the purpose of abusing promotions, competitions, rankings, or rewards.',
        'Impersonate another player, team, organization, employee, or representative.',
        'Harass, threaten, abuse, or discriminate against other users.',
        'Upload malicious software or harmful content.',
        "Attempt to access another user's account or data.",
        'Reverse engineer, disrupt, damage, or interfere with the Platform.',
        'Use the Platform for fraudulent, illegal, or unauthorized activities.',
      ]} />
      <P>We may suspend or terminate accounts that violate these requirements.</P>

      <H2>5. Esports Competitions and Challenges</H2>
      <P>Where Esports Elite offers competitions, tournaments, challenges, rankings, or similar activities, additional rules may apply.</P>
      <P>Participation may be subject to:</P>
      <UL items={[
        'Eligibility requirements.',
        'Registration requirements.',
        'Game-specific rules.',
        'Match schedules.',
        'Team or player requirements.',
        'Verification procedures.',
        'Anti-cheat requirements.',
        'Competition-specific terms.',
      ]} />
      <P>The rules applicable to a particular competition will form part of these Terms.</P>
      <P>Esports Elite may disqualify a player or team where there is reasonable evidence of cheating, match manipulation, fraudulent activity, rule violations, identity issues, or other conduct that compromises the fairness or integrity of a competition.</P>

      <H2>6. Results, Rankings and Rewards</H2>
      <P>Rankings, scores, statistics, performance ratings, achievements, rewards, and similar information may depend on data received from games, users, competition systems, or third-party services.</P>
      <P>Esports Elite will make reasonable efforts to maintain accurate records but does not guarantee that all third-party data will always be complete, accurate, available, or error-free.</P>
      <P>Where rewards or prizes are offered, eligibility and payment will be subject to the applicable competition rules, verification requirements, and applicable laws.</P>
      <P>Esports Elite may withhold or cancel a reward where a participant is found to be ineligible or has violated applicable rules.</P>

      <H2>7. Payments and Purchases</H2>
      <P>Certain services or features may require payment.</P>
      <P>Before completing a purchase, you will be shown the applicable price and relevant payment information.</P>
      <P>You authorize the applicable payment provider to process the payment you initiate.</P>
      <P>You must not use fraudulent payment methods or payment credentials belonging to another person without authorization.</P>
      <P>Payments, refunds, cancellations, and applicable eligibility requirements are governed by our Refund &amp; Cancellation Policy.</P>

      <H2>8. Third-Party Games and Services</H2>
      <P>Esports Elite may integrate with or refer to third-party games, platforms, payment providers, authentication services, APIs, social platforms, or other services.</P>
      <P>Esports Elite does not control third-party services and is not responsible for their availability, policies, content, functionality, or changes.</P>
      <P>Your use of third-party services may also be governed by their own terms and policies.</P>
      <P>Esports Elite is not affiliated with or endorsed by a game publisher unless expressly stated.</P>

      <H2>9. Intellectual Property</H2>
      <P>All Platform content, including software, branding, logos, designs, graphics, text, interfaces, features, and original materials, is owned by or licensed to Esports Elite unless otherwise stated.</P>
      <P>You receive a limited, non-exclusive, non-transferable, revocable right to use the Platform for its intended purpose.</P>
      <P>You may not copy, reproduce, distribute, modify, sell, license, reverse engineer, or commercially exploit Platform materials without prior written permission.</P>
      <P>You retain ownership of content you independently own and submit to the Platform, subject to the license described below.</P>

      <H2>10. User Content</H2>
      <P>You may be able to submit screenshots, gameplay clips, statistics, comments, profiles, images, videos, or other content ("User Content").</P>
      <P>You remain responsible for your User Content.</P>
      <P>By submitting User Content, you grant Esports Elite a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, distribute, and use that content as reasonably necessary to operate, improve, promote, and provide the Platform.</P>
      <P>You represent that you have the necessary rights to submit the content and that doing so does not violate any law or third-party rights.</P>

      <H2>11. Privacy</H2>
      <P>Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, store, and process information.</P>

      <H2>12. Platform Availability</H2>
      <P>We aim to keep Esports Elite available and reliable, but we do not guarantee uninterrupted or error-free access.</P>
      <P>The Platform may occasionally be unavailable because of maintenance, updates, technical failures, third-party services, network issues, or circumstances beyond our reasonable control.</P>
      <P>We may modify, suspend, or discontinue features or services where reasonably necessary.</P>

      <H2>13. Account Suspension and Termination</H2>
      <P>We may suspend, restrict, or terminate your account if:</P>
      <UL items={[
        'You violate these Terms.',
        'You engage in cheating, fraud, abuse, or manipulation.',
        'Your activity threatens the security or integrity of the Platform.',
        'Required information cannot be verified.',
        'We are required to do so by law.',
        'Continued access creates a material risk to Esports Elite or other users.',
      ]} />
      <P>You may stop using the Platform at any time.</P>
      <P>Termination does not automatically create a right to a refund unless provided under the applicable Refund &amp; Cancellation Policy or required by law.</P>

      <H2>14. Disclaimers</H2>
      <P>Esports Elite is provided on an "as available" and "as is" basis to the extent permitted by applicable law.</P>
      <P>We do not guarantee that:</P>
      <UL items={[
        'The Platform will always be available.',
        'The Platform will be completely error-free.',
        'Your gaming performance or competitive results will improve.',
        'Any particular ranking, qualification, prize, or outcome will be achieved.',
        'Third-party game data or services will always be accurate or available.',
      ]} />
      <P>Esports Elite is a training and esports platform and does not guarantee professional esports selection, employment, sponsorship, tournament qualification, income, or competitive success.</P>

      <H2>15. Limitation of Liability</H2>
      <P>To the maximum extent permitted by applicable law, Esports Elite and its team will not be liable for indirect, incidental, consequential, special, or punitive losses arising from your use of the Platform.</P>
      <P>Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law.</P>

      <H2>16. Indemnification</H2>
      <P>To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Esports Elite and its team from claims, losses, liabilities, damages, costs, and expenses arising from your misuse of the Platform, violation of these Terms, violation of applicable law, or infringement of third-party rights.</P>

      <H2>17. Changes to These Terms</H2>
      <P>We may update these Terms from time to time.</P>
      <P>When material changes are made, we may provide reasonable notice through the Platform or other appropriate means.</P>
      <P>Your continued use of Esports Elite after the updated Terms become effective constitutes acceptance of the revised Terms.</P>

      <H2>18. Governing Law and Disputes</H2>
      <P>These Terms are governed by the laws applicable in India, without regard to conflict-of-law principles.</P>
      <P>Any dispute will be subject to the jurisdiction of the courts having appropriate jurisdiction, subject to any mandatory rights available to consumers under applicable law.</P>

      <H2>19. Contact</H2>
      <P>If you have questions regarding these Terms, you can contact us through the support/contact channels provided within the Esports Elite Platform.</P>
      <P>
        Esports Elite<br />
        Email: johnkarthik055@gmail.com<br />
        Website: https://esportselite.in
      </P>
    </LegalLayout>
  )
}
