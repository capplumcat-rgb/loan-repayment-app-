import { useState } from 'react';
import { Card } from '../ui/Card';

// No backend is connected to this page, so there is nowhere automatic to store
// a submitted reference number. The simplest free option is to send it to the
// business over WhatsApp. Replace the number below with the business's own
// WhatsApp number (country code + number, digits only, no + or spaces).
const BUSINESS_WHATSAPP_NUMBER = '91XXXXXXXXXX'; // TODO: set the real number

export function UtrForm({
  name,
  amount,
  onSubmitted,
}: {
  name: string;
  amount: number;
  onSubmitted: (utr: string) => void;
}) {
  const [utr, setUtr] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!utr.trim()) {
      setError('Enter the UTR / reference number from your payment.');
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setError('');

    const message = encodeURIComponent(
      `Payment confirmation\nName: ${name}\nAmount: ₹${amount}\nMobile: ${mobile}\nUTR/Reference No: ${utr}`
    );
    window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`, '_blank');

    onSubmitted(utr.trim());
  };

  return (
    <Card className="mx-5 mt-5">
      <p className="text-sm font-semibold text-slate-700">Payment confirmation</p>
      <p className="mt-1 text-xs text-slate-500">
        After you've sent the payment, enter the UTR / reference number from your UPI app below.
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">Mobile number</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">UTR / reference number</label>
          <input
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            placeholder="Enter after completing payment"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono outline-none focus:border-[#2563EB]"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full rounded-2xl bg-slate-800 py-3.5 text-center font-semibold text-white active:scale-[0.98]"
      >
        Submit
      </button>
    </Card>
  );
}
