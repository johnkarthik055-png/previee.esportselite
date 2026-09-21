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

export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" updated="Last Updated: September 2, 2026">
      <P>This Refund &amp; Cancellation Policy explains the rules applicable to purchases, subscriptions, registrations, services, competitions, and other paid transactions made through Esports Elite.</P>
      <P>By making a purchase through Esports Elite, you acknowledge and agree to this Policy, subject to your rights under applicable law.</P>

      <H2>1. General Policy</H2>
      <P>All purchases are subject to the terms displayed at the time of purchase.</P>
      <P>Before completing a transaction, you are responsible for reviewing the applicable service, price, duration, eligibility requirements, and cancellation or refund conditions.</P>
      <P>Refund eligibility may differ depending on the product or service purchased.</P>

      <H2>2. Digital Services</H2>
      <P>Because many Esports Elite services may be delivered digitally or become available immediately after purchase, refunds may not be available once the service has been accessed, consumed, activated, or substantially delivered, except where required by applicable law.</P>
      <P>If you believe that a purchased service was not provided as described or was affected by a technical issue, you may contact support for review.</P>

      <H2>3. Competition and Tournament Registrations</H2>
      <P>Where Esports Elite charges an entry or registration fee for a competition, tournament, challenge, or event, the applicable event rules will determine whether cancellation or refund is permitted.</P>
      <P>Unless otherwise stated in the applicable event rules, registration fees may be non-refundable after registration is confirmed.</P>
      <P>If Esports Elite cancels an event and does not provide an alternative arrangement, eligible participants may receive a refund of the applicable registration fee, subject to applicable law and the specific event terms.</P>

      <H2>4. Subscriptions</H2>
      <P>If Esports Elite offers subscription-based services, you may cancel your subscription according to the cancellation method provided in the Platform or through the applicable payment provider.</P>
      <P>Cancellation generally prevents future renewal but does not necessarily provide a refund for the current billing period.</P>
      <P>Any refund rights required by applicable law remain unaffected.</P>

      <H2>5. Duplicate or Incorrect Payments</H2>
      <P>If you believe that you have been charged more than once for the same transaction, contact support with the relevant transaction details.</P>
      <P>After verification, an eligible duplicate payment may be refunded through the original payment method or another legally permitted method.</P>

      <H2>6. Failed Transactions</H2>
      <P>If a payment fails but your account is incorrectly charged, contact support with the transaction details.</P>
      <P>We will investigate the transaction and, where applicable, work with the relevant payment provider to resolve the issue.</P>

      <H2>7. Unauthorized Transactions</H2>
      <P>If you believe that a transaction was made without your authorization, contact us as soon as possible.</P>
      <P>We may request transaction information to investigate the claim.</P>
      <P>You should also contact your bank or payment provider where appropriate.</P>

      <H2>8. Refund Processing</H2>
      <P>Approved refunds will generally be initiated through the original payment method used for the transaction.</P>
      <P>The time required for the refund to appear in your account may depend on the payment provider, bank, card network, or other financial institution.</P>
      <P>Esports Elite does not control processing times imposed by third-party financial institutions.</P>

      <H2>9. Promotional Purchases</H2>
      <P>Promotional offers, discounts, credits, or special pricing may have additional conditions.</P>
      <P>Unless otherwise stated, promotional benefits have no cash value and may not be transferred or exchanged.</P>

      <H2>10. Fraud and Abuse</H2>
      <P>Refund requests associated with fraud, payment abuse, account manipulation, competition manipulation, cheating, misuse of promotions, or violations of our Terms of Service may be denied to the extent permitted by applicable law.</P>
      <P>Nothing in this section limits any rights you have under applicable consumer protection laws.</P>

      <H2>11. How to Request a Refund</H2>
      <P>To request a refund or report a billing issue, contact Esports Elite through the support channel provided in the Platform.</P>
      <p style={{ marginBottom:'20px', color:'#E2E8F0' }}>
        To request a refund or cancellation, contact:<br />
        GURUSWAMY REDDY SAI KARTHIK REDDY (Esports Elite)<br />
        Email: johnkarthik055@gmail.com<br />
        Phone: +91 7892338703
      </p>
      <P>Please include:</P>
      <UL items={[
        'Your registered account information.',
        'Transaction ID.',
        'Date of transaction.',
        'Purchased product or service.',
        'Reason for the request.',
        'Any relevant supporting information.',
      ]} />
      <P>We may request additional information where reasonably necessary to verify the transaction.</P>

      <H2>12. Refund Review</H2>
      <P>Each refund request will be reviewed based on:</P>
      <UL items={[
        'The type of purchase.',
        'Whether the service has been accessed or delivered.',
        'The applicable purchase terms.',
        'The reason for the request.',
        'Technical or payment issues.',
        'Applicable law.',
        'Any relevant competition or event rules.',
      ]} />

      <H2>13. Changes to This Policy</H2>
      <P>We may update this Refund &amp; Cancellation Policy from time to time.</P>
      <P>Changes will become effective when the updated Policy is published through the Platform unless otherwise stated.</P>

      <H2>14. Contact</H2>
      <P>For refund and payment-related questions:</P>
      <P>
        Esports Elite<br />
        Email: johnkarthik055@gmail.com<br />
        Website: https://esportselite.in
      </P>
    </LegalLayout>
  )
}
