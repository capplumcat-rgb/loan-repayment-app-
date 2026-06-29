import { Card } from '../ui/Card';

export function PaymentSuccess({ name, utr }: { name: string; utr: string }) {
  return (
    <Card className="mx-5 mt-5 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">Thanks, {name}</p>
      <p className="mt-1 text-sm text-slate-500">
        Your reference number <span className="font-mono text-slate-700">{utr}</span> has been recorded. We'll verify your payment shortly.
      </p>
    </Card>
  );
}
