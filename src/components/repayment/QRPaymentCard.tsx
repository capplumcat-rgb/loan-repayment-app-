import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { buildUpiUrl, formatInr, type PaymentParams } from '../../lib/upi';

export function QRPaymentCard({ name, amount, upi }: { name: string; amount: number; upi: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const upiUrl = buildUpiUrl({ name, amount, upi } as PaymentParams);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); fail silently.
    }
  };

  return (
    <Card className="mx-5 mt-5">
      <p className="text-center text-sm font-semibold text-slate-700">Scan with any UPI app</p>

      <div className="mt-4 flex justify-center">
        <div className="rounded-2xl border-4 border-[#2563EB]/20 p-3">
          <QRCodeSVG value={upiUrl} size={180} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Row label="Amount" value={formatInr(amount)} onCopy={() => copy('amount', String(amount))} copied={copied === 'amount'} />
        <Row label="UPI ID" value={upi} mono onCopy={() => copy('upi', upi)} copied={copied === 'upi'} />
      </div>

      <a
        href={upiUrl}
        className="mt-5 block w-full rounded-2xl bg-[#2563EB] py-3.5 text-center font-semibold text-white shadow-[0_4px_24px_-4px_rgba(37,99,235,0.4)] active:scale-[0.98]"
      >
        Pay now
      </a>

      <p className="mt-4 text-center text-xs text-slate-500">
        Send the exact amount shown above — {formatInr(amount)} — using your UPI app. This matches the amount in your payment link.
      </p>
    </Card>
  );
}

function Row({
  label,
  value,
  onCopy,
  copied,
  mono,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
        <p className={`mt-0.5 text-sm font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</p>
      </div>
      <button onClick={onCopy} className="rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
