/**
 * ReceiptPreview — direct-URL-only demo page for the ReceiptPrinter widget.
 *
 * NOT linked from any navigation. No Firebase, no Razorpay, no auth. It exists
 * purely so the receipt-printer component can be seen and clicked through with
 * realistic mock data, independent of whether the real payment backend is
 * deployed. The real /pricing page and checkout flow are untouched by this.
 */
import ReceiptPrinter from '../components/ReceiptPrinter'

const mockOrderData = {
  orderId: 'sub_MockOrderId12345',
  subscriptionId: 'sub_MockSub67890',
  amount: 99,
  tax: 17.82,
  total: 116.82,
  paidWith: 'UPI •••• demo@upi',
  completedAt: new Date().toISOString(),
  planName: 'Pro Plan',
}

export default function ReceiptPreview() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 16px 96px',
        background: 'rgba(5,8,22,0.85)',
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#64748B',
          marginBottom: 28,
          textAlign: 'center',
        }}
      >
        Preview · mock data · not a real payment
      </p>

      <ReceiptPrinter {...mockOrderData} />
    </section>
  )
}
