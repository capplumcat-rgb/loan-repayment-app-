import { Card, Badge } from '../ui/Card';
import { formatInr } from '../../lib/upi';

export function LoanInfoCard({ name, amount }: { name: string; amount: number }) {
  return (
    <Card className="-mt-6 mx-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Payment for</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{name}</p>
        </div>
        <Badge tone="warning">Pending</Badge>
      </div>

      <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-slate-400">Amount due</p>
        <p className="mt-1 text-4xl font-extrabold text-[#2563EB]">{formatInr(amount)}</p>
      </div>
    </Card>
  );
}
