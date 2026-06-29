import { useState } from 'react';
import { getPaymentParamsFromUrl } from '../lib/upi';
import { HeroSection } from '../components/repayment/HeroSection';
import { LoanInfoCard } from '../components/repayment/LoanInfoCard';
import { QRPaymentCard } from '../components/repayment/QRPaymentCard';
import { UtrForm } from '../components/repayment/UtrForm';
import { PaymentSuccess } from '../components/repayment/PaymentSuccess';

export default function PaymentPage() {
  const params = getPaymentParamsFromUrl();
  const [submittedUtr, setSubmittedUtr] = useState<string | null>(null);

  if (!params) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-slate-800">Invalid payment link</p>
          <p className="mt-2 text-sm text-slate-500">
            This link is missing required details. Please check the link and try again, or contact the sender.
          </p>
        </div>
      </div>
    );
  }

  const { name, amount, upi, company } = params;
  const companyName = company ?? 'LoanPay Finance';

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <HeroSection companyName={companyName} />

      <div className="mx-auto max-w-md">
        <LoanInfoCard name={name} amount={amount} />
        <QRPaymentCard name={name} amount={amount} upi={upi} />

        {submittedUtr ? (
          <PaymentSuccess name={name} utr={submittedUtr} />
        ) : (
          <UtrForm name={name} amount={amount} onSubmitted={setSubmittedUtr} />
        )}

        <p className="mt-6 px-5 text-center text-xs text-slate-400">
          This page facilitates a direct UPI transfer to {companyName}. It is not a bank or a licensed payment gateway.
        </p>
      </div>
    </div>
  );
}
